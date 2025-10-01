import React, { useState } from 'react';
import { User, ChefHat, GraduationCap, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'committee' | null>(null);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleRoleSelect = (role: 'student' | 'committee') => {
    setSelectedRole(role);
    // Pre-fill demo credentials
    if (role === 'student') {
      setCredentials({ email: 'student@hostel.edu', password: 'student123' });
    } else {
      setCredentials({ email: 'committee@hostel.edu', password: 'admin123' });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      const user = {
        id: selectedRole === 'student' ? 'student1' : 'committee1',
        name: selectedRole === 'student' ? 'Arjun Singh' : 'Dr. Rajesh Sharma',
        role: selectedRole,
        email: credentials.email
      };
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Mess Management
            </h1>
            <p className="text-gray-600 mt-2">Select your role to continue</p>
          </div>

          {!selectedRole ? (
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect('student')}
                className="w-full p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-200 rounded-xl transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Student</h3>
                    <p className="text-sm text-gray-600">Access menu, complaints, and tips</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect('committee')}
                className="w-full p-6 bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 border-2 border-emerald-200 rounded-xl transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Committee Head</h3>
                    <p className="text-sm text-gray-600">Manage complaints and menu</p>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="text-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                  selectedRole === 'student' ? 'bg-blue-500' : 'bg-emerald-500'
                }`}>
                  {selectedRole === 'student' ? 
                    <GraduationCap className="w-6 h-6 text-white" /> : 
                    <User className="w-6 h-6 text-white" />
                  }
                </div>
                <p className="text-lg font-semibold mt-2 capitalize">{selectedRole} Login</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg ${
                  selectedRole === 'student' 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
                    : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Login</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="w-full py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to role selection
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;