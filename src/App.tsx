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
import DataEntryHouseholds from "./pages/data-entry/Households";
import DataEntryPopulation from "./pages/data-entry/Population";
import DataEntryMigration from "./pages/data-entry/Migration";
import DataEntryVitalStats from "./pages/data-entry/VitalStatistics";
import AnalyticsPopulation from "./pages/analytics/Population";
import AnalyticsDemographics from "./pages/analytics/Demographics";
import AnalyticsReports from "./pages/analytics/Reports";
import Metadata from "./pages/Metadata";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
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
              
              {/* Dashboard Route */}
              <Route
                path="/"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "analyst"]}>
                    <Dashboard />
                  </RoleBasedRoute>
                }
              />

              {/* Data Entry Routes */}
              <Route
                path="/data-entry/households"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "data_entry", "enumerator"]}>
                    <DataEntryHouseholds />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/data-entry/population"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "data_entry", "enumerator"]}>
                    <DataEntryPopulation />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/data-entry/migration"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "data_entry", "enumerator"]}>
                    <DataEntryMigration />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/data-entry/vital-statistics"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "data_entry", "enumerator"]}>
                    <DataEntryVitalStats />
                  </RoleBasedRoute>
                }
              />

              {/* Analytics Routes */}
              <Route
                path="/analytics/population"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "analyst"]}>
                    <AnalyticsPopulation />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/analytics/demographics"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "analyst"]}>
                    <AnalyticsDemographics />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/analytics/reports"
                element={
                  <RoleBasedRoute allowedRoles={["admin", "analyst"]}>
                    <AnalyticsReports />
                  </RoleBasedRoute>
                }
              />

              {/* Management Routes */}
              <Route
                path="/metadata"
                element={
                  <RoleBasedRoute allowedRoles={["admin"]}>
                    <Metadata />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <RoleBasedRoute allowedRoles={["admin"]}>
                    <UserManagement />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <RoleBasedRoute allowedRoles={["admin"]}>
                    <Settings />
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