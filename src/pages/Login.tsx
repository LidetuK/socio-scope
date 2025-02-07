
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LoginForm } from "@/components/auth/LoginForm";
import WelcomePanel from "@/components/auth/WelcomePanel";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);

    try {
      console.log("Starting login process with email:", email);
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Authentication error:", {
          message: authError.message,
          status: authError.status,
          name: authError.name
        });

        // Handle network errors separately
        if (authError.message?.includes("Failed to fetch")) {
          toast({
            title: "Connection Error",
            description: "Unable to connect to the authentication service. Please check your internet connection and try again.",
            variant: "destructive",
          });
          return;
        }

        throw authError;
      }

      if (!authData.user) {
        console.error("No user data returned from auth");
        throw new Error("Authentication failed - no user data returned");
      }

      console.log("Authentication successful, fetching user role...");

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authData.user.id)
        .maybeSingle();

      if (roleError) {
        console.error("Role fetch error:", roleError);
        throw roleError;
      }

      if (!roleData) {
        console.error("No role found for user");
        toast({
          title: "Error",
          description: "User role not found. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      console.log("Role fetched successfully:", roleData.role);

      const role = roleData.role.toLowerCase();
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      });

      console.log("Navigating based on role:", role);
      
      if (role.includes('analyst')) {
        navigate("/analytics/population");
      } else {
        navigate("/dashboard");
      }

    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Failed to sign in. ";
      
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message?.includes("Email not confirmed")) {
        errorMessage = "Please verify your email address before logging in.";
      } else if (error.message?.includes("No user found")) {
        errorMessage = "No account found with this email. Please sign up first.";
      } else {
        errorMessage = "An unexpected error occurred. Please try again.";
      }

      toast({
        title: "Error",
        description: errorMessage,
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
              <img 
                src="/lovable-uploads/85ddb6a9-a7f3-4b74-a4b3-867d490e6043.png" 
                alt="SNBS Logo"
                className="w-32 h-32 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          <LoginForm onSubmit={handleLogin} loading={loading} />

          <div className="text-center text-xs text-gray-500">
            © 2025 Somali National Bureau of Statistics. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
