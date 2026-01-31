'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  ChevronDown,
  LayoutDashboard,
  FolderOpen,
  FileText,
  Users,
  Clock,
  DollarSign,
  Download,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export function ClientPortalSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const menuGroups = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', href: '/client', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Projects',
      items: [
        { label: 'My Projects', href: '/client/projects', icon: FolderOpen },
        { label: 'Project Details', href: '/client/project-details', icon: FileText },
        { label: 'Timeline', href: '/client/timeline', icon: Clock },
        { label: 'Team Members', href: '/client/team-members', icon: Users }
      ]
    },
    {
      title: 'Financial',
      items: [
        { label: 'Invoices', href: '/client/invoices', icon: DollarSign },
        { label: 'Quotations', href: '/client/quotations', icon: FileText },
        { label: 'Payments', href: '/client/payments', icon: DollarSign }
      ]
    },
    {
      title: 'Resources',
      items: [
        { label: 'Documents', href: '/client/documents', icon: Download },
        { label: 'Reports', href: '/client/reports', icon: FileText },
        { label: 'Communications', href: '/client/communications', icon: Users }
      ]
    },
    {
      title: 'Account',
      items: [
        { label: 'Profile', href: '/client/profile', icon: Users },
        { label: 'Settings', href: '/client/settings', icon: Settings }
      ]
    }
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl transition-transform duration-300 z-40 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '280px' }}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold">
                CP
              </div>
              <div>
                <h1 className="font-bold text-lg">Client Portal</h1>
                <p className="text-xs text-slate-400">Global Tech Solutions</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {menuGroups.map((group) => (
              <div key={group.title} className="mb-6">
                <h3 className="px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-all duration-200 ${
                          active
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'text-slate-300 hover:bg-slate-700/50'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-all text-sm">
              <Users size={18} />
              <span>My Account</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-red-600/20 hover:text-red-300 transition-all text-sm">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
