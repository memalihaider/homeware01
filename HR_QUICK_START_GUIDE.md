# HR System - Quick Start Guide

## Overview
Complete HR management system with employee profiles, visa tracking, document management, and salary administration.

---

## ⚙️ Admin Functions

### Access HR Admin Panel
**URL:** `/admin/hr`

### Add New Employee
1. Click **"Add Employee"** button (top right)
2. Fill in all sections:

#### Personal Information
- Full Name (required)
- Date of Birth
- Email (required)
- Phone (required)
- Nationality Country
- Passport Number
- Emirates ID Number
- Bank Name
- Bank Account Number
- **Profile Picture** (click camera icon to upload)

#### Employment Information
- Role (required) - e.g., Cleaner, Supervisor
- Position
- Department (Operations, HR, Management, Finance, Marketing)
- Location
- Join Date
- Status (Active, On Leave, Inactive)

#### Salary & Compensation
- **Basic Salary** (required) - AED
- Housing Allowance - AED
- Food Allowance - AED
- Transportation Allowance - AED
- Telephone Allowance - AED
- Other Allowances - AED
- **Total automatically calculates**
- Bonus Amount (optional) - AED
- Bonus Type (Performance, Project, Annual, Attendance, Special)

#### Visa Information
- Visa Number
- Visa Sponsor Name
- Issue Date
- **Expiry Date** ⚠️ **Important** - System alerts when expiring within 30 days
- Auto-generated: Days until expiry

#### Documents (Add Multiple)
1. Enter **Document File Name** (e.g., "Passport_JohnDoe")
2. Select **Document Type**:
   - Passport
   - Visa
   - Emirates ID
   - Labor Card
   - Insurance
   - Certification
   - License
   - Contract
   - Other
3. (Optional) Set Expiry Date
4. Click **"Add Document"** button
5. Repeat for multiple documents
6. All documents listed with status

#### Emergency Contacts (Add Multiple)
1. Enter **Contact Name** (required)
2. Enter **Relationship** (required) - e.g., Spouse, Parent, Sibling
3. Enter **Phone Number** (required)
4. (Optional) Enter Email
5. Click **"Add Emergency Contact"** button
6. Add more contacts as needed

### Visa Expiry Alerts
**The system automatically displays alerts at top:**
- 🟡 **Yellow Alert:** Visa expires in 30 days
- 🔴 **Red Alert:** Visa already expired
- Shows: Employee Name | Days Remaining | Expiry Date

### Edit Employee
1. Click **Edit button** (pencil icon) next to employee name
2. Make changes
3. Click **"Update Employee"**

### Delete Employee
1. Click **Delete button** (trash icon)
2. Confirm removal in dialog

### Search & Filter
- **Search box:** Type name or email
- **Department Filter:** Select Operations, HR, Management, Finance, or Marketing
- Shows matching employees in real-time

---

## 👥 Employee Dashboard

### Access Employee Portal
**URL:** `/employee/dashboard`
- Requires login with employee credentials
- Session-based access control

### Navigation Tabs (Sidebar)
1. **Overview** - Quick dashboard summary
2. **My Tasks** - Work assignments
3. **Attendance** - Time tracking records
4. **Payroll** - Salary and payment history
5. **Bonuses** - Earned and pending bonuses
6. **Visa & Status** - ✨ NEW
7. **Documents** - ✨ NEW

### Visa & Status Tab
**View Your Visa Information:**
- 🟢 **Active Visa:** Shows "Visa Active" with expiry date
- 🟡 **Expiring Soon:** Shows alert when <30 days remaining
- 🔴 **Expired:** Shows warning and contact HR instruction

**Displays:**
- Visa Number
- Sponsor Name
- Issue Date
- Expiry Date
- Days Until Expiry (calculated)

### Documents Tab
**View All Your Documents:**
- Document name
- Document type (Passport, Visa, ID, etc.)
- Upload date
- **Status indicators:**
  - 🟢 Valid
  - 🟡 Expiring Soon (≤30 days)
  - 🔴 Expired

**For Each Document:**
- File name
- Type
- Expiry date (if applicable)
- Current status

---

## 📊 Data Fields Reference

### Employee Record Fields
```
Personal
├─ Name (required)
├─ Email (required)
├─ Phone (required)
├─ Date of Birth
├─ Nationality Country
├─ Passport Number
├─ Emirates ID Number
├─ Bank Name
├─ Bank Account Number
└─ Profile Image

Employment
├─ Role (required)
├─ Position
├─ Department
├─ Location
├─ Join Date
├─ Status
└─ Manager (if applicable)

Compensation
├─ Basic Salary (required)
├─ Housing Allowance
├─ Food Allowance
├─ Transportation Allowance
├─ Telephone Allowance
├─ Other Allowances
├─ Total Salary (auto-calculated)
├─ Bonuses (multiple)
│  ├─ Amount
│  ├─ Type
│  ├─ Month/Year
│  └─ Status
└─ Deductions

Visa
├─ Visa Number
├─ Sponsor Name
├─ Issue Date
├─ Expiry Date
├─ Status
└─ Days Until Expiry (auto-calculated)

Documents (Multiple)
├─ Document Name
├─ Document Type
├─ Upload Date
├─ Expiry Date (optional)
└─ Status (Valid/Expiring/Expired)

Emergency
├─ Contact Name
├─ Relationship
├─ Phone
└─ Email (optional)
```

---

## ⚠️ Key Features

### Automatic Visa Reminders
✅ System tracks all visa expiry dates
✅ Generates alerts 30 days before expiry
✅ Visual alerts in HR admin panel
✅ Employee dashboard shows status
✅ Color-coded warnings (Yellow/Red)

### Document Management
✅ Upload multiple documents per employee
✅ Name each document uniquely
✅ Track document types
✅ Monitor expiry dates
✅ Auto-status indicators

### Salary Calculation
✅ Break down salary by component
✅ Automatic total calculation
✅ Support for all allowance types
✅ Bonus tracking separate

### Data Validation
✅ Required fields enforced
✅ Email format validation
✅ Date range validation
✅ Numeric field validation

---

## 🔒 Access Control
- **HR Admin:** Full access to all employee records
- **Employees:** View own profile, visa, documents only
- **Session-based:** Auto-logout after inactivity

---

## 💾 Data Storage
All data currently stored in component state. Ready for database integration:
- PostgreSQL/MySQL ready
- Proper TypeScript interfaces defined
- Validation functions included

---

## 📝 Best Practices

### For HR Admins:
1. ✅ Complete all required fields (marked with *)
2. ✅ Set visa expiry dates accurately
3. ✅ Upload all required documents
4. ✅ Add at least one emergency contact
5. ✅ Review visa alerts weekly
6. ✅ Keep bank account information updated

### For Employees:
1. ✅ Check visa expiry regularly (before 30 days)
2. ✅ Report document updates to HR
3. ✅ Verify personal information accuracy
4. ✅ Contact HR if documents expire

---

## 🚀 System Status
✅ **Frontend:** Complete and functional
⏳ **Backend Integration:** Ready for API connection
⏳ **Database:** Ready for schema implementation
📧 **Notifications:** Ready for email setup
📊 **Reports:** Ready for reporting engine

---

## 📞 Support
For issues or questions, contact HR department or system administrator.
