import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Fetch user role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authData.user?.id)
        .single();

      if (roleError) throw roleError;

      // Redirect based on role
      const role = roleData?.role;
      if (role === "admin") {
        navigate("/");
      } else {
        navigate(`/${role}`);
      }

      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Blue background with logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1850E5] text-white p-12 flex-col justify-between">
        <div className="flex flex-col justify-center h-full">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/85ddb6a9-a7f3-4b74-a4b3-867d490e6043.png" 
              alt="SNBS Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Somali National Bureau of Statistics
          </h1>
          <p className="text-xl opacity-90">
            Centralized platform for managing and analyzing statistical data for
            informed decision-making.
          </p>
        </div>
        <div className="text-sm opacity-70">
          © 2025 Somali National Bureau of Statistics. All rights reserved.
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6 lg:hidden">
              <img 
                src="/lovable-uploads/85ddb6a9-a7f3-4b74-a4b3-867d490e6043.png" 
                alt="SNBS Logo" 
                className="w-24 h-24 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-[#1850E5] focus:ring-[#1850E5]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-[#1850E5] text-sm hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1850E5] hover:bg-[#1040C0] text-white py-2 px-4 rounded transition-colors"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center text-xs text-gray-500">
            © 2025 Somali National Bureau of Statistics. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;