import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  BarChart3,
  Settings,
  Database,
  ClipboardList,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
    roles: ["admin", "analyst"],
  },
  {
    icon: FileSpreadsheet,
    label: "Data Entry",
    path: "/data-entry",
    roles: ["admin", "data_entry", "enumerator"],
    subItems: [
      { 
        label: "Households", 
        path: "/data-entry/demographics/households",
        roles: ["admin", "data_entry", "enumerator"]
      },
      { 
        label: "Population", 
        path: "/data-entry/demographics/population",
        roles: ["admin", "data_entry", "enumerator"]
      },
      { 
        label: "Migration", 
        path: "/data-entry/demographics/migration",
        roles: ["admin", "data_entry", "enumerator"]
      },
      { 
        label: "Vital Statistics", 
        path: "/data-entry/demographics/vital-statistics",
        roles: ["admin", "data_entry"]
      },
    ],
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/analytics",
    roles: ["admin", "analyst"],
    subItems: [
      { label: "Population Trends", path: "/analytics/population" },
      { label: "Demographics", path: "/analytics/demographics" },
      { label: "Reports", path: "/analytics/reports" },
    ],
  },
  {
    icon: Database,
    label: "Metadata",
    path: "/metadata",
    roles: ["admin"],
  },
  {
    icon: Users,
    label: "User Management",
    path: "/users",
    roles: ["admin"],
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
    roles: ["admin"],
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
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
        className={cn(
          "fixed top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:w-64 w-[280px] z-40"
        )}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <UserCircle className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold text-primary">SNBS Analytics</h1>
          </div>
          
          <nav className="space-y-1">
            {filteredMenuItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors duration-200",
                    location.pathname === item.path && "bg-gray-50 text-primary",
                    item.subItems && expandedItem === item.path && "bg-gray-50"
                  )}
                  onClick={() => {
                    if (item.subItems) {
                      setExpandedItem(expandedItem === item.path ? null : item.path);
                    }
                  }}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
                
                {item.subItems && expandedItem === item.path && (
                  <div className="ml-12 mt-1 space-y-1">
                    {item.subItems
                      .filter(subItem => !subItem.roles || (userRole && subItem.roles.includes(userRole)))
                      .map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={cn(
                            "block px-4 py-2 text-sm text-gray-600 hover:text-primary rounded-md transition-colors",
                            location.pathname === subItem.path && "text-primary font-medium"
                          )}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;