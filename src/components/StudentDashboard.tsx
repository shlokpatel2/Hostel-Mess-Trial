import React, { useState } from 'react';
import { User } from '../types';
import { Calendar, MessageSquare, Heart, Bell, LogOut, Menu as MenuIcon } from 'lucide-react';
import MenuSection from './student/MenuSection';
import ComplaintsSection from './student/ComplaintsSection';
import TippingSection from './student/TippingSection';
import AnnouncementsSection from './student/AnnouncementsSection';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

type Tab = 'menu' | 'complaints' | 'tips' | 'announcements';

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('menu');

  const tabs = [
    { id: 'menu', label: 'Menu', icon: Calendar },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
    { id: 'tips', label: 'Tips', icon: Heart },
    { id: 'announcements', label: 'Announcements', icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return <MenuSection />;
      case 'complaints':
        return <ComplaintsSection studentId={user.id} studentName={user.name} />;
      case 'tips':
        return <TippingSection />;
      case 'announcements':
        return <AnnouncementsSection />;
      default:
        return <MenuSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <MenuIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mess Portal</h1>
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
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
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

export default StudentDashboard;