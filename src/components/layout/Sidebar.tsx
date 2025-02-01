import { useState } from "react";
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

const menuItems = [
  { icon: BarChart3, label: "Dashboard", path: "/", role: "admin" },
  { icon: Users, label: "Demographics", path: "/demographics", role: "demographics" },
  { icon: Heart, label: "Health", path: "/health", role: "health" },
  { icon: GraduationCap, label: "Education", path: "/education", role: "education" },
  { icon: Briefcase, label: "Labor & Employment", path: "/labor", role: "labor" },
  { icon: Sprout, label: "Agriculture", path: "/agriculture", role: "agriculture" },
  { icon: LineChart, label: "Trade & Economy", path: "/economy", role: "economy" },
  { icon: Building2, label: "Infrastructure", path: "/infrastructure", role: "infrastructure" },
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
        className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:w-64 w-[280px] z-40`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary mb-8">Analytics Hub</h1>
          <nav className="space-y-2">
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