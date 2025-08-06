# 🧾 Sayas Insurance Platform – Admin & Agent Dashboard UI

This repository showcases the **frontend user interface (UI)** for the Sayas Emergency Health Insurance onboarding platform, which serves both **Admins** and **Agents**. It is designed to streamline **lead management**, **identity verification (via Aadhaar OCR)**, and **status tracking** for prospective insurance applicants — primarily from underserved communities in India.

The system operates in conjunction with:

- **Flask-based backend API hosted on AWS EC2**
- **MongoDB Atlas for storage**
- **AWS S3 for image hosting**
- **Twilio WhatsApp API** for document collection
- **OpenCV + Tesseract** for OCR processing

---

## 🌐 Project Context

**Sayas Co-operative, Pune** is a grassroots financial institution that aims to provide affordable health insurance to the underprivileged. Due to low digital literacy, users often cannot fill online forms themselves. This platform allows Sayas team members to:

- Collect KYC (Aadhaar) via WhatsApp
- Automatically extract data using OCR
- View and edit data in the Admin/Agent portal
- Upload and track insurance leads
- Automate the onboarding flow into Zoho CRM

---

## 🧑‍💼 Admin Dashboard Screens

### 1. Admin Dashboard – Overview & Control Panel

![Admin Dashboard](images/admin%20dashboard.png)

The main hub for admin users. Key features include:

- Summary cards for real-time analytics (e.g., leads uploaded, OCR complete, pending verifications)
- Quick access to lead upload, recent activity, and system health
- Notification center for lead status changes or errors

---

### 2. Upload Leads – Admin Panel

![Upload Leads](images/upload%20leads%20admin.png)

Admins can:

- Upload new leads individually or in bulk using CSV
- Assign leads to specific agents
- Validate phone numbers and pre-fill initial details
- Initialize each lead with status = `"pending"`

---

### 3. All Leads Table – Admin View

![All Leads - Admin](images/all%20leads%20admin.png)

Full listing of all leads in the system. Admins can:

- Search/filter leads by phone, agent, status, or date
- View the assigned agent and lead status (pending, inProgress, complete)
- Open detailed record views for each customer
- Trigger reassignments or escalate records if needed

---

## 🧑‍🔧 Agent Dashboard Screens

### 4. Agent Dashboard – Assigned Leads & Tasks

![Agent Dashboard](images/agent%20dashboard.png)

Tailored to the workflow of Sayas agents. Key components:

- List of leads assigned to the logged-in agent
- Categorized by status: `"pending"` (needs Aadhaar), `"inProgress"` (partial OCR), `"complete"` (all fields extracted)
- Navigation to view individual records or perform edits

---

### 5. Customer Records (Agent)

![Customer Records - Agent](images/customer%20records%20agent.png)

Agents can:

- See all customers they’ve interacted with
- Identify which Aadhaar side is missing
- Check OCR status and manually enter missing data if needed
- View Aadhaar front/back image links from AWS S3

---

### 6. Individual OCR Record (Agent)

![OCR Data - Agent](images/indidual%20record%20ocr%20data%20agent.png)

This screen shows detailed OCR output per lead:

- Fields: Name, DOB, Gender, Aadhaar number, Address, Pincode
- Editable interface for correcting OCR errors
- Audit trail for changes made by the agent
- Real-time update to MongoDB upon save

---

### 7. Individual Records View (Agent)

![Individual Records - Agent](images/individual%20records%20agent.png)

Overview of all past interactions:

- Searchable and filterable list of records
- Edit or view status with one click
- Agents can also mark records for verification follow-up

---

## ⚙️ System Architecture (High-Level)

WhatsApp (User) → Twilio → Flask Webhook (EC2)
↓ ↓
Aadhaar Image → OCR (OpenCV + Tesseract)
↓ ↓
Image Upload → AWS S3 MongoDB Update (aadhaar_records)
↓ ↓
Agent/Admin Dashboards (React) → Fetch / Update / Track

---

## 💻 Tech Stack

| Layer           | Technology                                |
| --------------- | ----------------------------------------- |
| Frontend UI     | React.js + Tailwind CSS                   |
| Backend API     | Python Flask                              |
| OCR Engine      | Tesseract OCR + OpenCV                    |
| Cloud Hosting   | AWS EC2 (Ubuntu), systemd for app runtime |
| Database        | MongoDB Atlas (aadhaar_records, leads)    |
| File Storage    | AWS S3 (`img/adhaar/<phone>/front.jpg`)   |
| Messaging Layer | Twilio WhatsApp Business API              |
| Auth (future)   | Firebase Auth or Cognito (planned)        |

---

## 🎯 Goals of the Project

- Simplify onboarding for rural & semi-urban users without requiring digital literacy
- Eliminate manual entry of Aadhaar data through automated OCR
- Provide agents/admins with a powerful dashboard to manage and correct data
- Automate downstream flows into Sayas CRM & insurance pipeline

---

## 📬 Contact

Built and maintained by [**Viresh Nagouda**](mailto:vnagouda@gmail.com)  
Feel free to open issues or reach out for collaboration.
