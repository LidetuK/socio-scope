
import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AuthRoute from "@/components/auth/RoleBasedRoute";
import AnalyticsIndex from "@/pages/analytics/Index";
import AnalyticsPopulation from "@/pages/analytics/Population";
import AnalyticsDemographics from "@/pages/analytics/Demographics";
import AnalyticsHealth from "@/pages/analytics/Health";
import AnalyticsEducation from "@/pages/analytics/Education";
import AnalyticsLabor from "@/pages/analytics/Labor";
import AnalyticsAgriculture from "@/pages/analytics/Agriculture";
import AnalyticsEconomy from "@/pages/analytics/Economy";
import AnalyticsInfrastructure from "@/pages/analytics/Infrastructure";
import AnalyticsReports from "@/pages/analytics/Reports";

export const analyticsRoutes: RouteObject[] = [
  {
    path: "/analytics",
    element: (
      <AuthRoute>
        <AnalyticsIndex />
      </AuthRoute>
    ),
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
    path: "/analytics/health",
    element: (
      <AuthRoute>
        <AnalyticsHealth />
      </AuthRoute>
    ),
  },
  {
    path: "/analytics/education",
    element: (
      <AuthRoute>
        <AnalyticsEducation />
      </AuthRoute>
    ),
  },
  {
    path: "/analytics/labor",
    element: (
      <AuthRoute>
        <AnalyticsLabor />
      </AuthRoute>
    ),
  },
  {
    path: "/analytics/agriculture",
    element: (
      <AuthRoute>
        <AnalyticsAgriculture />
      </AuthRoute>
    ),
  },
  {
    path: "/analytics/economy",
    element: (
      <AuthRoute>
        <AnalyticsEconomy />
      </AuthRoute>
    ),
  },
  {
    path: "/analytics/infrastructure",
    element: (
      <AuthRoute>
        <AnalyticsInfrastructure />
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
