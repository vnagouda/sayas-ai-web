import { lazy } from 'react';

const ROUTES = {
  HOME: '/sayas-ai-web',
  LOGOUT: '/logout',
  NOT_FOUND: '*',

  // Admin routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  UPLOAD_LEADS: '/admin/upload-leads',
  ALL_LEADS: '/admin/all-leads',
  ANALYTICS: '/admin/analytics',
  AGENTS: '/admin/agents',
  LEAD_SOURCES: '/admin/sources',
  RECORDS: '/admin/records',
  SETTINGS: '/admin/settings',

  // Agent routes
  AGENT: '/agent',
  AGENT_RECORDS: '/agent/records',
  LEAD_DETAILS: '/agent/records/:phone',
};

export default ROUTES;
