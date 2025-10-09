import React, { useState } from 'react';
import { AlertTriangle, User, Calendar, Image, CheckCircle, Clock } from 'lucide-react';
import { useComplaints } from '../../hooks/useDatabase';
import { Complaint } from '../../types';

const ComplaintManagement: React.FC = () => {
  const { complaints, loading, error, updateComplaintStatus } = useComplaints();
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');

  const filteredComplaints = complaints.filter(complaint => 
    filter === 'all' || complaint.status === filter
  );

  const handleStatusChange = (complaintId: string, newStatus: 'pending' | 'resolved') => {
    updateComplaintStatus(complaintId, newStatus);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Taste Issues': 'bg-orange-100 text-orange-800',
      'Hair/Bugs Found': 'bg-red-100 text-red-800',
      'Quality Issues': 'bg-yellow-100 text-yellow-800',
      'Temperature Issues': 'bg-blue-100 text-blue-800',
      'Hygiene Issues': 'bg-purple-100 text-purple-800',
      'Portion Size': 'bg-green-100 text-green-800',
      'Service Issues': 'bg-pink-100 text-pink-800',
      'Other': 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="text-center text-red-600">
          <p>Error loading complaints: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Complaint Management</h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2">
            {['all', 'pending', 'resolved'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors capitalize ${
                  filter === status
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status} ({status === 'all' ? complaints.length : 
                  complaints.filter(c => c.status === status).length})
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600">Pending</p>
                <p className="text-2xl font-bold text-blue-900">
                  {complaints.filter(c => c.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-green-600">Resolved</p>
                <p className="text-2xl font-bold text-green-900">
                  {complaints.filter(c => c.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600">Total</p>
                <p className="text-2xl font-bold text-purple-900">{complaints.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {complaint.studentName}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatTime(complaint.timestamp)}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(complaint.category)}`}>
                          {complaint.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        complaint.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {complaint.description}
                  </p>

                  {complaint.image && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <Image className="w-4 h-4" />
                      <span>Image attached</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    {complaint.status === 'pending' ? (
                      <button
                        onClick={() => handleStatusChange(complaint.id, 'resolved')}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium"
                      >
                        Mark as Resolved
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(complaint.id, 'pending')}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 font-medium"
                      >
                        Reopen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredComplaints.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No complaints found</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'No complaints have been submitted yet.' 
                  : `No ${filter} complaints at the moment.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintManagement;