import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipe } from '../contexts/RecipeContext';

// Shows details of a recipe in card format
function RecipeCard({ recipe }) {
  const { favorites, addToFavorites, removeFromFavorites } = useRecipe();
  
  // UI states
  const [mouseOver, setMouseOver] = useState(false);
  
  // check if this recipe is already saved
  const alreadySaved = favorites.some(item => item.id === recipe.id);
  
  // handle clicking the favorite button (heart icon)
  // we need to stop propagation so the link doesn't activate
  function toggleFavorite(evt) {
    evt.preventDefault(); // don't follow the link
    evt.stopPropagation(); // don't bubble up
    
    if (alreadySaved) {
      // remove it if it's already in favorites
      removeFromFavorites(recipe.id);
    } else {
      // otherwise add it to favorites
      addToFavorites(recipe);
    }
  }
  
  // format the rating out of 5 stars instead of 100
  const formattedRating = recipe.spoonacularScore 
    ? (recipe.spoonacularScore / 20).toFixed(1) 
    : '4.5';
  
  // this shows how many people liked the recipe
  const likeCount = recipe.aggregateLikes || '42';
  
  // Main render
  return (
    <div 
      className={`group bg-white rounded-xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 ease-in-out transform ${
        mouseOver ? 'scale-[1.02]' : ''
      } animate-fade-in`}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <Link to={`/recipe/${recipe.id}`} className="block h-full">
        <div className="relative aspect-w-16 aspect-h-9 bg-gray-200">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              mouseOver ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <button 
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              alreadySaved 
                ? 'bg-red-50 text-red-500 shadow-lg' 
                : 'bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 shadow-sm hover:shadow-md'
            }`}
            onClick={toggleFavorite}
            aria-label={alreadySaved ? "Remove from favorites" : "Add to favorites"}
          >
            <svg 
              className="h-5 w-5 transform transition-transform duration-300 ease-spring hover:scale-110" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={alreadySaved ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth={alreadySaved ? "0" : "2"}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
              />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <svg 
                className="h-5 w-5 text-yellow-400" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="ml-1.5 text-sm font-medium text-gray-700">
                {formattedRating}
              </span>
              <span className="mx-1.5 text-gray-300">·</span>
              <span className="text-sm text-gray-500">
                {likeCount} likes
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <svg 
                className="h-4 w-4 text-gray-400 mr-1" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{recipe.readyInMinutes || '30'} min</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2 mb-2">
            {recipe.title}
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {recipe.dishTypes?.slice(0, 2).map((type, i) => (
              <span 
                key={`dish-${i}`} 
                className="px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
              >
                {type}
              </span>
            ))}
            
            {recipe.diets?.slice(0, 2).map((diet, i) => (
              <span 
                key={`diet-${i}`} 
                className="px-2.5 py-1 bg-secondary-50 text-secondary-700 text-xs font-medium rounded-full"
              >
                {diet}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard; 