'use client';

import { useState } from 'react';
import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { MOCK_CLIENT_PROJECTS } from '../lib/client-portal-data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailsPage() {
  const [selectedProject, setSelectedProject] = useState(MOCK_CLIENT_PROJECTS[0]);

  // Mock task timeline data
  const taskTimelineData = selectedProject.tasks.map(task => ({
    name: task.title.substring(0, 10),
    completion: task.progress,
    status: task.status
  }));

  // Budget breakdown
  const budgetData = [
    { name: 'Spent', value: selectedProject.spent },
    { name: 'Remaining', value: selectedProject.budget - selectedProject.spent }
  ];

  const taskStatusData = [
    { name: 'Completed', value: selectedProject.tasks.filter(t => t.status === 'Completed').length },
    { name: 'In Progress', value: selectedProject.tasks.filter(t => t.status === 'In Progress').length },
    { name: 'Pending', value: selectedProject.tasks.filter(t => t.status === 'Pending').length }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Back Button */}
          <Link href="/client/projects" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft size={20} />
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900">{selectedProject.title}</h1>
                <p className="text-slate-600 mt-2">{selectedProject.project_number}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`inline-block px-4 py-2 rounded-full font-semibold ${
                  selectedProject.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  selectedProject.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {selectedProject.status}
                </span>
              </div>
            </div>
            <p className="text-slate-600">{selectedProject.description}</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Overall Progress</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{selectedProject.progress}%</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-blue-200 flex items-center justify-center">
                  <span className="font-bold text-lg text-blue-600">{selectedProject.progress}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Budget Status</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {Math.round((selectedProject.spent / selectedProject.budget) * 100)}%
                  </p>
                </div>
                <DollarSign className="text-green-600" size={32} />
              </div>
              <p className="text-xs text-slate-500 mt-3">
                ${selectedProject.spent.toLocaleString()} of ${selectedProject.budget.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Team Members</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{selectedProject.team_members.length}</p>
                </div>
                <Users className="text-orange-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Tasks</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {selectedProject.tasks.filter(t => t.status === 'Completed').length}/{selectedProject.tasks.length}
                  </p>
                </div>
                <CheckCircle className="text-blue-600" size={32} />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Budget Breakdown */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Budget Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${(value / 1000).toFixed(0)}K`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#10b981" />
                  </Pie>
                  <Tooltip formatter={(value) => `$${(value || 0).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Task Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Task Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Task Timeline */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Task Completion Progress</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taskTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Project Tasks</h2>
            <div className="space-y-3">
              {selectedProject.tasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {task.status === 'Completed' ? (
                        <CheckCircle className="text-green-600" size={20} />
                      ) : (
                        <AlertCircle className="text-yellow-600" size={20} />
                      )}
                      <div>
                        <p className="font-semibold text-slate-900">{task.title}</p>
                        <p className="text-xs text-slate-500">Assigned to: {task.assignee}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {task.status}
                    </span>
                    <p className="text-xs text-slate-600 mt-1">{task.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Project Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedProject.team_members.map(member => (
                <div key={member.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <p className="font-semibold text-slate-900">{member.name}</p>
                  <p className="text-sm text-slate-600">{member.role}</p>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-700 inline-block mt-2">
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
