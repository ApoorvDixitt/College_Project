import { createContext, useContext, useState, useEffect } from "react";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedShoppingList =
      JSON.parse(localStorage.getItem("shoppingList")) || [];

    setFavorites(storedFavorites);
    setShoppingList(storedShoppingList);
  }, []);

  // Save to localStorage whenever favorites or shopping list changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Add a recipe to favorites
  const addToFavorites = (recipe) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === recipe.id)) {
        return prev;
      }
      return [...prev, recipe];
    });
  };

  // Remove a recipe from favorites
  const removeFromFavorites = (recipeId) => {
    setFavorites((prev) => prev.filter((recipe) => recipe.id !== recipeId));
  };

  // Add an ingredient to shopping list
  const addToShoppingList = (ingredient) => {
    setShoppingList((prev) => {
      if (prev.some((item) => item.id === ingredient.id)) {
        return prev;
      }
      return [...prev, { ...ingredient, checked: false }];
    });
  };

  // Toggle checked status of shopping list item
  const toggleShoppingItem = (ingredientId) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === ingredientId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Remove an ingredient from shopping list
  const removeFromShoppingList = (ingredientId) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== ingredientId));
  };

  return (
    <RecipeContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        shoppingList,
        addToShoppingList,
        toggleShoppingItem,
        removeFromShoppingList,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => useContext(RecipeContext);
