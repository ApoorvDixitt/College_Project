import React, { useState } from 'react';

// Meal type options - could be moved elsewhere but keeping here for simplicity
const MEAL_TYPES = [
  { value: '', label: 'Any Meal Type' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'main course', label: 'Main Course' },
  { value: 'side dish', label: 'Side Dish' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'appetizer', label: 'Appetizer' },
  { value: 'salad', label: 'Salad' },
  { value: 'soup', label: 'Soup' }
];

// Diet and cuisine options
const DIETS = [
  { value: '', label: 'Any Diet' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten Free' },
  { value: 'ketogenic', label: 'Ketogenic' },
  { value: 'paleo', label: 'Paleo' }
];

const CUISINES = [
  { value: '', label: 'Any Cuisine' },
  { value: 'italian', label: 'Italian' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'indian', label: 'Indian' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'thai', label: 'Thai' },
  { value: 'french', label: 'French' }
];

// this is the actual search component
function SearchBar({ onSearch }) {
  // search term state
  const [searchInput, setSearchInput] = useState('');
  
  // filter states
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [dietType, setDietType] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [mealType, setMealType] = useState('');
  const [maxTime, setMaxTime] = useState('');

  // update search text
  function handleSearchChange(e) {
    setSearchInput(e.target.value);
  }

  // handles the form submission - this prevents page reload and calls search callback
  const submitSearch = e => {
    e.preventDefault();
    
    // build params object with all non-empty values
    const params = { query: searchInput };
    
    // only add filters if they have values
    if (dietType) params.diet = dietType;
    if (cuisineType) params.cuisine = cuisineType;
    if (mealType) params.mealType = mealType;
    if (maxTime) params.maxReadyTime = maxTime;
    
    // trigger actual search
    onSearch(params);
  };

  // toggle filters visibility
  const toggleFilters = () => setFiltersVisible(!filtersVisible);
  
  // render filter selectbox - used for diet and cuisine filters which work the same way
  const renderSelect = (label, value, setter, options) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={e => setter(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
      <form onSubmit={submitSearch}>
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            type="button"
            onClick={toggleFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center md:min-w-fit hover:bg-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            Filters
          </button>

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            Search
          </button>
        </div>

        {/* Expandable Filter Section */}
        {filtersVisible && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Diet Filter */}
            {renderSelect('Diet', dietType, setDietType, DIETS)}

            {/* Cuisine Filter */}
            {renderSelect('Cuisine', cuisineType, setCuisineType, CUISINES)}

            {/* Meal Type Filter - using direct approach instead of helper function */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meal Type
              </label>
              <select
                value={mealType}
                onChange={e => setMealType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                {MEAL_TYPES.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Ready Time Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Cooking Time (minutes)
              </label>
              <input
                type="number"
                value={maxTime}
                onChange={e => setMaxTime(e.target.value)}
                placeholder="e.g., 30"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar; 