
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { toast } from "sonner";

interface RoleBasedRouteProps {
  children: ReactNode;
}

const RoleBasedRoute = ({ children }: RoleBasedRouteProps) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const setupAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error getting session:", sessionError);
          toast.error("Authentication error. Please try logging in again.");
          navigate("/login");
          return;
        }

        if (!mounted) return;
        setSession(initialSession);

        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_event, newSession) => {
            if (!mounted) return;
            
            if (!newSession) {
              toast.error("Your session has expired. Please log in again.");
              navigate("/login");
              return;
            }

            setSession(newSession);
          }
        );

        if (mounted) {
          setLoading(false);
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error in setupAuth:", error);
        if (mounted) {
          setSession(null);
          setLoading(false);
          toast.error("Authentication error occurred. Please try logging in again.");
        }
      }
    };

    setupAuth();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Check if user is authenticated
  if (!session) {
    toast.error("Please log in to access this page");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleBasedRoute;
