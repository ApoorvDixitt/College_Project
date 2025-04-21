import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';
import { searchRecipes, getIndianRecipes } from '../services/recipeApi';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [indianRecipes, setIndianRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [indianLoading, setIndianLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    query: 'pasta',
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await searchRecipes(searchParams);
        setRecipes(data);
      } catch (err) {
        // Check if API quota is exceeded (402)
        if (err.response && err.response.status === 402) {
          setError('API daily quota exceeded. Showing sample recipes instead.');
        } else {
          setError('Error fetching recipes. Please try again later.');
        }
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, [searchParams]);

  useEffect(() => {
    const fetchIndianRecipes = async () => {
      setIndianLoading(true);
      
      try {
        const data = await getIndianRecipes("", { number: 4 });
        setIndianRecipes(data);
      } catch (err) {
        // We don't need to show an error for the Indian recipes section
        // as we already have a main error message if there's an issue
        console.error('Error fetching Indian recipes:', err);
      } finally {
        setIndianLoading(false);
      }
    };
    
    fetchIndianRecipes();
  }, []);

  const handleSearch = (newSearchParams) => {
    const apiParams = {
      query: newSearchParams.query,
      diet: newSearchParams.diet,
      cuisine: newSearchParams.cuisine,
      type: newSearchParams.mealType,
      maxReadyTime: newSearchParams.maxReadyTime
    };
    
    setSearchParams(apiParams);
  };

  const renderSkeletons = () => {
    return Array(8).fill(0).map((_, index) => (
      <RecipeCardSkeleton key={index} />
    ));
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 -mx-4 px-4 py-16 sm:py-24 mb-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Discover Your Next Favorite Recipe
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Search from thousands of delicious recipes curated for every taste, diet, and cooking skill level
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
      
      {/* Error Banner */}
      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">{error}</p>
              {error.includes('quota') && (
                <p className="text-xs text-amber-600 mt-1">
                  Not to worry! We're showing you sample recipes while the API resets.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {renderSkeletons()}
          </div>
        ) : (
          <>
            {recipes.length > 0 ? (
              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Recipes</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recipes.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <div className="text-center py-16">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No recipes found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your search filters or try a different search term
                </p>
              </div>
            )}
          </>
        )}
        
        {/* Featured Indian Recipes Section */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Indian Recipes</h2>
            <Link 
              to="/indian-recipes" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              View All
              <svg 
                className="ml-1.5 h-5 w-5 transition-transform group-hover:translate-x-1" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
          
          {indianLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {Array(4).fill(0).map((_, index) => (
                <RecipeCardSkeleton key={`indian-skeleton-${index}`} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {indianRecipes.map(recipe => (
                <RecipeCard key={`indian-${recipe.id}`} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
        
        {/* Recommendation Section */}
        {!loading && recipes.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.slice(0, 4).map(recipe => (
                <RecipeCard key={`rec-${recipe.id}`} recipe={recipe} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage; 