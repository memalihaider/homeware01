# HR & Job Features - Testing Guide & Usage Examples

## 🧪 Testing Scenarios

### Test Suite 1: Employee Feedback & Complaints

#### Test 1.1: Add Feedback Successfully
**Steps:**
1. Navigate to `/admin/employee-feedback`
2. Click "Add Feedback" button
3. Select "John Smith" from employee dropdown
4. Set rating to 5
5. Select "Performance" category
6. Enter title: "Excellent Leadership"
7. Enter content: "John shows outstanding performance..."
8. Click "Add Feedback"

**Expected Result:**
✅ Modal closes
✅ New feedback appears in list
✅ Shows rating with 5 stars
✅ Displays today's date
✅ Can be deleted
✅ Can be viewed

---

#### Test 1.2: File Complaint Successfully
**Steps:**
1. Go to Feedback & Complaints page
2. Click "Complaints" tab
3. Click "Add Complaint"
4. Select "Maria Garcia" employee
5. Choose "Work Schedule" category
6. Set "High" priority
7. Select "Employee" as filed by
8. Enter title: "Schedule Conflict"
9. Enter description: "Shift times conflict with..."
10. Click "Add Complaint"

**Expected Result:**
✅ Complaint added with "Open" status
✅ Shows in complaints list
✅ Red badge for High priority
✅ Can track and update status
✅ Can delete complaint

---

#### Test 1.3: Search & Filter Feedbacks
**Steps:**
1. In Feedback tab
2. Type "John" in search box
3. Select "Active" from status filter
4. Clear search, try "Sarah"

**Expected Result:**
✅ Results filter in real-time
✅ Shows only matching items
✅ Status filter works independently
✅ Can combine search and filter

---

#### Test 1.4: View Summary Statistics
**Steps:**
1. Open Feedback & Complaints page
2. Check the 4 summary cards at top

**Expected Results:**
✅ Card 1: Shows total feedbacks (3+)
✅ Card 2: Shows total complaints (3+)
✅ Card 3: Shows open complaints count
✅ Card 4: Shows resolved complaints count

---

### Test Suite 2: Job Profitability & Capacity

#### Test 2.1: View Profitability Dashboard
**Steps:**
1. Navigate to `/admin/job-profitability`
2. Review summary cards
3. Check line chart
4. Review pie chart
5. Scroll to tables

**Expected Result:**
✅ Summary cards show totals
✅ Line chart shows 6-month trend
✅ Pie chart shows department breakdown
✅ Tables display correctly
✅ All data aligned with sample data

---

#### Test 2.2: Filter by Department
**Steps:**
1. On Profitability page
2. Select "Cleaning" from department filter
3. Check table updates
4. Change to "Maintenance"
5. Change to "All Departments"

**Expected Result:**
✅ Jobs table filters to selected dept
✅ Summary cards recalculate
✅ "All" shows complete data
✅ Counts update correctly

---

#### Test 2.3: Search Job Title
**Steps:**
1. Type "Residential" in search box
2. Type "Commercial" in search
3. Clear search
4. Type "Equipment"

**Expected Result:**
✅ Jobs filter by title match
✅ Results update in real-time
✅ Tables update accordingly
✅ Empty search shows all

---

#### Test 2.4: Analyze Team Utilization
**Steps:**
1. Scroll to "Team Capacity Utilization" table
2. Review each employee's utilization
3. Check Ahmed Hassan (105% - over capacity)
4. Check Maria Garcia (75% - under capacity)

**Expected Result:**
✅ Red bar for over-capacity (Ahmed)
✅ Green bar for optimal (95-100%)
✅ Yellow bar for under-capacity (Maria)
✅ Progress bars accurate

---

#### Test 2.5: Profit Margin Analysis
**Steps:**
1. Check "Residential House Cleaning" (31.6%)
2. Check "Commercial Office" (17.9%)
3. Check "Maintenance" (3.9%)
4. Check "Carpet Cleaning" (0%)

**Expected Result:**
✅ High margin shows green
✅ Medium margin shows blue
✅ Low/zero shows yellow
✅ Percentages accurate

---

### Test Suite 3: Job Hours Tracking

#### Test 3.1: Select and View Job Hours
**Steps:**
1. Scroll to "Hours Tracking" section
2. View 4 summary job cards
3. Click on "Residential House Cleaning" card
4. Review hours overview

**Expected Result:**
✅ Card highlights when selected
✅ Detail view loads correctly
✅ Shows estimated hours (40)
✅ Shows actual hours (38)
✅ Shows variance (-2h under)
✅ Green indicator for under budget

---

#### Test 3.2: Log Hours Entry
**Steps:**
1. Select a job from summary cards
2. Click "Log Hours" button
3. Select "John Smith" employee
4. Set date to today
5. Enter 8 hours
6. Add notes: "Morning shift"
7. Click "Log Hours"

**Expected Result:**
✅ Modal closes
✅ Entry appears in hours list
✅ Shows employee name
✅ Shows date and hours
✅ Actual hours recalculated
✅ Variance updated

---

#### Test 3.3: Delete Hours Entry
**Steps:**
1. Select a job with entries
2. Click delete button on any entry
3. Confirm deletion

**Expected Result:**
✅ Entry removed from list
✅ Actual hours recalculated
✅ Variance updated
✅ Cost adjusted

---

#### Test 3.4: Variance Indicators
**Steps:**
1. Select "Residential House Cleaning" (38h actual, 40h estimated)
   - Should show -2h (under budget, green)
2. Select "Building Maintenance" (92h actual, 80h estimated)
   - Should show +12h (over budget, red)

**Expected Result:**
✅ Correct variance calculated
✅ Color coding accurate
✅ Icons show trend (down/up)
✅ Text clear: "under" or "over"

---

## 📋 Usage Examples

### Example 1: Employee Performance Feedback Workflow

**Scenario:** Manager wants to document Sarah's excellent work quality

```
STEP 1: Navigate to Feedback & Complaints
Location: /admin/employee-feedback

STEP 2: Add Feedback
- Click "Add Feedback" button
- Employee: Sarah Johnson (Cleaner)
- Rating: 4.5 stars (Very Good)
- Category: Quality of Work
- Title: "High Quality Work Standards"
- Content: "Sarah maintains consistently high quality work standards and is very reliable."
- Tags: Quality, Reliability, Consistency

RESULT: Feedback added with Active status
IMPACT: Visible in Sarah's employee profile, tracked for performance reviews
NEXT: Share feedback with employee during review meeting
```

---

### Example 2: Workplace Safety Complaint Filing

**Scenario:** Employee reports safety equipment issue

```
STEP 1: Open Employee Feedback & Complaints Page

STEP 2: File Complaint
- Switch to "Complaints" tab
- Click "Add Complaint"
- Employee: John Smith (Supervisor)
- Category: Workplace Safety
- Priority: High (URGENT)
- Filed By: Employee
- Title: "Safety Equipment Issue"
- Description: "Safety harness equipment needs maintenance and replacement. Current condition poses risk to workers."

STEP 3: Complaint Processing
- Status: Open (created)
- Assigned To: HR Manager
- Next: HR Manager investigates

STEP 4: Resolution
- Status changes to: In Progress
- Resolution Notes: "Equipment sent for inspection and replacement scheduled"
- Final Status: Resolved
- Completion Date: Tracked

IMPACT: Creates audit trail for safety compliance
NEXT: Equipment procurement and worker communication
```

---

### Example 3: Job Profitability Analysis

**Scenario:** Director analyzes quarterly profitability

```
STEP 1: Navigate to Job Profitability & Capacity
Location: /admin/job-profitability

STEP 2: Review Summary Metrics
- Total Revenue: AED 285K (all jobs combined)
- Total Cost: AED 199.3K (actual labor + materials)
- Total Profit: AED 85.7K
- Average Profit Margin: 30%

STEP 3: Analyze Trends
- View 6-month profitability chart
- Revenue trend: Upward (₹45K → ₹65K)
- Cost trend: Steady increase
- Profit trend: Positive growth

STEP 4: Department Analysis
- Cleaning: 45% of profit (highest)
- Landscaping: 22% of profit
- Maintenance: 20% of profit (lowest margin)
- Industrial: 13% of profit

STEP 5: Identify Issues
- Building Maintenance has 3.9% margin (CONCERN)
  → Reason: 92 actual hours vs 80 estimated (over budget by 12h)
  → Action: Review estimation process

STEP 6: Team Capacity Planning
- Ahmed Hassan: 105% utilization (OVER CAPACITY)
  → Needs load balancing
- Maria Garcia: 75% utilization (UNDER CAPACITY)
  → Can take more jobs
- Others: 95% optimal range

RESULT: Data-driven decision making for resource allocation
NEXT: Adjust job staffing and pricing
```

---

### Example 4: Hours Estimation vs Actual Tracking

**Scenario:** Track Building Maintenance job hours accuracy

```
INITIAL PLAN:
- Job: Building Maintenance
- Estimated Hours: 80 hours
- Estimated Team Size: 5 people
- Estimated Duration: 2 weeks
- Estimated Cost: ₹4,000 (₹50/hour × 80)

STEP 1: Project Starts
- Assign team members
- Set expected hours per person

STEP 2: Daily Hours Logging
Day 1 - Jan 8:
  - Ahmed Hassan: 8 hours (HVAC maintenance)
  - Michael Chen: 8 hours (Plumbing work)
  Total: 16 hours logged

Day 2 - Jan 9:
  - Ahmed Hassan: 8 hours (HVAC continuation)
  - Michael Chen: 10 hours (Plumbing delays)
  - David Rodriguez: 8 hours (Support)
  Total: 26 hours logged (2 hours over estimated daily)

STEP 3: Variance Analysis at Midpoint
- Expected so far: 40 hours (half of 80)
- Actual logged: 48 hours
- Variance: +8 hours (10% over budget)
- Projected Final: 96 hours (16 hours over)

STEP 4: Mid-project Correction
- Identify bottlenecks
- Adjust team assignments
- Optimize remaining hours

FINAL STATUS:
- Estimated: 80 hours
- Actual: 92 hours (+12 hours)
- Cost Impact: ₹600 additional (12h × ₹50)
- Profit Impact: Revenue ₹12,500 vs Cost ₹4,600 = 63% margin (still good)

LEARNING: Plumbing delays caused 25% of variance
NEXT: Better estimation for similar jobs
```

---

### Example 5: Complete Employee Performance Cycle

**Scenario:** Complete HR cycle combining feedback and complaints

```
QUARTER OVERVIEW:

JAN-FEB: Data Collection
- Add feedback: 3 positive reviews
- Log complaints: 2 minor issues filed
- Track hours: Hours logged for projects
- Calculate profitability: Analyze department performance

Example for John Smith:
Feedback:
  ✅ Excellent leadership (5 stars)
  ✅ Reliable performer (4.5 stars)
  ✅ Strong team skills (4 stars)

Complaints:
  ⚠️ 1 safety concern (resolved)
  ✅ No open issues

Hours:
  Estimated: 40h/week × 4 weeks = 160h
  Actual: 156h
  Variance: -4h (efficient, +4h available)

Profitability:
  Jobs managed: 2
  Total margin: 35%
  Team utilization: 98% (optimal)

MARCH: Review & Planning
- Compile feedback summary
- Review complaint resolutions
- Analyze hours accuracy
- Plan promotion/raise based on metrics

RESULT:
- John Smith: Eligible for promotion
- Reason: High feedback scores, efficient hours, zero open complaints
- Action: Schedule review meeting
- Outcome: Advance to Senior Supervisor role
```

---

## 🎯 Test Data Reference

### Sample Employees
```
1. John Smith (Supervisor) - High performer
2. Sarah Johnson (Cleaner) - Reliable worker
3. Ahmed Hassan (Team Lead) - Over-capacity
4. Maria Garcia (Cleaner) - Under-capacity
5. Michael Chen (Supervisor) - Balanced
6. David Rodriguez (Industrial) - Fully utilized
```

### Sample Jobs
```
1. Residential House Cleaning - 31.6% margin (Excellent)
2. Commercial Office Cleaning - 17.9% margin (Good)
3. Building Maintenance - 3.9% margin (Needs review)
4. Garden Landscaping - 22.0% margin (Good)
5. Carpet Cleaning - 0% margin (Break-even)
6. Industrial Equipment - 18.5% margin (Good)
```

### Sample Feedback Ratings
```
5.0 stars - Excellent performance
4.5 stars - Very good performance
4.0 stars - Good performance with minor improvements
3.5 stars - Fair performance, development needed
Below 3.0 - Performance concerns
```

---

## 📊 Validation Test Cases

### Feedback Form Validation
```
Test 1: Missing Employee
- Leave employee dropdown blank
- Click Add Feedback
Result: Form should prevent submission

Test 2: Missing Title
- Select employee, skip title
- Click Add Feedback
Result: Form prevents submission

Test 3: All Fields Valid
- Fill all required fields
- Click Add Feedback
Result: Feedback added successfully

Test 4: Special Characters
- Enter title: "John's Performance & Review!"
- Should handle correctly
Result: Displays properly without escaping issues
```

### Hours Entry Validation
```
Test 1: Zero Hours
- Enter 0 hours
- Click Log Hours
Result: Should prevent or warn

Test 2: Excessive Hours
- Enter 25 hours
- Click Log Hours
Result: Should warn or limit to 24

Test 3: Valid Entry
- Select employee, date, 8 hours
- Click Log Hours
Result: Entry added, total recalculated

Test 4: Decimal Hours
- Enter 7.5 hours
- Click Log Hours
Result: Accepted (allows half hours)
```

---

## 🚀 Quick Start Checklist

- [ ] Navigate to `/admin/employee-feedback` (Feedback & Complaints)
- [ ] Click "Add Feedback" to test feedback submission
- [ ] Switch to "Complaints" tab
- [ ] Click "Add Complaint" to test complaint filing
- [ ] Try filters and search functionality
- [ ] Navigate to `/admin/job-profitability` (Job Profitability)
- [ ] Review all summary cards and metrics
- [ ] Test department and date filters
- [ ] Test job search
- [ ] Review charts and data visualizations
- [ ] Go to a job detail page
- [ ] Scroll to "Job Hours Tracking" section
- [ ] Click a job card to select it
- [ ] Click "Log Hours" button
- [ ] Fill and submit a test hours entry
- [ ] Verify entry appears in the list
- [ ] Test deleting an entry
- [ ] Verify variance recalculation

---

## 🐛 Troubleshooting

### Issue: Modal not closing after submission
**Solution:** Check browser console for errors. Ensure form validation passed.

### Issue: Variance not calculating correctly
**Solution:** Verify actual hours were added. Check that job is selected. Try refreshing component.

### Issue: Data not appearing in tables
**Solution:** Ensure filters aren't hiding data. Check status filter isn't set incorrectly.

### Issue: Charts not rendering
**Solution:** Browser may need refresh. Check Recharts is installed. Verify sample data loaded.

### Issue: Sidebar links not working
**Solution:** Check URL routing. Verify layout.tsx has correct href values.

---

## ✅ Success Criteria

All features working correctly when:
- ✅ Feedback can be added and deleted
- ✅ Complaints can be created with different statuses
- ✅ Search and filters work in real-time
- ✅ Profitability calculations are accurate
- ✅ Team utilization shows correct percentages
- ✅ Hours can be logged per employee
- ✅ Variance calculates automatically
- ✅ All color coding displays correctly
- ✅ Charts render with accurate data
- ✅ Modals open/close smoothly
- ✅ Tables display properly on all devices
- ✅ No console errors
- ✅ Data persists during session
- ✅ Sidebar navigation works
- ✅ All timestamps are accurate
