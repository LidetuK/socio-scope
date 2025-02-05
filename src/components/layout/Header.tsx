import { Bell, Search, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // Attempt to sign out
      await supabase.auth.signOut();
      
      // Clear any local storage data
      localStorage.removeItem('supabase.auth.token');
      
      // Always navigate to login and show success message
      navigate("/login");
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      
      // Even if logout fails, redirect to login page for safety
      navigate("/login");
      toast({
        title: "Notice",
        description: "You have been logged out",
      });
    }
  };

  return (
    <header className="h-16 bg-white shadow-sm fixed top-0 right-0 left-0 lg:left-64 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Settings size={20} className="text-gray-600" />
          </button>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <LogOut size={20} className="text-gray-600" />
          </button>
          <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;