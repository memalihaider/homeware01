'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Menu,
  X,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  Search,
  CheckCircle,
  AlertCircle,
  Users,
  Play,
  Pause,
  Eye,
  Camera,
  ClipboardList,
  AlertTriangle,
  XCircle,
  Timer,
  Target,
  Loader
} from 'lucide-react';
import Link from 'next/link';
import { getStoredSession, type UserSession } from '@/lib/auth';
import { EmployeeSidebar } from '../_components/sidebar';
import { MOCK_EMPLOYEE_JOBS, type Job, type JobStatus, type JobPriority } from './lib/employee-jobs-data';

// Fallback mock data if API fails
const mockJobs: Job[] = [
  {
    id: '1',
    job_number: 'JOB-2026-001',
    client_id: 'client_1',
    client_name: 'Global Tech Solutions',
    title: 'Executive Office Deep Clean',
    description: 'Comprehensive sanitization of executive suites including private offices, conference rooms, and common areas. Special attention to high-touch surfaces.',
    location: 'Downtown Towers, Floor 42, Dubai',
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
    notes: 'VIP client - ensure premium service quality',
    tasks: [
      { id: 't1', task_description: 'Floor Scrubbing & Polishing', status: 'Completed', progress: 100, assigned_to: 'emp_1' },
      { id: 't2', task_description: 'Window Cleaning (Interior)', status: 'In Progress', progress: 60, assigned_to: 'emp_2' },
      { id: 't3', task_description: 'Furniture Sanitization', status: 'In Progress', progress: 45, assigned_to: 'emp_1' },
      { id: 't4', task_description: 'Carpet Deep Cleaning', status: 'Pending', progress: 0, assigned_to: 'emp_3' },
      { id: 't5', task_description: 'Restroom Deep Clean', status: 'Pending', progress: 0, assigned_to: 'emp_4' }
    ],
    team_assignments: [
      { id: 'ta1', employee_id: 'emp_1', employee_name: 'Ahmed Hassan', role: 'Team Leader', status: 'In Progress', start_time: '08:00', hours_worked: 4.5 },
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
          { item: 'Client Site Access Confirmed', completed: true }
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
          { item: 'Sanitize touchpoints', completed: false }
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

export default function EmployeeJobsPage() {
  const router = useRouter();
  const [session, setSession] = useState<UserSession | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(MOCK_EMPLOYEE_JOBS);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const storedSession = getStoredSession();
    if (!storedSession || storedSession.portal !== 'employee') {
      router.push('/login/employee');
      return;
    }
    setSession(storedSession);

    // Fetch jobs assigned to this employee from API
    const fetchJobs = async () => {
      try {
        // Get employee name from session
        const employeeName = storedSession.userName || storedSession.email;
        
        const response = await fetch(`/api/jobs?employee=${encodeURIComponent(employeeName)}`);
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data && result.data.length > 0) {
            setJobs(result.data);
          } else {
            // Fallback to mock data if no jobs found from API
            setJobs(MOCK_EMPLOYEE_JOBS);
          }
        } else {
          // Fallback to mock data if API fails
          setJobs(MOCK_EMPLOYEE_JOBS);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Fallback to mock data on error
        setJobs(MOCK_EMPLOYEE_JOBS);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [router]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.job_number.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || job.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [jobs, searchTerm, statusFilter, priorityFilter]);

  // Statistics
  const stats = useMemo(() => ({
    total: jobs.length,
    pending: jobs.filter(j => j.status === 'Pending').length,
    scheduled: jobs.filter(j => j.status === 'Scheduled').length,
    inProgress: jobs.filter(j => j.status === 'In Progress').length,
    completed: jobs.filter(j => j.status === 'Completed').length,
    totalTasks: jobs.reduce((sum, j) => sum + j.tasks.length, 0),
    completedTasks: jobs.reduce((sum, j) => sum + j.tasks.filter(t => t.status === 'Completed').length, 0),
    urgentJobs: jobs.filter(j => j.priority === 'Urgent' || j.priority === 'High').length
  }), [jobs]);

  // Calculate job progress
  const getJobProgress = (job: Job) => {
    if (job.tasks.length === 0) return 0;
    const totalProgress = job.tasks.reduce((sum, task) => sum + task.progress, 0);
    return Math.round(totalProgress / job.tasks.length);
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Scheduled': return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
      case 'Pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'On Hold': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getPriorityColor = (priority: JobPriority) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-500/20 text-red-400';
      case 'High': return 'bg-orange-500/20 text-orange-400';
      case 'Medium': return 'bg-amber-500/20 text-amber-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'In Progress': return <Play className="w-4 h-4" />;
      case 'Scheduled': return <Calendar className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'On Hold': return <Pause className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          <p className="text-slate-400">Loading your assigned jobs...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          <p className="text-slate-400">Fetching your assigned jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <EmployeeSidebar session={session} open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-slate-800/95 backdrop-blur-xl border-b border-slate-700/50">
          <div className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Briefcase className="w-7 h-7 text-violet-400" />
                  My Jobs
                </h1>
                <p className="text-sm text-slate-400 mt-1">Jobs assigned by admin - manage and track your cleaning jobs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-violet-500/10 rounded-lg border border-violet-500/20">
                <Target className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-violet-300">{stats.completedTasks}/{stats.totalTasks} Tasks Done</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-7xl mx-auto space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-violet-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-violet-500/10 rounded-lg">
                  <Briefcase className="w-5 h-5 text-violet-400" />
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Total</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-slate-400 mt-1">Assigned Jobs</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-blue-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Play className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Active</span>
              </div>
              <p className="text-3xl font-bold text-blue-400">{stats.inProgress}</p>
              <p className="text-sm text-slate-400 mt-1">In Progress</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Done</span>
              </div>
              <p className="text-3xl font-bold text-emerald-400">{stats.completed}</p>
              <p className="text-sm text-slate-400 mt-1">Completed</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-red-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Priority</span>
              </div>
              <p className="text-3xl font-bold text-red-400">{stats.urgentJobs}</p>
              <p className="text-sm text-slate-400 mt-1">High/Urgent</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search by job title, client, location, or job number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-violet-500 min-w-[140px]"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-violet-500 min-w-[140px]"
              >
                <option value="All">All Priority</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map(job => {
              const progress = getJobProgress(job);
              const completedTasks = job.tasks.filter(t => t.status === 'Completed').length;
              
              return (
                <div
                  key={job.id}
                  className={`bg-gradient-to-br from-slate-800 to-slate-800/50 border rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-violet-500/5 ${
                    selectedJob?.id === job.id ? 'border-violet-500' : 'border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  {/* Job Header */}
                  <div
                    onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                    className="p-6 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="text-xs font-mono text-slate-500 bg-slate-700/50 px-2 py-1 rounded">
                            {job.job_number}
                          </span>
                          <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium ${getStatusColor(job.status)}`}>
                            {getStatusIcon(job.status)}
                            {job.status}
                          </span>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getPriorityColor(job.priority)}`}>
                            {job.priority}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 truncate">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-slate-500" />
                            {job.client_name}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            {new Date(job.scheduled_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-3xl font-bold text-violet-400">{progress}%</div>
                        <div className="w-28 bg-slate-700 rounded-full h-2 mt-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              progress === 100 ? 'bg-emerald-500' : 'bg-violet-500'
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{completedTasks}/{job.tasks.length} tasks</p>
                      </div>

                      <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${
                        selectedJob?.id === job.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>

                  {/* Expanded Job Details */}
                  {selectedJob?.id === job.id && (
                    <div className="border-t border-slate-700/50 bg-slate-800/30">
                      <div className="p-6 space-y-6">
                        {/* Description */}
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Description</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">{job.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Job Details */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Job Details</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-slate-700/30 rounded-lg p-3">
                                <p className="text-xs text-slate-500 mb-1">Service Type</p>
                                <p className="text-sm text-white font-medium">{job.service_type}</p>
                              </div>
                              <div className="bg-slate-700/30 rounded-lg p-3">
                                <p className="text-xs text-slate-500 mb-1">Team Leader</p>
                                <p className="text-sm text-white font-medium">{job.assigned_team_leader}</p>
                              </div>
                              <div className="bg-slate-700/30 rounded-lg p-3">
                                <p className="text-xs text-slate-500 mb-1">Team Size</p>
                                <p className="text-sm text-white font-medium">{job.team_size} members</p>
                              </div>
                              <div className="bg-slate-700/30 rounded-lg p-3">
                                <p className="text-xs text-slate-500 mb-1">Time</p>
                                <p className="text-sm text-white font-medium">
                                  {new Date(job.start_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                                  {new Date(job.end_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Tasks */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Tasks ({completedTasks}/{job.tasks.length})</h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                              {job.tasks.map(task => (
                                <div
                                  key={task.id}
                                  className={`flex items-center justify-between p-3 rounded-lg ${
                                    task.status === 'Completed' 
                                      ? 'bg-emerald-500/10 border border-emerald-500/20' 
                                      : task.status === 'In Progress'
                                      ? 'bg-blue-500/10 border border-blue-500/20'
                                      : 'bg-slate-700/30 border border-slate-600/20'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    {task.status === 'Completed' ? (
                                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    ) : task.status === 'In Progress' ? (
                                      <Timer className="w-4 h-4 text-blue-400 animate-pulse" />
                                    ) : (
                                      <Clock className="w-4 h-4 text-slate-500" />
                                    )}
                                    <span className={`text-sm ${
                                      task.status === 'Completed' ? 'text-emerald-300' : 'text-slate-300'
                                    }`}>
                                      {task.task_description}
                                    </span>
                                  </div>
                                  <span className={`text-xs font-medium ${
                                    task.status === 'Completed' ? 'text-emerald-400' : 
                                    task.status === 'In Progress' ? 'text-blue-400' : 'text-slate-500'
                                  }`}>
                                    {task.progress}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Team Assignments */}
                        {job.team_assignments.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Team Members</h4>
                            <div className="flex flex-wrap gap-3">
                              {job.team_assignments.map(member => (
                                <div
                                  key={member.id}
                                  className="flex items-center gap-3 bg-slate-700/30 rounded-lg px-4 py-2"
                                >
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                    {member.employee_name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div>
                                    <p className="text-sm text-white font-medium">{member.employee_name}</p>
                                    <p className="text-xs text-slate-500">{member.role}</p>
                                  </div>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    member.status === 'In Progress' || member.status === 'Completed' 
                                      ? 'bg-emerald-500/20 text-emerald-400' 
                                      : 'bg-slate-600/50 text-slate-400'
                                  }`}>
                                    {member.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Services */}
                        {job.services.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Services</h4>
                            <div className="bg-slate-700/20 rounded-xl overflow-hidden">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-slate-700/50">
                                    <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider p-3">Service</th>
                                    <th className="text-center text-xs font-medium text-slate-500 uppercase tracking-wider p-3">Qty</th>
                                    <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider p-3">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {job.services.map(service => (
                                    <tr key={service.id} className="border-b border-slate-700/30 last:border-0">
                                      <td className="p-3 text-sm text-slate-300">{service.service_name}</td>
                                      <td className="p-3 text-sm text-slate-400 text-center">{service.quantity} {service.unit}</td>
                                      <td className="p-3 text-sm text-white font-medium text-right">AED {service.total.toLocaleString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {job.notes && (
                          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-amber-300 mb-1">Important Notes</p>
                                <p className="text-sm text-amber-200/80">{job.notes}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700/50">
                          <Link
                            href={`/employee/jobs/${job.id}`}
                            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View Full Details
                          </Link>
                          {job.status === 'In Progress' && (
                            <>
                              <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors">
                                <Camera className="w-4 h-4" />
                                Upload Photo
                              </button>
                              <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors">
                                <ClipboardList className="w-4 h-4" />
                                Update Tasks
                              </button>
                            </>
                          )}
                          {job.status === 'Scheduled' && (
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors">
                              <Play className="w-4 h-4" />
                              Start Job
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredJobs.length === 0 && (
              <div className="text-center py-16 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
                <p className="text-slate-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
