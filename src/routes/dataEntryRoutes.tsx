
import { RouteObject } from "react-router-dom";
import AuthRoute from "@/components/auth/RoleBasedRoute";

// Pages
import DataEntryIndex from "@/pages/data-entry/Index";
import DataEntryDemographics from "@/pages/data-entry/Demographics";
import PopulationEntry from "@/pages/data-entry/demographics/Population";
import HouseholdEntry from "@/pages/data-entry/demographics/Households";
import VitalStatsEntry from "@/pages/data-entry/demographics/VitalStatistics";
import MigrationEntry from "@/pages/data-entry/demographics/Migration";
import HealthEntry from "@/pages/data-entry/Health";
import EducationEntry from "@/pages/data-entry/Education";
import LaborEntry from "@/pages/data-entry/Labor";
import AgricultureEntry from "@/pages/data-entry/Agriculture";
import EconomyEntry from "@/pages/data-entry/Economy";
import InfrastructureEntry from "@/pages/data-entry/Infrastructure";

export const dataEntryRoutes: RouteObject[] = [
  {
    path: "/data-entry",
    element: (
      <AuthRoute>
        <DataEntryIndex />
      </AuthRoute>
    ),
  },
  {
    path: "/data-entry/demographics",
    element: (
      <AuthRoute>
        <DataEntryDemographics />
      </AuthRoute>
    ),
  },
  {
    path: "/data-entry/demographics/population",
    element: (
      <AuthRoute>
        <PopulationEntry />
      </AuthRoute>
    ),
  },
  {
    path: "/data-entry/demographics/households",
    element: (
      <AuthRoute>
        <HouseholdEntry />
      </AuthRoute>
    ),
  },
  {
    path: "/data-entry/demographics/vital-statistics",
    element: (
      <AuthRoute>
        <VitalStatsEntry />
      </AuthRoute>
    ),
  },
  {
    path: "/data-entry/demographics/migration",
    element: (
      <AuthRoute>
        <MigrationEntry />
      </AuthRoute>
    ),
  },
  {
    path: "/data-entry/health",
    element: (
      <AuthRoute>
        <HealthEntry />
      </AuthRoute>
    ),
  },
  {
    path: "/data-entry/education",
    element: (
      <AuthRoute>
        <EducationEntry />
      </AuthRoute>
    ),
  },
  {
    path: "/data-entry/labor",
    element: (
      <AuthRoute>
        <LaborEntry />
      </AuthRoute>
    ),
  },
  {
    path: "/data-entry/agriculture",
    element: (
      <AuthRoute>
        <AgricultureEntry />
      </AuthRoute>
    ),
  },
  {
    path: "/data-entry/economy",
    element: (
      <AuthRoute>
        <EconomyEntry />
      </AuthRoute>
    ),
  },
  {
    path: "/data-entry/infrastructure",
    element: (
      <AuthRoute>
        <InfrastructureEntry />
      </AuthRoute>
    ),
  },
];
