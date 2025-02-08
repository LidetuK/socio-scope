
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
    console.log("Starting login process...");

    try {
      if (!supabase.auth) {
        throw new Error("Supabase client not properly initialized");
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Auth response:", { authData, authError });

      if (authError) {
        console.error("Authentication error details:", {
          message: authError.message,
          status: authError.status,
          name: authError.name
        });

        if (authError.message.includes("Failed to fetch")) {
          toast({
            title: "Connection Error",
            description: "Unable to connect to authentication service. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (authError.message.includes("Invalid login credentials")) {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please check your credentials and try again.",
            variant: "destructive",
          });
          return;
        }

        if (authError.message.includes("Email not confirmed")) {
          toast({
            title: "Email Not Verified",
            description: "Please verify your email address before logging in.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Login Error",
          description: authError.message,
          variant: "destructive",
        });
        return;
      }

      if (!authData.user) {
        console.error("No user data returned");
        toast({
          title: "Login Error",
          description: "No user data returned. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log("Login successful, fetching user role...");

      // Get user role using the new RPC function
      const { data: roleData, error: roleError } = await supabase
        .rpc('get_user_role', { uid: authData.user.id });

      if (roleError) {
        console.error("Role fetch error:", roleError);
        // If no role found, assign default role
        const { error: insertError } = await supabase
          .from("user_roles")
          .insert([
            { user_id: authData.user.id, role: "data_entry" }
          ]);

        if (insertError) {
          console.error("Error inserting default role:", insertError);
          toast({
            title: "Error",
            description: "Failed to assign default role. Please contact support.",
            variant: "destructive",
          });
          return;
        }

        navigate("/dashboard");
        toast({
          title: "Success",
          description: "Logged in successfully as data entry user",
        });
        return;
      }

      console.log("Role fetched successfully:", roleData);
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      });

      // Navigate based on role
      if (roleData?.toLowerCase().includes('analyst')) {
        navigate("/analytics/population");
      } else {
        navigate("/dashboard");
      }

    } catch (error: any) {
      console.error("Unexpected error during login:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
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
