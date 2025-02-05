import { RouteObject } from "react-router-dom";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";

// Pages
import DataEntryIndex from "@/pages/data-entry/Index";
import DataEntryDemographics from "@/pages/data-entry/Demographics";
import PopulationEntry from "@/pages/data-entry/demographics/Population";
import HouseholdEntry from "@/pages/data-entry/demographics/Households";
import VitalStatsEntry from "@/pages/data-entry/demographics/VitalStatistics";
import MigrationEntry from "@/pages/data-entry/demographics/Migration";

const dataEntryRoles = ["admin", "data_entry", "enumerator"];
const adminDataEntryRoles = ["admin", "data_entry"];

export const dataEntryRoutes: RouteObject[] = [
  {
    path: "/data-entry",
    element: (
      <RoleBasedRoute allowedRoles={dataEntryRoles}>
        <DataEntryIndex />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics",
    element: (
      <RoleBasedRoute allowedRoles={dataEntryRoles}>
        <DataEntryDemographics />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/population",
    element: (
      <RoleBasedRoute allowedRoles={dataEntryRoles}>
        <PopulationEntry />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/households",
    element: (
      <RoleBasedRoute allowedRoles={dataEntryRoles}>
        <HouseholdEntry />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/vital-statistics",
    element: (
      <RoleBasedRoute allowedRoles={adminDataEntryRoles}>
        <VitalStatsEntry />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/migration",
    element: (
      <RoleBasedRoute allowedRoles={dataEntryRoles}>
        <MigrationEntry />
      </RoleBasedRoute>
    ),
  },
];