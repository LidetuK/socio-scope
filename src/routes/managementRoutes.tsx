
import { RouteObject } from "react-router-dom";
import AuthRoute from "@/components/auth/RoleBasedRoute";
import Metadata from "@/pages/Metadata";
import UserManagement from "@/pages/UserManagement";
import Settings from "@/pages/Settings";

export const managementRoutes: RouteObject[] = [
  {
    path: "/metadata",
    element: (
      <AuthRoute>
        <Metadata />
      </AuthRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <AuthRoute>
        <UserManagement />
      </AuthRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <AuthRoute>
        <Settings />
      </AuthRoute>
    ),
  },
];
