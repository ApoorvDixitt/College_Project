import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';
import { getIndianRecipes } from '../services/recipeApi';

const IndianRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    query: '', // Default empty to show popular Indian dishes
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getIndianRecipes(searchParams.query, {
          diet: searchParams.diet,
          type: searchParams.mealType,
          maxReadyTime: searchParams.maxReadyTime
        });
        setRecipes(data);
      } catch (err) {
        setError('Error fetching Indian recipes. Please try again later.');
        console.error('Error fetching Indian recipes:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, [searchParams]);

  const handleSearch = (newSearchParams) => {
    // Transform the search parameters to match the API expectations
    // Note: We don't need to include cuisine since we're already filtering for Indian cuisine
    const apiParams = {
      query: newSearchParams.query,
      diet: newSearchParams.diet,
      mealType: newSearchParams.mealType,
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Indian Recipes</h1>
        <p className="text-gray-600">
          Discover authentic Indian dishes from various regions of India
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
      
      {!loading && recipes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Indian Dishes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.slice(0, 4).map(recipe => (
              <RecipeCard key={`pop-${recipe.id}`} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndianRecipesPage; 