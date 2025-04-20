import { createContext, useContext, useState, useEffect } from "react";

// Create the main context object
const RecipeContext = createContext();

// Custom storage keys
const FAV_STORAGE_KEY = "favorites";
const SHOPPING_STORAGE_KEY = "shoppingList";

export const RecipeProvider = ({ children }) => {
  // State management
  const [favorites, setFavorites] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  // Load stored data when component mounts
  useEffect(() => {
    let stored;

    try {
      // Try to get favorites from localStorage
      stored = JSON.parse(localStorage.getItem(FAV_STORAGE_KEY));
      if (stored) setFavorites(stored);
    } catch (err) {
      console.warn("Could not load favorites from storage", err);
      setFavorites([]);
    }

    // Get shopping list in a separate try-catch
    try {
      const storedList = JSON.parse(localStorage.getItem(SHOPPING_STORAGE_KEY));

      if (storedList && Array.isArray(storedList)) {
        setShoppingList(storedList);
      }
    } catch (e) {
      // If anything goes wrong, just use an empty array
      console.warn("Shopping list could not be loaded from storage");
      setShoppingList([]);
    }
  }, []);

  // Save favorites whenever they change
  useEffect(() => {
    // Don't save if there's nothing to save
    if (favorites.length > 0 || localStorage.getItem(FAV_STORAGE_KEY)) {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites]);

  // Update shopping list in storage
  useEffect(() => {
    localStorage.setItem(SHOPPING_STORAGE_KEY, JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Favorite recipes functions
  function addFavorite(recipe) {
    // Don't add if already in favorites
    if (favorites.find((fav) => fav.id === recipe.id)) {
      return; // Already exists
    }

    setFavorites((currentFavs) => [...currentFavs, recipe]);
  }

  function removeFavorite(id) {
    setFavorites((currentFavs) =>
      currentFavs.filter((recipe) => recipe.id !== id)
    );
  }

  // Shopping list functions
  const addIngredientToList = (ingredient) => {
    // Check if already in list
    const exists = shoppingList.some((item) => item.id === ingredient.id);

    if (!exists) {
      setShoppingList((list) => [
        ...list,
        {
          ...ingredient,
          checked: false,
          addedOn: new Date().toISOString(),
        },
      ]);
    }
  };

  // Toggle checkbox state
  const toggleIngredientChecked = (id) => {
    setShoppingList((currentList) =>
      currentList.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );
  };

  // Remove an ingredient
  function removeIngredient(ingredientId) {
    setShoppingList((current) =>
      current.filter((item) => item.id !== ingredientId)
    );
  }

  // Combine everything into a context value
  const contextValue = {
    // Favorites
    favorites,
    addToFavorites: addFavorite,
    removeFromFavorites: removeFavorite,

    // Shopping list
    shoppingList,
    addToShoppingList: addIngredientToList,
    toggleShoppingItem: toggleIngredientChecked,
    removeFromShoppingList: removeIngredient,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};

// Helper hook to use the context
export const useRecipe = () => useContext(RecipeContext);
