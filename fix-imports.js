const fs = require('fs');
const path = require('path');

const adminPages = ['AllLeads.jsx', 'Dashboard.jsx', 'LeadDetails.jsx', 'UploadLeads.jsx'];
const agentPages = ['CustomerRecord.jsx', 'Dashboard.jsx'];

// Update admin pages
adminPages.forEach(file => {
    const filePath = path.join(__dirname, 'src', 'pages', 'admin', file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace component imports
    content = content.replace(/from ['"]\.\.\/components\//g, "from '../../components/");
    
    fs.writeFileSync(filePath, content);
});

// Update agent pages
agentPages.forEach(file => {
    const filePath = path.join(__dirname, 'src', 'pages', 'agent', file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace component imports
    content = content.replace(/from ['"]\.\.\/components\//g, "from '../../components/");
    
    fs.writeFileSync(filePath, content);
});
