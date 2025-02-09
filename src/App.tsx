
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

// Import route configurations
import { analyticsRoutes } from "./routes/analyticsRoutes";
import { dataEntryRoutes } from "./routes/dataEntryRoutes";
import { managementRoutes } from "./routes/managementRoutes";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  const renderRoutes = (routes: any[]) => {
    return routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={route.element}
      />
    ));
  };

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
            
            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                <RoleBasedRoute>
                  <Navigate to="/dashboard" replace />
                </RoleBasedRoute>
              } 
            />

            <Route
              path="/dashboard"
              element={
                <RoleBasedRoute>
                  <Dashboard />
                </RoleBasedRoute>
              }
            />

            {/* Include all route configurations */}
            {renderRoutes(analyticsRoutes)}
            {renderRoutes(dataEntryRoutes)}
            {renderRoutes(managementRoutes)}

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
