import React, { useState } from 'react';
import { CreditCard as Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import { weeklyMenu } from '../../data/mockData';
import { MenuItem } from '../../types';

const MenuManagement: React.FC = () => {
  const [menu, setMenu] = useState<MenuItem[]>(weeklyMenu);
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [tempMenu, setTempMenu] = useState<MenuItem | null>(null);

  const handleEditStart = (dayMenu: MenuItem) => {
    setEditingDay(dayMenu.id);
    setTempMenu({ ...dayMenu });
  };

  const handleEditCancel = () => {
    setEditingDay(null);
    setTempMenu(null);
  };

  const handleEditSave = () => {
    if (tempMenu) {
      setMenu(menu.map(item => 
        item.id === tempMenu.id ? tempMenu : item
      ));
      setEditingDay(null);
      setTempMenu(null);
    }
  };

  const addMealItem = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    if (tempMenu) {
      setTempMenu({
        ...tempMenu,
        [mealType]: [...tempMenu[mealType], '']
      });
    }
  };

  const removeMealItem = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner', index: number) => {
    if (tempMenu) {
      setTempMenu({
        ...tempMenu,
        [mealType]: tempMenu[mealType].filter((_, i) => i !== index)
      });
    }
  };

  const updateMealItem = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner', index: number, value: string) => {
    if (tempMenu) {
      const updatedMeal = [...tempMenu[mealType]];
      updatedMeal[index] = value;
      setTempMenu({
        ...tempMenu,
        [mealType]: updatedMeal
      });
    }
  };

  const renderMealSection = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner', items: string[], color: string) => {
    const isEditing = editingDay && tempMenu;
    const currentItems = isEditing ? tempMenu[mealType] : items;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className={`font-semibold capitalize ${color}`}>{mealType}</h4>
          {isEditing && (
            <button
              onClick={() => addMealItem(mealType)}
              className="text-green-600 hover:text-green-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          {currentItems.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateMealItem(mealType, idx, e.target.value)}
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter menu item"
                  />
                  <button
                    onClick={() => removeMealItem(mealType, idx)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <span className="text-sm text-gray-600">• {item}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Edit3 className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Edit the weekly mess menu. Changes will be reflected immediately for all users.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {menu.map((dayMenu) => (
            <div
              key={dayMenu.id}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">{dayMenu.day}</h3>
                <div className="flex space-x-2">
                  {editingDay === dayMenu.id ? (
                    <>
                      <button
                        onClick={handleEditSave}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditStart(dayMenu)}
                      className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {renderMealSection('breakfast', dayMenu.breakfast, 'text-orange-600')}
                {renderMealSection('lunch', dayMenu.lunch, 'text-green-600')}
                {renderMealSection('snacks', dayMenu.snacks, 'text-pink-600')}
                {renderMealSection('dinner', dayMenu.dinner, 'text-purple-600')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-900 mb-3">Menu Management Guidelines</h3>
        <ul className="text-sm text-green-800 space-y-2">
          <li>• Click the edit button to modify any day's menu</li>
          <li>• Use the + button to add new items to any meal</li>
          <li>• Use the trash button to remove items</li>
          <li>• Save your changes to update the menu for all students</li>
          <li>• Consider dietary restrictions and preferences when planning meals</li>
        </ul>
      </div>
    </div>
  );
};

export default MenuManagement;