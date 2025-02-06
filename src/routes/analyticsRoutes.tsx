import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import AnalyticsPopulation from "@/pages/analytics/Population";
import AnalyticsDemographics from "@/pages/analytics/Demographics";
import AnalyticsReports from "@/pages/analytics/Reports";

const analyticsRoles = ["admin", "analyst"];

export const analyticsRoutes: RouteObject[] = [
  {
    path: "/analytics",
    element: <Navigate to="/analytics/population" replace />,
  },
  {
    path: "/analytics/population",
    element: (
      <RoleBasedRoute allowedRoles={analyticsRoles}>
        <AnalyticsPopulation />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/analytics/demographics",
    element: (
      <RoleBasedRoute allowedRoles={analyticsRoles}>
        <AnalyticsDemographics />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/analytics/reports",
    element: (
      <RoleBasedRoute allowedRoles={analyticsRoles}>
        <AnalyticsReports />
      </RoleBasedRoute>
    ),
  },
];