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
    query: 'pasta', // Default search term to show some recipes on initial load
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await searchRecipes(searchParams);
        setRecipes(data);
      } catch (err) {
        setError('Error fetching recipes. Please try again later.');
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, [searchParams]);

  // Fetch Indian recipes for the featured section
  useEffect(() => {
    const fetchIndianRecipes = async () => {
      setIndianLoading(true);
      
      try {
        const data = await getIndianRecipes("", { number: 4 });
        setIndianRecipes(data);
      } catch (err) {
        console.error('Error fetching Indian recipes:', err);
      } finally {
        setIndianLoading(false);
      }
    };
    
    fetchIndianRecipes();
  }, []);

  const handleSearch = (newSearchParams) => {
    // Transform the search parameters to match the API expectations
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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Perfect Recipe</h1>
        <p className="text-gray-600">
          Search from thousands of delicious recipes for any meal or dietary preference
        </p>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {renderSkeletons()}
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <>
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No recipes found</h2>
              <p className="text-gray-500">
                Try adjusting your search or filters to find what you're looking for
              </p>
            </div>
          )}
        </>
      )}
      
      {/* Featured Indian Recipes Section */}
      <div className="mt-16 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Featured Indian Recipes</h2>
          <Link to="/indian-recipes" className="text-green-600 hover:text-green-700 font-medium flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        {indianLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
      
      {/* Recommendation Section */}
      {!loading && recipes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.slice(0, 4).map(recipe => (
              <RecipeCard key={`rec-${recipe.id}`} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage; 