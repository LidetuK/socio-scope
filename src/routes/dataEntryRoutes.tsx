import { RouteObject } from "react-router-dom";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";

// Pages
import DataEntryIndex from "@/pages/data-entry/Index";
import DataEntryDemographics from "@/pages/data-entry/Demographics";
import PopulationEntry from "@/pages/data-entry/demographics/Population";
import HouseholdEntry from "@/pages/data-entry/demographics/Households";
import VitalStatsEntry from "@/pages/data-entry/demographics/VitalStatistics";
import MigrationEntry from "@/pages/data-entry/demographics/Migration";

// Population roles
const populationRoles = [
  "admin_population",
  "data_entry_population",
  "field_enumerator_population"
];

// Household roles
const householdRoles = [
  "admin_household",
  "data_entry_household",
  "field_enumerator_household"
];

// Vital statistics roles
const vitalStatsRoles = [
  "admin_population",
  "vital_stats_registrar"
];

export const dataEntryRoutes: RouteObject[] = [
  {
    path: "/data-entry",
    element: (
      <RoleBasedRoute allowedRoles={[...populationRoles, ...householdRoles, "vital_stats_registrar"]}>
        <DataEntryIndex />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics",
    element: (
      <RoleBasedRoute allowedRoles={[...populationRoles, ...householdRoles, "vital_stats_registrar"]}>
        <DataEntryDemographics />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/population",
    element: (
      <RoleBasedRoute allowedRoles={populationRoles}>
        <PopulationEntry />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/households",
    element: (
      <RoleBasedRoute allowedRoles={householdRoles}>
        <HouseholdEntry />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/vital-statistics",
    element: (
      <RoleBasedRoute allowedRoles={vitalStatsRoles}>
        <VitalStatsEntry />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/data-entry/demographics/migration",
    element: (
      <RoleBasedRoute allowedRoles={populationRoles}>
        <MigrationEntry />
      </RoleBasedRoute>
    ),
  },
];