import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleBasedRoute = ({ children, allowedRoles }: RoleBasedRouteProps) => {
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", { 
        hasSession: !!session,
        userId: session?.user?.id 
      });
      setSession(session);
      if (session?.user) {
        getUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", { 
        event: _event, 
        hasSession: !!session,
        userId: session?.user?.id 
      });
      setSession(session);
      if (session?.user) {
        getUserRole(session.user.id);
      } else {
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUserRole = async (userId: string) => {
    try {
      console.log("Fetching role for user:", userId);
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      console.log("Role query result:", { data, error });

      if (error) {
        console.error("Error fetching role:", error);
        toast({
          title: "Error Fetching Role",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log("No role found for user");
        toast({
          title: "No Role Assigned",
          description: "You don't have any role assigned. Please contact an administrator.",
          variant: "destructive",
        });
        setUserRole(null);
      } else {
        // Map the roles to an array of role strings
        const userRoles = data.map(role => role.role);
        console.log("Roles found:", userRoles);
        
        // Check if user has any of the allowed roles
        const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role));
        
        if (hasAllowedRole) {
          setUserRole(userRoles[0]); // Set the first role for backwards compatibility
          toast({
            title: "Role Verified",
            description: `Logged in with roles: ${userRoles.join(", ")}`,
          });
        } else {
          setUserRole(null);
          toast({
            title: "Unauthorized",
            description: "You don't have the required role to access this page.",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      console.error("Error in getUserRole:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch user role",
        variant: "destructive",
      });
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    console.log("Still loading...");
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

  console.log("Access check:", {
    userRole,
    allowedRoles,
    hasAccess: userRole && allowedRoles.includes(userRole)
  });
  
  if (!userRole) {
    console.log("No user role, redirecting to unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("Access granted!");
  return <>{children}</>;
};

export default RoleBasedRoute;