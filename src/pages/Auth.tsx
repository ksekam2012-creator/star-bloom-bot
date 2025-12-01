import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signUp(signUpForm.email, signUpForm.password, signUpForm.fullName);
    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn(signInForm.email, signInForm.password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Animated background stars with varied sizes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px hsl(var(--primary))`,
            }}
          />
        ))}
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      <Card className="w-full max-w-md mx-4 z-10 bg-card/90 backdrop-blur-lg border-border shadow-glow transition-all duration-500 hover:shadow-cosmic hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4">
        <CardHeader className="space-y-1 text-center animate-in fade-in-0 slide-in-from-top-2" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" style={{ animationDuration: '2s' }} />
            <CardTitle className="text-3xl font-display text-foreground bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in-0 zoom-in-50" style={{ animationDelay: '200ms' }}>
              Cosmic Explorer
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground animate-in fade-in-0" style={{ animationDelay: '300ms' }}>
            Sign in to explore the universe and save your journey
          </CardDescription>
        </CardHeader>
        <CardContent className="animate-in fade-in-0 slide-in-from-bottom-2" style={{ animationDelay: '400ms' }}>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-secondary/50 backdrop-blur-sm">
              <TabsTrigger value="signin" className="transition-all data-[state=active]:shadow-glow">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="transition-all data-[state=active]:shadow-glow">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="animate-in fade-in-0 slide-in-from-left-2">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2 animate-in fade-in-0 slide-in-from-left-1" style={{ animationDelay: '50ms' }}>
                  <Label htmlFor="signin-email" className="text-foreground">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                    required
                    className="bg-secondary/50 border-border backdrop-blur-sm transition-all duration-300 focus:border-primary focus:shadow-glow hover:border-primary/50"
                  />
                </div>
                <div className="space-y-2 animate-in fade-in-0 slide-in-from-left-1" style={{ animationDelay: '100ms' }}>
                  <Label htmlFor="signin-password" className="text-foreground">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                    required
                    className="bg-secondary/50 border-border backdrop-blur-sm transition-all duration-300 focus:border-primary focus:shadow-glow hover:border-primary/50"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-300 hover:scale-105 hover:shadow-glow active:scale-95 animate-in fade-in-0 zoom-in-50" 
                  style={{ animationDelay: '150ms' }}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="animate-in fade-in-0 slide-in-from-right-2">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2 animate-in fade-in-0 slide-in-from-right-1" style={{ animationDelay: '50ms' }}>
                  <Label htmlFor="signup-name" className="text-foreground">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signUpForm.fullName}
                    onChange={(e) => setSignUpForm({ ...signUpForm, fullName: e.target.value })}
                    required
                    className="bg-secondary/50 border-border backdrop-blur-sm transition-all duration-300 focus:border-primary focus:shadow-glow hover:border-primary/50"
                  />
                </div>
                <div className="space-y-2 animate-in fade-in-0 slide-in-from-right-1" style={{ animationDelay: '100ms' }}>
                  <Label htmlFor="signup-email" className="text-foreground">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                    required
                    className="bg-secondary/50 border-border backdrop-blur-sm transition-all duration-300 focus:border-primary focus:shadow-glow hover:border-primary/50"
                  />
                </div>
                <div className="space-y-2 animate-in fade-in-0 slide-in-from-right-1" style={{ animationDelay: '150ms' }}>
                  <Label htmlFor="signup-password" className="text-foreground">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                    required
                    className="bg-secondary/50 border-border backdrop-blur-sm transition-all duration-300 focus:border-primary focus:shadow-glow hover:border-primary/50"
                    minLength={6}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-300 hover:scale-105 hover:shadow-glow active:scale-95 animate-in fade-in-0 zoom-in-50" 
                  style={{ animationDelay: '200ms' }}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground animate-in fade-in-0" style={{ animationDelay: '600ms' }}>
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;