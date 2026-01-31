export const MOCK_CLIENT_PROJECTS = [
  {
    id: '1',
    title: 'Villa Deep Cleaning - Jumeirah',
    status: 'In Progress',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    budget: 2500,
    spent: 1875,
    teamMembers: [
      { id: '1', name: 'Ahmed Al-Mazrouei', role: 'Lead Cleaner', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
      { id: '2', name: 'Fatima Al-Mansoori', role: 'Quality Control', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
    ],
    documents: [
      { id: '1', name: 'Contract.pdf', type: 'Contract', size: '2.5 MB', uploadedAt: '2024-01-15' },
      { id: '2', name: 'Floor Plan.pdf', type: 'Blueprint', size: '1.8 MB', uploadedAt: '2024-01-16' },
    ],
    tasks: [
      { id: '1', title: 'Initial Assessment', status: 'Completed', dueDate: '2024-01-16' },
      { id: '2', title: 'Deep Cleaning - Ground Floor', status: 'Completed', dueDate: '2024-01-20' },
      { id: '3', title: 'Deep Cleaning - First Floor', status: 'In Progress', dueDate: '2024-01-25' },
      { id: '4', title: 'Final Inspection', status: 'Pending', dueDate: '2024-02-10' },
    ]
  },
  {
    id: '2',
    title: 'Office Complex Sanitization - Dubai Marina',
    status: 'Completed',
    progress: 100,
    startDate: '2024-01-01',
    endDate: '2024-01-10',
    budget: 1800,
    spent: 1800,
    teamMembers: [
      { id: '3', name: 'Mohammed Al-Suwaidi', role: 'Technical Specialist', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
    ],
    documents: [
      { id: '3', name: 'Sanitization Report.pdf', type: 'Report', size: '3.2 MB', uploadedAt: '2024-01-11' },
    ],
    tasks: [
      { id: '5', title: 'Equipment Setup', status: 'Completed', dueDate: '2024-01-02' },
      { id: '6', title: 'Full Sanitization', status: 'Completed', dueDate: '2024-01-08' },
      { id: '7', title: 'Quality Check', status: 'Completed', dueDate: '2024-01-10' },
    ]
  }
];

export const MOCK_CLIENT_INVOICES = [
  {
    id: '1',
    number: 'INV-2024-001',
    project: 'Villa Deep Cleaning - Jumeirah',
    amount: 2500,
    status: 'Paid',
    dueDate: '2024-02-15',
    paidDate: '2024-02-10',
    items: [
      { description: 'Deep Cleaning Services', quantity: 1, rate: 2500, total: 2500 }
    ]
  },
  {
    id: '2',
    number: 'INV-2024-002',
    project: 'Office Complex Sanitization',
    amount: 1800,
    status: 'Paid',
    dueDate: '2024-01-20',
    paidDate: '2024-01-15',
    items: [
      { description: 'Office Sanitization', quantity: 1, rate: 1800, total: 1800 }
    ]
  },
  {
    id: '3',
    number: 'INV-2024-003',
    project: 'Villa Deep Cleaning - Jumeirah',
    amount: 500,
    status: 'Pending',
    dueDate: '2024-02-20',
    items: [
      { description: 'Additional Services', quantity: 1, rate: 500, total: 500 }
    ]
  }
];

export const MOCK_CLIENT_QUOTATIONS = [
  {
    id: '1',
    number: 'QUO-2024-001',
    project: 'Annual Maintenance Contract',
    amount: 12000,
    status: 'Accepted',
    validUntil: '2024-03-01',
    items: [
      { description: 'Monthly Deep Cleaning (12 months)', quantity: 12, rate: 1000, total: 12000 }
    ]
  },
  {
    id: '2',
    number: 'QUO-2024-002',
    project: 'Post Construction Cleaning',
    amount: 3500,
    status: 'Pending',
    validUntil: '2024-02-28',
    items: [
      { description: 'Construction Debris Removal', quantity: 1, rate: 3500, total: 3500 }
    ]
  }
];