
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface RoleBasedRouteProps {
  children: ReactNode | ((props: { userRole: string }) => ReactNode);
  allowedRoles: string[];
}

const RoleBasedRoute = ({ children, allowedRoles }: RoleBasedRouteProps) => {
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const fetchUserRole = async (userId: string) => {
      try {
        const { data: roleData, error } = await supabase
          .rpc('get_user_role', { uid: userId });

        if (!mounted) return;

        if (error) {
          console.error("Error fetching role:", error);
          // Only show toast for non-network errors
          if (!error.message.includes("Failed to fetch")) {
            toast({
              title: "Error",
              description: "Failed to fetch user role. Please try again.",
              variant: "destructive",
            });
          }
          return;
        }

        if (!roleData) {
          console.log("No role found, using default");
          setUserRole('data_entry');
          return;
        }

        const role = roleData.toLowerCase();
        console.log("Fetched role:", role);
        
        const hasAllowedRole = allowedRoles
          .map(r => r.toLowerCase())
          .some(allowedRole => role.includes(allowedRole));

        setUserRole(hasAllowedRole ? role : null);
      } catch (error: any) {
        console.error("Error in fetchUserRole:", error);
        if (mounted) {
          setUserRole(null);
        }
      }
    };

    const setupAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        setSession(initialSession);
        
        if (initialSession?.user) {
          await fetchUserRole(initialSession.user.id);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_event, newSession) => {
            if (!mounted) return;
            
            setSession(newSession);
            
            if (newSession?.user) {
              await fetchUserRole(newSession.user.id);
            } else {
              setUserRole(null);
            }
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
          setUserRole(null);
          setLoading(false);
        }
      }
    };

    setupAuth();

    return () => {
      mounted = false;
    };
  }, [allowedRoles, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!userRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return typeof children === "function" ? children({ userRole }) : children;
};

export default RoleBasedRoute;
