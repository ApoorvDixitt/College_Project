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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={e => setter(e.target.value)}
        className="w-full p-2.5 pr-10 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500 mt-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className={`bg-white rounded-xl shadow-lg transition-all duration-300 ${
      isSearchFocused ? 'shadow-xl ring-1 ring-primary-500/20' : ''
    }`}>
      <form onSubmit={submitSearch} className="relative">
        <div className="flex flex-col md:flex-row gap-3 p-3">
          <div className="flex-grow relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className={`h-5 w-5 transition-colors duration-200 ${
                  isSearchFocused ? 'text-primary-500' : 'text-gray-400'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
              value={searchInput}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleFilters}
              className={`px-4 py-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
                filtersVisible
                  ? 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 mr-1.5 transition-transform duration-200 ${
                  filtersVisible ? 'rotate-180' : ''
                }`}
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
              <span className={`ml-1.5 px-2 py-0.5 text-xs rounded-full transition-all duration-200 ${
                (dietType || cuisineType || mealType || maxTime)
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {[dietType, cuisineType, mealType, maxTime].filter(Boolean).length || 0}
              </span>
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center shadow-sm hover:shadow active:transform active:scale-95"
            >
              Search
            </button>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          filtersVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {renderSelect('Diet', dietType, setDietType, DIETS)}
              {renderSelect('Cuisine', cuisineType, setCuisineType, CUISINES)}
              {renderSelect('Meal Type', mealType, setMealType, MEAL_TYPES)}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Max Cooking Time (minutes)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={maxTime}
                    onChange={e => setMaxTime(e.target.value)}
                    placeholder="e.g., 30"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <span className="text-sm">min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar; 