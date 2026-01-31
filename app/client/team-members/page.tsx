'use client';

import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { MOCK_CLIENT_PROJECTS } from '../lib/client-portal-data';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export default function TeamMembersPage() {
  const allMembers = MOCK_CLIENT_PROJECTS.flatMap(project =>
    project.team_members.map(member => ({
      ...member,
      project_id: project.id,
      project_name: project.title,
      project_number: project.project_number
    }))
  );

  // Remove duplicates based on ID
  const uniqueMembers = Array.from(
    new Map(allMembers.map(m => [m.id, m])).values()
  );

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'project lead':
        return 'bg-purple-100 text-purple-700';
      case 'designer':
        return 'bg-pink-100 text-pink-700';
      case 'constructor':
      case 'technician':
      case 'hvac lead':
        return 'bg-blue-100 text-blue-700';
      case 'quality inspector':
        return 'bg-green-100 text-green-700';
      case 'security lead':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Team Members</h1>
            <p className="text-slate-600 mt-2">Meet the professionals working on your projects.</p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueMembers.map(member => (
              <div key={member.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-blue-100 text-sm">{member.role}</p>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Status */}
                  <div className="mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      member.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {member.status}
                    </span>
                  </div>

                  {/* Role Badge */}
                  <div className="mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getRoleColor(member.role)}`}>
                      <Briefcase className="inline mr-1" size={14} />
                      {member.role}
                    </span>
                  </div>

                  {/* Contact Info Placeholder */}
                  <div className="space-y-2 border-t border-slate-200 pt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail size={16} className="text-slate-400" />
                      <span>contact@example.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone size={16} className="text-slate-400" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-600 mb-2">Assigned Projects:</p>
                    <div className="space-y-1">
                      {MOCK_CLIENT_PROJECTS.filter(p =>
                        p.team_members.some(m => m.id === member.id)
                      ).map(project => (
                        <div key={project.id} className="text-xs bg-slate-50 p-2 rounded">
                          <p className="font-medium text-slate-900">{project.title}</p>
                          <p className="text-slate-500">{project.project_number}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-slate-600 text-sm font-medium">Total Team Members</p>
              <p className="text-4xl font-bold text-slate-900 mt-2">{uniqueMembers.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-slate-600 text-sm font-medium">Active Members</p>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {uniqueMembers.filter(m => m.status === 'Active').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-slate-600 text-sm font-medium">Avg. Projects per Member</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {(MOCK_CLIENT_PROJECTS.length / uniqueMembers.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
