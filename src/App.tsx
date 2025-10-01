import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import CommitteeDashboard from './components/CommitteeDashboard';
import { User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentUser.role === 'student' ? (
        <StudentDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <CommitteeDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;