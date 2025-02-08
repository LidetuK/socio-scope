
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
        // First try to get the role from user_roles table directly
        const { data: roleData, error: directError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId)
          .single();

        if (!mounted) return;

        if (directError) {
          console.error("Error fetching role directly:", directError);
          // If direct fetch fails, try the RPC as fallback
          const { data: rpcData, error: rpcError } = await supabase
            .rpc('get_user_role', { uid: userId });

          if (rpcError) {
            console.error("Error fetching role via RPC:", rpcError);
            // Set default role if both methods fail
            setUserRole('data_entry');
            return;
          }

          if (rpcData) {
            const role = rpcData.toLowerCase();
            console.log("Fetched role via RPC:", role);
            setUserRole(role);
            return;
          }
        }

        if (roleData) {
          const role = roleData.role.toLowerCase();
          console.log("Fetched role directly:", role);
          setUserRole(role);
          return;
        }

        // Default fallback
        console.log("No role found, using default");
        setUserRole('data_entry');
      } catch (error: any) {
        console.error("Error in fetchUserRole:", error);
        if (mounted) {
          setUserRole('data_entry'); // Fallback to default role
          toast({
            title: "Warning",
            description: "Using default role due to error fetching user role.",
          });
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

  // Check if user's role is in allowed roles
  const hasAllowedRole = userRole && allowedRoles
    .map(r => r.toLowerCase())
    .includes(userRole.toLowerCase());

  if (!hasAllowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return typeof children === "function" ? children({ userRole: userRole || 'data_entry' }) : children;
};

export default RoleBasedRoute;
