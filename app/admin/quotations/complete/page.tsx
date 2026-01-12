'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  Plus, Search, Filter, Download, Send, Trash2, Edit, Eye, X, Mail, Phone,
  FileText, DollarSign, Calendar, User, Building2, MapPin, Percent, Tag,
  ShoppingCart, Settings, FileCheck, Clock, Copy, MessageCircle, Save,
  ChevronDown, Check, AlertCircle, CheckCircle, Eye as EyeIcon,
  MoreVertical, Zap, Mail as MailIcon, MessageSquare
} from 'lucide-react'

interface Quotation {
  id: number
  quoteNumber: string
  clientId: number
  client: string
  company: string
  email: string
  phone: string
  location: string
  amount: number
  amountOriginal?: number
  discount?: number
  discountType?: 'percentage' | 'fixed'
  tax?: number
  taxRate?: number
  currency: string
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired' | 'Cancelled'
  date: string
  validUntil: string
  template: 'standard' | 'professional' | 'minimal' | 'detailed'
  services: QuotationService[]
  products: QuotationProduct[]
  notes?: string
  terms?: string
  paymentTerms?: string
  version: number
  lastModified: string
  approvalStatus?: 'Pending' | 'Approved' | 'Rejected'
  sentVia?: string[]
}

interface QuotationService {
  id: number
  name: string
  quantity: number
  unitPrice: number
  total: number
  description?: string
}

interface QuotationProduct {
  id: number
  name: string
  quantity: number
  unitPrice: number
  total: number
  sku?: string
}

interface TemplateOption {
  id: string
  name: string
  description: string
  icon: any
}

// Mock data
const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: 1,
    quoteNumber: '#QT-001-2025',
    clientId: 1,
    client: 'Ahmed Al-Mansouri',
    company: 'Dubai Properties LLC',
    email: 'ahmed@dubaiprop.ae',
    phone: '+971-50-1111111',
    location: 'Dubai Marina',
    amount: 25500,
    amountOriginal: 30000,
    discount: 15,
    discountType: 'percentage',
    taxRate: 5,
    currency: 'AED',
    status: 'Sent',
    date: '2025-01-10',
    validUntil: '2025-02-10',
    template: 'professional',
    services: [
      { id: 1, name: 'Residential Cleaning', quantity: 1, unitPrice: 15000, total: 15000, description: 'Complete residential cleaning' },
      { id: 2, name: 'Deep Cleaning', quantity: 1, unitPrice: 15000, total: 15000, description: 'Deep cleaning service' }
    ],
    products: [
      { id: 1, name: 'Cleaning Supplies Kit', quantity: 2, unitPrice: 500, total: 1000, sku: 'KIT-001' }
    ],
    notes: 'Monthly cleaning services arrangement',
    version: 1,
    lastModified: '2025-01-10',
    approvalStatus: 'Approved',
    sentVia: ['email']
  },
  {
    id: 2,
    quoteNumber: '#QT-002-2025',
    clientId: 2,
    client: 'Layla Hassan',
    company: 'Paradise Hotels & Resorts',
    email: 'layla@paradisehotels.ae',
    phone: '+971-50-4444444',
    location: 'Palm Jumeirah',
    amount: 102000,
    amountOriginal: 102000,
    discount: 0,
    discountType: 'percentage',
    taxRate: 5,
    currency: 'AED',
    status: 'Accepted',
    date: '2025-01-12',
    validUntil: '2025-02-12',
    template: 'detailed',
    services: [
      { id: 3, name: 'Hotel Maintenance', quantity: 12, unitPrice: 8500, total: 102000, description: 'Monthly maintenance contract' }
    ],
    products: [],
    notes: 'High-value hotel maintenance contract',
    version: 1,
    lastModified: '2025-01-12',
    approvalStatus: 'Approved',
    sentVia: ['email', 'whatsapp']
  }
]

const TEMPLATES: TemplateOption[] = [
  { id: 'standard', name: 'Standard', description: 'Clean and simple', icon: FileText },
  { id: 'professional', name: 'Professional', description: 'Corporate look', icon: Building2 },
  { id: 'minimal', name: 'Minimal', description: 'Elegant simplicity', icon: Zap },
  { id: 'detailed', name: 'Detailed', description: 'Full information', icon: ShoppingCart }
]

const AVAILABLE_CLIENTS = [
  { id: 1, name: 'Ahmed Al-Mansouri', company: 'Dubai Properties LLC', email: 'ahmed@dubaiprop.ae', phone: '+971-50-1111111' },
  { id: 2, name: 'Layla Hassan', company: 'Paradise Hotels & Resorts', email: 'layla@paradisehotels.ae', phone: '+971-50-4444444' },
  { id: 3, name: 'Fatima Al-Noor', company: 'Al Noor Logistics', email: 'fatima@alnoorlogistics.ae', phone: '+971-50-2222222' }
]

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>(INITIAL_QUOTATIONS)
  const [activeTab, setActiveTab] = useState<'builder' | 'list' | 'approval'>('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null)
  const [showBuilder, setShowBuilder] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [sendMethod, setSendMethod] = useState<'email' | 'whatsapp' | null>(null)

  const [builderForm, setBuilderForm] = useState<Partial<Quotation>>({
    template: 'professional',
    services: [],
    products: [],
    currency: 'AED',
    taxRate: 5,
    discount: 0,
    discountType: 'percentage'
  })

  // Filter quotations
  const filteredQuotations = useMemo(() => {
    return quotations.filter(q =>
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [quotations, searchTerm])

  // Statistics
  const stats = useMemo(() => ({
    total: quotations.length,
    draft: quotations.filter(q => q.status === 'Draft').length,
    sent: quotations.filter(q => q.status === 'Sent').length,
    accepted: quotations.filter(q => q.status === 'Accepted').length,
    totalValue: quotations.reduce((sum, q) => sum + q.amount, 0)
  }), [quotations])

  const handleSaveQuotation = useCallback(() => {
    if (!builderForm.client || !builderForm.email) {
      alert('Please fill in client details')
      return
    }

    const newQuote: Quotation = {
      id: Math.max(...quotations.map(q => q.id), 0) + 1,
      quoteNumber: `#QT-${String(quotations.length + 1).padStart(3, '0')}-2025`,
      clientId: builderForm.clientId || 1,
      client: builderForm.client || '',
      company: builderForm.company || '',
      email: builderForm.email || '',
      phone: builderForm.phone || '',
      location: builderForm.location || '',
      amount: calculateTotal(),
      amountOriginal: calculateSubtotal(),
      discount: builderForm.discount || 0,
      discountType: builderForm.discountType || 'percentage',
      taxRate: builderForm.taxRate || 5,
      currency: builderForm.currency || 'AED',
      status: 'Draft',
      date: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      template: builderForm.template as any || 'professional',
      services: builderForm.services || [],
      products: builderForm.products || [],
      notes: builderForm.notes,
      terms: builderForm.terms,
      paymentTerms: builderForm.paymentTerms,
      version: 1,
      lastModified: new Date().toISOString().split('T')[0],
      approvalStatus: 'Pending'
    }

    setQuotations([...quotations, newQuote])
    setShowBuilder(false)
    setBuilderForm({ template: 'professional', services: [], products: [], currency: 'AED', taxRate: 5 })
    alert('Quotation created successfully!')
  }, [builderForm, quotations])

  const calculateSubtotal = () => {
    const servicesTotal = (builderForm.services || []).reduce((sum, s) => sum + (s.total || 0), 0)
    const productsTotal = (builderForm.products || []).reduce((sum, p) => sum + (p.total || 0), 0)
    return servicesTotal + productsTotal
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    let discountAmount = 0
    if (builderForm.discountType === 'percentage') {
      discountAmount = (subtotal * (builderForm.discount || 0)) / 100
    } else {
      discountAmount = builderForm.discount || 0
    }
    const afterDiscount = subtotal - discountAmount
    const tax = (afterDiscount * (builderForm.taxRate || 5)) / 100
    return afterDiscount + tax
  }

  const handleSendQuotation = (method: 'email' | 'whatsapp') => {
    if (!selectedQuotation) return
    
    const updatedQuotes = quotations.map(q =>
      q.id === selectedQuotation.id
        ? {
            ...q,
            status: 'Sent' as const,
            sentVia: [...(q.sentVia || []), method]
          }
        : q
    )
    setQuotations(updatedQuotes)
    setShowSendModal(false)
    alert(`Quotation sent via ${method === 'email' ? 'Email' : 'WhatsApp'}!`)
  }

  const handleApproveQuotation = (quotationId: number) => {
    const updated = quotations.map(q =>
      q.id === quotationId ? { ...q, approvalStatus: 'Approved' as const } : q
    )
    setQuotations(updated)
    alert('Quotation approved!')
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Sent': 'bg-blue-100 text-blue-800',
      'Accepted': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Expired': 'bg-yellow-100 text-yellow-800',
      'Cancelled': 'bg-slate-100 text-slate-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getApprovalColor = (status?: string) => {
    const colors: Record<string, string> = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    }
    return colors[status || 'Pending'] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quotations Management</h1>
        <p className="text-gray-600">Create, edit, and manage quotations with multiple templates</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 text-sm">Total Quotations</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 text-sm">Draft</p>
          <p className="text-2xl font-bold text-gray-500 mt-2">{stats.draft}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 text-sm">Sent</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{stats.sent}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 text-sm">Total Value</p>
          <p className="text-2xl font-bold text-green-600 mt-2">AED {stats.totalValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('builder')}
            className={`flex-1 px-4 py-3 font-semibold text-center transition-colors ${
              activeTab === 'builder'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Builder
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 px-4 py-3 font-semibold text-center transition-colors ${
              activeTab === 'list'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Quotations
          </button>
          <button
            onClick={() => setActiveTab('approval')}
            className={`flex-1 px-4 py-3 font-semibold text-center transition-colors ${
              activeTab === 'approval'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CheckCircle className="w-4 h-4 inline mr-2" />
            Approvals
          </button>
        </div>

        {/* Builder Tab */}
        {activeTab === 'builder' && (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Create New Quotation</h2>

            {/* Template Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Select Template</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {TEMPLATES.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setBuilderForm({ ...builderForm, template: template.id as any })}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      builderForm.template === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{template.name}</p>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Client Information */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-semibold text-gray-900">Client Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Client *</label>
                  <select
                    value={builderForm.clientId || ''}
                    onChange={(e) => {
                      const client = AVAILABLE_CLIENTS.find(c => c.id === parseInt(e.target.value))
                      if (client) {
                        setBuilderForm({
                          ...builderForm,
                          clientId: client.id,
                          client: client.name,
                          company: client.company,
                          email: client.email,
                          phone: client.phone
                        })
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select a client</option>
                    {AVAILABLE_CLIENTS.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Company</label>
                  <input
                    type="text"
                    value={builderForm.company || ''}
                    onChange={(e) => setBuilderForm({ ...builderForm, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    value={builderForm.email || ''}
                    onChange={(e) => setBuilderForm({ ...builderForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
                  <input
                    type="text"
                    value={builderForm.phone || ''}
                    onChange={(e) => setBuilderForm({ ...builderForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    disabled
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
                  <input
                    type="text"
                    value={builderForm.location || ''}
                    onChange={(e) => setBuilderForm({ ...builderForm, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-semibold text-gray-900">Services</h3>
              <button
                onClick={() => {
                  const newService: QuotationService = {
                    id: Math.random(),
                    name: '',
                    quantity: 1,
                    unitPrice: 0,
                    total: 0
                  }
                  setBuilderForm({
                    ...builderForm,
                    services: [...(builderForm.services || []), newService]
                  })
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
              <div className="space-y-3">
                {(builderForm.services || []).map((service, idx) => (
                  <div key={service.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Service name"
                        value={service.name}
                        onChange={(e) => {
                          const updated = [...(builderForm.services || [])]
                          updated[idx].name = e.target.value
                          setBuilderForm({ ...builderForm, services: updated })
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={service.quantity}
                        onChange={(e) => {
                          const updated = [...(builderForm.services || [])]
                          updated[idx].quantity = parseInt(e.target.value) || 0
                          updated[idx].total = updated[idx].quantity * updated[idx].unitPrice
                          setBuilderForm({ ...builderForm, services: updated })
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Unit price"
                        value={service.unitPrice}
                        onChange={(e) => {
                          const updated = [...(builderForm.services || [])]
                          updated[idx].unitPrice = parseInt(e.target.value) || 0
                          updated[idx].total = updated[idx].quantity * updated[idx].unitPrice
                          setBuilderForm({ ...builderForm, services: updated })
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Total"
                        value={service.total}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const updated = (builderForm.services || []).filter((_, i) => i !== idx)
                        setBuilderForm({ ...builderForm, services: updated })
                      }}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-semibold text-gray-900">Pricing</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Discount</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={builderForm.discount || 0}
                      onChange={(e) => setBuilderForm({ ...builderForm, discount: parseInt(e.target.value) || 0 })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <select
                      value={builderForm.discountType || 'percentage'}
                      onChange={(e) => setBuilderForm({ ...builderForm, discountType: e.target.value as any })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">AED</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Tax Rate %</label>
                  <input
                    type="number"
                    value={builderForm.taxRate || 5}
                    onChange={(e) => setBuilderForm({ ...builderForm, taxRate: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">AED {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  {(builderForm.discount || 0) > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Discount:</span>
                      <span>-AED {(calculateSubtotal() * (builderForm.discount || 0) / 100).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-blue-200">
                    <span>Total:</span>
                    <span className="font-bold text-lg">AED {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-semibold text-gray-900">Additional Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Notes</label>
                <textarea
                  value={builderForm.notes || ''}
                  onChange={(e) => setBuilderForm({ ...builderForm, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Additional notes..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Payment Terms</label>
                <textarea
                  value={builderForm.paymentTerms || ''}
                  onChange={(e) => setBuilderForm({ ...builderForm, paymentTerms: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Payment terms..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-6 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowBuilder(false)
                  setBuilderForm({ template: 'professional', services: [], products: [], currency: 'AED', taxRate: 5 })
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={handleSaveQuotation}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Quotation
              </button>
            </div>
          </div>
        )}

        {/* List Tab */}
        {activeTab === 'list' && (
          <div className="p-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search quotations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                onClick={() => {
                  setBuilderForm({ template: 'professional', services: [], products: [], currency: 'AED', taxRate: 5 })
                  setActiveTab('builder')
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New
              </button>
            </div>

            <div className="space-y-3">
              {filteredQuotations.length > 0 ? (
                filteredQuotations.map(quotation => (
                  <div key={quotation.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{quotation.quoteNumber}</h3>
                        <p className="text-sm text-gray-600">{quotation.client} - {quotation.company}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(quotation.status)}`}>
                          {quotation.status}
                        </span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${getApprovalColor(quotation.approvalStatus)}`}>
                          {quotation.approvalStatus}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm text-gray-600">
                      <div><span className="font-medium">Amount:</span> AED {quotation.amount.toLocaleString()}</div>
                      <div><span className="font-medium">Date:</span> {quotation.date}</div>
                      <div><span className="font-medium">Valid Until:</span> {quotation.validUntil}</div>
                      <div><span className="font-medium">Template:</span> {quotation.template}</div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedQuotation(quotation)}
                        className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                      >
                        <EyeIcon className="w-4 h-4 inline mr-2" />
                        View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedQuotation(quotation)
                          setShowSendModal(true)
                        }}
                        className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                      >
                        <Send className="w-4 h-4 inline mr-2" />
                        Send
                      </button>
                      <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium text-gray-900">No quotations found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Approval Tab */}
        {activeTab === 'approval' && (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Quotation Approvals</h2>
            <div className="space-y-3">
              {quotations.filter(q => q.approvalStatus === 'Pending').length > 0 ? (
                quotations
                  .filter(q => q.approvalStatus === 'Pending')
                  .map(quotation => (
                    <div key={quotation.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{quotation.quoteNumber}</h3>
                          <p className="text-sm text-gray-600">{quotation.client}</p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                          Pending Review
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-600">Amount</span>
                          <p className="font-bold text-lg">AED {quotation.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Created</span>
                          <p className="font-semibold">{quotation.date}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Services</span>
                          <p className="font-semibold">{quotation.services.length} services</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApproveQuotation(quotation.id)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold flex items-center justify-center gap-2">
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2">
                          <MailIcon className="w-4 h-4" />
                          Review
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-300" />
                  <p className="text-lg font-medium text-gray-900">All quotations approved!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Send Modal */}
      {showSendModal && selectedQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Send Quotation</h2>
              <button onClick={() => setShowSendModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Quote Number</p>
                <p className="font-bold text-gray-900">{selectedQuotation.quoteNumber}</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleSendQuotation('email')}
                  className="w-full px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-semibold flex items-center justify-center gap-2 border-2 border-blue-300"
                >
                  <MailIcon className="w-5 h-5" />
                  Send via Email
                </button>
                <button
                  onClick={() => handleSendQuotation('whatsapp')}
                  className="w-full px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-semibold flex items-center justify-center gap-2 border-2 border-green-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send via WhatsApp
                </button>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800">
                <p className="font-semibold mb-1">📧 Email to: {selectedQuotation.email}</p>
                <p>📱 WhatsApp to: {selectedQuotation.phone}</p>
              </div>

              <button
                onClick={() => setShowSendModal(false)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center sticky top-0">
              <h2 className="text-xl font-bold">Quotation Preview</h2>
              <button onClick={() => setShowPreview(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              {/* Header */}
              <div className="mb-8 pb-6 border-b-2 border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">QUOTATION</h1>
                <p className="text-lg text-blue-600 font-semibold">Quote #{`QT-${quotations.length + 1}-2025`}</p>
              </div>

              {/* Client Details */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Bill To</p>
                  <p className="font-bold text-gray-900 text-lg">{builderForm.client}</p>
                  <p className="text-gray-600">{builderForm.company}</p>
                  <p className="text-gray-600">{builderForm.email}</p>
                  <p className="text-gray-600">{builderForm.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 font-semibold">Quote Details</p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Date: </span>
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Valid Until: </span>
                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Services Table */}
              {(builderForm.services || []).length > 0 && (
                <div className="mb-8">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 px-3 text-gray-900 font-semibold">Description</th>
                        <th className="text-center py-2 px-3 text-gray-900 font-semibold">Qty</th>
                        <th className="text-right py-2 px-3 text-gray-900 font-semibold">Unit Price</th>
                        <th className="text-right py-2 px-3 text-gray-900 font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(builderForm.services || []).map(service => (
                        <tr key={service.id} className="border-b border-gray-200">
                          <td className="py-3 px-3 text-gray-700">{service.name}</td>
                          <td className="py-3 px-3 text-center text-gray-700">{service.quantity}</td>
                          <td className="py-3 px-3 text-right text-gray-700">AED {service.unitPrice.toLocaleString()}</td>
                          <td className="py-3 px-3 text-right text-gray-900 font-semibold">AED {service.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-80 space-y-2">
                  <div className="flex justify-between text-gray-700 pb-2 border-b border-gray-200">
                    <span>Subtotal</span>
                    <span className="font-semibold">AED {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  {(builderForm.discount || 0) > 0 && (
                    <div className="flex justify-between text-red-600 pb-2 border-b border-gray-200">
                      <span>Discount ({builderForm.discountType === 'percentage' ? `${builderForm.discount}%` : `AED ${builderForm.discount}`})</span>
                      <span>-AED {((calculateSubtotal() * (builderForm.discount || 0)) / 100).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700 pb-2 border-b border-gray-200">
                    <span>Tax ({builderForm.taxRate}%)</span>
                    <span>AED {(((calculateSubtotal() - ((calculateSubtotal() * (builderForm.discount || 0)) / 100)) * (builderForm.taxRate || 5)) / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-gray-900 pt-2">
                    <span>Total</span>
                    <span>AED {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {builderForm.notes && (
                <div className="bg-gray-50 p-4 rounded-lg mb-8">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Notes</p>
                  <p className="text-gray-700">{builderForm.notes}</p>
                </div>
              )}

              {/* Payment Terms */}
              {builderForm.paymentTerms && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-900 font-semibold mb-2">Payment Terms</p>
                  <p className="text-blue-800">{builderForm.paymentTerms}</p>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
