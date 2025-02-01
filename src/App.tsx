import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Admin Route */}
              <Route
                path="/"
                element={
                  <RoleBasedRoute allowedRoles={["admin"]}>
                    <Index />
                  </RoleBasedRoute>
                }
              />

              {/* Demographics Routes */}
              <Route
                path="/demographics"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "demographics"]}>
                    <Index />
                  </RoleBasedRoute>
                }
              />

              {/* Health Routes */}
              <Route
                path="/health"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "health"]}>
                    <Index />
                  </RoleBasedRoute>
                }
              />

              {/* Education Routes */}
              <Route
                path="/education"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "education"]}>
                    <Index />
                  </RoleBasedRoute>
                }
              />

              {/* Labor Routes */}
              <Route
                path="/labor"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "labor"]}>
                    <Index />
                  </RoleBasedRoute>
                }
              />

              {/* Agriculture Routes */}
              <Route
                path="/agriculture"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "agriculture"]}>
                    <Index />
                  </RoleBasedRoute>
                }
              />

              {/* Economy Routes */}
              <Route
                path="/economy"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "economy"]}>
                    <Index />
                  </RoleBasedRoute>
                }
              />

              {/* Infrastructure Routes */}
              <Route
                path="/infrastructure"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "infrastructure"]}>
                    <Index />
                  </RoleBasedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;