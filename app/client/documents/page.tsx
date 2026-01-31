'use client';

import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { MOCK_CLIENT_PROJECTS } from '../lib/client-portal-data';
import { Download, Eye, FileText, FolderOpen, Calendar } from 'lucide-react';

export default function DocumentsPage() {
  const allDocuments = MOCK_CLIENT_PROJECTS.flatMap(project =>
    project.documents.map(doc => ({
      ...doc,
      project_id: project.id,
      project_name: project.title,
      project_number: project.project_number
    }))
  );

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'excel':
        return '📊';
      case 'word':
        return '📝';
      case 'image':
        return '🖼️';
      default:
        return '📎';
    }
  };

  const groupedDocuments = allDocuments.reduce((acc, doc) => {
    const project = acc.find(p => p.project_id === doc.project_id);
    if (project) {
      project.docs.push(doc);
    } else {
      acc.push({
        project_id: doc.project_id,
        project_name: doc.project_name,
        project_number: doc.project_number,
        docs: [doc]
      });
    }
    return acc;
  }, [] as Array<{ project_id: string; project_name: string; project_number: string; docs: any[] }>);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Documents</h1>
            <p className="text-slate-600 mt-2">Access all project documents and files.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <FolderOpen className="text-blue-600 mb-2" size={32} />
              <p className="text-slate-600 text-sm font-medium">Total Documents</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{allDocuments.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <FileText className="text-green-600 mb-2" size={32} />
              <p className="text-slate-600 text-sm font-medium">File Types</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {new Set(allDocuments.map(d => d.type)).size}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <Calendar className="text-orange-600 mb-2" size={32} />
              <p className="text-slate-600 text-sm font-medium">Latest Upload</p>
              <p className="text-sm text-slate-900 mt-2">
                {new Date(Math.max(...allDocuments.map(d => new Date(d.uploaded_date).getTime()))).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Documents by Project */}
          <div className="space-y-8">
            {groupedDocuments.map(group => (
              <div key={group.project_id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Project Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                  <h2 className="text-xl font-bold">{group.project_name}</h2>
                  <p className="text-blue-100 text-sm">{group.project_number}</p>
                </div>

                {/* Documents Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">File Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Uploaded</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.docs.map((doc, index) => (
                        <tr
                          key={doc.id}
                          className={`border-b border-slate-200 hover:bg-slate-50 transition ${
                            index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{getFileIcon(doc.type)}</span>
                              <span className="font-medium text-slate-900">{doc.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                              {doc.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {new Date(doc.uploaded_date).toLocaleDateString()}
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
            ))}
          </div>

          {/* Upload Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Upload New Document</h2>
            <p className="text-blue-800 text-sm mb-4">
              Need to share a document? Contact your project manager or use the project details page to upload files.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              Request Upload
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
