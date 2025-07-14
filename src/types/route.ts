export interface RouteConfig {
  path: string;
  requireAuth: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
  exact?: boolean;
}

export interface RouteMatchResult {
  shouldRedirect: boolean;
  redirectUrl?: string;
  isAllowed: boolean;
  reason?: string;
}
