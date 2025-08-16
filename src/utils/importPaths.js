const fixImportPaths = {
  // Admin pages
  'pages/admin/Dashboard.jsx': [
    { from: "../components", to: "../../components" },
    { from: "../firebase-config", to: "../../firebase-config" },
  ],
  'pages/admin/AllLeads.jsx': [
    { from: "../components", to: "../../components" },
  ],
  'pages/admin/LeadDetails.jsx': [
    { from: "../components", to: "../../components" },
  ],
  'pages/admin/UploadLeads.jsx': [
    { from: "../components", to: "../../components" },
  ],
  
  // Agent pages
  'pages/agent/Dashboard.jsx': [
    { from: "../components", to: "../../components" },
  ],
  'pages/agent/CustomerRecord.jsx': [
    { from: "../components", to: "../../components" },
  ],

  // Auth pages
  'pages/auth/Login.jsx': [
    { from: "../firebase-config", to: "../../firebase-config" },
  ],
  'pages/auth/Logout.jsx': [
    { from: "../routes", to: "../../routes" },
  ],
  'pages/auth/Unauthorized.jsx': [
    { from: "../routes", to: "../../routes" },
  ],
};

export default fixImportPaths;
