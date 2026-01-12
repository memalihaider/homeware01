'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  User,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Award,
  FileText,
  LogOut,
  Settings,
  Bell,
  ChevronRight,
  BarChart3,
  Wallet,
  CreditCard,
  PieChart,
  Activity,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Globe,
  File,
  AlertTriangle,
  CheckCheck,
  Camera
} from 'lucide-react'

interface Task {
  id: number
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  assignedDate: string
  project: string
  estimatedHours: number
  actualHours?: number
}

interface Attendance {
  id: number
  date: string
  checkIn: string
  checkOut?: string
  totalHours: number
  status: 'present' | 'absent' | 'late' | 'half-day'
  location: string
}

interface PayrollRecord {
  id: number
  month: string
  year: number
  basicSalary: number
  allowances: number
  bonuses: number
  deductions: number
  netSalary: number
  paymentDate: string
  status: 'paid' | 'pending' | 'processing'
}

interface Bonus {
  id: number
  title: string
  amount: number
  type: 'performance' | 'project' | 'annual' | 'special'
  date: string
  description: string
  status: 'earned' | 'pending' | 'paid'
}

export default function EmployeeDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'tasks' | 'attendance' | 'payroll' | 'bonuses' | 'visa' | 'documents'>('profile')
  const [employee, setEmployee] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock employee data based on login
  useEffect(() => {
    const employeeId = sessionStorage.getItem('homeware_employee_id') || localStorage.getItem('homeware_employee_id')
    const employeeName = sessionStorage.getItem('homeware_employee_name') || localStorage.getItem('homeware_employee_name')
    const employeeEmail = sessionStorage.getItem('homeware_employee_email') || localStorage.getItem('homeware_employee_email')

    if (!employeeId) {
      router.push('/login/employee')
      return
    }

    // Mock employee data
    const mockEmployees = {
      'EMP001': {
        id: 'EMP001',
        name: 'John Doe',
        email: 'john.doe@homeware.ae',
        position: 'Senior Cleaner',
        department: 'Operations',
        joinDate: '2023-01-15',
        manager: 'Sarah Johnson',
        phone: '+971 50 123 4567',
        location: 'Dubai Main Office',
        profileImage: null,
        salary: {
          basic: 8500,
          housing: 1000,
          food: 200,
          allowances: 1200,
          total: 9700
        },
        visa: {
          visaNumber: 'AE1234567',
          issueDate: '2023-01-15',
          expiryDate: '2026-01-14',
          sponsorName: 'Homeware LLC',
          status: 'active'
        },
        documents: [
          {
            id: '1',
            fileName: 'Passport_JohnDoe',
            fileType: 'pdf',
            uploadDate: '2023-01-15',
            documentType: 'passport',
            status: 'valid',
            fileUrl: '#'
          },
          {
            id: '2',
            fileName: 'Visa_Employment_2023',
            fileType: 'pdf',
            uploadDate: '2023-01-15',
            expiryDate: '2026-01-14',
            documentType: 'visa',
            status: 'valid',
            fileUrl: '#'
          }
        ],
        bonuses: [
          {
            id: 1,
            title: 'Performance Bonus - Q4',
            amount: 500,
            type: 'performance',
            date: '2025-12-15',
            month: 'December',
            year: 2025,
            description: 'Outstanding performance',
            status: 'paid'
          }
        ]
      },
      'EMP002': {
        id: 'EMP002',
        name: 'Sarah Smith',
        email: 'sarah.smith@homeware.ae',
        position: 'Team Lead',
        department: 'Operations',
        joinDate: '2022-08-20',
        manager: 'Mike Wilson',
        phone: '+971 50 987 6543',
        location: 'Dubai Main Office',
        profileImage: null,
        salary: {
          basic: 12000,
          housing: 1500,
          food: 300,
          allowances: 1800,
          total: 13800
        }
      },
      'EMP003': {
        id: 'EMP003',
        name: 'Mike Johnson',
        email: 'mike.johnson@homeware.ae',
        position: 'Operations Manager',
        department: 'Operations',
        joinDate: '2021-03-10',
        manager: 'David Brown',
        phone: '+971 50 555 1234',
        location: 'Dubai Main Office',
        profileImage: null,
        salary: {
          basic: 18000,
          allowances: 2500,
          total: 20500
        }
      },
      'EMP004': {
        id: 'EMP004',
        name: 'Lisa Brown',
        email: 'lisa.brown@homeware.ae',
        position: 'HR Coordinator',
        department: 'Human Resources',
        joinDate: '2023-06-01',
        manager: 'Emma Davis',
        phone: '+971 50 777 8888',
        location: 'Dubai Main Office',
        profileImage: null,
        salary: {
          basic: 9500,
          allowances: 1400,
          total: 10900
        }
      }
    }

    setEmployee(mockEmployees[employeeId as keyof typeof mockEmployees])
  }, [router])

  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete office deep cleaning - Downtown Tower',
      description: 'Perform comprehensive cleaning of all floors and common areas',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2025-12-30',
      assignedDate: '2025-12-20',
      project: 'Downtown Tower Cleaning',
      estimatedHours: 8,
      actualHours: 6
    },
    {
      id: 2,
      title: 'Equipment maintenance check',
      description: 'Inspect and maintain all cleaning equipment',
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-12-28',
      assignedDate: '2025-12-25',
      project: 'Equipment Maintenance',
      estimatedHours: 4
    },
    {
      id: 3,
      title: 'Safety training completion',
      description: 'Complete monthly safety and compliance training',
      status: 'completed',
      priority: 'high',
      dueDate: '2025-12-20',
      assignedDate: '2025-12-15',
      project: 'Training & Development',
      estimatedHours: 2,
      actualHours: 2
    },
    {
      id: 4,
      title: 'Client feedback review',
      description: 'Review and respond to client feedback from recent jobs',
      status: 'overdue',
      priority: 'medium',
      dueDate: '2025-12-25',
      assignedDate: '2025-12-22',
      project: 'Customer Service',
      estimatedHours: 3
    }
  ])

  const [attendance] = useState<Attendance[]>([
    {
      id: 1,
      date: '2025-12-27',
      checkIn: '08:30',
      checkOut: '17:15',
      totalHours: 8.75,
      status: 'present',
      location: 'Dubai Main Office'
    },
    {
      id: 2,
      date: '2025-12-26',
      checkIn: '08:45',
      checkOut: '17:30',
      totalHours: 8.75,
      status: 'present',
      location: 'Dubai Main Office'
    },
    {
      id: 3,
      date: '2025-12-25',
      checkIn: '09:00',
      checkOut: '17:00',
      totalHours: 8,
      status: 'late',
      location: 'Dubai Main Office'
    },
    {
      id: 4,
      date: '2025-12-24',
      checkIn: '08:15',
      checkOut: '16:45',
      totalHours: 8.5,
      status: 'present',
      location: 'Dubai Main Office'
    },
    {
      id: 5,
      date: '2025-12-23',
      checkIn: '08:30',
      checkOut: '17:00',
      totalHours: 8.5,
      status: 'present',
      location: 'Dubai Main Office'
    }
  ])

  const [payrollRecords] = useState<PayrollRecord[]>([
    {
      id: 1,
      month: 'December',
      year: 2025,
      basicSalary: 8500,
      allowances: 1200,
      bonuses: 500,
      deductions: 425,
      netSalary: 9775,
      paymentDate: '2025-12-28',
      status: 'paid'
    },
    {
      id: 2,
      month: 'November',
      year: 2025,
      basicSalary: 8500,
      allowances: 1200,
      bonuses: 750,
      deductions: 425,
      netSalary: 10025,
      paymentDate: '2025-11-28',
      status: 'paid'
    },
    {
      id: 3,
      month: 'October',
      year: 2025,
      basicSalary: 8500,
      allowances: 1200,
      bonuses: 300,
      deductions: 425,
      netSalary: 9575,
      paymentDate: '2025-10-28',
      status: 'paid'
    }
  ])

  const [bonuses] = useState<Bonus[]>([
    {
      id: 1,
      title: 'Performance Bonus - Q4',
      amount: 500,
      type: 'performance',
      date: '2025-12-15',
      description: 'Outstanding performance in Q4 projects',
      status: 'paid'
    },
    {
      id: 2,
      title: 'Project Completion Bonus',
      amount: 750,
      type: 'project',
      date: '2025-11-30',
      description: 'Successfully completed Downtown Tower project ahead of schedule',
      status: 'paid'
    },
    {
      id: 3,
      title: 'Annual Bonus 2025',
      amount: 1200,
      type: 'annual',
      date: '2026-01-15',
      description: 'Annual performance bonus for 2025',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Safety Excellence Award',
      amount: 300,
      type: 'special',
      date: '2025-10-20',
      description: 'Perfect safety record for 6 months',
      status: 'paid'
    }
  ])

  const handleLogout = () => {
    // Clear all employee session data
    sessionStorage.removeItem('homeware_employee_name')
    sessionStorage.removeItem('homeware_employee_id')
    sessionStorage.removeItem('homeware_employee_email')
    localStorage.removeItem('homeware_employee_token')
    localStorage.removeItem('homeware_employee_email')
    localStorage.removeItem('homeware_employee_name')
    localStorage.removeItem('homeware_employee_id')
    localStorage.removeItem('homeware_employee_remember')
    router.push('/login/employee')
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading employee data...</p>
        </div>
      </div>
    )
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'overdue': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700'
      case 'late': return 'bg-yellow-100 text-yellow-700'
      case 'half-day': return 'bg-orange-100 text-orange-700'
      case 'absent': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getBonusTypeColor = (type: string) => {
    switch (type) {
      case 'performance': return 'bg-blue-100 text-blue-700'
      case 'project': return 'bg-green-100 text-green-700'
      case 'annual': return 'bg-purple-100 text-purple-700'
      case 'special': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    overdue: tasks.filter(t => t.status === 'overdue').length
  }

  const attendanceStats = {
    thisMonth: attendance.filter(a => a.status === 'present').length,
    totalHours: attendance.reduce((sum, a) => sum + a.totalHours, 0),
    avgHours: attendance.reduce((sum, a) => sum + a.totalHours, 0) / attendance.length
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                title="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Employee Portal</h1>
                  <p className="text-xs text-slate-500">Welcome back, {employee.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Slide-out menu (Mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed top-16 left-0 w-64 h-screen bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto"
        >
        <div className="p-6">
          {/* Profile Card */}
          <div className="text-center mb-6">
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center overflow-hidden">
                {employee.profileImage && employee.profileImage !== '/api/placeholder/100/100' ? (
                  <img
                    src={employee.profileImage}
                    alt={employee.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-blue-600" />
                )}
              </div>
              <button
                onClick={() => document.getElementById('profile-picture-input')?.click()}
                className="absolute bottom-0 right-2 translate-x-10 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                title="Update profile picture"
              >
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            <h3 className="font-bold text-slate-900">{employee.name}</h3>
            <p className="text-sm text-slate-500">{employee.position}</p>
            <p className="text-xs text-slate-400">{employee.department}</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'tasks', label: 'My Tasks', icon: CheckCircle },
              { id: 'attendance', label: 'Attendance', icon: Clock },
              { id: 'payroll', label: 'Payroll', icon: Wallet },
              { id: 'bonuses', label: 'Bonuses', icon: Award },
              { id: 'visa', label: 'Visa & Status', icon: Globe },
              { id: 'documents', label: 'Documents', icon: File }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="pt-6 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-slate-900">{taskStats.completed}</div>
                <div className="text-xs text-slate-500">Tasks Done</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">{attendanceStats.thisMonth}</div>
                <div className="text-xs text-slate-500">Days Present</div>
              </div>
            </div>
          </div>

          {/* Mobile Logout Button */}
          <button
            onClick={handleLogout}
            className="lg:hidden w-full flex items-center gap-2 px-3 py-2 mt-6 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-16 w-64 h-screen bg-white border-r border-slate-200 overflow-y-auto">
        <div className="p-6 sticky top-0 bg-white">
          {/* Profile Card */}
          <div className="text-center mb-6">
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center overflow-hidden">
                {employee.profileImage && employee.profileImage !== '/api/placeholder/100/100' ? (
                  <img
                    src={employee.profileImage}
                    alt={employee.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-blue-600" />
                )}
              </div>
              <button
                onClick={() => document.getElementById('profile-picture-input')?.click()}
                className="absolute bottom-0 right-2 translate-x-10 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                title="Update profile picture"
              >
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            <h3 className="font-bold text-slate-900">{employee.name}</h3>
            <p className="text-sm text-slate-500">{employee.position}</p>
            <p className="text-xs text-slate-400">{employee.department}</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'tasks', label: 'My Tasks', icon: CheckCircle },
              { id: 'attendance', label: 'Attendance', icon: Clock },
              { id: 'payroll', label: 'Payroll', icon: Wallet },
              { id: 'bonuses', label: 'Bonuses', icon: Award },
              { id: 'visa', label: 'Visa & Status', icon: Globe },
              { id: 'documents', label: 'Documents', icon: File }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-slate-900">{taskStats.completed}</div>
                <div className="text-xs text-slate-500">Tasks Done</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">{attendanceStats.thisMonth}</div>
                <div className="text-xs text-slate-500">Days Present</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {employee.name}!</h2>
                <p className="text-blue-100 mb-4">Here's your dashboard overview for today.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Active Tasks</span>
                    </div>
                    <div className="text-2xl font-bold">{taskStats.inProgress + taskStats.overdue}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Hours This Week</span>
                    </div>
                    <div className="text-2xl font-bold">{attendanceStats.totalHours.toFixed(1)}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-medium">Next Payroll</span>
                    </div>
                    <div className="text-2xl font-bold">Dec 28</div>
                  </div>
                </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <button
                  onClick={() => setActiveTab('tasks')}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">My Tasks</h3>
                      <p className="text-xs text-slate-500">Track progress</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{taskStats.total}</div>
                  <div className="text-xs text-slate-500 mt-1">{taskStats.completed} completed</div>
                </button>

                <button
                  onClick={() => setActiveTab('attendance')}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Attendance</h3>
                      <p className="text-xs text-slate-500">Time tracking</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{attendanceStats.thisMonth}</div>
                  <div className="text-xs text-slate-500 mt-1">days this month</div>
                </button>

                <button
                  onClick={() => setActiveTab('payroll')}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <Wallet className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Payroll</h3>
                      <p className="text-xs text-slate-500">Salary details</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">AED {employee.salary.total.toLocaleString()}</div>
                  <div className="text-xs text-slate-500 mt-1">monthly salary</div>
                </button>

                <button
                  onClick={() => setActiveTab('bonuses')}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <Award className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Bonuses</h3>
                      <p className="text-xs text-slate-500">Rewards earned</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">AED {bonuses.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0).toLocaleString()}</div>
                  <div className="text-xs text-slate-500 mt-1">earned this year</div>
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'in-progress' ? 'bg-blue-500' :
                        task.status === 'overdue' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{task.title}</div>
                        <div className="text-sm text-slate-500">{task.project}</div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${getTaskStatusColor(task.status)}`}>
                        {task.status.split('-').join(' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {false && (
              <div className="space-y-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h2>

                  {/* Profile Picture Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Profile Picture</h3>
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                          {employee.profileImage && employee.profileImage !== '/api/placeholder/100/100' ? (
                            <img
                              src={employee.profileImage}
                              alt={employee.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-12 h-12 text-blue-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Upload New Picture</label>
                            <input
                              id="profile-picture-input"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onload = (e) => {
                                    const result = e.target?.result as string
                                    // In a real app, you'd upload to a server here
                                    // For now, we'll just update the local state
                                    setEmployee((prev: any) => prev ? {
                                      ...prev,
                                      profileImage: result
                                    } : prev)
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }}
                              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                          </div>
                          <p className="text-xs text-slate-500">
                            Recommended: Square image, at least 200x200px. Max size: 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={employee.name}
                        readOnly
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Employee ID</label>
                      <input
                        type="text"
                        value={employee.id}
                        readOnly
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Position</label>
                      <input
                        type="text"
                        value={employee.position}
                        readOnly
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                      <input
                        type="text"
                        value={employee.department}
                        readOnly
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={employee.email}
                        readOnly
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={employee.phone}
                        readOnly
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Join Date</label>
                      <input
                        type="text"
                        value={new Date(employee.joinDate).toLocaleDateString()}
                        readOnly
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={employee.location}
                        readOnly
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Manager Information */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h4 className="text-lg font-bold text-slate-900 mb-4">Manager Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Manager Name</label>
                        <input
                          type="text"
                          value={employee.manager}
                          readOnly
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">My Tasks</h2>
                  <div className="flex gap-2">
                    <span className="text-sm text-slate-500">Total: {taskStats.total}</span>
                    <span className="text-sm text-green-600">• Completed: {taskStats.completed}</span>
                    <span className="text-sm text-blue-600">• In Progress: {taskStats.inProgress}</span>
                    <span className="text-sm text-red-600">• Overdue: {taskStats.overdue}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="bg-white border border-slate-200 rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 mb-2">{task.title}</h3>
                          <p className="text-slate-600 text-sm mb-3">{task.description}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {task.project}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: {task.dueDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {task.estimatedHours}h estimated
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${getTaskStatusColor(task.status)}`}>
                            {task.status.split('-').join(' ')}
                          </span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            task.priority === 'high' ? 'bg-red-100 text-red-700' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {task.priority} priority
                          </span>
                        </div>
                      </div>

                      {task.actualHours && (
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="text-sm text-slate-600">
                            Progress: {task.actualHours}h / {task.estimatedHours}h completed
                          </div>
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${Math.min((task.actualHours / task.estimatedHours) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">Attendance Record</h2>
                  <div className="flex gap-4 text-sm">
                    <span className="text-slate-600">This Month: {attendanceStats.thisMonth} days</span>
                    <span className="text-slate-600">Total Hours: {attendanceStats.totalHours.toFixed(1)}h</span>
                    <span className="text-slate-600">Avg Daily: {attendanceStats.avgHours.toFixed(1)}h</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Check In</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Check Out</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Hours</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {attendance.map((record) => (
                        <tr key={record.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900">{record.date}</td>
                          <td className="px-6 py-4 text-slate-600">{record.checkIn}</td>
                          <td className="px-6 py-4 text-slate-600">{record.checkOut || '-'}</td>
                          <td className="px-6 py-4 font-medium text-slate-900">{record.totalHours.toFixed(2)}h</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${getAttendanceStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{record.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'payroll' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">Payroll Information</h2>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">AED {employee.salary.total.toLocaleString()}</div>
                    <div className="text-sm text-slate-500">Monthly Salary</div>
                  </div>
                </div>

                {/* Salary Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Basic Salary</h3>
                        <p className="text-sm text-slate-500">Monthly base pay</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">AED {employee.salary.basic.toLocaleString()}</div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Allowances</h3>
                        <p className="text-sm text-slate-500">Additional benefits</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">AED {employee.salary.allowances.toLocaleString()}</div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Total Salary</h3>
                        <p className="text-sm text-slate-500">Gross monthly pay</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">AED {employee.salary.total.toLocaleString()}</div>
                  </div>
                </div>

                {/* Payroll History */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900">Payroll History</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Period</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Basic</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Allowances</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Bonuses</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Deductions</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Net Pay</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {payrollRecords.map((record) => (
                          <tr key={record.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">{record.month} {record.year}</td>
                            <td className="px-6 py-4 text-slate-600">AED {record.basicSalary.toLocaleString()}</td>
                            <td className="px-6 py-4 text-slate-600">AED {record.allowances.toLocaleString()}</td>
                            <td className="px-6 py-4 text-green-600 font-medium">AED {record.bonuses.toLocaleString()}</td>
                            <td className="px-6 py-4 text-red-600">AED {record.deductions.toLocaleString()}</td>
                            <td className="px-6 py-4 font-bold text-slate-900">AED {record.netSalary.toLocaleString()}</td>
                            <td className="px-6 py-4">
                              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                record.status === 'paid' ? 'bg-green-100 text-green-700' :
                                record.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bonuses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">Bonuses & Rewards</h2>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      AED {bonuses.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-500">Total earned this year</div>
                  </div>
                </div>

                {/* Bonus Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {bonuses.filter(b => b.type === 'performance').length}
                      </div>
                      <div className="text-sm text-slate-500">Performance Bonuses</div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {bonuses.filter(b => b.type === 'project').length}
                      </div>
                      <div className="text-sm text-slate-500">Project Bonuses</div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        {bonuses.filter(b => b.type === 'annual').length}
                      </div>
                      <div className="text-sm text-slate-500">Annual Bonuses</div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-2">
                        {bonuses.filter(b => b.status === 'pending').length}
                      </div>
                      <div className="text-sm text-slate-500">Pending Bonuses</div>
                    </div>
                  </div>
                </div>

                {/* Bonuses List */}
                <div className="space-y-4">
                  {bonuses.map((bonus) => (
                    <div key={bonus.id} className="bg-white border border-slate-200 rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 mb-2">{bonus.title}</h3>
                          <p className="text-slate-600 text-sm mb-3">{bonus.description}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {bonus.date}
                            </span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${getBonusTypeColor(bonus.type)}`}>
                              {bonus.type}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600 mb-2">
                            AED {bonus.amount.toLocaleString()}
                          </div>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            bonus.status === 'paid' ? 'bg-green-100 text-green-700' :
                            bonus.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {bonus.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'visa' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">Visa & Status Information</h2>
                </div>

                {employee.visa ? (
                  <>
                    {/* Visa Status Alert */}
                    {(() => {
                      const expiryDate = new Date(employee.visa.expiryDate)
                      const today = new Date()
                      const daysRemaining = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                      
                      return daysRemaining <= 30 && daysRemaining > 0 ? (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex items-start gap-4">
                          <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold text-yellow-900 mb-1">Visa Expiring Soon</h3>
                            <p className="text-yellow-800">Your visa will expire in <span className="font-bold">{daysRemaining} days</span> on {new Date(employee.visa.expiryDate).toLocaleDateString()}. Please contact HR to renew your visa.</p>
                          </div>
                        </div>
                      ) : daysRemaining < 0 ? (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
                          <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold text-red-900 mb-1">Visa Expired</h3>
                            <p className="text-red-800">Your visa expired on {new Date(employee.visa.expiryDate).toLocaleDateString()}. Contact HR immediately for renewal procedures.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">
                          <CheckCheck className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold text-green-900 mb-1">Visa Active</h3>
                            <p className="text-green-800">Your visa is valid until {new Date(employee.visa.expiryDate).toLocaleDateString()}.</p>
                          </div>
                        </div>
                      )
                    })()}

                    {/* Visa Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Globe className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">Visa Number</h3>
                            <p className="text-sm text-slate-500">Unique identifier</p>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{employee.visa.visaNumber}</div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">Sponsor</h3>
                            <p className="text-sm text-slate-500">Visa sponsor</p>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{employee.visa.sponsorName}</div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">Issue Date</h3>
                            <p className="text-sm text-slate-500">When visa was issued</p>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{new Date(employee.visa.issueDate).toLocaleDateString()}</div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">Expiry Date</h3>
                            <p className="text-sm text-slate-500">When visa expires</p>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{new Date(employee.visa.expiryDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-slate-50 rounded-2xl p-6 text-center">
                    <Globe className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">Visa information not available. Please contact HR.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">My Documents</h2>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">{employee.documents?.length || 0}</div>
                    <div className="text-sm text-slate-500">Documents on file</div>
                  </div>
                </div>

                {employee.documents && employee.documents.length > 0 ? (
                  <div className="space-y-4">
                    {employee.documents.map((doc: any) => {
                      const docStatus = doc.expiryDate ? (() => {
                        const expiry = new Date(doc.expiryDate)
                        const today = new Date()
                        const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                        if (daysUntilExpiry < 0) return 'expired'
                        if (daysUntilExpiry <= 30) return 'expiring-soon'
                        return 'valid'
                      })() : 'valid'

                      return (
                        <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <File className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-900">{doc.fileName}</h3>
                                <p className="text-sm text-slate-500">{doc.documentType} • Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                              docStatus === 'valid' ? 'bg-green-100 text-green-700' :
                              docStatus === 'expiring-soon' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {docStatus === 'valid' ? 'Valid' : docStatus === 'expiring-soon' ? 'Expiring Soon' : 'Expired'}
                            </span>
                          </div>
                          
                          {doc.expiryDate && (
                            <div className="border-t border-slate-200 pt-4">
                              <p className="text-sm text-slate-600">
                                Expires: <span className="font-bold">{new Date(doc.expiryDate).toLocaleDateString()}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-2xl p-6 text-center">
                    <File className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">No documents on file yet.</p>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  </div>
)
}