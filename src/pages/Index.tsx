import { ChatInterface } from "@/components/ChatInterface";
import cosmicHero from "@/assets/cosmic-hero.jpg";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cosmic background with hero image */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${cosmicHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-cosmic opacity-80" />

      {/* Animated stars */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-in fade-in duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Cosmic Explorer</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-stellar bg-clip-text text-transparent">
            Explore the Universe
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-4">
            Your AI companion for cosmic knowledge about plants, stars, galaxies, and black holes
          </p>
          
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Powered by advanced AI • Real-time streaming responses • Vast astronomical and botanical knowledge
          </p>
        </div>

        {/* Chat Interface */}
        <div className="animate-in slide-in-from-bottom duration-1000 delay-300">
          <ChatInterface />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Built with cutting-edge AI technology for seamless cosmic exploration</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
