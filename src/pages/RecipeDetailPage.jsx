import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById, getSimilarRecipes } from '../services/recipeApi';
import { useRecipe } from '../contexts/RecipeContext';
import Toast from '../components/Toast';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const { favorites, addToFavorites, removeFromFavorites, addToShoppingList } = useRecipe();
  
  const isFavorite = recipe ? favorites.some(fav => fav.id === parseInt(id)) : false;

  useEffect(() => {
    const fetchRecipeData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const recipeData = await getRecipeById(id);
        setRecipe(recipeData);
        
        const similarData = await getSimilarRecipes(id);
        setSimilarRecipes(similarData);
      } catch (err) {
        setError('Error fetching recipe details. Please try again later.');
        console.error('Error fetching recipe details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipeData();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(parseInt(id));
      showToast('Recipe removed from favorites', 'success');
    } else if (recipe) {
      addToFavorites(recipe);
      showToast('Recipe added to favorites', 'success');
    }
  };

  const handleAddIngredientToShoppingList = (ingredient) => {
    addToShoppingList({
      id: `${id}-${ingredient.id || Math.random().toString(36).substr(2, 9)}`,
      name: ingredient.name || ingredient.original,
      amount: ingredient.amount || '',
      unit: ingredient.unit || '',
      original: ingredient.original,
      image: ingredient.image
    });
    
    showToast(`${ingredient.name || 'Ingredient'} added to shopping list`, 'success');
  };
  
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };
  
  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Toast Notification */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
      
      {/* Back button */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-green-600 hover:text-green-800"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to Results
        </Link>
      </div>
      
      {/* Recipe Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
              {recipe.title}
            </h1>
          </div>
          <button 
            onClick={handleFavoriteToggle}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg 
              className={`h-6 w-6 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={isFavorite ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth={isFavorite ? "0" : "2"}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.dishTypes?.map((type, index) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {type}
              </span>
            ))}
            {recipe.diets?.map((diet, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {diet}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Ready in</p>
              <p className="font-semibold">{recipe.readyInMinutes} min</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Servings</p>
              <p className="font-semibold">{recipe.servings}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Health Score</p>
              <p className="font-semibold">{recipe.healthScore}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Score</p>
              <p className="font-semibold">{recipe.spoonacularScore ? (recipe.spoonacularScore / 20).toFixed(1) : '-'}/5</p>
            </div>
          </div>
          
          <div 
            className="text-gray-700 mb-6"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
        </div>
      </div>
      
      {/* Ingredients and Instructions */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Ingredients */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.extendedIngredients?.map((ingredient, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  {ingredient.image && (
                    <img 
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} 
                      alt={ingredient.name} 
                      className="w-10 h-10 mr-3 rounded-full object-cover"
                    />
                  )}
                  <span>{ingredient.original}</span>
                </div>
                <button 
                  onClick={() => handleAddIngredientToShoppingList(ingredient)}
                  className="ml-2 text-green-600 hover:text-green-800"
                  aria-label="Add to shopping list"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          {recipe.analyzedInstructions?.length > 0 ? (
            <ol className="list-decimal list-inside space-y-4">
              {recipe.analyzedInstructions[0].steps.map(step => (
                <li key={step.number} className="ml-4">
                  <span className="font-medium mr-2">Step {step.number}:</span>
                  {step.step}
                </li>
              ))}
            </ol>
          ) : recipe.instructions ? (
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
          ) : (
            <p>No instructions available for this recipe.</p>
          )}
        </div>
      </div>
      
      {/* Similar Recipes */}
      {similarRecipes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Similar Recipes You Might Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarRecipes.map(similar => (
              <div key={similar.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/recipe/${similar.id}`}>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                      {similar.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Ready in {similar.readyInMinutes} minutes</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage; 