# HR & Job Features - Quick Reference

## 🎯 4 New Features

### 1️⃣ Employee Feedback & Complaints
- **URL:** `/admin/employee-feedback`
- **Purpose:** Admin feedback submission & complaint tracking
- **Key Features:** 
  - Feedback with star ratings (1-5)
  - Complaint filing with priority levels
  - Status tracking (Open/In Progress/Resolved)
  - Search & filter by status
  - Category-based organization

### 2️⃣ Job Profitability & Capacity Report
- **URL:** `/admin/job-profitability`
- **Purpose:** Analyze job profitability and team capacity
- **Key Features:**
  - Revenue/Cost/Profit overview
  - Profitability trend charts (6 months)
  - Department breakdown
  - Team utilization metrics
  - Budget vs actual comparison

### 3️⃣ Job Hours Tracking
- **Component:** `JobHoursTracker` in job detail page
- **Purpose:** Track estimated vs actual hours per job
- **Key Features:**
  - Per-employee hour logging
  - Variance calculation (Under/On-Track/Over)
  - Cost impact analysis
  - Date and notes tracking

### 4️⃣ Jobs with Hours Estimation
- **Integration:** Job creation/edit forms
- **Purpose:** Plan and track job hours
- **Key Features:**
  - Estimated hours on job creation
  - Actual hours logged per employee
  - Automatic cost calculations
  - Profitability impact tracking

---

## 📊 Key Metrics

| Feature | Key Metrics |
|---------|------------|
| **Feedback** | Rating (1-5), Status, Category |
| **Complaints** | Priority, Status, Category, Resolution |
| **Profitability** | Profit Margin %, Revenue, Cost, Team Utilization % |
| **Hours** | Estimated, Actual, Variance, Cost per Hour |

---

## 🎨 Color Coding

### Ratings & Stars
- ⭐ 5.0 = Excellent (Green)
- ⭐ 4.5 = Very Good (Blue)
- ⭐ 3.5 = Good (Blue)
- ⭐ 2.5 = Fair (Yellow)
- ⭐ 1.0 = Poor (Red)

### Profitability
- ✅ 20%+ Margin = Excellent (Green)
- ✅ 10-20% = Good (Blue)
- ✅ 0-10% = Fair (Yellow)
- ✅ Negative = Loss (Red)

### Hours Variance
- ✅ Under Budget = Green (-X hours)
- ✅ On Track = Blue (0 hours)
- ✅ Over Budget = Red (+X hours)

### Team Utilization
- ✅ 90-100% = Optimal (Green)
- ⚠️ <90% = Under Capacity (Yellow)
- ⚠️ >100% = Over Capacity (Red)

---

## 📝 Sample Data Sets

### Feedback Examples
| Employee | Rating | Category | Status |
|----------|--------|----------|--------|
| John Smith | ⭐⭐⭐⭐⭐ | Performance | Active |
| Sarah Johnson | ⭐⭐⭐⭐ | Quality | Active |
| Ahmed Hassan | ⭐⭐⭐⭐ | Development | Pending |

### Job Profitability Examples
| Job Title | Budget | Actual | Revenue | Margin |
|-----------|--------|--------|---------|--------|
| House Cleaning | 5,000 | 3,800 | 5,500 | 31.6% |
| Office Cleaning | 8,000 | 7,200 | 8,500 | 17.9% |
| Maintenance | 12,000 | 14,200 | 12,500 | 3.9% |

### Hours Tracking Examples
| Job | Estimated | Actual | Variance | Status |
|-----|-----------|--------|----------|--------|
| House Cleaning | 40h | 38h | -2h ✅ | Completed |
| Office Cleaning | 60h | 56h | -4h ✅ | Completed |
| Maintenance | 80h | 92h | +12h ⚠️ | In Progress |

---

## 🔄 Workflow Quick Starts

### Add Feedback in 3 Steps
1. Go to HR Management → Feedback & Complaints
2. Click "Add Feedback" → Select employee
3. Set rating, category, title, content → Save

### File Complaint in 3 Steps
1. Go to Feedback & Complaints
2. Switch to "Complaints" tab → Click "Add Complaint"
3. Fill form → Select priority → Submit

### Check Job Profitability in 3 Steps
1. Go to "Job Profitability & Capacity"
2. View summary cards and charts
3. Use filters for department/time period

### Log Job Hours in 3 Steps
1. Open job from Jobs list
2. Go to Hours Tracking section → Click "Log Hours"
3. Select employee, date, hours → Save

---

## 📊 Dashboard Sections

### Feedback & Complaints Page
- **Header:** Back button, title, search bar
- **Summary Cards:** Total feedbacks, complaints, open issues, resolved
- **Tabs:** Feedback | Complaints
- **Filters:** Status filter, search by name/title
- **Content:** List of feedbacks/complaints with details
- **Modal:** Add new feedback/complaint form

### Job Profitability Page
- **Header:** Back button, title, export button
- **Summary Cards:** Revenue, Cost, Profit, Team Utilization
- **Charts:** Profitability trend (6 months), Department breakdown
- **Filters:** Job search, department filter, time range
- **Table 1:** Job profitability breakdown
- **Table 2:** Team capacity utilization

### Hours Tracker Component
- **Summary Cards:** 4 job cards showing hours status
- **Selected Job:** Detailed view with hours overview
- **Entry List:** All logged hours for selected job
- **Modal:** Add new hours entry form

---

## 🔗 Integration Points

### With HR Module
- Feedback appears on employee profiles
- Complaint history tracked per employee
- Performance scores based on feedback

### With Jobs Module
- Hours logged per job
- Profitability calculated from actual hours
- Capacity planning from allocated hours

### With Finance Module
- Costs calculated from hours × rate
- Invoices based on actual hours
- Payment tracking linked to job profitability

---

## 📈 Calculations

### Profit Margin
```
Profit Margin = (Revenue - Actual Cost) / Revenue × 100
Example: (5500 - 3800) / 5500 × 100 = 31.6%
```

### Hours Variance
```
Variance = Actual Hours - Estimated Hours
- Negative = Under budget (efficient)
- Zero = On track (as planned)
- Positive = Over budget (inefficient)
```

### Team Utilization
```
Utilization = (Allocated Hours / Available Hours) × 100
Available Hours = 40 per week per employee
Optimal Range = 90-100%
```

---

## 🎯 Categories Reference

### Feedback Categories
- Performance
- Quality of Work
- Development
- Behavior

### Complaint Categories
- Workplace Safety
- Work Schedule
- Performance
- Management
- Other

### Priority Levels
- High (Red)
- Medium (Yellow)
- Low (Green)

### Complaint Status
- Open (New complaint)
- In Progress (Being addressed)
- Resolved (Completed with resolution)

### Feedback Status
- Active (Current feedback)
- Pending Action (Requires follow-up)

---

## 💾 Files Created

| File | Location | Purpose |
|------|----------|---------|
| `page.tsx` | `/app/admin/employee-feedback/` | Feedback & Complaints |
| `page.tsx` | `/app/admin/job-profitability/` | Profitability Report |
| `job-hours-tracker.tsx` | `/app/admin/jobs/components/` | Hours Tracking |
| `layout.tsx` | `/app/admin/` | Sidebar updates |

---

## 🚀 Getting Started

1. **View Feedback & Complaints:**
   - Navigate to Admin → HR Management → Feedback & Complaints
   - Or go directly to `/admin/employee-feedback`

2. **Check Job Profitability:**
   - Navigate to Admin → Job Profitability
   - Or go directly to `/admin/job-profitability`

3. **Track Hours on Jobs:**
   - Open any job from Jobs page
   - Scroll to "Hours Tracking" section
   - Click "Log Hours" to add entries

4. **Analyze Team Capacity:**
   - Go to Job Profitability page
   - Scroll to "Team Capacity Utilization" table
   - Check utilization percentages per employee

---

## ✅ Validation Rules

### Feedback Form
- ✅ Employee must be selected
- ✅ Rating between 1-5
- ✅ Title required (min 5 chars)
- ✅ Content required (min 10 chars)

### Complaint Form
- ✅ Employee must be selected
- ✅ Category must be selected
- ✅ Priority must be selected
- ✅ Title required
- ✅ Description required

### Hours Entry
- ✅ Employee must be selected
- ✅ Date must be filled
- ✅ Hours must be 0-24
- ✅ Increments of 0.5 hours allowed

---

## 🎨 UI Components Used

- **Cards:** Summary metric cards
- **Tables:** Data display with sorting
- **Modals:** Add/Edit forms
- **Charts:** Recharts (Line, Pie, Bar)
- **Buttons:** Primary, secondary, danger actions
- **Icons:** Lucide React (Star, Clock, AlertCircle, etc.)
- **Filters:** Dropdown filters and search bars
- **Badge:** Status and priority indicators

---

## 🔐 Data Privacy

- Feedback and complaints are logged with timestamps
- Resolution notes are tracked for audit purposes
- Employee data linked to performance metrics
- Hours tracking for payroll and costing
- All changes timestamped for audit trail
