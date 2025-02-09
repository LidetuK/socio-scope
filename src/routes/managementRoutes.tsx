
import { RouteObject } from "react-router-dom";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import Metadata from "@/pages/Metadata";
import UserManagement from "@/pages/UserManagement";
import Settings from "@/pages/Settings";

export const managementRoutes: RouteObject[] = [
  {
    path: "/metadata",
    element: (
      <RoleBasedRoute>
        <Metadata />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <RoleBasedRoute>
        <UserManagement />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <RoleBasedRoute>
        <Settings />
      </RoleBasedRoute>
    ),
  },
];
