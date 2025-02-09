
import { RouteObject } from "react-router-dom";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";

// Pages
import DataEntryIndex from "@/pages/data-entry/Index";
import DataEntryDemographics from "@/pages/data-entry/Demographics";
import PopulationEntry from "@/pages/data-entry/demographics/Population";
import HouseholdEntry from "@/pages/data-entry/demographics/Households";
import VitalStatsEntry from "@/pages/data-entry/demographics/VitalStatistics";
import MigrationEntry from "@/pages/data-entry/demographics/Migration";

export const dataEntryRoutes: RouteObject[] = [
  {
    path: "/data-entry",
    element: (
      <RoleBasedRoute>
        <DataEntryIndex />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics",
    element: (
      <RoleBasedRoute>
        <DataEntryDemographics />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/population",
    element: (
      <RoleBasedRoute>
        <PopulationEntry />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/households",
    element: (
      <RoleBasedRoute>
        <HouseholdEntry />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/vital-statistics",
    element: (
      <RoleBasedRoute>
        <VitalStatsEntry />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/migration",
    element: (
      <RoleBasedRoute>
        <MigrationEntry />
      </RoleBasedRoute>
    ),
  },
];
