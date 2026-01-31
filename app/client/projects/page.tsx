'use client';

import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { MOCK_CLIENT_PROJECTS } from '../lib/client-portal-data';
import Link from 'next/link';
import { FolderOpen, Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function MyProjectsPage() {
  const projects = MOCK_CLIENT_PROJECTS;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'On Hold': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">My Projects</h1>
            <p className="text-slate-600 mt-2">Manage and track all your projects in one place.</p>
          </div>

          {/* Filter and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search projects..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Link key={project.id} href={`/client/projects/${project.id}`}>
                <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer h-full">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white rounded-t-lg">
                    <div className="flex items-start justify-between mb-2">
                      <FolderOpen size={24} />
                      <span className={`text-xs font-bold px-2 py-1 bg-white/20 rounded ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-blue-100 text-sm">{project.project_number}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-4">
                    <p className="text-slate-600 text-sm line-clamp-2">{project.description}</p>

                    {/* Status and Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600">Status</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold text-slate-600">Progress</span>
                          <span className="text-xs font-bold text-slate-900">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                      <div className="text-center">
                        <Calendar size={16} className="text-slate-400 mx-auto mb-1" />
                        <p className="text-xs text-slate-600">
                          {new Date(project.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-center">
                        <Users size={16} className="text-slate-400 mx-auto mb-1" />
                        <p className="text-xs text-slate-600">{project.team_members.length} Members</p>
                      </div>
                      <div className="text-center">
                        <DollarSign size={16} className="text-slate-400 mx-auto mb-1" />
                        <p className="text-xs text-slate-600">${(project.spent / 1000).toFixed(0)}K spent</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp size={16} className="text-slate-400 mx-auto mb-1" />
                        <p className="text-xs text-slate-600">
                          {Math.round((project.spent / project.budget) * 100)}% used
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
