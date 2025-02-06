import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Components
const Logo = ({ className }: { className: string }) => (
  <img 
    src="/lovable-uploads/85ddb6a9-a7f3-4b74-a4b3-867d490e6043.png" 
    alt="SNBS Logo" 
    className={className}
  />
);

const WelcomePanel = () => (
  <div className="hidden lg:flex lg:w-1/2 bg-[#1850E5] text-white p-12 flex-col justify-between">
    <div className="flex flex-col justify-center h-full">
      <div className="flex justify-center mb-12">
        <Logo className="w-40 h-40 object-contain" />
      </div>
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">
          Somali National Bureau of Statistics
        </h1>
        <p className="text-lg opacity-90">
          Centralized platform for managing and analyzing statistical data for
          informed decision-making.
        </p>
      </div>
    </div>
  </div>
);

const LoginForm = ({ onSubmit, loading, email, setEmail, password, setPassword }: {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2"
      />
    </div>

    <Button
      type="submit"
      className="w-full bg-[#1850E5] hover:bg-[#1040C0] text-white py-2 px-4 rounded transition-colors"
      disabled={loading}
    >
      {loading ? "Signing in..." : "Sign In"}
    </Button>
  </form>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Attempting login with email:", email);
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Authentication error:", authError);
        throw authError;
      }

      if (!authData.user) {
        throw new Error("No user data returned");
      }

      console.log("Auth successful, fetching user role...");
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authData.user.id)
        .single();

      if (roleError) {
        console.error("Role fetch error:", roleError);
        throw roleError;
      }

      if (!roleData) {
        throw new Error("No role assigned to user");
      }

      console.log("Role fetched successfully:", roleData.role);
      const role = roleData.role.toLowerCase();

      toast({
        title: "Success",
        description: "Logged in successfully",
      });

      // Simplified routing logic
      if (role.includes('analyst')) {
        navigate("/analytics/population");
      } else {
        navigate("/dashboard");
      }

    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <WelcomePanel />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-8 lg:hidden">
              <Logo className="w-32 h-32 object-contain" />
            </div>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />

          <div className="text-center text-xs text-gray-500">
            © 2025 Somali National Bureau of Statistics. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;