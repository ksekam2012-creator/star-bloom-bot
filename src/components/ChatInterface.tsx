import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, LogOut, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import chatCompleteImage from "@/assets/chat-complete.jpg";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatInterface = () => {
  const { user, signOut } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Create a new conversation when component mounts
  useEffect(() => {
    if (user) {
      createNewConversation();
    }
  }, [user]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const createNewConversation = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("conversations")
        .insert([
          {
            user_id: user.id,
            title: "New Conversation",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setConversationId(data.id);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create conversation",
      });
    }
  };

  const saveMessage = async (role: "user" | "assistant", content: string) => {
    if (!conversationId || !user) return;

    try {
      await supabase.from("chat_messages").insert([
        {
          conversation_id: conversationId,
          role,
          content,
        },
      ]);
    } catch (error: any) {
      console.error("Error saving message:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newUserMessage: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setShowComplete(false);

    // Save user message
    await saveMessage("user", userMessage);

    try {
      // Use direct fetch for streaming support
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cosmic-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!response.body) throw new Error("No response body");

      let fullResponse = "";
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") continue;
            
            try {
              const jsonData = JSON.parse(jsonStr);
              const content = jsonData.choices?.[0]?.delta?.content;
              if (content) {
                fullResponse += content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1].content = fullResponse;
                  return updated;
                });
              }
            } catch (e) {
              console.warn("Failed to parse SSE data:", line);
            }
          }
        }
      }

      // Save assistant message
      await saveMessage("assistant", fullResponse);
      
      // Show completion image
      setShowComplete(true);
      setTimeout(() => setShowComplete(false), 3000);
    } catch (error: any) {
      console.error("Chat error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to get response from AI",
      });
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setShowComplete(false);
    createNewConversation();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card/80 backdrop-blur-lg rounded-2xl shadow-cosmic border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-stellar p-4 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <h2 className="text-lg font-semibold text-foreground">Cosmic AI Assistant</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={startNewChat}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              New Chat
            </Button>
            <Button
              onClick={signOut}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-background/30">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-3">
                <Sparkles className="h-12 w-12 text-primary mx-auto animate-pulse" />
                <p className="text-muted-foreground text-lg">
                  Ask me about stars, galaxies, black holes, or any plant!
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {showComplete && (
                <div className="flex justify-center">
                  <div className="rounded-xl overflow-hidden border-2 border-primary shadow-cosmic animate-in fade-in zoom-in duration-500">
                    <img 
                      src={chatCompleteImage} 
                      alt="Chat completed successfully" 
                      className="w-64 h-48 object-cover"
                    />
                  </div>
                </div>
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-secondary/30 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about the cosmos or any plant..."
              disabled={isLoading}
              className="flex-1 bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
