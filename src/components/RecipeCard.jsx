import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipe } from '../contexts/RecipeContext';

const RecipeCard = ({ recipe }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useRecipe();
  const isFavorite = favorites.some(fav => fav.id === recipe.id);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        isHovered ? 'transform scale-105 shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/recipe/${recipe.id}`}>
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className={`w-full h-48 object-cover transition-transform duration-500 ${
              isHovered ? 'transform scale-110' : ''
            }`}
          />
          <button 
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            onClick={handleFavoriteClick}
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
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">
            {recipe.title}
          </h3>
          <div className="flex items-center mb-2">
            <svg 
              className="h-5 w-5 text-yellow-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <span className="ml-1 text-sm text-gray-600">
              {recipe.spoonacularScore ? (recipe.spoonacularScore / 20).toFixed(1) : '4.5'} ({recipe.aggregateLikes || '42'})
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {recipe.dishTypes?.slice(0, 2).map((type, index) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {type}
              </span>
            ))}
            {recipe.diets?.slice(0, 2).map((diet, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {diet}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center text-sm text-gray-500">
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
      </Link>
    </div>
  );
};

export default RecipeCard; 