'use client';

import Link from 'next/link';
import { Home, FolderOpen, FileText, CreditCard, BarChart3, Settings, Users, Calendar, MessageCircle } from 'lucide-react';

export function ClientPortalSidebar() {
  const menuItems = [
    { href: '/client', icon: Home, label: 'Dashboard' },
    { href: '/client/projects', icon: FolderOpen, label: 'Projects' },
    { href: '/client/documents', icon: FileText, label: 'Documents' },
    { href: '/client/invoices', icon: CreditCard, label: 'Invoices' },
    { href: '/client/payments', icon: CreditCard, label: 'Payments' },
    { href: '/client/quotations', icon: FileText, label: 'Quotations' },
    { href: '/client/reports', icon: BarChart3, label: 'Reports' },
    { href: '/client/timeline', icon: Calendar, label: 'Timeline' },
    { href: '/client/team-members', icon: Users, label: 'Team Members' },
    { href: '/client/communications', icon: MessageCircle, label: 'Communications' },
    { href: '/client/profile', icon: Users, label: 'Profile' },
    { href: '/client/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Client Portal</h2>
      </div>
      <nav className="px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}