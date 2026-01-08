'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Search, Filter, Plus, MoreVertical, Mail, Phone, Calendar, MapPin, ShieldCheck, Clock, Trash2, Edit2, X, AlertCircle, Upload, File, Briefcase, DollarSign, Heart, Globe, User } from 'lucide-react'

export default function HR() {
  const [activeTab, setActiveTab] = useState('employees')
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: 'John Smith', 
      role: 'Supervisor', 
      position: 'Senior Supervisor',
      department: 'Operations', 
      status: 'Active', 
      joinDate: '2024-01-15', 
      rating: 4.8, 
      location: 'Dubai Marina', 
      email: 'john@homeware.ae', 
      phone: '+971-50-1234567',
      profileImage: null,
      salary: { basic: 5000, housing: 500, allowances: [], totalAllowances: 500, total: 5500 },
      bonuses: [],
      documents: [],
      visa: null,
      emergencyContacts: [],
      dateOfBirth: '1985-05-20',
      nationalityCountry: 'India',
      passportNumber: 'P1234567',
      emiratesIdNumber: 'E123456789'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      role: 'Cleaner', 
      position: 'Senior Cleaner',
      department: 'Operations', 
      status: 'Active', 
      joinDate: '2024-03-20', 
      rating: 4.9, 
      location: 'Downtown Dubai', 
      email: 'sarah@homeware.ae', 
      phone: '+971-50-1234568',
      profileImage: null,
      salary: { basic: 2300, housing: 200, allowances: [], totalAllowances: 200, total: 2500 },
      bonuses: [],
      documents: [],
      visa: null,
      emergencyContacts: [],
      dateOfBirth: '1990-08-15',
      nationalityCountry: 'Philippines',
      passportNumber: 'P9876543',
      emiratesIdNumber: 'E987654321'
    },
    { 
      id: 3, 
      name: 'Ahmed Hassan', 
      role: 'Cleaner', 
      position: 'Cleaner',
      department: 'Operations', 
      status: 'Active', 
      joinDate: '2024-06-10', 
      rating: 4.5, 
      location: 'Business Bay', 
      email: 'ahmed@homeware.ae', 
      phone: '+971-50-1234569',
      profileImage: null,
      salary: { basic: 2100, housing: 200, allowances: [], totalAllowances: 200, total: 2300 },
      bonuses: [],
      documents: [],
      visa: null,
      emergencyContacts: [],
      dateOfBirth: '1988-03-22',
      nationalityCountry: 'Egypt',
      passportNumber: 'P5555555',
      emiratesIdNumber: 'E555555555'
    },
    { 
      id: 4, 
      name: 'Maria Rodriguez', 
      role: 'HR Manager', 
      position: 'HR Manager',
      department: 'HR', 
      status: 'Active', 
      joinDate: '2023-11-05', 
      rating: 4.7, 
      location: 'JLT', 
      email: 'maria@homeware.ae', 
      phone: '+971-50-1234570',
      profileImage: null,
      salary: { basic: 4500, housing: 300, allowances: [], totalAllowances: 300, total: 4800 },
      bonuses: [],
      documents: [],
      visa: null,
      emergencyContacts: [],
      dateOfBirth: '1986-11-10',
      nationalityCountry: 'Spain',
      passportNumber: 'P7777777',
      emiratesIdNumber: 'E777777777'
    }
  ])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ 
    name: '', 
    role: '', 
    position: '',
    department: 'Operations', 
    status: 'Active', 
    joinDate: '', 
    salary: { basic: '', housing: '', food: '', transportation: '', telephone: '', otherAllowances: '', totalAllowances: 0, total: 0 },
    bonus: { amount: '', type: 'performance', month: '', year: new Date().getFullYear() },
    location: '', 
    email: '', 
    phone: '',
    profileImage: null as any,
    dateOfBirth: '',
    nationalityCountry: '',
    passportNumber: '',
    emiratesIdNumber: '',
    visa: { visaNumber: '', issueDate: '', expiryDate: '', sponsorName: '' },
    documents: [],
    emergencyContacts: [],
    bankAccount: '',
    bankName: ''
  })
  const [documents, setDocuments] = useState<any[]>([])
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([])
  const [visaReminders, setVisaReminders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState('All')

  // Calculate visa reminders (expiring within 30 days)
  const calculateVisaReminders = useCallback(() => {
    const reminders: any[] = []
    employees.forEach((emp: any) => {
      if (emp.visa && emp.visa.expiryDate) {
        const expiryDate = new Date(emp.visa.expiryDate)
        const today = new Date()
        const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
          reminders.push({
            employeeId: emp.id,
            employeeName: emp.name,
            visaExpiryDate: emp.visa.expiryDate,
            daysRemaining: daysUntilExpiry
          })
        }
      }
    })
    setVisaReminders(reminders)
  }, [employees])

  useEffect(() => {
    calculateVisaReminders()
  }, [calculateVisaReminders])

  const activeCount = employees.filter(e => e.status === 'Active').length
  const onLeaveCount = employees.filter(e => e.status === 'On Leave').length
  const avgRating = employees.length > 0 ? (employees.reduce((sum, e) => sum + e.rating, 0) / employees.length).toFixed(1) : 0
  const totalSalary = employees.reduce((sum, e) => sum + e.salary.total, 0)

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = filterDept === 'All' || emp.department === filterDept
    return matchesSearch && matchesDept
  })

  const calculateSalaryTotal = (salary: any) => {
    const basic = parseFloat(salary.basic) || 0
    const housing = parseFloat(salary.housing) || 0
    const food = parseFloat(salary.food) || 0
    const transportation = parseFloat(salary.transportation) || 0
    const telephone = parseFloat(salary.telephone) || 0
    const otherAllowances = parseFloat(salary.otherAllowances) || 0
    const totalAllowances = housing + food + transportation + telephone + otherAllowances
    return {
      ...salary,
      totalAllowances,
      total: basic + totalAllowances
    }
  }

  const handleAddEmployee = useCallback(() => {
    setFormData({ 
      name: '', 
      role: '', 
      position: '',
      department: 'Operations', 
      status: 'Active', 
      joinDate: '', 
      salary: { basic: '', housing: '', food: '', transportation: '', telephone: '', otherAllowances: '', totalAllowances: 0, total: 0 },
      bonus: { amount: '', type: 'performance', month: '', year: new Date().getFullYear() },
      location: '', 
      email: '', 
      phone: '',
      profileImage: null,
      dateOfBirth: '',
      nationalityCountry: '',
      passportNumber: '',
      emiratesIdNumber: '',
      visa: { visaNumber: '', issueDate: '', expiryDate: '', sponsorName: '' },
      documents: [],
      emergencyContacts: [],
      bankAccount: '',
      bankName: ''
    })
    setDocuments([])
    setEmergencyContacts([])
    setIsEditing(false)
    setSelectedEmployee(null)
    setShowModal(true)
  }, [])

  const handleEditEmployee = useCallback((emp: any) => {
    setFormData(emp)
    setDocuments(emp.documents || [])
    setEmergencyContacts(emp.emergencyContacts || [])
    setSelectedEmployee(emp)
    setIsEditing(true)
    setShowModal(true)
  }, [])

  const handleSaveEmployee = useCallback(() => {
    if (!formData.name || !formData.role || !formData.email) {
      alert('Please fill all required fields')
      return
    }

    const updatedSalary = calculateSalaryTotal(formData.salary)

    if (isEditing && selectedEmployee) {
      setEmployees(employees.map((emp: any) => 
        emp.id === (selectedEmployee as any).id 
          ? { 
              ...emp,
              ...formData,
              id: emp.id,
              salary: updatedSalary,
              documents: documents,
              emergencyContacts: emergencyContacts,
              bonuses: emp.bonuses || [],
              rating: emp.rating 
            } 
          : emp
      ) as any)
      alert('Employee updated successfully')
    } else {
      const newEmployee: any = { 
        ...formData, 
        id: Date.now(), 
        rating: 4.5,
        salary: updatedSalary,
        documents: documents,
        emergencyContacts: emergencyContacts,
        bonuses: [],
        createdAt: new Date().toISOString()
      }
      setEmployees([...employees, newEmployee])
      alert('Employee added successfully')
    }
    setShowModal(false)
    calculateVisaReminders()
  }, [formData, isEditing, selectedEmployee, employees, documents, emergencyContacts])

  const handleDeleteEmployee = useCallback((emp: any) => {
    setSelectedEmployee(emp)
    setShowDeleteConfirm(true)
  }, [])

  const confirmDelete = useCallback(() => {
    if (selectedEmployee) {
      setEmployees(employees.filter(emp => emp.id !== (selectedEmployee as any).id))
      alert(`${(selectedEmployee as any).name} removed from team`)
      setShowDeleteConfirm(false)
      setSelectedEmployee(null)
      calculateVisaReminders()
    }
  }, [employees, selectedEmployee])

  const handleStatusChange = useCallback((emp: any, newStatus: any) => {
    setEmployees(employees.map(e => e.id === emp.id ? { ...e, status: newStatus } : e))
    alert(`${emp.name}'s status updated to ${newStatus}`)
  }, [employees])

  const handleAddDocument = (doc: any) => {
    const newDoc = {
      ...doc,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString().split('T')[0]
    }
    setDocuments([...documents, newDoc])
  }

  const handleRemoveDocument = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId))
  }

  const handleAddEmergencyContact = (contact: any) => {
    const newContact = {
      ...contact,
      id: Date.now().toString()
    }
    setEmergencyContacts([...emergencyContacts, newContact])
  }

  const handleRemoveEmergencyContact = (contactId: string) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== contactId))
  }

  const handleProfileImageUpload = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-8 bg-white text-black">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">Human Resources</h1>
          <p className="text-gray-600">Manage your workforce, attendance, and performance.</p>
        </div>
        <button 
          onClick={handleAddEmployee}
          className="inline-flex items-center justify-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-pink-700 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </button>
      </div>

      {/* HR Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">Total Staff</p>
              <p className="text-2xl font-bold text-black">{employees.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">On Duty</p>
              <p className="text-2xl font-bold text-black">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">On Leave</p>
              <p className="text-2xl font-bold text-black">{onLeaveCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">Avg. Rating</p>
              <p className="text-2xl font-bold text-black">{avgRating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Directory */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('employees')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'employees' ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              Directory
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'payroll' ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              Payroll (AED {totalSalary.toLocaleString()})
            </button>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
              <input 
                type="text" 
                placeholder="Search employees..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
              />
            </div>
            <select 
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-black">
              <option>All</option>
              <option>Operations</option>
              <option>HR</option>
              <option>Management</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Salary</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-black">{emp.name}</p>
                        <p className="text-xs text-gray-600">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black">{emp.role}</td>
                  <td className="px-6 py-4 text-sm text-black">{emp.department}</td>
                  <td className="px-6 py-4">
                    <select
                      value={emp.status}
                      onChange={(e) => handleStatusChange(emp, e.target.value)}
                      className={`px-3 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${
                        emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      <option>Active</option>
                      <option>On Leave</option>
                      <option>Inactive</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-black">AED {emp.salary.total.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="font-bold text-pink-600">{emp.rating}/5.0</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditEmployee(emp)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(emp)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
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

{/* Visa Reminders Alert */}
      {visaReminders.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-bold text-black">Visa Expiry Alerts</h3>
          </div>
          <div className="space-y-2">
            {visaReminders.map((reminder) => (
              <div key={reminder.employeeId} className="flex justify-between items-center bg-white p-3 rounded-lg border border-red-100">
                <div>
                  <p className="font-medium text-black">{reminder.employeeName}</p>
                  <p className="text-sm text-red-600">{reminder.daysRemaining} days until visa expires</p>
                </div>
                <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">{reminder.visaExpiryDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Employee Modal - Enhanced */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-gray-300 shadow-lg w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-300 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-black">{isEditing ? 'Edit Employee' : 'Add New Employee'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="h-5 w-5 text-black" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="font-bold text-black flex items-center gap-2">
                  <User className="h-5 w-5" /> Personal Information
                </h3>
                
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-pink-100 flex items-center justify-center overflow-hidden">
                      {formData.profileImage ? (
                        <img src={formData.profileImage} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-12 w-12 text-pink-600" />
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700"
                    >
                      <Upload className="h-4 w-4" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <input
                    type="tel"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nationality Country"
                    value={formData.nationalityCountry}
                    onChange={(e) => setFormData({ ...formData, nationalityCountry: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Passport Number"
                    value={formData.passportNumber}
                    onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Emirates ID Number"
                    value={formData.emiratesIdNumber}
                    onChange={(e) => setFormData({ ...formData, emiratesIdNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Bank Name"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Bank Account Number"
                  value={formData.bankAccount}
                  onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                />
              </div>

              {/* Employment Information */}
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <h3 className="font-bold text-black flex items-center gap-2">
                  <Briefcase className="h-5 w-5" /> Employment Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Role (e.g., Supervisor) *"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  >
                    <option>Operations</option>
                    <option>HR</option>
                    <option>Management</option>
                    <option>Finance</option>
                    <option>Marketing</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    placeholder="Join Date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  >
                    <option>Active</option>
                    <option>On Leave</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              {/* Salary Information */}
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <h3 className="font-bold text-black flex items-center gap-2">
                  <DollarSign className="h-5 w-5" /> Salary & Compensation
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Basic Salary (AED) *"
                    value={formData.salary.basic}
                    onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, basic: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <input
                    type="number"
                    placeholder="Housing Allowance"
                    value={formData.salary.housing}
                    onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, housing: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Food Allowance"
                    value={formData.salary.food}
                    onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, food: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <input
                    type="number"
                    placeholder="Transportation Allowance"
                    value={formData.salary.transportation}
                    onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, transportation: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Telephone Allowance"
                    value={formData.salary.telephone}
                    onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, telephone: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <input
                    type="number"
                    placeholder="Other Allowances"
                    value={formData.salary.otherAllowances}
                    onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, otherAllowances: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600">
                    <span className="font-bold">Total Salary: AED </span>
                    {(
                      (parseFloat(formData.salary.basic) || 0) +
                      (parseFloat(formData.salary.housing) || 0) +
                      (parseFloat(formData.salary.food) || 0) +
                      (parseFloat(formData.salary.transportation) || 0) +
                      (parseFloat(formData.salary.telephone) || 0) +
                      (parseFloat(formData.salary.otherAllowances) || 0)
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Bonus Amount (Optional)"
                    value={formData.bonus.amount}
                    onChange={(e) => setFormData({ ...formData, bonus: { ...formData.bonus, amount: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <select
                    value={formData.bonus.type}
                    onChange={(e) => setFormData({ ...formData, bonus: { ...formData.bonus, type: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  >
                    <option value="performance">Performance</option>
                    <option value="project">Project</option>
                    <option value="annual">Annual</option>
                    <option value="attendance">Attendance</option>
                    <option value="special">Special</option>
                  </select>
                </div>
              </div>

              {/* Visa Information */}
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <h3 className="font-bold text-black flex items-center gap-2">
                  <Globe className="h-5 w-5" /> Visa Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Visa Number"
                    value={formData.visa.visaNumber}
                    onChange={(e) => setFormData({ ...formData, visa: { ...formData.visa, visaNumber: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Sponsor Name"
                    value={formData.visa.sponsorName}
                    onChange={(e) => setFormData({ ...formData, visa: { ...formData.visa, sponsorName: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    placeholder="Issue Date"
                    value={formData.visa.issueDate}
                    onChange={(e) => setFormData({ ...formData, visa: { ...formData.visa, issueDate: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <input
                    type="date"
                    placeholder="Expiry Date (IMPORTANT)"
                    value={formData.visa.expiryDate}
                    onChange={(e) => setFormData({ ...formData, visa: { ...formData.visa, expiryDate: e.target.value } })}
                    className="w-full px-3 py-2 bg-gray-50 border border-red-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                  />
                </div>
                <p className="text-xs text-red-600">⚠ System will alert when visa expires in 30 days</p>
              </div>

              {/* Documents */}
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <h3 className="font-bold text-black flex items-center gap-2">
                  <File className="h-5 w-5" /> Documents
                </h3>

                {documents.length > 0 && (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div>
                          <p className="text-sm font-medium text-black">{doc.fileName}</p>
                          <p className="text-xs text-gray-600">{doc.documentType} • {doc.uploadDate}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveDocument(doc.id)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Document File Name"
                      id="docFileName"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                    />
                    <select
                      id="docType"
                      defaultValue="visa"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                    >
                      <option value="passport">Passport</option>
                      <option value="visa">Visa</option>
                      <option value="emirates-id">Emirates ID</option>
                      <option value="labor-card">Labor Card</option>
                      <option value="insurance">Insurance</option>
                      <option value="certification">Certification</option>
                      <option value="license">License</option>
                      <option value="contract">Contract</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <input
                    type="date"
                    id="docExpiry"
                    placeholder="Expiry Date (Optional)"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                  />
                  <button
                    onClick={() => {
                      const fileName = (document.getElementById('docFileName') as HTMLInputElement)?.value
                      const docType = (document.getElementById('docType') as HTMLSelectElement)?.value
                      const expiry = (document.getElementById('docExpiry') as HTMLInputElement)?.value
                      
                      if (fileName && docType) {
                        handleAddDocument({
                          fileName,
                          documentType: docType,
                          expiryDate: expiry,
                          fileType: 'pdf',
                          status: 'valid'
                        })
                        ;(document.getElementById('docFileName') as HTMLInputElement).value = ''
                        ;(document.getElementById('docExpiry') as HTMLInputElement).value = ''
                      } else {
                        alert('Please fill in Document Name and Type')
                      }
                    }}
                    className="w-full bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Add Document
                  </button>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <h3 className="font-bold text-black flex items-center gap-2">
                  <Heart className="h-5 w-5" /> Emergency Contacts
                </h3>

                {emergencyContacts.length > 0 && (
                  <div className="space-y-2">
                    {emergencyContacts.map((contact) => (
                      <div key={contact.id} className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-200">
                        <div>
                          <p className="text-sm font-medium text-black">{contact.name}</p>
                          <p className="text-xs text-gray-600">{contact.relationship} • {contact.phone}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveEmergencyContact(contact.id)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Contact Name"
                      id="contactName"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                    />
                    <input
                      type="text"
                      placeholder="Relationship"
                      id="contactRelation"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      id="contactPhone"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                    />
                    <input
                      type="email"
                      placeholder="Email (Optional)"
                      id="contactEmail"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const name = (document.getElementById('contactName') as HTMLInputElement)?.value
                      const relation = (document.getElementById('contactRelation') as HTMLInputElement)?.value
                      const phone = (document.getElementById('contactPhone') as HTMLInputElement)?.value
                      const email = (document.getElementById('contactEmail') as HTMLInputElement)?.value
                      
                      if (name && relation && phone) {
                        handleAddEmergencyContact({
                          name,
                          relationship: relation,
                          phone,
                          email
                        })
                        ;(document.getElementById('contactName') as HTMLInputElement).value = ''
                        ;(document.getElementById('contactRelation') as HTMLInputElement).value = ''
                        ;(document.getElementById('contactPhone') as HTMLInputElement).value = ''
                        ;(document.getElementById('contactEmail') as HTMLInputElement).value = ''
                      } else {
                        alert('Please fill in Contact Name, Relationship, and Phone')
                      }
                    }}
                    className="w-full bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
                  >
                    Add Emergency Contact
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-300 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEmployee}
                className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
              >
                {isEditing ? 'Update' : 'Add'} Employee
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
              <p className="text-gray-600">Are you sure you want to remove <span className="font-bold text-black">{(selectedEmployee as any).name}</span> from the team? This action cannot be undone.</p>
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
