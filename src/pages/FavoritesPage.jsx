import React, { useState } from 'react';
import { useRecipe } from '../contexts/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites, shoppingList, removeFromShoppingList, toggleShoppingItem } = useRecipe();
  const [activeTab, setActiveTab] = useState('favorites');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Collection</h1>
        <p className="text-gray-600">
          Manage your favorite recipes and shopping list
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => handleTabChange('favorites')}
          className={`py-3 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'favorites'
              ? 'text-green-600 border-b-2 border-green-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Favorite Recipes
        </button>
        <button
          onClick={() => handleTabChange('shopping')}
          className={`py-3 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'shopping'
              ? 'text-green-600 border-b-2 border-green-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Shopping List
        </button>
      </div>

      {activeTab === 'favorites' ? (
        favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-gray-700">No favorite recipes yet</h2>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Explore recipes and click the heart icon to add them to your favorites
            </p>
            <Link to="/" className="mt-6 inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Discover Recipes
            </Link>
          </div>
        )
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Shopping List</h2>
          
          {shoppingList.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {shoppingList.map((item) => (
                <li key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleShoppingItem(item.id)}
                      className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <div className="ml-3">
                      <p className={`text-sm ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {item.original || item.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromShoppingList(item.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <h3 className="mt-3 text-lg font-medium text-gray-700">Your shopping list is empty</h3>
              <p className="mt-2 text-gray-500">
                Add ingredients from recipes to build your shopping list
              </p>
              <Link to="/" className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Browse Recipes
              </Link>
            </div>
          )}
          
          {shoppingList.length > 0 && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                </svg>
                Print List
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; 