import axios from "axios";

// API key from environment variables
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY || "1";
const API_BASE = "https://api.spoonacular.com/recipes";

// Check if we have a valid API key
const hasValidKey =
  API_KEY !== "1" && !!process.env.REACT_APP_SPOONACULAR_API_KEY;
console.log(
  "API Key status:",
  hasValidKey ? "✓ Valid key found" : "✗ Using fallback data"
);

// fallback to mock data when no API key is available
const offlineMode = !hasValidKey;

// Some recipes to use when developing without API access
const sampleRecipes = [
  {
    id: 654959,
    title: "Pasta With Tuna",
    image: "https://spoonacular.com/recipeImages/654959-312x231.jpg",
    imageType: "jpg",
    readyInMinutes: 45,
    spoonacularScore: 95, // pretty good!
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
    spoonacularScore: 82, // not as good as the others
    aggregateLikes: 12,
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    diets: ["lacto ovo vegetarian"],
  },
];

// Detailed recipe info for offline mode
const tunaPastaRecipe = {
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

// Some related recipes we can suggest
const relatedRecipes = [
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

// Search recipes based on given parameters
export const searchRecipes = async (params) => {
  // For development without an API key
  if (offlineMode) {
    console.log("🔄 Using sample recipe data");
    return sampleRecipes;
  }

  try {
    // Make the actual API call if we have a key
    const result = await axios.get(`${API_BASE}/complexSearch`, {
      params: {
        ...params,
        apiKey: API_KEY,
        addRecipeInformation: true,
        number: 12, // limit results
      },
    });

    return result.data.results;
  } catch (err) {
    // Better error handling
    if (err.response) {
      console.error(`API Error (${err.response.status}):`, err.response.data);
    } else {
      console.error("Error searching recipes:", err.message);
    }
    throw err;
  }
};

// Get details for a specific recipe
export const getRecipeById = async (id) => {
  // No API key? Use our sample data
  if (offlineMode) {
    console.log("🔄 Using sample recipe details");
    return tunaPastaRecipe;
  }

  try {
    const result = await axios.get(`${API_BASE}/${id}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: true,
      },
    });

    return result.data;
  } catch (err) {
    // Handle common API errors
    if (err.response && err.response.status === 404) {
      console.error(`Recipe with ID ${id} not found`);
    } else {
      console.error(`Failed to fetch recipe ${id}:`, err.message);
    }
    throw err;
  }
};

// Find recipes similar to the one we're viewing
export const getSimilarRecipes = async (id) => {
  if (offlineMode) {
    // Using our test data in dev mode
    console.log("🔄 Using sample related recipes");
    return relatedRecipes;
  }

  try {
    const result = await axios.get(`${API_BASE}/${id}/similar`, {
      params: {
        apiKey: API_KEY,
        number: 4, // just a few suggestions
      },
    });

    return result.data;
  } catch (err) {
    console.error(`Couldn't find similar recipes for ${id}:`, err.message);
    throw err;
  }
};
