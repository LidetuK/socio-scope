import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;