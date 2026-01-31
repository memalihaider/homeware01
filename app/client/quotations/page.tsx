'use client';

import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { MOCK_CLIENT_QUOTATIONS } from '../lib/client-portal-data';
import { Download, Eye, FileText, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function QuotationsPage() {
  const [quotations] = useState(MOCK_CLIENT_QUOTATIONS);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-700';
      case 'Sent':
        return 'bg-blue-100 text-blue-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      case 'Draft':
        return 'bg-slate-100 text-slate-700';
      case 'Expired':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const totalValue = quotations.reduce((sum, q) => sum + q.total, 0);
  const acceptedValue = quotations.filter(q => q.status === 'Accepted').reduce((sum, q) => sum + q.total, 0);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Quotations</h1>
            <p className="text-slate-600 mt-2">Review and manage all project quotations.</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <p className="text-slate-600 text-sm font-medium">Total Quotations</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">${totalValue.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">{quotations.length} quotations</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <p className="text-slate-600 text-sm font-medium">Accepted Value</p>
              <p className="text-3xl font-bold text-green-600 mt-2">${acceptedValue.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">
                {quotations.filter(q => q.status === 'Accepted').length} accepted
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
              <p className="text-slate-600 text-sm font-medium">Pending Review</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {quotations.filter(q => q.status === 'Sent').length}
              </p>
              <p className="text-xs text-slate-500 mt-2">awaiting decision</p>
            </div>
          </div>

          {/* Quotations List */}
          <div className="space-y-6">
            {quotations.map(quotation => (
              <div key={quotation.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{quotation.title}</h3>
                    <p className="text-slate-300 text-sm mt-1">{quotation.quotation_number}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(quotation.status)}`}>
                    {quotation.status}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Description */}
                  <p className="text-slate-600 mb-4">{quotation.description}</p>

                  {/* Items Table */}
                  <div className="mb-6 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-2 px-3 font-semibold text-slate-700">Description</th>
                          <th className="text-right py-2 px-3 font-semibold text-slate-700">Qty</th>
                          <th className="text-right py-2 px-3 font-semibold text-slate-700">Unit Price</th>
                          <th className="text-right py-2 px-3 font-semibold text-slate-700">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotation.items.map(item => (
                          <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-2 px-3 text-slate-900">{item.description}</td>
                            <td className="py-2 px-3 text-right text-slate-600">{item.quantity}</td>
                            <td className="py-2 px-3 text-right text-slate-600">
                              ${item.unit_price.toLocaleString()}
                            </td>
                            <td className="py-2 px-3 text-right font-semibold text-slate-900">
                              ${item.total.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="flex justify-end mb-6">
                    <div className="w-80 space-y-2">
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Subtotal:</span>
                        <span className="font-semibold text-slate-900">${quotation.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Tax:</span>
                        <span className="font-semibold text-slate-900">${quotation.tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 bg-blue-50 px-3 rounded font-bold text-lg">
                        <span className="text-slate-900">Total:</span>
                        <span className="text-blue-600">${quotation.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Validity and Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-slate-200">
                    <div className="text-sm text-slate-600 mb-4 sm:mb-0">
                      <p>
                        Valid from {new Date(quotation.valid_from).toLocaleDateString()} to{' '}
                        {new Date(quotation.valid_until).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
                        <Download size={16} />
                        <span>Download</span>
                      </button>
                      {quotation.status === 'Sent' && (
                        <>
                          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                            <Check size={16} />
                            <span>Accept</span>
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                            <X size={16} />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
