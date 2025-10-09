import React, { useState } from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { MenuItem } from '../../types';
import { useMenu } from '../../hooks/useDatabase';

const MenuSection: React.FC = () => {
  const [showFullMenu, setShowFullMenu] = useState(false);
  const { menu: weeklyMenu, loading, error } = useMenu();
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayMenu = weeklyMenu.find(menu => menu.day === today) || weeklyMenu[0];
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="text-center text-red-600">
          <p>Error loading menu: {error}</p>
        </div>
      </div>
    );
  }

  const mealTimes = [
    { name: 'Breakfast', time: '7:30 - 10:00 AM', items: todayMenu.breakfast },
    { name: 'Lunch', time: '12:00 - 2:30 PM', items: todayMenu.lunch },
    { name: 'Snacks', time: '4:00 - 6:00 PM', items: todayMenu.snacks },
    { name: 'Dinner', time: '7:00 - 10:00 PM', items: todayMenu.dinner },
  ];

  if (showFullMenu) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Weekly Menu</h2>
          <button
            onClick={() => setShowFullMenu(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Today's Menu
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {weeklyMenu.map((menu) => (
            <div key={menu.id} className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{menu.day}</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">Breakfast</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {menu.breakfast.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Lunch</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {menu.lunch.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-600 mb-2">Dinner</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {menu.dinner.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-pink-600 mb-2">Snacks</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {menu.snacks.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Today's Menu</h2>
            <div className="flex items-center space-x-2 text-gray-600 mt-2">
              <Calendar className="w-4 h-4" />
              <span>{today}, {currentDate}</span>
            </div>
          </div>
          <button
            onClick={() => setShowFullMenu(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>View Full Menu</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {mealTimes.map((meal, index) => (
            <div key={meal.name} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-orange-500' : 
                  index === 1 ? 'bg-green-500' : 
                  index === 2 ? 'bg-pink-500' : 'bg-purple-500'
                }`}></div>
                <h3 className="text-xl font-bold text-gray-900">{meal.name}</h3>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{meal.time}</span>
              </div>

              <ul className="space-y-2">
                {meal.items.map((item, idx) => (
                  <li key={idx} className="text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;