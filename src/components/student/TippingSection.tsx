import React, { useState } from 'react';
import { Heart, QrCode, Copy } from 'lucide-react';
import { useWorkers } from '../../hooks/useDatabase';

const TippingSection: React.FC = () => {
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [tipAmount, setTipAmount] = useState('');
  const [showQR, setShowQR] = useState(false);
  const { workers, loading, error } = useWorkers();

  const handleTip = (workerId: string) => {
    setSelectedWorker(workerId);
    setShowQR(true);
  };

  const copyUPI = (upiId: string) => {
    navigator.clipboard.writeText(upiId);
    // You could add a toast notification here
  };

  const selectedWorkerData = workers.find(w => w.id === selectedWorker);

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-48"></div>
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
          <p>Error loading workers: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Tip Our Staff</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Show your appreciation for the hardworking mess staff. Your tips help motivate them to provide better service.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {workers.map((worker) => (
            <div key={worker.id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <img
                  src={worker.photo}
                  alt={worker.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                />
                <h3 className="font-semibold text-gray-900 mb-1">{worker.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{worker.role}</p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleTip(worker.id)}
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-300 font-medium"
                  >
                    Tip Now
                  </button>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-100 rounded-lg p-2">
                    <span className="truncate mr-2">{worker.upiId}</span>
                    <button
                      onClick={() => copyUPI(worker.upiId)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tip Modal */}
      {showQR && selectedWorkerData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <img
                src={selectedWorkerData.photo}
                alt={selectedWorkerData.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Tip {selectedWorkerData.name}
              </h3>
              <p className="text-gray-600 mb-6">{selectedWorkerData.role}</p>

              {/* Mock QR Code */}
              <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-gray-400" />
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 mb-2">UPI ID:</p>
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="font-mono text-sm">{selectedWorkerData.upiId}</span>
                  <button
                    onClick={() => copyUPI(selectedWorkerData.upiId)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowQR(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Open UPI app
                    window.open(`upi://pay?pa=${selectedWorkerData.upiId}&pn=${selectedWorkerData.name}&cu=INR`);
                  }}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-300"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information Card */}
      <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-6 border border-pink-200">
        <h3 className="font-semibold text-pink-900 mb-3">About Tipping</h3>
        <ul className="text-sm text-pink-800 space-y-2">
          <li>• Tips are voluntary and go directly to the staff members</li>
          <li>• All payments are secure and processed through UPI</li>
          <li>• Your generosity helps improve service quality</li>
          <li>• Tips are distributed fairly among the team</li>
        </ul>
      </div>
    </div>
  );
};

export default TippingSection;