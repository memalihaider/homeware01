// Types aligned with database schema and admin portal
export type JobStatus = 'Pending' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'On Hold';
export type JobPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export type AssignmentStatus = 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'No Show';

export interface JobTask {
  id: string;
  task_description: string;
  status: TaskStatus;
  progress: number;
  assigned_to?: string;
  completed_at?: string;
}

export interface JobTeamAssignment {
  id: string;
  employee_id: string;
  employee_name: string;
  role: string;
  status: AssignmentStatus;
  start_time?: string;
  end_time?: string;
  hours_worked?: number;
  performance_rating?: number;
}

export interface JobService {
  id: string;
  service_name: string;
  quantity: number;
  unit_price: number;
  unit: string;
  total: number;
}

export interface JobChecklist {
  id: string;
  checklist_title: string;
  checklist_type: 'pre_job' | 'execution' | 'post_job';
  items: { item: string; completed: boolean }[];
  completed_by?: string;
}

export interface Job {
  id: string;
  job_number: string;
  client_id: string;
  client_name: string;
  client_contact?: string;
  client_phone?: string;
  client_email?: string;
  title: string;
  description: string;
  location: string;
  service_type: string;
  start_date: string;
  end_date: string;
  scheduled_date: string;
  status: JobStatus;
  priority: JobPriority;
  budget: number;
  actual_cost: number;
  team_size: number;
  assigned_team_leader: string;
  notes: string;
  tasks: JobTask[];
  team_assignments: JobTeamAssignment[];
  services: JobService[];
  checklists: JobChecklist[];
  created_at: string;
  updated_at: string;
}

// Mock data aligned with database schema
export const MOCK_EMPLOYEE_JOBS: Job[] = [
  {
    id: '1',
    job_number: 'JOB-2026-001',
    client_id: 'client_1',
    client_name: 'Global Tech Solutions',
    client_contact: 'Mr. Ahmed Al Rashid',
    client_phone: '+971 50 123 4567',
    client_email: 'ahmed@globaltech.ae',
    title: 'Executive Office Deep Clean',
    description: 'Comprehensive sanitization of executive suites including private offices, conference rooms, and common areas. Special attention to high-touch surfaces and air quality improvement.',
    location: 'Downtown Towers, Floor 42, Sheikh Zayed Road, Dubai',
    service_type: 'Office Deep Cleaning',
    start_date: '2026-01-28T08:00:00',
    end_date: '2026-01-28T16:00:00',
    scheduled_date: '2026-01-28',
    status: 'In Progress',
    priority: 'High',
    budget: 4500,
    actual_cost: 2100,
    team_size: 4,
    assigned_team_leader: 'Ahmed Hassan',
    notes: 'VIP client - ensure premium service quality. Client prefers eco-friendly cleaning products. Building security requires ID badges.',
    tasks: [
      { id: 't1', task_description: 'Floor Scrubbing & Polishing', status: 'Completed', progress: 100, assigned_to: 'emp_1', completed_at: '2026-01-28T10:00:00' },
      { id: 't2', task_description: 'Window Cleaning (Interior)', status: 'In Progress', progress: 60, assigned_to: 'emp_2' },
      { id: 't3', task_description: 'Furniture Sanitization', status: 'In Progress', progress: 45, assigned_to: 'emp_1' },
      { id: 't4', task_description: 'Carpet Deep Cleaning', status: 'Pending', progress: 0, assigned_to: 'emp_3' },
      { id: 't5', task_description: 'Restroom Deep Clean', status: 'Pending', progress: 0, assigned_to: 'emp_4' },
      { id: 't6', task_description: 'Kitchen Area Sanitization', status: 'Pending', progress: 0, assigned_to: 'emp_2' },
      { id: 't7', task_description: 'Conference Room Cleaning', status: 'Pending', progress: 0, assigned_to: 'emp_3' },
      { id: 't8', task_description: 'Final Quality Inspection', status: 'Pending', progress: 0, assigned_to: 'emp_1' }
    ],
    team_assignments: [
      { id: 'ta1', employee_id: 'emp_1', employee_name: 'Ahmed Hassan', role: 'Team Leader', status: 'In Progress', start_time: '08:00', hours_worked: 4.5, performance_rating: 4.9 },
      { id: 'ta2', employee_id: 'emp_2', employee_name: 'Sarah Johnson', role: 'Cleaning Specialist', status: 'In Progress', start_time: '08:00', hours_worked: 4.5 },
      { id: 'ta3', employee_id: 'emp_3', employee_name: 'Mohammed Ali', role: 'Floor Specialist', status: 'Confirmed', start_time: '10:00' },
      { id: 'ta4', employee_id: 'emp_4', employee_name: 'Lisa Wong', role: 'Sanitization Expert', status: 'Confirmed', start_time: '10:00' }
    ],
    services: [
      { id: 's1', service_name: 'Deep Cleaning Service', quantity: 1, unit_price: 3000, unit: 'Service', total: 3000 },
      { id: 's2', service_name: 'Window Polishing', quantity: 20, unit_price: 75, unit: 'Windows', total: 1500 }
    ],
    checklists: [
      { 
        id: 'cl1', 
        checklist_title: 'Pre-Job Safety Check', 
        checklist_type: 'pre_job',
        items: [
          { item: 'PPE Equipment Check', completed: true },
          { item: 'Chemical Safety Review', completed: true },
          { item: 'Equipment Functionality Test', completed: true },
          { item: 'Client Site Access Confirmed', completed: true },
          { item: 'Team Briefing Complete', completed: true }
        ]
      },
      {
        id: 'cl2',
        checklist_title: 'Execution Checklist',
        checklist_type: 'execution',
        items: [
          { item: 'Dust all surfaces', completed: true },
          { item: 'Vacuum carpets', completed: true },
          { item: 'Mop hard floors', completed: false },
          { item: 'Clean windows', completed: false },
          { item: 'Sanitize touchpoints', completed: false },
          { item: 'Empty trash bins', completed: true },
          { item: 'Clean restrooms', completed: false }
        ]
      },
      {
        id: 'cl3',
        checklist_title: 'Post-Job Quality Check',
        checklist_type: 'post_job',
        items: [
          { item: 'All areas cleaned', completed: false },
          { item: 'Equipment returned', completed: false },
          { item: 'Client sign-off obtained', completed: false },
          { item: 'Photos uploaded', completed: false }
        ]
      }
    ],
    created_at: '2026-01-25T10:00:00',
    updated_at: '2026-01-28T12:30:00'
  },
  {
    id: '2',
    job_number: 'JOB-2026-002',
    client_id: 'client_2',
    client_name: 'Marina Heights Residence',
    client_contact: 'Mrs. Fatima Al Mansouri',
    client_phone: '+971 50 234 5678',
    client_email: 'fatima@marinaheights.ae',
    title: 'Villa AC Duct Cleaning',
    description: 'Complete AC duct cleaning and sanitization for luxury villa including all bedrooms, living areas, and common spaces.',
    location: 'Marina Heights, Villa 12, Dubai Marina',
    service_type: 'AC Duct Cleaning',
    start_date: '2026-01-29T10:00:00',
    end_date: '2026-01-29T14:00:00',
    scheduled_date: '2026-01-29',
    status: 'Scheduled',
    priority: 'Medium',
    budget: 2800,
    actual_cost: 0,
    team_size: 2,
    assigned_team_leader: 'Michael Chen',
    notes: 'Resident will be present. Ensure minimal noise.',
    tasks: [
      { id: 't6', task_description: 'Inspect AC Units', status: 'Pending', progress: 0, assigned_to: 'emp_5' },
      { id: 't7', task_description: 'Duct Vacuuming', status: 'Pending', progress: 0, assigned_to: 'emp_5' },
      { id: 't8', task_description: 'Sanitization Spray', status: 'Pending', progress: 0, assigned_to: 'emp_6' },
      { id: 't9', task_description: 'Final Inspection', status: 'Pending', progress: 0, assigned_to: 'emp_5' }
    ],
    team_assignments: [
      { id: 'ta5', employee_id: 'emp_5', employee_name: 'Michael Chen', role: 'AC Technician Lead', status: 'Confirmed' },
      { id: 'ta6', employee_id: 'emp_6', employee_name: 'David Park', role: 'AC Technician', status: 'Confirmed' }
    ],
    services: [
      { id: 's3', service_name: 'AC Duct Cleaning', quantity: 8, unit_price: 300, unit: 'Ducts', total: 2400 },
      { id: 's4', service_name: 'Sanitization Treatment', quantity: 1, unit_price: 400, unit: 'Service', total: 400 }
    ],
    checklists: [
      {
        id: 'cl3',
        checklist_title: 'Pre-Job Equipment Check',
        checklist_type: 'pre_job',
        items: [
          { item: 'HVAC Tools Prepared', completed: false },
          { item: 'Sanitization Chemicals Ready', completed: false },
          { item: 'Vehicle Loaded', completed: false }
        ]
      }
    ],
    created_at: '2026-01-26T14:00:00',
    updated_at: '2026-01-27T09:00:00'
  },
  {
    id: '3',
    job_number: 'JOB-2026-003',
    client_id: 'client_3',
    client_name: 'Emirates Medical Center',
    client_contact: 'Dr. Khalid Al Nuaimi',
    client_phone: '+971 50 345 6789',
    client_email: 'khalid@emiratesmedical.ae',
    title: 'Hospital Wing Sanitization',
    description: 'Critical sanitization of hospital wing including patient rooms, corridors, and waiting areas. Strict medical-grade protocols required.',
    location: 'Al Baraha Medical District, Dubai',
    service_type: 'Medical Facility Cleaning',
    start_date: '2026-01-30T06:00:00',
    end_date: '2026-01-30T14:00:00',
    scheduled_date: '2026-01-30',
    status: 'Pending',
    priority: 'Urgent',
    budget: 8500,
    actual_cost: 0,
    team_size: 6,
    assigned_team_leader: 'Ahmed Hassan',
    notes: 'Medical-grade protocols required. All team members must have healthcare cleaning certification.',
    tasks: [
      { id: 't10', task_description: 'Patient Room Sanitization', status: 'Pending', progress: 0 },
      { id: 't11', task_description: 'Corridor Disinfection', status: 'Pending', progress: 0 },
      { id: 't12', task_description: 'Waiting Area Deep Clean', status: 'Pending', progress: 0 },
      { id: 't13', task_description: 'Restroom Sanitization', status: 'Pending', progress: 0 },
      { id: 't14', task_description: 'Floor Scrubbing', status: 'Pending', progress: 0 },
      { id: 't15', task_description: 'Final Quality Inspection', status: 'Pending', progress: 0 }
    ],
    team_assignments: [
      { id: 'ta7', employee_id: 'emp_1', employee_name: 'Ahmed Hassan', role: 'Team Leader', status: 'Pending' },
      { id: 'ta8', employee_id: 'emp_2', employee_name: 'Sarah Johnson', role: 'Medical Cleaning Specialist', status: 'Pending' }
    ],
    services: [
      { id: 's5', service_name: 'Hospital Sanitization', quantity: 1, unit_price: 6500, unit: 'Wing', total: 6500 },
      { id: 's6', service_name: 'Biohazard Disposal', quantity: 1, unit_price: 2000, unit: 'Service', total: 2000 }
    ],
    checklists: [],
    created_at: '2026-01-27T08:00:00',
    updated_at: '2026-01-28T10:00:00'
  },
  {
    id: '4',
    job_number: 'JOB-2026-004',
    client_id: 'client_4',
    client_name: 'Palm Jumeirah Villa',
    client_contact: 'Mr. Abdullah Al Maktoumi',
    client_phone: '+971 50 456 7890',
    client_email: 'abdullah@palmvilla.ae',
    title: 'Luxury Villa Deep Cleaning',
    description: 'Complete deep cleaning of 6-bedroom luxury villa including all living spaces, kitchen, bathrooms, and outdoor areas.',
    location: 'Frond P, Palm Jumeirah, Dubai',
    service_type: 'Villa Deep Cleaning',
    start_date: '2026-01-25T08:00:00',
    end_date: '2026-01-25T18:00:00',
    scheduled_date: '2026-01-25',
    status: 'Completed',
    priority: 'High',
    budget: 5200,
    actual_cost: 4850,
    team_size: 5,
    assigned_team_leader: 'Sarah Johnson',
    notes: 'Client was very satisfied. Left 5-star review.',
    tasks: [
      { id: 't16', task_description: 'Kitchen Deep Clean', status: 'Completed', progress: 100, completed_at: '2026-01-25T11:00:00' },
      { id: 't17', task_description: 'Bathroom Sanitization (6)', status: 'Completed', progress: 100, completed_at: '2026-01-25T13:00:00' },
      { id: 't18', task_description: 'Bedroom Cleaning (6)', status: 'Completed', progress: 100, completed_at: '2026-01-25T15:00:00' },
      { id: 't19', task_description: 'Living Areas', status: 'Completed', progress: 100, completed_at: '2026-01-25T16:00:00' },
      { id: 't20', task_description: 'Outdoor/Pool Area', status: 'Completed', progress: 100, completed_at: '2026-01-25T17:30:00' }
    ],
    team_assignments: [
      { id: 'ta9', employee_id: 'emp_2', employee_name: 'Sarah Johnson', role: 'Team Leader', status: 'Completed', start_time: '08:00', end_time: '18:00', hours_worked: 10, performance_rating: 4.8 },
      { id: 'ta10', employee_id: 'emp_1', employee_name: 'Ahmed Hassan', role: 'Senior Cleaner', status: 'Completed', start_time: '08:00', end_time: '18:00', hours_worked: 10, performance_rating: 4.9 }
    ],
    services: [
      { id: 's7', service_name: 'Villa Deep Cleaning', quantity: 1, unit_price: 4500, unit: 'Service', total: 4500 },
      { id: 's8', service_name: 'Pool Area Cleaning', quantity: 1, unit_price: 700, unit: 'Service', total: 700 }
    ],
    checklists: [
      {
        id: 'cl4',
        checklist_title: 'Post-Job Quality Check',
        checklist_type: 'post_job',
        items: [
          { item: 'All areas cleaned', completed: true },
          { item: 'Equipment returned', completed: true },
          { item: 'Client sign-off obtained', completed: true },
          { item: 'Photos uploaded', completed: true }
        ],
        completed_by: 'Sarah Johnson'
      }
    ],
    created_at: '2026-01-22T09:00:00',
    updated_at: '2026-01-25T18:30:00'
  },
  {
    id: '5',
    job_number: 'JOB-2026-005',
    client_id: 'client_5',
    client_name: 'JBR Shopping Mall',
    client_contact: 'Mr. Youssef Al Marzooqi',
    client_phone: '+971 50 567 8901',
    client_email: 'youssef@jbrmall.ae',
    title: 'Commercial Floor Maintenance',
    description: 'Overnight floor maintenance including scrubbing, polishing, and waxing for main corridors and food court area.',
    location: 'JBR Walk, Dubai',
    service_type: 'Floor Maintenance',
    start_date: '2026-01-31T22:00:00',
    end_date: '2026-02-01T06:00:00',
    scheduled_date: '2026-01-31',
    status: 'Scheduled',
    priority: 'Medium',
    budget: 6800,
    actual_cost: 0,
    team_size: 8,
    assigned_team_leader: 'Mohammed Ali',
    notes: 'Night shift - mall closes at 10 PM. Must complete before 6 AM opening.',
    tasks: [
      { id: 't21', task_description: 'Floor Stripping', status: 'Pending', progress: 0 },
      { id: 't22', task_description: 'Deep Scrubbing', status: 'Pending', progress: 0 },
      { id: 't23', task_description: 'Wax Application', status: 'Pending', progress: 0 },
      { id: 't24', task_description: 'Buffing & Polishing', status: 'Pending', progress: 0 }
    ],
    team_assignments: [
      { id: 'ta11', employee_id: 'emp_3', employee_name: 'Mohammed Ali', role: 'Floor Specialist Lead', status: 'Confirmed' }
    ],
    services: [
      { id: 's9', service_name: 'Commercial Floor Maintenance', quantity: 5000, unit_price: 1.2, unit: 'Sq.Ft', total: 6000 },
      { id: 's10', service_name: 'Premium Wax Treatment', quantity: 1, unit_price: 800, unit: 'Service', total: 800 }
    ],
    checklists: [],
    created_at: '2026-01-28T11:00:00',
    updated_at: '2026-01-28T11:00:00'
  }
];
