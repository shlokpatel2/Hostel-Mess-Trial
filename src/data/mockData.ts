import { MenuItem, Worker, Complaint, Announcement } from '../types';

export const weeklyMenu: MenuItem[] = [
  {
    id: '1',
    day: 'Monday',
    breakfast: ['Poha', 'Bread & Butter', 'Tea/Coffee'],
    lunch: ['Rice', 'Dal Tadka', 'Aloo Sabzi', 'Roti', 'Salad'],
    dinner: ['Rice', 'Rajma', 'Mixed Vegetables', 'Roti', 'Curd']
  },
  {
    id: '2',
    day: 'Tuesday',
    breakfast: ['Upma', 'Banana', 'Tea/Coffee'],
    lunch: ['Rice', 'Sambar', 'Bhindi Fry', 'Roti', 'Pickle'],
    dinner: ['Rice', 'Chana Masala', 'Cauliflower Curry', 'Roti', 'Raita']
  },
  {
    id: '3',
    day: 'Wednesday',
    breakfast: ['Paratha', 'Curd', 'Tea/Coffee'],
    lunch: ['Rice', 'Dal Fry', 'Palak Paneer', 'Roti', 'Salad'],
    dinner: ['Rice', 'Kadhi', 'Aloo Gobi', 'Roti', 'Pickle']
  },
  {
    id: '4',
    day: 'Thursday',
    breakfast: ['Idli Sambar', 'Coconut Chutney', 'Tea/Coffee'],
    lunch: ['Rice', 'Rasam', 'Egg Curry', 'Roti', 'Papad'],
    dinner: ['Rice', 'Dal Makhani', 'Jeera Aloo', 'Roti', 'Curd']
  },
  {
    id: '5',
    day: 'Friday',
    breakfast: ['Dosa', 'Sambar', 'Chutney', 'Tea/Coffee'],
    lunch: ['Rice', 'Dal', 'Fish Curry', 'Roti', 'Salad'],
    dinner: ['Rice', 'Paneer Butter Masala', 'Green Beans', 'Roti', 'Raita']
  },
  {
    id: '6',
    day: 'Saturday',
    breakfast: ['Puri Bhaji', 'Tea/Coffee'],
    lunch: ['Rice', 'Sambar', 'Chicken Curry', 'Roti', 'Pickle'],
    dinner: ['Rice', 'Dal', 'Mix Veg', 'Roti', 'Curd', 'Ice Cream']
  },
  {
    id: '7',
    day: 'Sunday',
    breakfast: ['Chole Bhature', 'Tea/Coffee'],
    lunch: ['Rice', 'Dal', 'Mutton Curry', 'Roti', 'Salad'],
    dinner: ['Rice', 'Rajma', 'Cabbage Sabzi', 'Roti', 'Sweet Dish']
  }
];

export const workers: Worker[] = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    photo: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150',
    upiId: 'ramesh.kumar@paytm',
    role: 'Head Chef'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    photo: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150',
    upiId: 'priya.sharma@phonepe',
    role: 'Assistant Chef'
  },
  {
    id: '3',
    name: 'Suresh Patel',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    upiId: 'suresh.patel@gpay',
    role: 'Kitchen Helper'
  },
  {
    id: '4',
    name: 'Anita Devi',
    photo: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=150',
    upiId: 'anita.devi@paytm',
    role: 'Cleaner'
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    studentId: 'student1',
    studentName: 'Arjun Singh',
    category: 'Taste Issues',
    description: 'The dal was too salty today during lunch. Multiple students complained about the same issue.',
    timestamp: new Date('2024-01-15T12:30:00'),
    status: 'pending'
  },
  {
    id: '2',
    studentId: 'student2',
    studentName: 'Priya Gupta',
    category: 'Hair/Bugs Found',
    description: 'Found a hair in my rice during dinner. This is very unhygienic and needs immediate attention.',
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: new Date('2024-01-14T19:15:00'),
    status: 'resolved'
  },
  {
    id: '3',
    studentId: 'student3',
    studentName: 'Ravi Kumar',
    category: 'Quality Issues',
    description: 'The vegetables were undercooked and the roti was hard. Food quality has been declining recently.',
    timestamp: new Date('2024-01-13T13:45:00'),
    status: 'pending'
  }
];

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Special Dinner Tomorrow',
    content: 'We will be serving special biryani for dinner tomorrow to celebrate the festival. Please inform your friends!',
    timestamp: new Date('2024-01-15T10:00:00'),
    priority: 'high'
  },
  {
    id: '2',
    title: 'Mess Timing Change',
    content: 'Starting next week, breakfast timing will be extended till 10:30 AM due to popular demand.',
    timestamp: new Date('2024-01-14T16:00:00'),
    priority: 'medium'
  },
  {
    id: '3',
    title: 'New Menu Items',
    content: 'We have added South Indian items to our breakfast menu. Try our new dosa and uttapam!',
    timestamp: new Date('2024-01-13T09:00:00'),
    priority: 'low'
  }
];

export const complaintCategories = [
  'Taste Issues',
  'Hair/Bugs Found',
  'Quality Issues',
  'Temperature Issues',
  'Hygiene Issues',
  'Portion Size',
  'Service Issues',
  'Other'
];