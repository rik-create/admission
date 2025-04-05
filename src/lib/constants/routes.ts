// src/lib/constants/routes.ts
const ROUTES = {
    // Public routes
    HOME: '/',
    LOGIN: '/auth/login',
  
    // Admin routes
    ADMIN: {
      DASHBOARD: '/admin/dashboard',
      SETTINGS: '/admin/settings'
    },
  
    // Guard routes
    GUARD: {
      SCANNER: '/guard/scanner',
      VIOLATIONS: '/guard/violations'
    },
  
    // Student routes
    STUDENT: {
      DASHBOARD: '/student/student_dashboard',
      REQUEST_SLIP: '/student/request-slip'
    }
  } as const;
  
  // Flatten the routes object into path strings
  type FlattenRoutes<T> = T extends string ? T : {
    [K in keyof T]: FlattenRoutes<T[K]>;
  }[keyof T];
  
  // Type for all possible route paths (only strings)
  export type RoutePath = FlattenRoutes<typeof ROUTES>;
  
  // Helper function to get route with type safety
  export function getRoute(path: RoutePath): string {
    return path;
  }
  
  // Export the routes object
  export { ROUTES };
  
  // Type for route identifiers
  export type RouteIdentifier = 
    | 'HOME' 
    | 'LOGIN'
    | `ADMIN.${keyof typeof ROUTES.ADMIN}`
    | `GUARD.${keyof typeof ROUTES.GUARD}`
    | `STUDENT.${keyof typeof ROUTES.STUDENT}`;
  
  // Alternative getter function using dot notation
  export function getRouteById(id: RouteIdentifier): RoutePath {
    const [category, route] = id.split('.') as [keyof typeof ROUTES, string?];
    
    if (!route) {
      return ROUTES[category] as RoutePath;
    }
    return ROUTES[category][route as keyof typeof ROUTES[typeof category]];
  }