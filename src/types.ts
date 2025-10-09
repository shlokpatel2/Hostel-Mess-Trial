export interface User {
  id: string;
  name: string;
  role: 'student' | 'committee';
  email: string;
}

export interface MenuItem {
  id: string;
  day: string;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
}

export interface Worker {
  id: string;
  name: string;
  photo: string;
  upiId: string;
  role: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  category: string;
  description: string;
  image?: string;
  timestamp: Date;
  status: 'pending' | 'resolved';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
}