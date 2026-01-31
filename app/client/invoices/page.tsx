'use client';

import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { MOCK_CLIENT_INVOICES } from '../lib/client-portal-data';
import { Download, Eye, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function InvoicesPage() {
  const [invoices] = useState(MOCK_CLIENT_INVOICES);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700';
      case 'Sent':
        return 'bg-blue-100 text-blue-700';
      case 'Overdue':
        return 'bg-red-100 text-red-700';
      case 'Draft':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.total, 0);
  const totalOutstanding = invoices.filter(inv => inv.status !== 'Paid').reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
            <p className="text-slate-600 mt-2">Manage and view all your project invoices.</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <p className="text-slate-600 text-sm font-medium">Total Invoiced</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">${totalInvoiced.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">{invoices.length} invoices</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <p className="text-slate-600 text-sm font-medium">Total Paid</p>
              <p className="text-3xl font-bold text-green-600 mt-2">${totalPaid.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">
                {invoices.filter(inv => inv.status === 'Paid').length} paid
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
              <p className="text-slate-600 text-sm font-medium">Outstanding</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">${totalOutstanding.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">
                {invoices.filter(inv => inv.status !== 'Paid').length} pending
              </p>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Invoice</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr
                      key={invoice.id}
                      className={`border-b border-slate-200 hover:bg-slate-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        {invoice.invoice_number}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {invoice.project_title}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        ${invoice.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(invoice.issue_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(invoice.due_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-blue-100 rounded transition text-blue-600">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 hover:bg-slate-200 rounded transition text-slate-600">
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Details Modal placeholder */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h3>
            <p className="text-blue-800 text-sm">
              Click on any invoice to view details, download a PDF copy, or make a payment online.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
