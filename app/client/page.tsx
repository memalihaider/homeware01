'use client';

import { ClientPortalSidebar } from './components/ClientPortalSidebar';
import { MOCK_CLIENT_PROJECTS, MOCK_CLIENT_INVOICES } from './lib/client-portal-data';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import {
  FolderOpen,
  DollarSign,
  Users,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function ClientDashboard() {
  const projects = MOCK_CLIENT_PROJECTS;
  const invoices = MOCK_CLIENT_INVOICES;

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;

  const projectStatusData = [
    { name: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length },
    { name: 'Completed', value: projects.filter(p => p.status === 'Completed').length },
    { name: 'On Hold', value: projects.filter(p => p.status === 'On Hold').length },
    { name: 'Cancelled', value: projects.filter(p => p.status === 'Cancelled').length }
  ].filter(d => d.value > 0);

  const budgetData = projects.map(p => ({
    name: p.project_number,
    allocated: p.budget,
    spent: p.spent,
    remaining: p.budget - p.spent
  }));

  const progressData = projects.map(p => ({
    name: p.project_number,
    progress: p.progress
  }));

  const invoiceStatusData = [
    { name: 'Paid', value: invoices.filter(i => i.status === 'Paid').length },
    { name: 'Sent', value: invoices.filter(i => i.status === 'Sent').length },
    { name: 'Overdue', value: invoices.filter(i => i.status === 'Overdue').length }
  ].filter(d => d.value > 0);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Client Dashboard</h1>
            <p className="text-slate-600 mt-2">Welcome back! Here's your project overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Active Projects */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Active Projects</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{activeProjects}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FolderOpen className="text-blue-600" size={24} />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">of {projects.length} total</p>
            </div>

            {/* Budget Overview */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Budget Utilization</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {Math.round((totalSpent / totalBudget) * 100)}%
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="text-green-600" size={24} />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                ${totalSpent.toLocaleString()} of ${totalBudget.toLocaleString()}
              </p>
            </div>

            {/* Average Progress */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Avg. Progress</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{avgProgress}%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="text-purple-600" size={24} />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">across all projects</p>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Team Members</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {new Set(projects.flatMap(p => p.team_members.map(m => m.id))).size}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Users className="text-orange-600" size={24} />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">assigned to projects</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Project Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Project Status Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Budget Allocation */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Budget by Project</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="allocated" fill="#3b82f6" />
                  <Bar dataKey="spent" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Project Progress */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Project Progress Tracking</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="#3b82f6"
                    dot={{ fill: '#3b82f6', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Projects */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Projects</h2>
              <div className="space-y-3">
                {projects
                  .filter(p => p.status === 'In Progress')
                  .slice(0, 3)
                  .map(project => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{project.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden max-w-xs">
                            <div
                              className="bg-blue-500 h-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-600">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Invoices */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Invoices</h2>
              <div className="space-y-3">
                {invoices.slice(0, 3).map(invoice => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                    <div>
                      <p className="font-medium text-slate-900">{invoice.invoice_number}</p>
                      <p className="text-xs text-slate-500">{invoice.project_title}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">${invoice.total.toLocaleString()}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        invoice.status === 'Sent' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
