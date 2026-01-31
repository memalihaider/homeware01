'use client';

import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { Settings as SettingsIcon, Bell, Lock, Eye, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Notifications
    email_notifications: true,
    project_updates: true,
    invoice_alerts: true,
    task_reminders: true,
    team_messages: true,
    weekly_summary: false,
    
    // Privacy
    profile_visibility: 'public',
    show_phone: false,
    share_data: true,
    marketing_emails: false,
    
    // Preferences
    theme: 'light',
    language: 'en',
    timezone: 'America/New_York',
    date_format: 'MM/DD/YYYY',
    
    // Security
    session_timeout: '30', // minutes
    require_password_change: true,
    ip_whitelist: false
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleChange = (key: keyof typeof settings, value: string | boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    // Save settings
    alert('Settings saved successfully!');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-600 mt-2">Customize your account preferences and notifications.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow overflow-hidden sticky top-8">
                <nav className="flex flex-col">
                  {[
                    { id: 'notifications', label: 'Notifications', icon: Bell },
                    { id: 'privacy', label: 'Privacy', icon: Eye },
                    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
                    { id: 'security', label: 'Security', icon: Lock }
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        className="flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 border-l-4 border-transparent hover:border-blue-600 transition"
                      >
                        <Icon size={18} className="text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Notifications Settings */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Bell size={20} className="text-blue-600" />
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  {[
                    { key: 'email_notifications', label: 'Email Notifications', description: 'Receive updates via email' },
                    { key: 'project_updates', label: 'Project Updates', description: 'Get notified about project changes' },
                    { key: 'invoice_alerts', label: 'Invoice Alerts', description: 'Alerts for new invoices and payments' },
                    { key: 'task_reminders', label: 'Task Reminders', description: 'Reminders about upcoming tasks' },
                    { key: 'team_messages', label: 'Team Messages', description: 'Notifications for team communications' },
                    { key: 'weekly_summary', label: 'Weekly Summary', description: 'Receive weekly project summary' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{item.label}</p>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key as keyof typeof settings] as boolean}
                          onChange={() => handleToggle(item.key as keyof typeof settings)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Eye size={20} className="text-blue-600" />
                  Privacy Settings
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Profile Visibility</label>
                    <select
                      value={settings.profile_visibility}
                      onChange={(e) => handleChange('profile_visibility', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="team">Team Only</option>
                    </select>
                  </div>

                  {[
                    { key: 'show_phone', label: 'Show Phone Number', description: 'Display phone number to team members' },
                    { key: 'share_data', label: 'Share Analytics Data', description: 'Help improve our service' },
                    { key: 'marketing_emails', label: 'Marketing Emails', description: 'Receive promotional content' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{item.label}</p>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key as keyof typeof settings] as boolean}
                          onChange={() => handleToggle(item.key as keyof typeof settings)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <SettingsIcon size={20} className="text-blue-600" />
                  Preferences
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Theme</label>
                    <select
                      value={settings.theme}
                      onChange={(e) => handleChange('theme', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleChange('language', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ar">Arabic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleChange('timezone', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">UK Time</option>
                      <option value="Asia/Dubai">UAE Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date Format</label>
                    <select
                      value={settings.date_format}
                      onChange={(e) => handleChange('date_format', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Lock size={20} className="text-blue-600" />
                  Security
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.session_timeout}
                      onChange={(e) => handleChange('session_timeout', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {[
                    { key: 'require_password_change', label: 'Force Password Change', description: 'Require password change every 90 days' },
                    { key: 'ip_whitelist', label: 'IP Whitelist', description: 'Restrict access to specific IP addresses' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{item.label}</p>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key as keyof typeof settings] as boolean}
                          onChange={() => handleToggle(item.key as keyof typeof settings)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  ))}

                  <button className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                    <p className="font-medium text-slate-900">Change Password</p>
                    <p className="text-xs text-slate-600">Update your login password</p>
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-3">
                <button className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition font-medium">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
