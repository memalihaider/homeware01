'use client';

import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { MOCK_CLIENT_INVOICES } from '../lib/client-portal-data';
import { CreditCard, Download, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function PaymentsPage() {
  const [showAddPayment, setShowAddPayment] = useState(false);
  
  const payments = MOCK_CLIENT_INVOICES
    .filter(inv => inv.status === 'Paid' || inv.status === 'Sent')
    .map(inv => ({
      id: inv.id,
      invoice_number: inv.invoice_number,
      project: inv.project_title,
      amount: inv.total,
      date: inv.status === 'Paid' ? inv.paid_date : null,
      status: inv.status === 'Paid' ? 'Completed' : 'Pending',
      method: inv.payment_method || 'Awaiting Payment',
      due_date: inv.due_date
    }));

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Payments</h1>
              <p className="text-slate-600 mt-2">Track and manage project payments.</p>
            </div>
            <button
              onClick={() => setShowAddPayment(!showAddPayment)}
              className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Make a Payment
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <p className="text-slate-600 text-sm font-medium">Total Amount</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">${totalAmount.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">{payments.length} transactions</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <p className="text-slate-600 text-sm font-medium">Paid</p>
              <p className="text-3xl font-bold text-green-600 mt-2">${paidAmount.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">
                {payments.filter(p => p.status === 'Completed').length} completed
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
              <p className="text-slate-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">${pendingAmount.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">
                {payments.filter(p => p.status === 'Pending').length} awaiting payment
              </p>
            </div>
          </div>

          {/* Payment Form Modal */}
          {showAddPayment && (
            <div className="bg-white rounded-lg shadow p-6 mb-8 border-2 border-blue-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Make a Payment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Invoice</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select an invoice</option>
                    {MOCK_CLIENT_INVOICES.filter(inv => inv.status === 'Sent').map(inv => (
                      <option key={inv.id} value={inv.id}>
                        {inv.invoice_number} - ${inv.total.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Bank Transfer</option>
                    <option>Credit Card</option>
                    <option>Wire Transfer</option>
                    <option>Check</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Transaction Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Notes (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Add any payment notes..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                  Submit Payment
                </button>
                <button
                  onClick={() => setShowAddPayment(false)}
                  className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Payment History */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Payment History</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Invoice</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Payment Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr
                      key={payment.id}
                      className={`border-b border-slate-200 hover:bg-slate-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        {payment.invoice_number}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {payment.project}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        ${payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(payment.due_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {payment.date ? new Date(payment.date).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {payment.method}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit ${
                          payment.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {payment.status === 'Completed' ? (
                            <CheckCircle size={14} />
                          ) : (
                            <Clock size={14} />
                          )}
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="p-2 hover:bg-slate-200 rounded transition text-slate-600">
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <CreditCard className="text-blue-600 mb-3" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">Bank Account</h3>
              <p className="text-sm text-slate-600">Transfer directly to our account</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <CreditCard className="text-blue-600 mb-3" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">Credit Card</h3>
              <p className="text-sm text-slate-600">Pay securely with your credit card</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <CreditCard className="text-blue-600 mb-3" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">Wire Transfer</h3>
              <p className="text-sm text-slate-600">International wire transfer available</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
