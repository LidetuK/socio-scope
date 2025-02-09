
import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AuthRoute from "@/components/auth/RoleBasedRoute";
import AnalyticsPopulation from "@/pages/analytics/Population";
import AnalyticsDemographics from "@/pages/analytics/Demographics";
import AnalyticsReports from "@/pages/analytics/Reports";

export const analyticsRoutes: RouteObject[] = [
  {
    path: "/analytics",
    element: <Navigate to="/analytics/population" replace />,
  },
  {
    path: "/analytics/population",
    element: (
      <AuthRoute>
        <AnalyticsPopulation />
      </AuthRoute>
    ),
  },
  {
    path: "/analytics/demographics",
    element: (
      <AuthRoute>
        <AnalyticsDemographics />
      </AuthRoute>
    ),
  },
  {
    path: "/analytics/reports",
    element: (
      <AuthRoute>
        <AnalyticsReports />
      </AuthRoute>
    ),
  },
];
