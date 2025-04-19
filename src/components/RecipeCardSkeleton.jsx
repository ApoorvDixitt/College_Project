import React from 'react';

const RecipeCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="flex items-center mb-2">
          <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
          <div className="h-6 bg-gray-300 rounded-full w-20"></div>
        </div>
        <div className="mt-3 flex items-center">
          <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardSkeleton; 