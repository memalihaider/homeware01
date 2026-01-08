'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
  import { Users, Search, Filter, Download, Plus, UserPlus, Award, Briefcase, MapPin, Phone, Mail, Shield, TrendingUp, AlertCircle, X, Edit2, Trash2, FileText, DollarSign, Heart, Globe, CheckCircle, Upload, File } from 'lucide-react'
export default function EmployeeDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [employees, setEmployees] = useState([
    { id: 1, name: 'Ahmed Al-Mazrouei', email: 'ahmed@homeware.ae', phone: '+971501234567', role: 'Operations Manager', department: 'Operations', status: 'Active', joinDate: '2023-01-15', supervisor: 'Fatima', team: ['Mohammed', 'Ali', 'Hassan'], rating: 4.8, burnoutRisk: 'Low' },
    { id: 2, name: 'Fatima Al-Ketbi', email: 'fatima@homeware.ae', phone: '+971501234568', role: 'HR Director', department: 'HR', status: 'Active', joinDate: '2022-06-10', supervisor: 'Executive', team: ['Ahmed', 'Sara', 'Layla'], rating: 4.9, burnoutRisk: 'Low' },
    { id: 3, name: 'Mohammed Bin Ali', email: 'mohammed@homeware.ae', phone: '+971501234569', role: 'Team Lead - Cleaning', department: 'Operations', status: 'Active', joinDate: '2023-03-20', supervisor: 'Ahmed', team: ['Hassan', 'Omar', 'Khalid'], rating: 4.6, burnoutRisk: 'Medium' },
    { id: 4, name: 'Sara Al-Noor', email: 'sara@homeware.ae', phone: '+971501234570', role: 'Recruitment Specialist', department: 'HR', status: 'Active', joinDate: '2023-09-01', supervisor: 'Fatima', team: [], rating: 4.7, burnoutRisk: 'Low' },
    { id: 5, name: 'Hassan Al-Mazrouei', email: 'hassan@homeware.ae', phone: '+971501234571', role: 'Senior Cleaning Specialist', department: 'Operations', status: 'On Leave', joinDate: '2022-11-05', supervisor: 'Mohammed', team: [], rating: 4.5, burnoutRisk: 'High' },
    { id: 6, name: 'Layla Al-Mansouri', email: 'layla@homeware.ae', phone: '+971501234572', role: 'Payroll Officer', department: 'HR', status: 'Active', joinDate: '2023-02-14', supervisor: 'Fatima', team: [], rating: 4.8, burnoutRisk: 'Low' },
    { id: 7, name: 'Omar Khan', email: 'omar@homeware.ae', phone: '+971501234573', role: 'Cleaning Specialist', department: 'Operations', status: 'Active', joinDate: '2023-07-01', supervisor: 'Mohammed', team: [], rating: 4.3, burnoutRisk: 'Medium' },
    { id: 8, name: 'Khalid Al-Shehhi', email: 'khalid@homeware.ae', phone: '+971501234574', role: 'Cleaning Specialist', department: 'Operations', status: 'Active', joinDate: '2023-08-15', supervisor: 'Mohammed', team: [], rating: 4.4, burnoutRisk: 'Low' },
  ])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    assignedRoles: [] as string[],
    position: '',
    department: 'Operations',
    status: 'Active',
    joinDate: '',
    supervisor: '',
    rating: 4.5,
    burnoutRisk: 'Low',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    emiratesIdNumber: '',
    salary: 0,
    salaryStructure: 'Monthly',
    bankAccount: '',
    bankName: '',
    visaNumber: '',
    visaExpiryDate: '',
    emergencyContact: '',
    emergencyPhone: '',
    emergencyRelation: ''
  })

  const [expandedSection, setExpandedSection] = useState<string>('personal')

  const [documentName, setDocumentName] = useState('')
  const [documentValidDate, setDocumentValidDate] = useState('')
  const [documents, setDocuments] = useState<Array<{ id: string; name: string; fileName: string; uploadDate: string; validDate?: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const availableRoles = [
    'Admin',
    'Manager',
    'Supervisor',
    'Team Lead',
    'Specialist',
    'Cleaner',
    'HR Officer',
    'Finance Officer',
    'Accountant',
    'Marketing Executive',
    'Sales Representative',
    'Operator',
    'Maintenance Staff'
  ]

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.role.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDept = selectedDepartment === 'all' || emp.department === selectedDepartment
      const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus
      return matchesSearch && matchesDept && matchesStatus
    })
  }, [searchTerm, selectedDepartment, selectedStatus, employees])

  const supervisorMetrics = useMemo(() => {
    const metrics: Record<string, { supervisors: number; directReports: number; ratio: string }> = {}
    const supervisors: Record<string, number> = {}
    const teamMembers: Record<string, number> = {}

    employees.forEach(emp => {
      if (emp.supervisor && emp.supervisor !== 'Executive') {
        supervisors[emp.supervisor] = (supervisors[emp.supervisor] || 0) + 1
      }
      emp.team?.forEach((member: string) => {
        teamMembers[emp.name] = (teamMembers[emp.name] || 0) + 1
      })
    })

    employees.forEach(emp => {
      if (supervisors[emp.name]) {
        metrics[emp.name] = {
          supervisors: 1,
          directReports: supervisors[emp.name],
          ratio: `1:${supervisors[emp.name]}`
        }
      }
    })

    return metrics
  }, [employees])

  const departments = ['all', 'Operations', 'HR', 'Finance', 'Marketing']
  const statuses = ['all', 'Active', 'On Leave', 'Inactive']

  const handleAddEmployee = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      assignedRoles: [],
      position: '',
      department: 'Operations',
      status: 'Active',
      joinDate: '',
      supervisor: '',
      rating: 4.5,
      burnoutRisk: 'Low',
      dateOfBirth: '',
      nationality: '',
      passportNumber: '',
      emiratesIdNumber: '',
      salary: 0,
      salaryStructure: 'Monthly',
      bankAccount: '',
      bankName: '',
      visaNumber: '',
      visaExpiryDate: '',
      emergencyContact: '',
      emergencyPhone: '',
      emergencyRelation: ''
    })
    setDocuments([])
    setDocumentName('')
    setSelectedEmployee(null)
    setIsEditing(false)
    setExpandedSection('personal')
    setShowModal(true)
  }, [])

  const handleEditEmployee = useCallback((emp: any) => {
    setFormData(emp)
    setDocuments(emp.documents || [])
    setDocumentName('')
    setSelectedEmployee(emp)
    setIsEditing(true)
    setShowModal(true)
  }, [])

  const handleSaveEmployee = useCallback(() => {
    if (!formData.name || !formData.role || !formData.email) {
      alert('Please fill all required fields (Name, Role, Email)')
      return
    }

    if (isEditing && selectedEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? { ...emp, ...formData, documents } : emp
      ))
      alert('Employee updated successfully')
    } else {
      const newEmployee = {
        ...formData,
        id: Date.now(),
        team: [],
        documents
      }
      setEmployees([...employees, newEmployee])
      alert('Employee added successfully')
    }
    setShowModal(false)
    setDocuments([])
  }, [formData, isEditing, selectedEmployee, employees, documents])

  const handleDeleteEmployee = useCallback((emp: any) => {
    setSelectedEmployee(emp)
    setShowDeleteConfirm(true)
  }, [])

  const confirmDelete = useCallback(() => {
    if (selectedEmployee) {
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id))
      alert(`${selectedEmployee.name} removed from team`)
      setShowDeleteConfirm(false)
      setSelectedEmployee(null)
    }
  }, [selectedEmployee, employees])

  const getBurnoutColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-100 text-red-700'
      case 'High': return 'bg-orange-100 text-orange-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-green-100 text-green-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700'
      case 'On Leave': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6 bg-white text-black">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black">Employee Directory</h1>
          <p className="text-gray-600 mt-1">Manage team members, roles, and organization structure</p>
        </div>
        <button onClick={handleAddEmployee} className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="h-5 w-5" />
          <span className="font-bold">Add Employee</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search employees by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-black">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status === 'all' ? 'All Status' : status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">Quick Stats</label>
            <div className="text-sm font-bold text-black">Total: {filteredEmployees.length} employees</div>
          </div>
        </div>
      </div>

      {/* Supervisor Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Total Employees</p>
          <p className="text-2xl font-black text-blue-700">{employees.length}</p>
          <p className="text-xs text-blue-600 mt-2">Across all departments</p>
        </div>
        <div className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Supervision Ratio</p>
          <p className="text-2xl font-black text-green-700">1:3 Avg</p>
          <p className="text-xs text-green-600 mt-2">1 supervisor to 3 team members</p>
        </div>
        <div className="bg-linear-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Burnout Risk</p>
          <p className="text-2xl font-black text-orange-700">1 Critical</p>
          <p className="text-xs text-orange-600 mt-2">Requires immediate attention</p>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Role</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Department</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Supervisor</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Team Size</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Burnout</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        {emp.name.split(' ')[0][0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-black">{emp.name}</p>
                        <p className="text-xs text-gray-600">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-black">{emp.role}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{emp.department}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-black">{emp.supervisor}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-bold text-black">{emp.team.length}</div>
                    {emp.team.length > 0 && (
                      <p className="text-xs text-gray-600">{supervisorMetrics[emp.name]?.ratio}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-black">{emp.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${getBurnoutColor(emp.burnoutRisk)}`}>
                      {emp.burnoutRisk}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${getStatusColor(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditEmployee(emp)}
                        className="p-1 hover:bg-blue-100 rounded text-blue-600"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(emp)}
                        className="p-1 hover:bg-red-100 rounded text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Organization Hierarchy Summary */}
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h3 className="font-bold text-black mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Supervision Structure
        </h3>
        <div className="space-y-3">
          {Object.entries(supervisorMetrics).map(([supervisor, data]) => (
            <div key={supervisor} className="p-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-black">{supervisor}</p>
                  <p className="text-xs text-gray-600">Manages {data.directReports} team members</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-blue-600">{data.ratio}</p>
                  <p className="text-xs text-gray-600">Supervision Ratio</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Employee Modal - Comprehensive */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-gray-300 shadow-2xl w-full max-w-4xl my-8">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-300 sticky top-0 bg-linear-to-r from-blue-50 to-white">
              <div>
                <h2 className="text-2xl font-bold text-black">{isEditing ? 'Edit Employee Details' : 'Add New Employee'}</h2>
                <p className="text-sm text-gray-600 mt-1">Complete employee information and role assignment</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="h-6 w-6 text-black" />
              </button>
            </div>

            {/* Content with Tabs */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              {/* Section Navigation */}
              <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
                {[
                  { id: 'personal', label: 'Personal Info', icon: '👤' },
                  { id: 'professional', label: 'Professional', icon: '💼' },
                  { id: 'roles', label: 'Roles & Access', icon: '🔐' },
                  { id: 'financial', label: 'Financial', icon: '💰' },
                  { id: 'visa', label: 'Visa & Documents', icon: '📄' },
                  { id: 'emergency', label: 'Emergency', icon: '🆘' }
                ].map(section => (
                  <button
                    key={section.id}
                    onClick={() => setExpandedSection(section.id)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      expandedSection === section.id
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.label}
                  </button>
                ))}
              </div>

              {/* Personal Information */}
              {expandedSection === 'personal' && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold text-black flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <p className="text-xs text-blue-700 font-medium">Basic contact and identity details</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Full Name *</label>
                      <input
                        type="text"
                        placeholder="First and Last Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Email *</label>
                      <input
                        type="email"
                        placeholder="employee@homeware.ae"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Phone *</label>
                      <input
                        type="tel"
                        placeholder="+971 50 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Nationality</label>
                      <input
                        type="text"
                        placeholder="Country of Origin"
                        value={formData.nationality}
                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Passport Number</label>
                      <input
                        type="text"
                        placeholder="Passport ID"
                        value={formData.passportNumber}
                        onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">Emirates ID Number</label>
                    <input
                      type="text"
                      placeholder="UAE ID Number"
                      value={formData.emiratesIdNumber}
                      onChange={(e) => setFormData({ ...formData, emiratesIdNumber: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    />
                  </div>
                </div>
              )}

              {/* Professional Information */}
              {expandedSection === 'professional' && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold text-black flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    Professional Details
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <p className="text-xs text-blue-700 font-medium">Job title, department, and work arrangement</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Primary Role *</label>
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Position/Level</label>
                      <input
                        type="text"
                        placeholder="e.g., Senior, Executive"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Department</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      >
                        <option value="">Select Department</option>
                        <option value="Operations">Operations</option>
                        <option value="HR">Human Resources</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="IT">IT & Systems</option>
                        <option value="Management">Management</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Employment Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Probation">Probation</option>
                        <option value="Contract">Contract</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Join Date</label>
                      <input
                        type="date"
                        value={formData.joinDate}
                        onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Supervisor</label>
                      <input
                        type="text"
                        placeholder="Supervisor Name"
                        value={formData.supervisor}
                        onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Performance Rating</label>
                      <select
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ Excellent (5.0)</option>
                        <option value="4.5">⭐⭐⭐⭐✨ Very Good (4.5)</option>
                        <option value="4">⭐⭐⭐⭐ Good (4.0)</option>
                        <option value="3.5">⭐⭐⭐✨ Satisfactory (3.5)</option>
                        <option value="3">⭐⭐⭐ Average (3.0)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Burnout Risk Level</label>
                      <select
                        value={formData.burnoutRisk}
                        onChange={(e) => setFormData({ ...formData, burnoutRisk: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      >
                        <option value="Low">🟢 Low Risk</option>
                        <option value="Medium">🟡 Medium Risk</option>
                        <option value="High">🟠 High Risk</option>
                        <option value="Critical">🔴 Critical Risk</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Roles & Access */}
              {expandedSection === 'roles' && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold text-black flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Roles & Access Management
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <p className="text-xs text-blue-700 font-medium">Assign one or multiple roles to control system access and permissions</p>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 block">Available Roles</label>
                    <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto p-3 bg-gray-50 rounded-lg border border-gray-300">
                      {availableRoles.map(role => (
                        <label key={role} className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.assignedRoles.includes(role)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  assignedRoles: [...formData.assignedRoles, role]
                                })
                              } else {
                                setFormData({
                                  ...formData,
                                  assignedRoles: formData.assignedRoles.filter(r => r !== role)
                                })
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700">{role}</p>
                          </div>
                          {formData.assignedRoles.includes(role) && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.assignedRoles.length > 0 && (
                    <div className="mt-4">
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Currently Assigned Roles</label>
                      <div className="flex flex-wrap gap-2">
                        {formData.assignedRoles.map(role => (
                          <div key={role} className="flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-300 rounded-full">
                            <span className="text-sm font-medium text-blue-700">{role}</span>
                            <button
                              onClick={() => setFormData({
                                ...formData,
                                assignedRoles: formData.assignedRoles.filter(r => r !== role)
                              })}
                              className="text-blue-600 hover:text-blue-800 font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Financial Information */}
              {expandedSection === 'financial' && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold text-black flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    Financial & Salary Information
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <p className="text-xs text-blue-700 font-medium">Salary and banking details for payroll processing</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Monthly Salary</label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-bold">AED</span>
                        <input
                          type="number"
                          placeholder="0"
                          value={formData.salary}
                          onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })}
                          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Salary Structure</label>
                      <select
                        value={formData.salaryStructure}
                        onChange={(e) => setFormData({ ...formData, salaryStructure: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      >
                        <option value="Monthly">Monthly</option>
                        <option value="Bi-Weekly">Bi-Weekly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Hourly">Hourly</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Bank Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Emirates NBD, FAB"
                        value={formData.bankName}
                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Bank Account Number</label>
                      <input
                        type="text"
                        placeholder="Account Number"
                        value={formData.bankAccount}
                        onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Visa & Documents */}
              {expandedSection === 'visa' && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold text-black flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Visa & Document Details
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <p className="text-xs text-blue-700 font-medium">Visa and important document information with multi-document upload</p>
                  </div>

                  {/* Visa Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-700">Visa Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Visa Number</label>
                        <input
                          type="text"
                          placeholder="Visa ID Number"
                          value={formData.visaNumber}
                          onChange={(e) => setFormData({ ...formData, visaNumber: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Visa Expiry Date</label>
                        <input
                          type="date"
                          value={formData.visaExpiryDate}
                          onChange={(e) => setFormData({ ...formData, visaExpiryDate: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                      </div>
                    </div>

                    {formData.visaExpiryDate && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs text-yellow-700 font-medium">
                          📅 Visa expires on {new Date(formData.visaExpiryDate).toLocaleDateString()}
                          {(() => {
                            const days = Math.ceil((new Date(formData.visaExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                            if (days < 30) return ` (⚠️ Expires in ${days} days)`
                            return ` (✓ Valid for ${days} days)`
                          })()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Documents Management */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gray-700">Employee Documents</h4>
                      <button
                        onClick={() => {
                          setDocumentName('')
                          setDocumentValidDate('')
                        }}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        title="Add new document"
                      >
                        <Plus className="h-3 w-3" />
                        Add Document
                      </button>
                    </div>

                    {/* Add Document Section */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Upload className="h-4 w-4 text-blue-600" />
                        <label className="text-sm font-bold text-gray-700">Add New Document</label>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Document Name (e.g., Passport, Insurance)"
                            value={documentName}
                            onChange={(e) => setDocumentName(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                          />
                          <input
                            type="date"
                            placeholder="Valid Until (optional)"
                            value={documentValidDate}
                            onChange={(e) => setDocumentValidDate(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-blue-300 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Upload className="h-4 w-4" />
                            Upload File
                          </button>
                          <button
                            onClick={() => {
                              if (!documentName.trim()) {
                                alert('Please enter a document name')
                                return
                              }
                              const newDoc = {
                                id: Date.now().toString(),
                                name: documentName,
                                fileName: documentName + ' - No file uploaded',
                                uploadDate: new Date().toISOString().split('T')[0],
                                validDate: documentValidDate || undefined
                              }
                              setDocuments([...documents, newDoc])
                              setDocumentName('')
                              setDocumentValidDate('')
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 border border-green-700 rounded-lg text-sm font-medium text-white hover:bg-green-700 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                            Add Document
                          </button>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const file = e.target.files[0]
                              if (!documentName.trim()) {
                                alert('Please enter a document name first')
                                return
                              }
                              const newDoc = {
                                id: Date.now().toString(),
                                name: documentName,
                                fileName: file.name,
                                uploadDate: new Date().toISOString().split('T')[0],
                                validDate: documentValidDate || undefined
                              }
                              setDocuments([...documents, newDoc])
                              setDocumentName('')
                              setDocumentValidDate('')
                              e.target.value = ''
                            }
                          }}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Documents List */}
                    {documents.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 block">Uploaded Documents ({documents.length})</label>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {documents.map((doc, idx) => {
                            const isExpiringSoon = doc.validDate && new Date(doc.validDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                            const isExpired = doc.validDate && new Date(doc.validDate) < new Date()
                            
                            return (
                              <div key={doc.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                                isExpired ? 'bg-red-50 border-red-200' : 
                                isExpiringSoon ? 'bg-yellow-50 border-yellow-200' : 
                                'bg-blue-50 border-blue-200'
                              }`}>
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <File className={`h-5 w-5 shrink-0 ${
                                    isExpired ? 'text-red-500' : 
                                    isExpiringSoon ? 'text-yellow-500' : 
                                    'text-blue-600'
                                  }`} />
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm font-semibold text-gray-700 truncate">{doc.name}</p>
                                      {isExpired && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Expired</span>}
                                      {isExpiringSoon && !isExpired && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Expiring Soon</span>}
                                    </div>
                                    <p className="text-xs text-gray-500">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                                    {doc.validDate && (
                                      <p className="text-xs text-gray-500">Valid until: {new Date(doc.validDate).toLocaleDateString()}</p>
                                    )}
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    setDocuments(documents.filter((d, i) => i !== idx))
                                  }}
                                  className="ml-2 p-1 text-red-600 hover:bg-red-100 rounded transition-colors shrink-0"
                                  title="Remove document"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {documents.length === 0 && (
                      <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-600">No documents uploaded yet. Add documents to track important files.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Emergency Contact */}
              {expandedSection === 'emergency' && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold text-black flex items-center gap-2">
                    <Heart className="h-5 w-5 text-blue-600" />
                    Emergency Contact Information
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <p className="text-xs text-blue-700 font-medium">Person to contact in case of emergency</p>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">Emergency Contact Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Emergency Phone</label>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Relationship</label>
                      <select
                        value={formData.emergencyRelation}
                        onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      >
                        <option value="">Select Relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Parent">Parent</option>
                        <option value="Child">Child</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-300 sticky bottom-0 bg-linear-to-r from-gray-50 to-white">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEmployee}
                className="flex-1 px-4 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
              >
                {isEditing ? '✏️ Update Employee' : '➕ Add Employee'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-gray-300 shadow-lg w-full max-w-sm">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-black">Remove Employee?</h3>
              <p className="text-gray-600">Are you sure you want to remove <span className="font-bold text-black">{selectedEmployee.name}</span> from the team? This action cannot be undone.</p>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-300">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-black"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Remove Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
