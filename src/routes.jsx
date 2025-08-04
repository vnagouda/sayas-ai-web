// Optional: Central route definitions (used if route configs grow or for lazy loading)

const ROUTES = {
  HOME: '/',
  LOGOUT: '/logout',
  NOT_FOUND: '*',

  // Admin
  ADMIN: '/admin',
  UPLOAD_LEADS: '/upload-leads',
  ALL_LEADS: '/all-leads',
  ANALYTICS: '/analytics',

  // Agent
  AGENT: '/agent',
  RECORDS: '/records',
  LEAD_DETAILS: '/records/:phone',
};

export default ROUTES;
