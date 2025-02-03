import { RouteObject } from "react-router-dom";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import DataEntryIndex from "@/pages/data-entry/Index";
import DataEntryHouseholds from "@/pages/data-entry/Households";
import DataEntryPopulation from "@/pages/data-entry/Population";
import DataEntryMigration from "@/pages/data-entry/Migration";
import DataEntryVitalStats from "@/pages/data-entry/VitalStatistics";

const dataEntryRoles = ["admin", "data_entry", "enumerator"];

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
    path: "/data-entry/households",
    element: (
      <RoleBasedRoute allowedRoles={dataEntryRoles}>
        <DataEntryHouseholds />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/population",
    element: (
      <RoleBasedRoute allowedRoles={dataEntryRoles}>
        <DataEntryPopulation />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/migration",
    element: (
      <RoleBasedRoute allowedRoles={dataEntryRoles}>
        <DataEntryMigration />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/vital-statistics",
    element: (
      <RoleBasedRoute allowedRoles={dataEntryRoles}>
        <DataEntryVitalStats />
      </RoleBasedRoute>
    ),
  },
];