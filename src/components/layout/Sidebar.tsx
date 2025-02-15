
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  BarChart3,
  Settings,
  Database,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: FileSpreadsheet,
    label: "Data Entry",
    path: "/data-entry",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/analytics",
  },
  {
    icon: Database,
    label: "Metadata",
    path: "/metadata",
  },
  {
    icon: Users,
    label: "User Management",
    path: "/users",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

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
            <img 
              src="/lovable-uploads/85ddb6a9-a7f3-4b74-a4b3-867d490e6043.png"
              alt="SNBS Logo"
              className="w-8 h-8 object-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-primary leading-tight">
                Hay'adda Istaatistikada Qaranka Soomaaliya
              </h1>
              <h2 className="text-xs text-primary">
                Somali National Bureau of Statistics
              </h2>
            </div>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
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
