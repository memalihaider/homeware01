'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Play,
  Pause,
  Camera,
  ClipboardList,
  AlertTriangle,
  XCircle,
  Timer,
  DollarSign,
  FileText,
  MessageSquare,
  Upload,
  CheckSquare,
  Circle,
  Star,
  Phone,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import { getStoredSession, type UserSession } from '@/lib/auth';
import { MOCK_EMPLOYEE_JOBS, type Job } from '../lib/employee-jobs-data';

export default function EmployeeJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [session, setSession] = useState<UserSession | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'team' | 'checklists'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSession = getStoredSession();
    if (!storedSession || storedSession.portal !== 'employee') {
      router.push('/login/employee');
      return;
    }
    setSession(storedSession);
    
    // Fetch job from API first, then fallback to mock data
    const fetchJob = async () => {
      try {
        const employeeName = storedSession.userName || storedSession.email;
        const response = await fetch(`/api/jobs?employee=${encodeURIComponent(employeeName)}`);
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            // Find job by ID from API results
            const foundJob = result.data.find((j: Job) => j.id === id);
            if (foundJob) {
              setJob(foundJob);
              setLoading(false);
              return;
            }
          }
        }
      } catch (error) {
        console.error('Error fetching job from API:', error);
      }

      // Fallback to mock data if API fails or job not found
      const foundJob = MOCK_EMPLOYEE_JOBS.find(j => j.id === id);
      if (!foundJob) {
        router.push('/employee/jobs');
        return;
      }
      
      setJob(foundJob);
      setLoading(false);
    };

    fetchJob();
  }, [router, id]);

  const getStatusColor = (status: Job['status']) => {
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

  const getPriorityColor = (priority: Job['priority']) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-500/20 text-red-400';
      case 'High': return 'bg-orange-500/20 text-orange-400';
      case 'Medium': return 'bg-amber-500/20 text-amber-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getTaskStatusIcon = (status: Job['tasks'][0]['status']) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'In Progress': return <Timer className="w-5 h-5 text-blue-400 animate-pulse" />;
      case 'Pending': return <Circle className="w-5 h-5 text-slate-500" />;
      default: return <Circle className="w-5 h-5 text-slate-500" />;
    }
  };

  const getJobProgress = () => {
    if (!job || !job.tasks || job.tasks.length === 0) return 0;
    const totalProgress = job.tasks.reduce((sum, task) => sum + task.progress, 0);
    return Math.round(totalProgress / job.tasks.length);
  };

  if (loading || !session || !job) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  const progress = job ? getJobProgress() : 0;
  const completedTasks = job?.tasks?.filter(t => t.status === 'Completed').length || 0;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-800/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/employee/jobs"
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-slate-500 bg-slate-700/50 px-2 py-1 rounded">
                    {job?.job_number || 'N/A'}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border font-medium ${job?.status ? getStatusColor(job.status) : 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>
                    {job?.status || 'Unknown'}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${job?.priority ? getPriorityColor(job.priority) : 'bg-slate-500/20 text-slate-400'}`}>
                    {job?.priority || 'Unknown'}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-white">{job?.title || 'Job Details'}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {job?.status === 'In Progress' && (
                <>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                    <Camera className="w-4 h-4" />
                    <span className="hidden sm:inline">Upload Photo</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                    <CheckSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">Complete Job</span>
                  </button>
                </>
              )}
              {job?.status === 'Scheduled' && (
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                  <Play className="w-4 h-4" />
                  Start Job
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-800/50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Overall Progress</span>
            <span className="text-sm font-semibold text-white">{progress}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${progress === 100 ? 'bg-emerald-500' : 'bg-violet-500'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-slate-500">{completedTasks} of {job.tasks.length} tasks completed</span>
            <span className="text-xs text-slate-500">
              {new Date(job.start_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
              {new Date(job.end_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {(['overview', 'tasks', 'team', 'checklists'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-violet-400 border-violet-500'
                    : 'text-slate-400 border-transparent hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Job Description</h3>
                <p className="text-slate-300 leading-relaxed">{job?.description || 'No description available'}</p>
              </div>

              {/* Services */}
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
                <div className="space-y-3">
                  {job?.services?.map(service => (
                    <div key={service.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{service.service_name}</p>
                        <p className="text-sm text-slate-400">{service.quantity} {service.unit} × AED {service.unit_price}</p>
                      </div>
                      <p className="text-lg font-semibold text-white">AED {service.total.toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <p className="text-slate-400 font-medium">Total Budget</p>
                    <p className="text-xl font-bold text-violet-400">AED {job?.budget?.toLocaleString() || '0'}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {job.notes && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-amber-300 mb-2">Important Notes</h3>
                      <p className="text-amber-200/80">{job.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Info Card */}
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Job Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="text-white">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">Scheduled Date</p>
                      <p className="text-white">
                        {new Date(job.scheduled_date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">Time</p>
                      <p className="text-white">
                        {new Date(job.start_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(job.end_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">Team Size</p>
                      <p className="text-white">{job.team_size} members</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">Service Type</p>
                      <p className="text-white">{job.service_type}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Client Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-medium text-white">{job.client_name}</p>
                    {job.client_contact && (
                      <p className="text-sm text-slate-400">{job.client_contact}</p>
                    )}
                  </div>
                  {job.client_phone && (
                    <a href={`tel:${job.client_phone}`} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <Phone className="w-5 h-5 text-violet-400" />
                      <span className="text-white">{job.client_phone}</span>
                    </a>
                  )}
                  {job.client_email && (
                    <a href={`mailto:${job.client_email}`} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <Mail className="w-5 h-5 text-violet-400" />
                      <span className="text-white">{job.client_email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Tasks ({completedTasks}/{job.tasks.length})</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-slate-400">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-slate-400">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                  <span className="text-sm text-slate-400">Pending</span>
                </div>
              </div>
            </div>

            {job?.tasks?.map((task, index) => (
              <div
                key={task.id}
                className={`bg-slate-800/50 rounded-xl border p-5 transition-all ${
                  task.status === 'Completed' 
                    ? 'border-emerald-500/30' 
                    : task.status === 'In Progress'
                    ? 'border-blue-500/30'
                    : 'border-slate-700/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getTaskStatusIcon(task.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className={`font-medium ${task.status === 'Completed' ? 'text-emerald-300' : 'text-white'}`}>
                          {index + 1}. {task.task_description}
                        </h4>
                        {task.completed_at && (
                          <p className="text-sm text-slate-500 mt-1">
                            Completed at {new Date(task.completed_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${
                          task.status === 'Completed' ? 'text-emerald-400' : 
                          task.status === 'In Progress' ? 'text-blue-400' : 'text-slate-500'
                        }`}>
                          {task.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            task.status === 'Completed' ? 'bg-emerald-500' : 
                            task.status === 'In Progress' ? 'bg-blue-500' : 'bg-slate-600'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {task.status === 'In Progress' && (
                      <div className="mt-4 flex gap-2">
                        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors">
                          Update Progress
                        </button>
                        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition-colors">
                          Mark Complete
                        </button>
                      </div>
                    )}
                    {task.status === 'Pending' && (
                      <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                        Start Task
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="grid md:grid-cols-2 gap-4">
            {job?.team_assignments?.map(member => (
              <div
                key={member.id}
                className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                    {member?.employee_name?.split(' ').map(n => n[0]).join('') || '?'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{member.employee_name}</h4>
                        <p className="text-violet-400">{member.role}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        member.status === 'In Progress' || member.status === 'Completed' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-slate-600/50 text-slate-400'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {member.start_time && (
                        <div>
                          <p className="text-xs text-slate-500">Start Time</p>
                          <p className="text-sm text-white">{member.start_time}</p>
                        </div>
                      )}
                      {member.hours_worked && (
                        <div>
                          <p className="text-xs text-slate-500">Hours Worked</p>
                          <p className="text-sm text-white">{member.hours_worked}h</p>
                        </div>
                      )}
                      {member.performance_rating && (
                        <div className="col-span-2">
                          <p className="text-xs text-slate-500">Performance Rating</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= member.performance_rating! ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-white ml-2">{member.performance_rating}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'checklists' && (
          <div className="space-y-6">
            {job?.checklists?.map(checklist => {
              const completedItems = checklist?.items?.filter(i => i.completed).length || 0;
              const checklistProgress = checklist?.items?.length ? Math.round((completedItems / checklist.items.length) * 100) : 0;
              
              return (
                <div key={checklist.id} className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                  <div className="p-6 border-b border-slate-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <ClipboardList className={`w-5 h-5 ${
                          checklist.checklist_type === 'pre_job' ? 'text-amber-400' :
                          checklist.checklist_type === 'execution' ? 'text-blue-400' : 'text-emerald-400'
                        }`} />
                        <h3 className="text-lg font-semibold text-white">{checklist.checklist_title}</h3>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full uppercase font-medium ${
                        checklist.checklist_type === 'pre_job' ? 'bg-amber-500/20 text-amber-400' :
                        checklist.checklist_type === 'execution' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {checklist.checklist_type.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            checklistProgress === 100 ? 'bg-emerald-500' : 'bg-violet-500'
                          }`}
                          style={{ width: `${checklistProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-400">{completedItems}/{checklist.items.length}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2">
                      {checklist?.items?.map((item, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg ${
                            item.completed ? 'bg-emerald-500/10' : 'bg-slate-700/30'
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-500" />
                          )}
                          <span className={`${item.completed ? 'text-emerald-300' : 'text-slate-300'}`}>
                            {item.item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {job.checklists.length === 0 && (
              <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <ClipboardList className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No checklists available for this job</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
