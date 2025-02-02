import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  Heart,
  GraduationCap,
  Briefcase,
  Sprout,
  LineChart,
  Building2,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const menuItems = [
  { icon: BarChart3, label: "Dashboard", path: "/", roles: ["admin"] },
  { icon: Users, label: "Demographics", path: "/demographics", roles: ["admin", "demographics"] },
  { icon: Heart, label: "Health", path: "/health", roles: ["admin", "health"] },
  { icon: GraduationCap, label: "Education", path: "/education", roles: ["admin", "education"] },
  { icon: Briefcase, label: "Labor & Employment", path: "/labor", roles: ["admin", "labor"] },
  { icon: Sprout, label: "Agriculture", path: "/agriculture", roles: ["admin", "agriculture"] },
  { icon: LineChart, label: "Trade & Economy", path: "/economy", roles: ["admin", "economy"] },
  { icon: Building2, label: "Infrastructure", path: "/infrastructure", roles: ["admin", "infrastructure"] },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const getUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (data && !error) {
          setUserRole(data.role);
        }
      }
    };

    getUserRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.id) {
        getUserRole();
      } else {
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    userRole && item.roles.includes(userRole)
  );

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:w-64 w-[280px] z-40`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary mb-8">Analytics Hub</h1>
          <nav className="space-y-2">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors duration-200",
                  location.pathname === item.path && "bg-gray-50 text-primary"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;