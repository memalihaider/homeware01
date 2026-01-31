# Employee Jobs Portal - Quick Start & Testing Guide

## Quick Start

### 1. Login as Employee
Navigate to: `https://homeware01.vercel.app/employee/jobs`
- Uses employee session stored in browser localStorage
- Falls back to login if not authenticated

### 2. View Assigned Jobs
The page automatically shows:
- All jobs assigned to your employee name
- Job status (Pending, Scheduled, In Progress, Completed)
- Priority level (Low, Medium, High, Urgent)
- Team size and assigned team leader
- Tasks and completion percentage

### 3. Click View Details
Click "View Details" on any job card to see:
- **Overview Tab**: Full job description, services, important notes
- **Tasks Tab**: All tasks with progress bars and completion status
- **Team Tab**: Team members assigned with roles and hours
- **Checklists Tab**: Pre-job, execution, and post-job checklists

## Testing Workflow

### Scenario 1: Admin Creates Job with Employee Team
**Admin Side (~/admin/jobs)**:
1. Click "New Job" button
2. Fill in job details:
   - Title: "Office Deep Clean"
   - Client: "Global Tech Solutions"
   - Location: "Downtown Towers"
   - Date: 2026-01-28
   - Time: 08:00 - 16:00
   - Priority: HIGH
3. Add team members (ensure Ahmed Hassan is selected)
4. Add tasks and services
5. Save job

**Employee Side (~/employee/jobs)**:
1. If logged in as Ahmed Hassan, refresh page
2. New job should appear in jobs list
3. Should see job statistics update
4. Click to view full details

### Scenario 2: Search and Filter Jobs
**In Employee Jobs Page**:
1. Use search box to find jobs by:
   - Job title
   - Client name
   - Location
   - Job number
2. Use status filter to show only:
   - Pending
   - Scheduled
   - In Progress
   - Completed
3. Use priority filter to show only:
   - Low
   - Medium
   - High
   - Urgent

### Scenario 3: View Complete Job Details
**Click View Details on any job**:
1. See job header with status badge
2. Overall progress bar
3. Switch between tabs:
   - **Overview**: Services table, budget info, notes
   - **Tasks**: Individual task progress tracking
   - **Team**: Team member details and performance
   - **Checklists**: Pre/execution/post job verification

### Scenario 4: Real-Time Data Flow
**When data updates in admin**:
1. Admin updates job status from admin portal
2. Employee refreshes jobs page
3. New status should appear immediately
4. Works via API call to `/api/jobs?employee={name}`

## API Testing

### Get All Jobs for an Employee
```bash
# Using curl
curl "http://localhost:3000/api/jobs?employee=Ahmed%20Hassan"

# Using JavaScript/fetch
fetch(`/api/jobs?employee=${encodeURIComponent('Ahmed Hassan')}`)
  .then(r => r.json())
  .then(d => console.log(d.data))
```

### Get Jobs by Status
```bash
curl "http://localhost:3000/api/jobs?employee=Ahmed%20Hassan&status=IN_PROGRESS"
```

### Response Structure
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "job_number": "JOB-2026-001",
      "client_name": "Global Tech Solutions",
      "title": "Executive Office Deep Clean",
      "description": "Comprehensive sanitization...",
      "location": "Downtown Towers, Floor 42",
      "status": "In Progress",
      "priority": "High",
      "budget": 4500,
      "actual_cost": 2100,
      "team_size": 4,
      "assigned_team_leader": "Ahmed Hassan",
      "tasks": [
        {
          "id": "t1",
          "task_description": "Floor Scrubbing & Polishing",
          "status": "Completed",
          "progress": 100,
          "assigned_to": "emp_1"
        }
      ],
      "team_assignments": [
        {
          "id": "ta1",
          "employee_id": "emp_1",
          "employee_name": "Ahmed Hassan",
          "role": "Team Leader",
          "status": "In Progress",
          "start_time": "08:00",
          "end_time": "16:00",
          "hours_worked": 4.5
        }
      ],
      "services": [
        {
          "id": "s1",
          "service_name": "Deep Cleaning Service",
          "quantity": 1,
          "unit_price": 3000,
          "total": 3000
        }
      ],
      "checklists": [...]
    }
  ],
  "count": 1
}
```

## Troubleshooting

### Issue: No jobs appearing in employee portal
**Solution**:
1. Verify employee name in session matches admin job team member name
2. Check browser console for API errors
3. Verify admin jobs have team members assigned
4. Try refreshing page (clears cache)

### Issue: API returning 500 error
**Solution**:
1. Check Next.js build succeeded: `npm run build`
2. Verify `/app/api/jobs/route.ts` file exists
3. Check server logs for errors
4. Restart dev server: `npm run dev`

### Issue: Jobs showing but details page shows 404
**Solution**:
1. Verify job ID matches between list and detail
2. Check detail page API call in browser Network tab
3. Ensure mock data fallback is working
4. Try clicking different jobs

### Issue: Session not persisting between refreshes
**Solution**:
1. Login again to create session
2. Check browser localStorage for 'userSession'
3. Verify browser allows localStorage
4. Try different browser or incognito mode

## Performance Notes

### Caching Strategy
- Jobs list fetches on component mount
- Detail page fetches when ID changes
- Falls back to mock data if API slow
- No re-fetches on tab switch

### Load Times
- Jobs list: ~500-1000ms (includes API call)
- Detail page: ~300-500ms (uses memoized data)
- Search: Instant (client-side filtering)

### Optimization Tips
- Use search/filter to reduce visible jobs
- Lazy load job details only when needed
- Cache employee jobs in local state
- Consider implementing service worker for offline support

## Development Notes

### Adding New Employee
1. Create employee in system
2. Add to admin job team assignments
3. Use full name in team member field
4. Employee portal will auto-sync

### Modifying Job Data
1. Update `/app/admin/jobs/lib/jobs-data.ts` MOCK_JOBS
2. Or connect to real database
3. API will automatically transform and serve to employees

### Testing with Different Employees
1. Create multiple test jobs with different team members
2. Login as different employees
3. Each should see only their assigned jobs

## Features Checklist

✅ Employees see jobs assigned by admin
✅ Jobs automatically sync to employee portal
✅ Search functionality works
✅ Filters by status and priority
✅ Detailed job view with all information
✅ Task tracking with progress
✅ Team member assignment display
✅ Service/cost information visible
✅ Checklist support
✅ Loading states and error handling
✅ Responsive mobile design
✅ Falls back gracefully on API errors

## Next Steps

1. **Deploy to Production**: Build and deploy the Next.js app
2. **Database Integration**: Connect to real database for persistence
3. **Real-time Updates**: Implement WebSocket for live updates
4. **Mobile App**: Consider native mobile app using same API
5. **Notifications**: Add push notifications for new job assignments
6. **Analytics**: Track job completion rates and employee performance

## Support

For issues or questions:
1. Check browser console for errors
2. Verify Next.js build is successful
3. Check API endpoint: `/api/jobs`
4. Review mock data in `/app/admin/jobs/lib/jobs-data.ts`
5. Check employee session in localStorage
