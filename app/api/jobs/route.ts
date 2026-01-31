import { NextRequest, NextResponse } from 'next/server';

// This API route connects admin jobs with employee jobs
// It fetches jobs that are assigned to specific employees

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const employeeName = searchParams.get('employee');
    const status = searchParams.get('status');

    // Import admin jobs data
    const { MOCK_JOBS } = await import('@/app/admin/jobs/lib/jobs-data');

    // Filter jobs based on employee assignment and status
    let filteredJobs = MOCK_JOBS;

    // Filter by employee (check both team members and assignedTo array)
    if (employeeName) {
      filteredJobs = filteredJobs.filter(job => {
        const hasTeamMember = job.team.some(member =>
          member.name.toLowerCase().includes(employeeName.toLowerCase())
        );
        // Also check if using admin jobs format with assignedTo field
        const hasAssignment = (job as any).assignedTo?.some((name: string) =>
          name.toLowerCase().includes(employeeName.toLowerCase())
        );
        return hasTeamMember || hasAssignment;
      });
    }

    // Filter by status
    if (status) {
      filteredJobs = filteredJobs.filter(job => job.status === status);
    }

    // Transform to employee portal format
    const transformedJobs = filteredJobs.map(job => ({
      id: job.id,
      job_number: job.jobId,
      client_id: job.clientId,
      client_name: job.clientName,
      title: job.title,
      description: job.description,
      location: job.location,
      service_type: job.tags?.[0] || 'Service',
      start_date: new Date(`${job.scheduledDate}T${job.startTime}`).toISOString(),
      end_date: new Date(`${job.scheduledDate}T${job.endTime}`).toISOString(),
      scheduled_date: job.scheduledDate,
      status: transformJobStatus(job.status),
      priority: job.priority === 'CRITICAL' ? 'Urgent' : job.priority.charAt(0) + job.priority.slice(1).toLowerCase(),
      budget: job.budget,
      actual_cost: job.actualCost,
      team_size: job.teamSize,
      assigned_team_leader: job.team[0]?.name || 'Not Assigned',
      notes: job.description,
      tasks: job.tasks.map(task => ({
        id: task.id,
        task_description: task.description,
        status: transformTaskStatus(task.status),
        progress: task.progress,
        assigned_to: task.assignedTo?.[0] || 'Unassigned',
        completed_at: task.status === 'COMPLETED' ? new Date().toISOString() : undefined
      })),
      team_assignments: job.team.map(member => ({
        id: member.id,
        employee_id: member.id,
        employee_name: member.name,
        role: member.role,
        status: transformMemberStatus(member.status),
        start_time: job.startTime,
        end_time: job.endTime,
        hours_worked: 0,
        performance_rating: 0
      })),
      services: job.services.map(service => ({
        id: service.id,
        service_name: service.name,
        quantity: service.quantity,
        unit_price: service.price,
        unit: service.unit,
        total: service.total
      })),
      checklists: [
        {
          id: 'pre_1',
          checklist_type: 'Pre-Job Checklist',
          items: [
            { id: 'item1', description: 'Equipment check', completed: false },
            { id: 'item2', description: 'Client contact confirmation', completed: false },
            { id: 'item3', description: 'Safety briefing', completed: false }
          ]
        },
        {
          id: 'exec_1',
          checklist_type: 'Execution Checklist',
          items: [
            { id: 'item4', description: 'Site setup', completed: false },
            { id: 'item5', description: 'Task allocation', completed: false }
          ]
        },
        {
          id: 'post_1',
          checklist_type: 'Post-Job Checklist',
          items: [
            { id: 'item6', description: 'Quality inspection', completed: false },
            { id: 'item7', description: 'Client sign-off', completed: false }
          ]
        }
      ]
    }));

    return NextResponse.json({
      success: true,
      data: transformedJobs,
      count: transformedJobs.length
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// Helper functions to transform job data
function transformJobStatus(adminStatus: string): string {
  const statusMap: Record<string, string> = {
    'PENDING': 'Pending',
    'SCHEDULED': 'Scheduled',
    'IN_PROGRESS': 'In Progress',
    'COMPLETED': 'Completed',
    'CANCELLED': 'Cancelled'
  };
  return statusMap[adminStatus] || adminStatus;
}

function transformTaskStatus(adminStatus: string): string {
  const statusMap: Record<string, string> = {
    'PENDING': 'Pending',
    'IN_PROGRESS': 'In Progress',
    'COMPLETED': 'Completed'
  };
  return statusMap[adminStatus] || adminStatus;
}

function transformMemberStatus(memberStatus: string): string {
  const statusMap: Record<string, string> = {
    'CONFIRMED': 'Confirmed',
    'PENDING': 'Pending',
    'ON_SITE': 'On Site'
  };
  return statusMap[memberStatus] || memberStatus;
}
