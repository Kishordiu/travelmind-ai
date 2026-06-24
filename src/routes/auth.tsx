import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import heroImg from "@/assets/hero.jpg";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — TravelMind AI" },
      { name: "description", content: "Sign in or create an account to plan smarter trips with TravelMind AI." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex flex-col p-6 sm:p-10">
        <Brand />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 grid place-items-center"
        >
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-semibold">Welcome back, traveler</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Sign in to your travel intelligence dashboard.
              </p>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <AuthForm
                  cta="Sign in"
                  onSubmit={() => {
                    toast.success("Welcome back!");
                    navigate({ to: "/dashboard" });
                  }}
                />
              </TabsContent>
              <TabsContent value="signup">
                <AuthForm
                  cta="Create account"
                  showName
                  onSubmit={() => {
                    toast.success("Account created");
                    navigate({ to: "/dashboard" });
                  }}
                />
              </TabsContent>
            </Tabs>

            <p className="text-xs text-center text-muted-foreground mt-6">
              By continuing you agree to our Terms and Privacy Policy.
            </p>
            <div className="text-center mt-4">
              <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Back home</Link>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative hidden lg:block overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-gradient opacity-70" />
        <div className="relative h-full flex flex-col justify-end p-12 text-white">
          <h2 className="font-display text-4xl font-semibold max-w-md leading-tight">
            "Found a fishing village in Kerala I'd never have. This app pays for itself."
          </h2>
          <p className="mt-4 opacity-80">— Marco D., Photographer</p>
        </div>
      </div>
    </div>
  );
}

function AuthForm({
  cta,
  showName,
  onSubmit,
}: {
  cta: string;
  showName?: boolean;
  onSubmit: () => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <Button type="button" variant="outline" className="w-full h-11">
        <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2"><path fill="#EA4335" d="M12 11v3.2h4.5c-.2 1.2-1.5 3.5-4.5 3.5-2.7 0-4.9-2.2-4.9-5s2.2-5 4.9-5c1.5 0 2.6.6 3.2 1.2l2.2-2.1C16.1 5.3 14.2 4.5 12 4.5 7.9 4.5 4.5 7.9 4.5 12s3.4 7.5 7.5 7.5c4.3 0 7.2-3 7.2-7.3 0-.5 0-.8-.1-1.2H12z"/></svg>
        Continue with Google
      </Button>
      <div className="relative text-center text-xs text-muted-foreground my-2">
        <span className="bg-background px-2 relative z-10">or with email</span>
        <span className="absolute inset-x-0 top-1/2 border-t border-border" />
      </div>

      {showName && (
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Aanya Rao" required />
        </div>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="email" type="email" placeholder="you@email.com" required className="pl-9" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={show ? "text" : "password"}
            placeholder="••••••••"
            required
            className="pl-9 pr-10"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle password"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full h-11 bg-hero-gradient text-white border-0 shadow-glow">
        {cta} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
