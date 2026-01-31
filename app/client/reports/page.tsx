'use client';

import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { MOCK_CLIENT_PROJECTS } from '../lib/client-portal-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter } from 'lucide-react';
import { useState } from 'react';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<'overview' | 'budget' | 'progress'>('overview');

  const projects = MOCK_CLIENT_PROJECTS;

  // Overview Report Data
  const projectStatusSummary = [
    { status: 'In Progress', count: projects.filter(p => p.status === 'In Progress').length },
    { status: 'Completed', count: projects.filter(p => p.status === 'Completed').length },
    { status: 'On Hold', count: projects.filter(p => p.status === 'On Hold').length }
  ];

  // Budget Report Data
  const budgetSummary = projects.map(p => ({
    project: p.project_number,
    budget: p.budget,
    spent: p.spent,
    remaining: p.budget - p.spent
  }));

  // Progress Report Data
  const progressSummary = projects.map(p => ({
    project: p.project_number,
    progress: p.progress,
    completed_tasks: p.tasks.filter(t => t.status === 'Completed').length,
    total_tasks: p.tasks.length
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
              <p className="text-slate-600 mt-2">Generate and view comprehensive project reports.</p>
            </div>
            <button className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Download size={18} />
              Export Report
            </button>
          </div>

          {/* Report Type Selector */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'budget', label: 'Budget Analysis' },
              { id: 'progress', label: 'Progress Tracking' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setReportType(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  reportType === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Report Content */}
          {reportType === 'overview' && (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-slate-600 text-sm font-medium">Total Projects</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{projects.length}</p>
                  <p className="text-xs text-slate-500 mt-2">across all statuses</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-slate-600 text-sm font-medium">Avg Progress</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
                  </p>
                  <p className="text-xs text-slate-500 mt-2">overall completion</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-slate-600 text-sm font-medium">Total Investment</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">across all projects</p>
                </div>
              </div>

              {/* Status Distribution */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Project Status Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectStatusSummary}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry: any) => `${entry.status} (${entry.count})`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {projectStatusSummary.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {reportType === 'budget' && (
            <div className="space-y-6">
              {/* Budget Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-slate-600 text-sm font-medium">Total Budget</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-slate-600 text-sm font-medium">Total Spent</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">
                    ${projects.reduce((sum, p) => sum + p.spent, 0).toLocaleString()}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-slate-600 text-sm font-medium">Utilization Rate</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {Math.round(
                      (projects.reduce((sum, p) => sum + p.spent, 0) /
                        projects.reduce((sum, p) => sum + p.budget, 0)) *
                        100
                    )}%
                  </p>
                </div>
              </div>

              {/* Budget by Project */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Budget by Project</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={budgetSummary}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="project" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="budget" fill="#3b82f6" />
                    <Bar dataKey="spent" fill="#ef4444" />
                    <Bar dataKey="remaining" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Budget Details Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-900">Budget Breakdown</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Project</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700">Budget</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700">Spent</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700">Remaining</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700">Utilization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budgetSummary.map((item, index) => {
                        const utilization = Math.round((item.spent / item.budget) * 100);
                        return (
                          <tr
                            key={item.project}
                            className={`border-b border-slate-200 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                          >
                            <td className="px-6 py-4 text-sm font-semibold text-slate-900">{item.project}</td>
                            <td className="px-6 py-4 text-sm text-right font-semibold text-slate-900">
                              ${item.budget.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-right text-slate-600">
                              ${item.spent.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-right text-slate-600">
                              ${item.remaining.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-right">
                              <span className={`font-semibold ${
                                utilization > 90 ? 'text-red-600' : utilization > 70 ? 'text-orange-600' : 'text-green-600'
                              }`}>
                                {utilization}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reportType === 'progress' && (
            <div className="space-y-6">
              {/* Progress Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Project Progress</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={progressSummary}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="project" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      stroke="#3b82f6"
                      dot={{ fill: '#3b82f6', r: 6 }}
                      activeDot={{ r: 8 }}
                      name="Progress (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Progress Details */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-900">Progress Details</h2>
                </div>
                <div className="p-6 space-y-4">
                  {progressSummary.map(item => {
                    const project = projects.find(p => p.project_number === item.project);
                    return (
                      <div key={item.project} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-slate-900">{project?.title}</p>
                            <p className="text-xs text-slate-500">{item.project}</p>
                          </div>
                          <span className="text-2xl font-bold text-blue-600">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-500 h-full transition-all"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-600 mt-2">
                          {item.completed_tasks} of {item.total_tasks} tasks completed
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
