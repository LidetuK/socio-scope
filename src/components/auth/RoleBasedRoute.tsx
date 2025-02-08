
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
        console.log("Fetching role for user:", userId);
        const { data: roleData, error } = await supabase
          .rpc('get_user_role', { uid: userId });

        if (!mounted) return;

        console.log("Role query result:", { roleData, error });

        if (error) {
          console.error("Error fetching role:", error);
          toast({
            title: "Error",
            description: "Failed to fetch user role. Please try again.",
            variant: "destructive",
          });
          setUserRole(null);
          return;
        }

        if (!roleData) {
          console.log("No role found");
          setUserRole(null);
          return;
        }

        const role = roleData.toLowerCase();
        console.log("Found role:", role);
        console.log("Allowed roles:", allowedRoles);
        
        const hasAllowedRole = allowedRoles
          .map(r => r.toLowerCase())
          .some(allowedRole => role.includes(allowedRole) || allowedRole.includes(role));

        if (hasAllowedRole) {
          setUserRole(role);
        } else {
          setUserRole(null);
        }
      } catch (error: any) {
        console.error("Error in fetchUserRole:", error);
        if (mounted) {
          setUserRole(null);
        }
      }
    };

    // Get initial session and set up auth state listener
    const setupAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (mounted) {
          console.log("Initial session:", !!initialSession);
          setSession(initialSession);
          
          if (initialSession?.user) {
            await fetchUserRole(initialSession.user.id);
          }
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_event, newSession) => {
            if (mounted) {
              console.log("Auth state changed:", _event);
              setSession(newSession);
              
              if (newSession?.user) {
                await fetchUserRole(newSession.user.id);
              } else {
                setUserRole(null);
              }
            }
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error in setupAuth:", error);
        if (mounted) {
          setSession(null);
          setUserRole(null);
        }
      } finally {
        if (mounted) {
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) {
    console.log("No session, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (!userRole) {
    console.log("No user role, redirecting to unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("Access granted!");
  return typeof children === "function" ? children({ userRole }) : children;
};

export default RoleBasedRoute;
