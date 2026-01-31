// Client Portal Data - Aligned with Admin System
// This connects client portal to admin projects and jobs

export interface ClientProject {
  id: string;
  project_number: string; // e.g., "PRJ-2026-001"
  title: string;
  description: string;
  client_id: string;
  client_name: string;
  status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  start_date: string; // ISO date
  end_date: string; // ISO date
  budget: number;
  spent: number;
  progress: number; // 0-100
  team_lead: string;
  team_members: Array<{
    id: string;
    name: string;
    role: string;
    status: string;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    progress: number;
    due_date: string;
    assignee: string;
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploaded_date: string;
    url: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface ClientInvoice {
  id: string;
  invoice_number: string;
  project_id: string;
  project_title: string;
  description: string;
  amount: number;
  tax: number;
  total: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';
  issue_date: string;
  due_date: string;
  paid_date?: string;
  payment_method?: string;
}

export interface ClientQuotation {
  id: string;
  quotation_number: string;
  title: string;
  description: string;
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
  valid_from: string;
  valid_until: string;
  created_at: string;
}

// Mock data aligned with admin projects
export const MOCK_CLIENT_PROJECTS: ClientProject[] = [
  {
    id: '1',
    project_number: 'PRJ-2026-001',
    title: 'Office Renovation Phase 2',
    description: 'Complete renovation of executive office and meeting rooms with modern equipment and design',
    client_id: 'client_1',
    client_name: 'Global Tech Solutions',
    status: 'In Progress',
    priority: 'High',
    start_date: '2026-01-15T00:00:00Z',
    end_date: '2026-03-15T00:00:00Z',
    budget: 250000,
    spent: 125000,
    progress: 65,
    team_lead: 'Ahmed Hassan',
    team_members: [
      { id: 'tm1', name: 'Ahmed Hassan', role: 'Project Lead', status: 'Active' },
      { id: 'tm2', name: 'Sarah Johnson', role: 'Designer', status: 'Active' },
      { id: 'tm3', name: 'Mohammed Ali', role: 'Constructor', status: 'Active' },
      { id: 'tm4', name: 'Lisa Wong', role: 'Quality Inspector', status: 'Active' }
    ],
    tasks: [
      { id: 't1', title: 'Demolition & Cleanup', status: 'Completed', progress: 100, due_date: '2026-01-31', assignee: 'Mohammed Ali' },
      { id: 't2', title: 'Electrical Installation', status: 'In Progress', progress: 75, due_date: '2026-02-15', assignee: 'Ahmed Hassan' },
      { id: 't3', title: 'Plumbing Setup', status: 'In Progress', progress: 50, due_date: '2026-02-20', assignee: 'Mohammed Ali' },
      { id: 't4', title: 'Painting & Finishing', status: 'Pending', progress: 0, due_date: '2026-03-05', assignee: 'Sarah Johnson' },
      { id: 't5', title: 'Final Inspection', status: 'Pending', progress: 0, due_date: '2026-03-15', assignee: 'Lisa Wong' }
    ],
    documents: [
      { id: 'd1', name: 'Project_Specification.pdf', type: 'PDF', uploaded_date: '2026-01-15', url: '#' },
      { id: 'd2', name: 'Budget_Breakdown.xlsx', type: 'Excel', uploaded_date: '2026-01-15', url: '#' },
      { id: 'd3', name: 'Timeline_Chart.pdf', type: 'PDF', uploaded_date: '2026-01-20', url: '#' }
    ],
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-01-29T15:30:00Z'
  },
  {
    id: '2',
    project_number: 'PRJ-2026-002',
    title: 'HVAC System Upgrade',
    description: 'Installation of new HVAC system across all office floors with smart controls',
    client_id: 'client_1',
    client_name: 'Global Tech Solutions',
    status: 'In Progress',
    priority: 'Medium',
    start_date: '2026-01-28T00:00:00Z',
    end_date: '2026-02-28T00:00:00Z',
    budget: 150000,
    spent: 45000,
    progress: 30,
    team_lead: 'Michael Chen',
    team_members: [
      { id: 'tm5', name: 'Michael Chen', role: 'HVAC Lead', status: 'Active' },
      { id: 'tm6', name: 'David Park', role: 'Technician', status: 'Active' }
    ],
    tasks: [
      { id: 't6', title: 'System Design Review', status: 'Completed', progress: 100, due_date: '2026-01-28', assignee: 'Michael Chen' },
      { id: 't7', title: 'Equipment Procurement', status: 'In Progress', progress: 60, due_date: '2026-02-10', assignee: 'Michael Chen' },
      { id: 't8', title: 'Installation - Phase 1', status: 'Pending', progress: 0, due_date: '2026-02-20', assignee: 'David Park' },
      { id: 't9', title: 'Testing & Commissioning', status: 'Pending', progress: 0, due_date: '2026-02-28', assignee: 'Michael Chen' }
    ],
    documents: [
      { id: 'd4', name: 'HVAC_Specification.pdf', type: 'PDF', uploaded_date: '2026-01-28', url: '#' },
      { id: 'd5', name: 'Equipment_List.xlsx', type: 'Excel', uploaded_date: '2026-01-28', url: '#' }
    ],
    created_at: '2026-01-28T09:00:00Z',
    updated_at: '2026-01-29T14:00:00Z'
  },
  {
    id: '3',
    project_number: 'PRJ-2026-003',
    title: 'Security System Installation',
    description: 'Comprehensive security system upgrade including CCTV, access control, and monitoring',
    client_id: 'client_1',
    client_name: 'Global Tech Solutions',
    status: 'Completed',
    priority: 'High',
    start_date: '2025-12-01T00:00:00Z',
    end_date: '2026-01-20T00:00:00Z',
    budget: 180000,
    spent: 180000,
    progress: 100,
    team_lead: 'Alex Kumar',
    team_members: [
      { id: 'tm7', name: 'Alex Kumar', role: 'Security Lead', status: 'Inactive' },
      { id: 'tm8', name: 'James Wilson', role: 'Technician', status: 'Inactive' }
    ],
    tasks: [
      { id: 't10', title: 'Site Survey', status: 'Completed', progress: 100, due_date: '2025-12-10', assignee: 'Alex Kumar' },
      { id: 't11', title: 'Equipment Installation', status: 'Completed', progress: 100, due_date: '2026-01-15', assignee: 'James Wilson' },
      { id: 't12', title: 'System Testing', status: 'Completed', progress: 100, due_date: '2026-01-18', assignee: 'Alex Kumar' },
      { id: 't13', title: 'Staff Training', status: 'Completed', progress: 100, due_date: '2026-01-20', assignee: 'Alex Kumar' }
    ],
    documents: [
      { id: 'd6', name: 'Security_Report.pdf', type: 'PDF', uploaded_date: '2026-01-20', url: '#' },
      { id: 'd7', name: 'System_Manual.pdf', type: 'PDF', uploaded_date: '2026-01-20', url: '#' }
    ],
    created_at: '2025-12-01T08:00:00Z',
    updated_at: '2026-01-20T16:00:00Z'
  }
];

export const MOCK_CLIENT_INVOICES: ClientInvoice[] = [
  {
    id: '1',
    invoice_number: 'INV-2026-001',
    project_id: '1',
    project_title: 'Office Renovation Phase 2',
    description: 'Project deposit - 50% of total budget',
    amount: 125000,
    tax: 12500,
    total: 137500,
    status: 'Paid',
    issue_date: '2026-01-15',
    due_date: '2026-01-31',
    paid_date: '2026-01-28',
    payment_method: 'Bank Transfer'
  },
  {
    id: '2',
    invoice_number: 'INV-2026-002',
    project_id: '2',
    project_title: 'HVAC System Upgrade',
    description: 'Material and equipment costs',
    amount: 45000,
    tax: 4500,
    total: 49500,
    status: 'Sent',
    issue_date: '2026-01-28',
    due_date: '2026-02-15',
    payment_method: undefined
  },
  {
    id: '3',
    invoice_number: 'INV-2026-003',
    project_id: '3',
    project_title: 'Security System Installation',
    description: 'Final payment - project completion',
    amount: 180000,
    tax: 18000,
    total: 198000,
    status: 'Paid',
    issue_date: '2026-01-20',
    due_date: '2026-02-05',
    paid_date: '2026-02-02',
    payment_method: 'Bank Transfer'
  }
];

export const MOCK_CLIENT_QUOTATIONS: ClientQuotation[] = [
  {
    id: '1',
    quotation_number: 'QT-2026-001',
    title: 'Additional Office Space - Phase 3',
    description: 'Complete fit-out for new office wing',
    items: [
      { id: 'i1', description: 'Design & Planning', quantity: 1, unit_price: 25000, total: 25000 },
      { id: 'i2', description: 'Construction Works', quantity: 500, unit_price: 300, total: 150000 },
      { id: 'i3', description: 'Finishing & Furniture', quantity: 1, unit_price: 80000, total: 80000 }
    ],
    subtotal: 255000,
    tax: 25500,
    total: 280500,
    status: 'Sent',
    valid_from: '2026-01-25',
    valid_until: '2026-02-25',
    created_at: '2026-01-25T10:00:00Z'
  },
  {
    id: '2',
    quotation_number: 'QT-2026-002',
    title: 'Annual Maintenance Contract - 2026',
    description: 'Comprehensive maintenance for all systems',
    items: [
      { id: 'i4', description: 'Monthly HVAC Maintenance', quantity: 12, unit_price: 3000, total: 36000 },
      { id: 'i5', description: 'Monthly Security Monitoring', quantity: 12, unit_price: 2000, total: 24000 },
      { id: 'i6', description: 'Quarterly Deep Cleaning', quantity: 4, unit_price: 8000, total: 32000 }
    ],
    subtotal: 92000,
    tax: 9200,
    total: 101200,
    status: 'Draft',
    valid_from: '2026-02-01',
    valid_until: '2026-02-28',
    created_at: '2026-01-29T14:00:00Z'
  }
];
