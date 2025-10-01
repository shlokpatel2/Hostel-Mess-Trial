import React, { useState } from 'react';
import { User } from '../types';
import { MessageSquare, Menu as MenuIcon, LogOut, Settings } from 'lucide-react';
import ComplaintManagement from './committee/ComplaintManagement';
import MenuManagement from './committee/MenuManagement';

interface CommitteeDashboardProps {
  user: User;
  onLogout: () => void;
}

type Tab = 'complaints' | 'menu';

const CommitteeDashboard: React.FC<CommitteeDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('complaints');

  const tabs = [
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
    { id: 'menu', label: 'Menu Management', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'complaints':
        return <ComplaintManagement />;
      case 'menu':
        return <MenuManagement />;
      default:
        return <ComplaintManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-emerald-600 to-green-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <MenuIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Committee Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {user.name}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-2 mb-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-300">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CommitteeDashboard;