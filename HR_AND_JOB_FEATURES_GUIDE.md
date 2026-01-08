# HR & Job Management Features - Implementation Guide

## Overview
This document outlines the 4 new features added to the Homeware ERP system for enhanced HR management and job profitability tracking.

---

## Feature 1: Employee Feedback & Complaints Management
**Location:** `/app/admin/employee-feedback/page.tsx`

### Purpose
Centralized system for admin to manage employee feedback and handle workplace complaints with structured workflows.

### Key Components

#### Feedback Tab
- **Add Feedback:** Admin can submit feedback for any employee
- **Fields:** Rating (1-5), Category, Title, Content, Tags
- **Status Tracking:** Active, Pending Action
- **Search & Filter:** By employee name, title, and status
- **Display:** Rating visualization with star system

#### Complaints Tab
- **File Complaint:** Employee or Supervisor can file complaints
- **Fields:** Category, Priority Level, Title, Description
- **Status Lifecycle:** Open → In Progress → Resolved
- **Assignment:** Can assign to specific HR staff
- **Resolution Tracking:** Add resolution notes before closing

### Categories
**Feedback Types:**
- Performance
- Quality of Work
- Development
- Behavior

**Complaint Categories:**
- Workplace Safety
- Work Schedule
- Performance
- Management
- Other

### Sample Data
- 3 feedback entries with different ratings
- 3 complaints at various stages (Open, In Progress, Resolved)

### Features
✅ Real-time filtering and search
✅ Star rating visualization  
✅ Priority-based color coding
✅ Modal-based CRUD operations
✅ Summary statistics dashboard

---

## Feature 2: Job Profitability & Capacity Report
**Location:** `/app/admin/job-profitability/page.tsx`

### Purpose
Dashboard showing job profitability analysis and team capacity utilization metrics.

### Key Metrics

#### Financial Overview
- **Total Revenue:** Sum of all job revenues
- **Total Cost:** Actual labor and material costs
- **Total Profit:** Revenue minus costs
- **Average Profit Margin:** Percentage-based profitability

#### Job Analysis Table
| Metric | Description |
|--------|------------|
| Budget | Estimated job cost |
| Actual Cost | Real expenses incurred |
| Revenue | Total job revenue |
| Profit Margin | (Revenue - Cost) / Revenue × 100 |
| Status | Completed / In Progress |

#### Team Capacity
- **Available Hours:** Standard weekly hours (40h)
- **Allocated Hours:** Hours assigned to jobs
- **Utilization Rate:** Allocated / Available × 100%
- **Color Coding:** Green (90-100%), Yellow (<90%), Red (>100%)

### Visualizations
1. **Profitability Trend:** Line chart showing 6-month revenue/cost/profit trends
2. **Department Breakdown:** Pie chart of profitability by department
3. **Team Utilization:** Bar display per employee

### Filters
- Search by job title
- Filter by department
- Time range selection (Week, Month, Quarter, Year)

### Sample Data
- 6 jobs across 4 departments
- 6 team members with utilization rates
- 6-month profitability trend data

---

## Feature 3: Job Hours Tracking
**Location:** `/app/admin/jobs/components/job-hours-tracker.tsx`

### Purpose
Track estimated vs actual hours for jobs with per-employee logging and variance analysis.

### Key Features

#### Hours Overview
- **Estimated Hours:** Pre-planned hours for job
- **Actual Hours:** Sum of all logged hours
- **Variance:** Difference between actual and estimated (Under/On-Track/Over)
- **Cost Calculation:** Hours × Hourly Rate (₹50/hour default)

#### Hours Entry
- Employee selection from dropdown
- Date picker for work date
- Hours worked input (0-24 hours, 0.5 increments)
- Optional notes field

#### Variance Analysis
- **Under Budget:** Green indicator, fewer hours than planned
- **On Track:** Blue indicator, exact hours match
- **Over Budget:** Red indicator, more hours than planned

### Color Coding
- Green: -2h (under budget)
- Yellow: On track
- Red: +12h (over budget)

### Data Points Tracked
- Employee name
- Work date
- Hours worked
- Notes/comments
- Real-time variance calculation

---

## Feature 4: Jobs with Hours Estimation
**Integration Points:**
- Job creation form: Add estimated hours field
- Job detail page: Hours tracking component
- Profitability reports: Hours-based cost calculations
- Team capacity: Hours allocation tracking

### Hours-Based Calculations
```
Actual Cost = Actual Hours × Hourly Rate
Estimated Cost = Estimated Hours × Hourly Rate
Cost Variance = Actual Cost - Estimated Cost
Profit Impact = Revenue - Actual Cost
```

---

## Data Models

### Feedback Model
```typescript
{
  id: number
  employeeId: number
  employeeName: string
  employeeRole: string
  submittedBy: string
  submissionDate: string (YYYY-MM-DD)
  rating: number (1-5)
  category: string
  title: string
  content: string
  status: 'Active' | 'Pending Action'
  tags: string[]
}
```

### Complaint Model
```typescript
{
  id: number
  employeeId: number
  employeeName: string
  employeeRole: string
  filedBy: 'Employee' | 'Supervisor' | 'Manager'
  submissionDate: string
  category: string
  priority: 'High' | 'Medium' | 'Low'
  title: string
  description: string
  status: 'Open' | 'In Progress' | 'Resolved'
  assignedTo: string
  resolution: string
  attachments: any[]
}
```

### Job Hours Model
```typescript
{
  jobId: number
  jobTitle: string
  estimatedHours: number
  actualHours: number
  variance: number
  estimatedCost: number
  actualCost: number
  entries: HoursEntry[]
  status: string
}
```

### Hours Entry Model
```typescript
{
  id: number
  employeeId: number
  employeeName: string
  date: string
  hoursWorked: number
  notes: string
}
```

---

## Integration with Existing Features

### With HR Module
- Employee feedback integrated into HR dashboard
- Complaint tracking linked to employee profiles
- Performance metrics influenced by feedback ratings
- Attendance tied to hours logged

### With Jobs Module
- Hours tracking in job detail pages
- Job profitability calculations use actual hours
- Team capacity planning based on allocated hours
- Equipment/permits coordination with job timeline

### With Finance Module
- Job profitability feeds into financial reports
- Cost calculations use actual hours tracked
- Invoice generation based on job costs
- Payment reconciliation with actual hours

---

## Business Logic

### Profitability Calculation
```
Profit = Revenue - Actual Cost
Profit Margin = (Revenue - Actual Cost) / Revenue × 100
```

### Hours Variance
```
Variance = Actual Hours - Estimated Hours
Under Budget: Variance < 0
On Track: Variance = 0
Over Budget: Variance > 0
```

### Team Utilization
```
Utilization = (Allocated Hours / Available Hours) × 100
Optimal: 90-100%
Under Capacity: < 90%
Over Capacity: > 100%
```

---

## User Workflows

### Workflow 1: Adding Employee Feedback
1. Navigate to HR Management → Feedback & Complaints
2. Click "Add Feedback" button
3. Select employee from dropdown
4. Set rating (1-5 stars)
5. Select category
6. Enter feedback title and content
7. Add tags (optional)
8. Click "Add Feedback"
9. Feedback appears in list with status indicator

### Workflow 2: Filing a Complaint
1. Go to Feedback & Complaints page
2. Switch to "Complaints" tab
3. Click "Add Complaint"
4. Select affected employee
5. Choose category and priority
6. Select who filed (Employee/Supervisor)
7. Enter complaint title and description
8. Submit complaint
9. Track status as Open → In Progress → Resolved

### Workflow 3: Job Profitability Analysis
1. Navigate to Job Profitability & Capacity page
2. View summary cards for totals
3. Use filters for specific department/timeframe
4. Check profitability trends in charts
5. Review individual job margins
6. Analyze team utilization rates
7. Export report if needed

### Workflow 4: Logging Job Hours
1. Open job detail from Jobs list
2. Scroll to "Hours Tracking" section
3. Select a job from summary cards
4. Click "Log Hours"
5. Select employee
6. Enter date and hours worked
7. Add optional notes
8. Submit entry
9. View variance automatically calculated

---

## Features Summary

### Feedback & Complaints
- ✅ Admin feedback submission for employees
- ✅ Employee/Supervisor complaint filing
- ✅ Status tracking and resolution workflow
- ✅ Priority-based complaint management
- ✅ Search and filtering capabilities
- ✅ Activity logging and timestamps

### Job Profitability
- ✅ Real-time profit calculations
- ✅ Department-wise profitability breakdown
- ✅ 6-month trend visualization
- ✅ Team capacity utilization tracking
- ✅ Budget vs actual cost comparison
- ✅ Exportable reports

### Hours Tracking
- ✅ Per-employee hour logging
- ✅ Estimated vs actual comparison
- ✅ Automatic variance calculation
- ✅ Cost impact analysis
- ✅ Real-time job profitability updates
- ✅ Historical hours tracking

---

## Technical Stack
- **Framework:** Next.js 14+ with React 18+
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **State Management:** React Hooks (useState)

---

## Future Enhancements
1. Export functionality for reports (PDF/Excel)
2. Email notifications for complaints
3. Historical feedback analytics
4. Predictive profitability analysis
5. Advanced capacity planning algorithms
6. Integration with payroll for cost calculations
7. Automated variance alerts
8. Department benchmarking comparisons
