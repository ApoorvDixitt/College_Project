import axios from "axios";

// Get a free API key from https://spoonacular.com/food-api
// Ideally this would be in an environment variable
// For demo purposes, you can use a free API key
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY || "1";
const BASE_URL = "https://api.spoonacular.com/recipes";

console.log(
  "API Key detected:",
  API_KEY !== "1" ? "Yes (using real API)" : "No (using mock data)"
);

// We'll add some sample data for development when API key is not available
const useMockData =
  !process.env.REACT_APP_SPOONACULAR_API_KEY || API_KEY === "1";

// Mock data for search results
const mockSearchResults = [
  {
    id: 654959,
    title: "Pasta With Tuna",
    image: "https://spoonacular.com/recipeImages/654959-312x231.jpg",
    imageType: "jpg",
    readyInMinutes: 45,
    spoonacularScore: 95,
    aggregateLikes: 104,
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    diets: ["pescatarian"],
  },
  {
    id: 511728,
    title: "Pasta Margherita",
    image: "https://spoonacular.com/recipeImages/511728-312x231.jpg",
    imageType: "jpg",
    readyInMinutes: 15,
    spoonacularScore: 87,
    aggregateLikes: 203,
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    diets: ["lacto ovo vegetarian"],
  },
  {
    id: 654812,
    title: "Pasta and Seafood",
    image: "https://spoonacular.com/recipeImages/654812-312x231.jpg",
    imageType: "jpg",
    readyInMinutes: 45,
    spoonacularScore: 89,
    aggregateLikes: 24,
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    diets: ["pescatarian"],
  },
  {
    id: 654857,
    title: "Pasta On The Border",
    image: "https://spoonacular.com/recipeImages/654857-312x231.jpg",
    imageType: "jpg",
    readyInMinutes: 30,
    spoonacularScore: 82,
    aggregateLikes: 12,
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    diets: ["lacto ovo vegetarian"],
  },
];

// Mock data for a single recipe
const mockRecipeDetail = {
  id: 654959,
  title: "Pasta With Tuna",
  image: "https://spoonacular.com/recipeImages/654959-556x370.jpg",
  readyInMinutes: 45,
  servings: 4,
  dishTypes: ["lunch", "main course", "main dish", "dinner"],
  diets: ["pescatarian"],
  summary:
    "Pasta With Tuna might be just the main course you are searching for. This recipe makes 4 servings with <b>326 calories</b>, <b>24g of protein</b>, and <b>4g of fat</b> each. For <b>$1.68 per serving</b>, this recipe <b>covers 23%</b> of your daily requirements of vitamins and minerals. 104 people have made this recipe and would make it again. Head to the store and pick up flour, onion, basil, and a few other things to make it today. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. It is a good option if you're following a <b>pescatarian</b> diet. All things considered, we decided this recipe <b>deserves a spoonacular score of 96%</b>. This score is excellent.",
  spoonacularScore: 95,
  healthScore: 89,
  instructions:
    "<ol><li>Cook pasta according to package directions.</li><li>Meanwhile, in a large nonstick skillet, saute onion and garlic in oil until tender. Add tomatoes, broth, basil, sugar if desired, oregano, salt, pepper flakes and pepper; bring to a boil. Reduce heat; simmer, uncovered, for 10-15 minutes.</li><li>Drain tuna; break into chunks with a fork. Add tuna to tomato mixture; cook for 1-2 minutes or until heated through. Drain pasta; toss with tuna mixture. Sprinkle with Parmesan cheese.</li></ol>",
  analyzedInstructions: [
    {
      name: "",
      steps: [
        {
          number: 1,
          step: "Cook pasta according to package directions.",
        },
        {
          number: 2,
          step: "Meanwhile, in a large nonstick skillet, saute onion and garlic in oil until tender. Add tomatoes, broth, basil, sugar if desired, oregano, salt, pepper flakes and pepper; bring to a boil. Reduce heat; simmer, uncovered, for 10-15 minutes.",
        },
        {
          number: 3,
          step: "Drain tuna; break into chunks with a fork. Add tuna to tomato mixture; cook for 1-2 minutes or until heated through. Drain pasta; toss with tuna mixture. Sprinkle with Parmesan cheese.",
        },
      ],
    },
  ],
  extendedIngredients: [
    {
      id: 20420,
      name: "pasta",
      original: "8 ounces uncooked pasta",
      amount: 8,
      unit: "ounces",
      image: "fusilli.jpg",
    },
    {
      id: 11282,
      name: "onion",
      original: "1 medium onion, chopped",
      amount: 1,
      unit: "medium",
      image: "brown-onion.png",
    },
    {
      id: 11215,
      name: "garlic",
      original: "2 garlic cloves, minced",
      amount: 2,
      unit: "cloves",
      image: "garlic.png",
    },
    {
      id: 4053,
      name: "olive oil",
      original: "1 tablespoon olive oil",
      amount: 1,
      unit: "tablespoon",
      image: "olive-oil.jpg",
    },
    {
      id: 10015121,
      name: "tuna",
      original: "12 ounces tuna packed in water",
      amount: 12,
      unit: "ounces",
      image: "canned-tuna.png",
    },
  ],
  aggregateLikes: 104,
};

// Mock data for similar recipes
const mockSimilarRecipes = [
  {
    id: 511728,
    title: "Pasta Margherita",
    readyInMinutes: 15,
  },
  {
    id: 654857,
    title: "Pasta On The Border",
    readyInMinutes: 30,
  },
  {
    id: 654812,
    title: "Pasta and Seafood",
    readyInMinutes: 45,
  },
  {
    id: 654905,
    title: "Pasta Vegetable Soup",
    readyInMinutes: 25,
  },
];

export const searchRecipes = async (params) => {
  if (useMockData) {
    // Return mock data for development
    console.log("Using mock data for recipe search");
    return mockSearchResults;
  }

  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        ...params,
        apiKey: API_KEY,
        addRecipeInformation: true,
        number: 12,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};

export const getRecipeById = async (id) => {
  if (useMockData) {
    // Return mock data for development
    console.log("Using mock data for recipe detail");
    return mockRecipeDetail;
  }

  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe with id ${id}:`, error);
    throw error;
  }
};

export const getSimilarRecipes = async (id) => {
  if (useMockData) {
    // Return mock data for development
    console.log("Using mock data for similar recipes");
    return mockSimilarRecipes;
  }

  try {
    const response = await axios.get(`${BASE_URL}/${id}/similar`, {
      params: {
        apiKey: API_KEY,
        number: 4,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching similar recipes for id ${id}:`, error);
    throw error;
  }
};
