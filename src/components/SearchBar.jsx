import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    diet: '',
    cuisine: '',
    mealType: '',
    maxReadyTime: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const searchParams = {
      query: query,
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      )
    };
    
    onSearch(searchParams);
  };

  const dietOptions = [
    { value: '', label: 'Any Diet' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'ketogenic', label: 'Ketogenic' },
    { value: 'paleo', label: 'Paleo' }
  ];
  
  const cuisineOptions = [
    { value: '', label: 'Any Cuisine' },
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'indian', label: 'Indian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'thai', label: 'Thai' },
    { value: 'french', label: 'French' }
  ];
  
  const mealTypeOptions = [
    { value: '', label: 'Any Meal Type' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'main course', label: 'Main Course' },
    { value: 'side dish', label: 'Side Dish' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'salad', label: 'Salad' },
    { value: 'soup', label: 'Soup' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={query}
              onChange={handleQueryChange}
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
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

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Diet Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diet
              </label>
              <select
                name="diet"
                value={filters.diet}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                {dietOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cuisine Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuisine
              </label>
              <select
                name="cuisine"
                value={filters.cuisine}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                {cuisineOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Meal Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meal Type
              </label>
              <select
                name="mealType"
                value={filters.mealType}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                {mealTypeOptions.map(option => (
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
                name="maxReadyTime"
                value={filters.maxReadyTime}
                onChange={handleFilterChange}
                placeholder="e.g., 30"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar; 