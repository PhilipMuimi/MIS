# GONEP Pharmaceuticals Management System

## Developer Requirements

### 1. Overview
Build a web-based Management System for Gonep Pharmaceuticals that supports company records, departmental data management, document storage, and financial tracking.  
The system must provide:

- Role-based access control  
- Departmental autonomy over their records  
- Company-wide metrics dashboards

---

### 2. Functional Requirements

#### 2.1 User & Role Management
- Authentication  
- Role-Based Access Control (RBAC)  
- Department assignment

#### 2.2 Department Management
- Create, Read, Update, Delete (CRUD) departments  
- Assign users to departments

#### 2.3 Document Management
- Upload documents  
- Versioning  
- Search & tagging  
- Access control

#### 2.4 Records Management
- Departments create/manage structured records (text, dates, attachments)  
- Export functionality

#### 2.5 Audit Logging
- Track system activity logs (user logins, actions, updates)

---

### 3. Department-Specific Requirements

#### 3.1 Finance Department
- Track all financial transactions related to the company

**Transaction types:**
- Income (money in)  
- Expenditure (money out)

**Each transaction record must include:**
- Date  
- Amount  
- Description  
- Category (e.g., Salaries, Supplies, Sales Income)  
- Associated department (if applicable)  
- Ability to upload supporting documents (invoices, receipts)

**Generate financial reports:**
- Monthly / quarterly / yearly income vs expenditure summary  
- Department-wise spending reports

**Finance Dashboard:**
- Total income vs expenditure in a given period  
- Cash flow trends  
- Alerts for budget overruns or unusual transactions

---

#### 3.2 Top Management
- Access to all departments’ data  
- View company-wide dashboards:

  **Dashboards include:**
  - Summary of all departments’ key metrics  
  - Overall financial status (aggregated finance data)  
  - Document activity (recent uploads, edits)  
  - User activity logs  

- Ability to drill down into department-specific dashboards

---

#### 3.3 HR Department
- Employee records management (personal data, contracts, leave status)  
- Recruitment pipeline tracking  
- Policy documents repository

---

#### 3.4 R&D Department
- Project logs and experiment documentation  
- Research milestones tracking

---

#### 3.5 Sales & Marketing
- Campaign plans and status reports  
- Sales reports (monthly sales, targets vs achievements)

---

### 4. Company-Wide Dashboards & Metrics

**Overall Financial Health:**
- Total income, total expenditure, net profit/loss  
- Visual cash flow graphs

**Departmental Overview:**
- Document activity stats (# docs uploaded, modified per dept)  
- Records created per department

**User Activity:**
- Logins, document edits, record updates

**Alerts & Notifications:**
- Budget limits exceeded  
- Overdue reports or plans

**Reports:**
- Exportable in PDF or Excel

---

### 5. UI Requirements (Extended)

**Finance Module UI**
- Transaction entry form  
- Financial reports view  
- Upload supporting docs

**Company Dashboard**
- Interactive charts for financial status and department activities

**Department Dashboards**
- Summary cards with KPIs  
- Latest documents and records

**Notifications Panel**
- Alerts on financial or operational anomalies

---

### 6. Non-Functional Requirements

- Ensure data privacy between departments  
- High availability with real-time or near real-time dashboard updates  
- Mobile-friendly responsive design
