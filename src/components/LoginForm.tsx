import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import avatarLogin from "@/assets/images/avatar/avatar login.png";
import { supabase } from "@/lib/supabase-client";

interface Props {
  onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = isRegistering
        ? await supabase.auth.signUp({
            email: username,
            password: password,
          })
        : await supabase.auth.signInWithPassword({
            email: username,
            password: password,
          });

      if (error) throw error;

      if (isRegistering && data?.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([{ id: data.user.id, username }]);

        if (profileError) throw profileError;
      }

      onLoginSuccess();
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/chat`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;

      // If we have user data, create a profile
      if (data?.user) {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          username: data.user.email,
        });

        if (profileError) throw profileError;
      }
    } catch (error) {
      console.error("Google auth error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto p-12 space-y-8 bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl text-white relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/5 before:to-pink-500/5 before:pointer-events-none">
        <div className="space-y-4 text-center mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-28 h-28 mx-auto mb-6"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur-lg"></div>
              <img
                src={avatarLogin}
                alt="Welcome"
                className="relative w-full h-full rounded-full border-2 border-white/40 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            {isRegistering ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-white/60">
            {isRegistering
              ? "Join our anime community"
              : "Continue your anime journey"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black/20 border-white/10 text-white placeholder:text-white/40 h-12"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/20 border-white/10 text-white placeholder:text-white/40 h-12"
              required
            />
          </motion.div>

          <div className="flex justify-end mb-2">
            <Button
              type="button"
              variant="link"
              className="text-sm text-white/60 hover:text-white p-0 h-auto font-normal"
              onClick={() =>
                alert("Forgot password functionality coming soon!")
              }
            >
              Forgot password?
            </Button>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <Button
              type="submit"
              className="w-full h-12 relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700 before:ease-in-out shine"
            >
              {isRegistering ? "Create Account" : "Login"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black/40 px-2 text-white/40">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 relative overflow-hidden border-white/10 hover:bg-white/5 text-white"
              onClick={handleGoogleSignIn}
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-white/60 hover:text-white hover:bg-white/10"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering
                ? "Already have an account? Login"
                : "Need an account? Register"}
            </Button>
          </motion.div>
        </form>
      </Card>
    </motion.div>
  );
}
