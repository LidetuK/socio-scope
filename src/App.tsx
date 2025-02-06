import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";

// Routes
import { dataEntryRoutes } from "./routes/dataEntryRoutes";
import { analyticsRoutes } from "./routes/analyticsRoutes";
import { managementRoutes } from "./routes/managementRoutes";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Redirect root based on user role */}
            <Route 
              path="/" 
              element={
                <RoleBasedRoute allowedRoles={["admin", "data_entry", "analyst", "enumerator"]}>
                  {({ userRole }) => {
                    console.log("Current user role:", userRole);
                    if (userRole?.toLowerCase().includes('analyst')) {
                      return <Navigate to="/analytics/population" replace />;
                    }
                    return <Navigate to="/dashboard" replace />;
                  }}
                </RoleBasedRoute>
              } 
            />

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <RoleBasedRoute allowedRoles={["admin", "data_entry", "analyst", "enumerator"]}>
                  <Dashboard />
                </RoleBasedRoute>
              }
            />

            {/* Feature Routes */}
            {dataEntryRoutes.map((route) => (
              <Route 
                key={route.path} 
                path={route.path}
                element={route.element}
              />
            ))}
            {analyticsRoutes.map((route) => (
              <Route 
                key={route.path} 
                path={route.path}
                element={
                  <RoleBasedRoute allowedRoles={["admin", "analyst"]}>
                    {route.element}
                  </RoleBasedRoute>
                }
              />
            ))}
            {managementRoutes.map((route) => (
              <Route 
                key={route.path} 
                path={route.path}
                element={
                  <RoleBasedRoute allowedRoles={["admin"]}>
                    {route.element}
                  </RoleBasedRoute>
                }
              />
            ))}

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;