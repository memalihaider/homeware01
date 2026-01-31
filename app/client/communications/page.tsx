'use client';

import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { MessageCircle, Phone, Mail, Send, Clock } from 'lucide-react';
import { useState } from 'react';

export default function CommunicationsPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Ahmed Hassan',
      role: 'Project Lead',
      message: 'Project milestone completed on schedule. All inspections passed successfully.',
      timestamp: '2026-01-29 14:30',
      type: 'team'
    },
    {
      id: 2,
      sender: 'Sarah Johnson',
      role: 'Designer',
      message: 'Design revisions uploaded. Please review and provide feedback.',
      timestamp: '2026-01-28 10:15',
      type: 'team'
    },
    {
      id: 3,
      sender: 'System',
      role: 'Admin',
      message: 'Invoice INV-2026-002 has been generated and sent to your email.',
      timestamp: '2026-01-28 09:00',
      type: 'system'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'team' | 'system'>('all');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        {
          id: messages.length + 1,
          sender: 'You',
          role: 'Client',
          message: newMessage,
          timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
          type: 'team'
        },
        ...messages
      ]);
      setNewMessage('');
    }
  };

  const filteredMessages = selectedType === 'all' ? messages : messages.filter(m => m.type === selectedType);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Communications</h1>
            <p className="text-slate-600 mt-2">Stay in touch with your project team.</p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
              <MessageCircle className="text-blue-600 mb-3" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">Messages</h3>
              <p className="text-sm text-slate-600 mb-4">Direct messaging with team</p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Open Chat →</button>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
              <Phone className="text-green-600 mb-3" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
              <p className="text-sm text-slate-600 mb-4">Call project team</p>
              <p className="text-sm font-mono text-slate-900">+1 (555) 987-6543</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
              <Mail className="text-orange-600 mb-3" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
              <p className="text-sm text-slate-600 mb-4">Send email to team</p>
              <p className="text-sm font-mono text-slate-900">team@homeware.com</p>
            </div>
          </div>

          {/* Message Filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              { id: 'all', label: 'All Messages' },
              { id: 'team', label: 'Team Updates' },
              { id: 'system', label: 'System Notifications' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedType === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Messages Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-[600px]">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {filteredMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-500">
                  <p>No messages yet</p>
                </div>
              ) : (
                filteredMessages.map(msg => (
                  <div key={msg.id} className={`flex gap-4 ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {msg.sender.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={`flex-1 ${msg.sender === 'You' ? 'text-right' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-slate-900">{msg.sender}</p>
                        <span className="text-xs text-slate-500">{msg.role}</span>
                      </div>
                      <div className={`inline-block p-3 rounded-lg ${
                        msg.sender === 'You'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-900'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                        <Clock size={12} />
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Contacts */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-xs text-slate-600 font-semibold mb-2">PROJECT LEAD</p>
              <p className="font-semibold text-slate-900">Ahmed Hassan</p>
              <p className="text-xs text-slate-500 mt-1">+1 (555) 123-4567</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-xs text-slate-600 font-semibold mb-2">DESIGNER</p>
              <p className="font-semibold text-slate-900">Sarah Johnson</p>
              <p className="text-xs text-slate-500 mt-1">+1 (555) 234-5678</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-xs text-slate-600 font-semibold mb-2">CONSTRUCTOR</p>
              <p className="font-semibold text-slate-900">Mohammed Ali</p>
              <p className="text-xs text-slate-500 mt-1">+1 (555) 345-6789</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-xs text-slate-600 font-semibold mb-2">SUPPORT</p>
              <p className="font-semibold text-slate-900">Support Team</p>
              <p className="text-xs text-slate-500 mt-1">support@homeware.com</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
