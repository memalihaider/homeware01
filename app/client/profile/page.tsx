'use client';

import { ClientPortalSidebar } from '../components/ClientPortalSidebar';
import { User, Mail, Phone, MapPin, Building, Edit2, Save, X } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Global Tech Solutions',
    type: 'Corporate',
    email: 'contact@globaltechsolutions.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Avenue, Tech City, TC 12345',
    country: 'United States',
    industry: 'Technology & IT Services',
    employees: '500-1000',
    website: 'www.globaltechsolutions.com',
    account_manager: 'Ahmed Hassan',
    joined_date: '2025-12-15',
    subscription: 'Premium',
    projects_completed: 3
  });

  const [editData, setEditData] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profile);
  };

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditData({ ...editData, [field]: value });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ClientPortalSidebar />

      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
              <p className="text-slate-600 mt-2">Manage your account information.</p>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-lg flex items-center justify-center text-4xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{profile.name}</h2>
                  <p className="text-blue-100">{profile.type}</p>
                  <p className="text-blue-100 text-sm mt-1">Account Tier: <span className="font-semibold">{profile.subscription}</span></p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Mail size={20} className="text-blue-600" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Email</p>
                        <p className="text-slate-900">{profile.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Phone</p>
                        <p className="text-slate-900">{profile.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Address</p>
                        <p className="text-slate-900">{profile.address}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Country</p>
                        <p className="text-slate-900">{profile.country}</p>
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Building size={20} className="text-blue-600" />
                      Company Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Industry</p>
                        <p className="text-slate-900">{profile.industry}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Employees</p>
                        <p className="text-slate-900">{profile.employees}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Website</p>
                        <p className="text-blue-600 hover:underline cursor-pointer">{profile.website}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Account Manager</p>
                        <p className="text-slate-900">{profile.account_manager}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Editable Fields */}
                  {Object.entries(editData).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">
                        {key.replace(/_/g, ' ')}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Summary Stats */}
              {!isEditing && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-xs font-semibold text-blue-700 uppercase mb-2">Joined</p>
                      <p className="text-lg font-bold text-slate-900">
                        {new Date(profile.joined_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-xs font-semibold text-green-700 uppercase mb-2">Subscription</p>
                      <p className="text-lg font-bold text-slate-900">{profile.subscription}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-xs font-semibold text-orange-700 uppercase mb-2">Projects</p>
                      <p className="text-lg font-bold text-slate-900">{profile.projects_completed}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-xs font-semibold text-purple-700 uppercase mb-2">Status</p>
                      <p className="text-lg font-bold text-green-600">Active</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="bg-slate-50 p-8 flex justify-end gap-3 border-t border-slate-200">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Security & Privacy</h3>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <p className="font-medium text-slate-900">Change Password</p>
                <p className="text-xs text-slate-600">Update your login password</p>
              </button>
              <button className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                <p className="text-xs text-slate-600">Enable additional security</p>
              </button>
              <button className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <p className="font-medium text-slate-900">Privacy Settings</p>
                <p className="text-xs text-slate-600">Manage data and privacy preferences</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
