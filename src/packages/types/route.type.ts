import React from "react";

export interface RouteItem {
  key: string;
  path: string;
  element: React.ReactNode;
  permissionCode?: string;
  isProtected?: boolean;
}
