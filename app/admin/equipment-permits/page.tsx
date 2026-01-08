'use client'

import { useState } from 'react'
import {
  Plus,
  X,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Tag,
  Building,
  Wrench,
  ShieldCheck,
  DollarSign,
  AlertTriangle,
  Eye,
  ChevronRight,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function EquipmentPermitsPage() {
  const [activeTab, setActiveTab] = useState<'equipment' | 'permits'>('equipment')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Equipment State
  const [equipment, setEquipment] = useState([
    { id: 1, name: 'Industrial Vacuum Cleaner', category: 'Cleaning', status: 'Available', location: 'Warehouse A', purchaseDate: '2024-01-15', cost: 2500, maintenanceDate: '2025-01-10', condition: 'Excellent', quantity: 3 },
    { id: 2, name: 'High-Pressure Washer', category: 'Outdoor', status: 'In Use', location: 'Job Site - Tower B', purchaseDate: '2023-06-20', cost: 4200, maintenanceDate: '2024-12-15', condition: 'Good', quantity: 2 },
    { id: 3, name: 'Floor Buffer Machine', category: 'Cleaning', status: 'Available', location: 'Warehouse B', purchaseDate: '2024-03-10', cost: 3500, maintenanceDate: '2025-01-05', condition: 'Good', quantity: 1 },
    { id: 4, name: 'Safety Harness Kit', category: 'Safety', status: 'Available', location: 'Safety Storage', purchaseDate: '2023-11-01', cost: 800, maintenanceDate: '2024-11-15', condition: 'Excellent', quantity: 10 },
    { id: 5, name: 'Ladder (30ft)', category: 'Access', status: 'In Use', location: 'Job Site - Downtown Tower', purchaseDate: '2023-09-05', cost: 1200, maintenanceDate: '2024-10-20', condition: 'Good', quantity: 2 },
  ])

  // Permits State
  const [permits, setPermits] = useState([
    { id: 1, name: 'Building Access Pass', category: 'Building', status: 'Active', issueDate: '2025-01-01', expiryDate: '2025-12-31', issuer: 'Municipal Authority', renewalDate: '2025-10-01', cost: 500 },
    { id: 2, name: 'Waste Disposal License', category: 'Environmental', status: 'Active', issueDate: '2024-06-15', expiryDate: '2025-06-15', issuer: 'Environmental Department', renewalDate: '2025-05-15', cost: 1200 },
    { id: 3, name: 'Safety Compliance Certificate', category: 'Safety', status: 'Expiring Soon', issueDate: '2024-01-10', expiryDate: '2025-01-10', issuer: 'Safety Board', renewalDate: '2024-12-01', cost: 300 },
    { id: 4, name: 'Worker Permit', category: 'Labor', status: 'Active', issueDate: '2024-09-01', expiryDate: '2026-09-01', issuer: 'Labor Department', renewalDate: '2026-08-01', cost: 400 },
    { id: 5, name: 'Commercial License', category: 'Commercial', status: 'Active', issueDate: '2023-12-01', expiryDate: '2025-12-01', issuer: 'Commerce Ministry', renewalDate: '2025-11-01', cost: 2000 },
  ])

  // Modals
  const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false)
  const [showAddPermitModal, setShowAddPermitModal] = useState(false)
  const [showEditEquipmentModal, setShowEditEquipmentModal] = useState(false)
  const [showEditPermitModal, setShowEditPermitModal] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)
  const [selectedPermit, setSelectedPermit] = useState<any>(null)

  // Form States
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    category: 'Cleaning',
    status: 'Available',
    location: '',
    cost: '',
    quantity: '1',
    condition: 'Good',
    maintenanceDate: ''
  })

  const [permitForm, setPermitForm] = useState({
    name: '',
    category: 'Building',
    status: 'Active',
    issuer: '',
    cost: '',
    issueDate: '',
    expiryDate: '',
    renewalDate: ''
  })

  // Equipment Handlers
  const handleAddEquipment = () => {
    if (equipmentForm.name && equipmentForm.location) {
      const newEquipment = {
        id: Math.max(...equipment.map(e => e.id), 0) + 1,
        ...equipmentForm,
        cost: parseInt(equipmentForm.cost) || 0,
        quantity: parseInt(equipmentForm.quantity) || 1,
        purchaseDate: new Date().toISOString().split('T')[0]
      }
      setEquipment([...equipment, newEquipment])
      setEquipmentForm({
        name: '',
        category: 'Cleaning',
        status: 'Available',
        location: '',
        cost: '',
        quantity: '1',
        condition: 'Good',
        maintenanceDate: ''
      })
      setShowAddEquipmentModal(false)
    }
  }

  const handleEditEquipment = () => {
    if (selectedEquipment && equipmentForm.name) {
      setEquipment(equipment.map(e =>
        e.id === selectedEquipment.id
          ? { ...e, ...equipmentForm, cost: parseInt(equipmentForm.cost) || 0, quantity: parseInt(equipmentForm.quantity) || 1 }
          : e
      ))
      setShowEditEquipmentModal(false)
      setSelectedEquipment(null)
      setEquipmentForm({
        name: '',
        category: 'Cleaning',
        status: 'Available',
        location: '',
        cost: '',
        quantity: '1',
        condition: 'Good',
        maintenanceDate: ''
      })
    }
  }

  const handleDeleteEquipment = (id: number) => {
    setEquipment(equipment.filter(e => e.id !== id))
  }

  // Permit Handlers
  const handleAddPermit = () => {
    if (permitForm.name && permitForm.issuer) {
      const newPermit = {
        id: Math.max(...permits.map(p => p.id), 0) + 1,
        ...permitForm,
        cost: parseInt(permitForm.cost) || 0
      }
      setPermits([...permits, newPermit])
      setPermitForm({
        name: '',
        category: 'Building',
        status: 'Active',
        issuer: '',
        cost: '',
        issueDate: '',
        expiryDate: '',
        renewalDate: ''
      })
      setShowAddPermitModal(false)
    }
  }

  const handleEditPermit = () => {
    if (selectedPermit && permitForm.name) {
      setPermits(permits.map(p =>
        p.id === selectedPermit.id
          ? { ...p, ...permitForm, cost: parseInt(permitForm.cost) || 0 }
          : p
      ))
      setShowEditPermitModal(false)
      setSelectedPermit(null)
      setPermitForm({
        name: '',
        category: 'Building',
        status: 'Active',
        issuer: '',
        cost: '',
        issueDate: '',
        expiryDate: '',
        renewalDate: ''
      })
    }
  }

  const handleDeletePermit = (id: number) => {
    setPermits(permits.filter(p => p.id !== id))
  }

  const openEditEquipmentModal = (equip: any) => {
    setSelectedEquipment(equip)
    setEquipmentForm({
      name: equip.name,
      category: equip.category,
      status: equip.status,
      location: equip.location,
      cost: equip.cost.toString(),
      quantity: equip.quantity.toString(),
      condition: equip.condition,
      maintenanceDate: equip.maintenanceDate
    })
    setShowEditEquipmentModal(true)
  }

  const openEditPermitModal = (permit: any) => {
    setSelectedPermit(permit)
    setPermitForm({
      name: permit.name,
      category: permit.category,
      status: permit.status,
      issuer: permit.issuer,
      cost: permit.cost.toString(),
      issueDate: permit.issueDate,
      expiryDate: permit.expiryDate,
      renewalDate: permit.renewalDate
    })
    setShowEditPermitModal(true)
  }

  // Filter functions
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const filteredPermits = permits.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.issuer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Available': return 'bg-green-100 text-green-800'
      case 'In Use': return 'bg-blue-100 text-blue-800'
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800'
      case 'Expired': return 'bg-red-100 text-red-800'
      case 'Maintenance': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getConditionIcon = (condition: string) => {
    switch(condition) {
      case 'Excellent': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'Good': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Fair': return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'Poor': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-all">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Equipment & Permits</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your equipment inventory and permits</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wrench className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-blue-700 uppercase">Total Equipment</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{equipment.length}</div>
          <div className="text-xs text-blue-600 mt-2">{equipment.filter(e => e.status === 'Available').length} Available</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-xs font-bold text-green-700 uppercase">Active Permits</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{permits.filter(p => p.status === 'Active').length}</div>
          <div className="text-xs text-green-600 mt-2">Of {permits.length} Total</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-xs font-bold text-orange-700 uppercase">In Use</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{equipment.filter(e => e.status === 'In Use').length}</div>
          <div className="text-xs text-orange-600 mt-2">Equipment Items</div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-xs font-bold text-red-700 uppercase">Expiring Soon</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{permits.filter(p => p.status === 'Expiring Soon').length}</div>
          <div className="text-xs text-red-600 mt-2">Permits</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-xs font-bold text-purple-700 uppercase">Total Value</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">AED {(equipment.reduce((sum, e) => sum + e.cost, 0) + permits.reduce((sum, p) => sum + p.cost, 0)).toLocaleString()}</div>
          <div className="text-xs text-purple-600 mt-2">All Assets</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 p-1 bg-white border border-gray-300 rounded-2xl w-fit">
        {[
          { id: 'equipment', label: 'Equipment Inventory', icon: Wrench },
          { id: 'permits', label: 'Permits & Licenses', icon: ShieldCheck },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="all">All Status</option>
          {activeTab === 'equipment' ? (
            <>
              <option value="Available">Available</option>
              <option value="In Use">In Use</option>
              <option value="Maintenance">Maintenance</option>
            </>
          ) : (
            <>
              <option value="Active">Active</option>
              <option value="Expiring Soon">Expiring Soon</option>
              <option value="Expired">Expired</option>
            </>
          )}
        </select>

        <button
          onClick={() => activeTab === 'equipment' ? setShowAddEquipmentModal(true) : setShowAddPermitModal(true)}
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add {activeTab === 'equipment' ? 'Equipment' : 'Permit'}
        </button>
      </div>

      {/* Equipment Tab */}
      {activeTab === 'equipment' && (
        <div className="bg-white border border-gray-300 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Equipment Name</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Location</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Condition</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Qty</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Value</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Next Service</th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {filteredEquipment.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getConditionIcon(item.condition)}
                        <span className="text-sm text-gray-600">{item.condition}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.quantity}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">AED {item.cost.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.maintenanceDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditEquipmentModal(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEquipment(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Permits Tab */}
      {activeTab === 'permits' && (
        <div className="bg-white border border-gray-300 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Permit Name</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Issue Date</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Expiry Date</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Renewal Date</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Issuer</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Cost</th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {filteredPermits.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.issueDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.expiryDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.renewalDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.issuer}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">AED {item.cost.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditPermitModal(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePermit(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Equipment Modal */}
      {showAddEquipmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Equipment</h3>
              <button
                onClick={() => setShowAddEquipmentModal(false)}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Equipment Name"
                  value={equipmentForm.name}
                  onChange={(e) => setEquipmentForm({...equipmentForm, name: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                  value={equipmentForm.category}
                  onChange={(e) => setEquipmentForm({...equipmentForm, category: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Cleaning">Cleaning</option>
                  <option value="Safety">Safety</option>
                  <option value="Access">Access</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Location"
                  value={equipmentForm.location}
                  onChange={(e) => setEquipmentForm({...equipmentForm, location: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  placeholder="Cost"
                  value={equipmentForm.cost}
                  onChange={(e) => setEquipmentForm({...equipmentForm, cost: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={equipmentForm.status}
                  onChange={(e) => setEquipmentForm({...equipmentForm, status: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={equipmentForm.quantity}
                  onChange={(e) => setEquipmentForm({...equipmentForm, quantity: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={equipmentForm.condition}
                  onChange={(e) => setEquipmentForm({...equipmentForm, condition: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
                <input
                  type="date"
                  value={equipmentForm.maintenanceDate}
                  onChange={(e) => setEquipmentForm({...equipmentForm, maintenanceDate: e.target.value})}
                  placeholder="Next Maintenance"
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setShowAddEquipmentModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEquipment}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                  Add Equipment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Equipment Modal */}
      {showEditEquipmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Equipment</h3>
              <button
                onClick={() => {
                  setShowEditEquipmentModal(false);
                  setSelectedEquipment(null);
                }}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Equipment Name"
                  value={equipmentForm.name}
                  onChange={(e) => setEquipmentForm({...equipmentForm, name: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                  value={equipmentForm.category}
                  onChange={(e) => setEquipmentForm({...equipmentForm, category: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Cleaning">Cleaning</option>
                  <option value="Safety">Safety</option>
                  <option value="Access">Access</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Location"
                  value={equipmentForm.location}
                  onChange={(e) => setEquipmentForm({...equipmentForm, location: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  placeholder="Cost"
                  value={equipmentForm.cost}
                  onChange={(e) => setEquipmentForm({...equipmentForm, cost: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={equipmentForm.status}
                  onChange={(e) => setEquipmentForm({...equipmentForm, status: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={equipmentForm.quantity}
                  onChange={(e) => setEquipmentForm({...equipmentForm, quantity: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={equipmentForm.condition}
                  onChange={(e) => setEquipmentForm({...equipmentForm, condition: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
                <input
                  type="date"
                  value={equipmentForm.maintenanceDate}
                  onChange={(e) => setEquipmentForm({...equipmentForm, maintenanceDate: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowEditEquipmentModal(false);
                    setSelectedEquipment(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditEquipment}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Permit Modal */}
      {showAddPermitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Permit</h3>
              <button
                onClick={() => setShowAddPermitModal(false)}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Permit Name"
                  value={permitForm.name}
                  onChange={(e) => setPermitForm({...permitForm, name: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                  value={permitForm.category}
                  onChange={(e) => setPermitForm({...permitForm, category: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Building">Building</option>
                  <option value="Safety">Safety</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Labor">Labor</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Issuer Name"
                  value={permitForm.issuer}
                  onChange={(e) => setPermitForm({...permitForm, issuer: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  placeholder="Cost"
                  value={permitForm.cost}
                  onChange={(e) => setPermitForm({...permitForm, cost: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={permitForm.issueDate}
                  onChange={(e) => setPermitForm({...permitForm, issueDate: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="date"
                  value={permitForm.expiryDate}
                  onChange={(e) => setPermitForm({...permitForm, expiryDate: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <input
                type="date"
                value={permitForm.renewalDate}
                onChange={(e) => setPermitForm({...permitForm, renewalDate: e.target.value})}
                placeholder="Renewal Date"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setShowAddPermitModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPermit}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                  Add Permit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Permit Modal */}
      {showEditPermitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Permit</h3>
              <button
                onClick={() => {
                  setShowEditPermitModal(false);
                  setSelectedPermit(null);
                }}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Permit Name"
                  value={permitForm.name}
                  onChange={(e) => setPermitForm({...permitForm, name: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                  value={permitForm.category}
                  onChange={(e) => setPermitForm({...permitForm, category: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Building">Building</option>
                  <option value="Safety">Safety</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Labor">Labor</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Issuer Name"
                  value={permitForm.issuer}
                  onChange={(e) => setPermitForm({...permitForm, issuer: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  placeholder="Cost"
                  value={permitForm.cost}
                  onChange={(e) => setPermitForm({...permitForm, cost: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={permitForm.issueDate}
                  onChange={(e) => setPermitForm({...permitForm, issueDate: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="date"
                  value={permitForm.expiryDate}
                  onChange={(e) => setPermitForm({...permitForm, expiryDate: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <input
                type="date"
                value={permitForm.renewalDate}
                onChange={(e) => setPermitForm({...permitForm, renewalDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowEditPermitModal(false);
                    setSelectedPermit(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditPermit}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
