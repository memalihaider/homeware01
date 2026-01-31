'use client';

import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { MOCK_CLIENT_PROJECTS } from '../lib/client-portal-data';
import { Calendar, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function TimelinePage() {
  const [view, setView] = useState<'list' | 'gantt'>('list');

  const allTasks = MOCK_CLIENT_PROJECTS.flatMap(project =>
    project.tasks.map(task => ({
      ...task,
      project_id: project.id,
      project_name: project.title,
      project_number: project.project_number
    }))
  );

  const getMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  const getProgress = (tasks: typeof allTasks) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Project Timeline</h1>
            <p className="text-slate-600 mt-2">Track all project milestones and deadlines.</p>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                view === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView('gantt')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                view === 'gantt'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              Timeline View
            </button>
          </div>

          {/* Timeline Content */}
          {view === 'list' && (
            <div className="space-y-6">
              {MOCK_CLIENT_PROJECTS.map(project => (
                <div key={project.id} className="bg-white rounded-lg shadow p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                    <p className="text-sm text-slate-600">{project.project_number}</p>
                  </div>

                  <div className="space-y-2">
                    {project.tasks.map(task => (
                      <div key={task.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {task.status === 'Completed' ? (
                              <CheckCircle className="text-green-600" size={18} />
                            ) : (
                              <AlertCircle className="text-yellow-600" size={18} />
                            )}
                            <p className="font-medium text-slate-900">{task.title}</p>
                          </div>
                          <div className="flex items-center gap-4 ml-6 text-xs text-slate-600">
                            <span>📅 {getMonthYear(task.due_date)}</span>
                            <span>👤 {task.assignee}</span>
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
                          <p className="text-xs text-slate-600 mt-1">{task.progress}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Gantt Chart View */}
          {view === 'gantt' && (
            <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
              <div className="space-y-6 min-w-max">
                {MOCK_CLIENT_PROJECTS.map(project => (
                  <div key={project.id}>
                    <h3 className="font-semibold text-slate-900 mb-3">{project.title}</h3>
                    <div className="space-y-2">
                      {project.tasks.map(task => {
                        const startDate = new Date(task.due_date);
                        const endDate = new Date(startDate);
                        endDate.setDate(endDate.getDate() + 7);
                        
                        return (
                          <div key={task.id} className="flex items-center gap-3">
                            <div className="w-48 text-sm font-medium text-slate-900 truncate">
                              {task.title}
                            </div>
                            <div className="flex-1 h-8 bg-slate-100 rounded relative overflow-hidden">
                              <div
                                className={`h-full rounded transition-all ${
                                  task.status === 'Completed' ? 'bg-green-500' :
                                  task.status === 'In Progress' ? 'bg-blue-500' :
                                  'bg-slate-400'
                                }`}
                                style={{ width: '75%' }}
                              >
                                <span className="text-xs font-bold text-white flex items-center justify-center h-full">
                                  {task.progress}%
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
