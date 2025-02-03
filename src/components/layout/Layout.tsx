import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className={cn("p-6 max-w-7xl mx-auto", className)}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;