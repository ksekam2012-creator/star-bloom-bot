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
  const { signUp, signIn, signInWithGoogle, user } = useAuth();
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

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signInWithGoogle();
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

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button 
                  type="button"
                  variant="outline"
                  className="w-full transition-all duration-300 hover:scale-105 hover:shadow-glow active:scale-95"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
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

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button 
                  type="button"
                  variant="outline"
                  className="w-full transition-all duration-300 hover:scale-105 hover:shadow-glow active:scale-95"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign up with Google
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