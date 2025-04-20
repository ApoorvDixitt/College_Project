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
  {
    id: 654905,
    title: "Pasta Vegetable Soup",
    image: "https://spoonacular.com/recipeImages/654905-312x231.jpg",
    imageType: "jpg",
    readyInMinutes: 25,
    spoonacularScore: 95,
    aggregateLikes: 87,
    dishTypes: ["soup", "lunch", "main course"],
    diets: ["lacto ovo vegetarian"],
  },
  {
    id: 639851,
    title: "Chana Masala",
    image: "https://spoonacular.com/recipeImages/639851-312x231.jpg",
    imageType: "jpg",
    readyInMinutes: 30,
    spoonacularScore: 94,
    aggregateLikes: 176,
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    diets: ["vegetarian", "vegan"],
  },
];

// Detailed recipe info for offline mode
const vegetarianPastaRecipe = {
  id: 511728,
  title: "Pasta Margherita",
  image: "https://spoonacular.com/recipeImages/511728-556x370.jpg",
  readyInMinutes: 15,
  servings: 4,
  dishTypes: ["lunch", "main course", "main dish", "dinner"],
  diets: ["lacto ovo vegetarian"],
  vegetarian: true,
  vegan: false,
  summary:
    "Pasta Margherita is a delicious vegetarian option. This recipe makes 4 servings with <b>512 calories</b>, <b>19g of protein</b>, and <b>15g of fat</b> each. For <b>$1.96 per serving</b>, this recipe <b>covers 28%</b> of your daily requirements of vitamins and minerals. 203 people have made this recipe and would make it again. From preparation to the plate, this recipe takes approximately <b>15 minutes</b>. It is a good option if you're following a <b>vegetarian</b> diet.",
  spoonacularScore: 87,
  healthScore: 82,
  instructions:
    "<ol><li>Cook pasta according to package directions.</li><li>While pasta is cooking, heat olive oil in a large nonstick skillet over medium heat. Add garlic; cook 1 minute, stirring frequently.</li><li>Add tomatoes; cook 2 minutes or until thoroughly heated. Remove from heat.</li><li>Stir in salt and 1/4 cup basil.</li><li>Place pasta in a large bowl. Add tomato mixture, cheese, and remaining 1/4 cup basil; toss well. Garnish with fresh basil sprigs, if desired.</li></ol>",
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
          step: "While pasta is cooking, heat olive oil in a large nonstick skillet over medium heat. Add garlic; cook 1 minute, stirring frequently.",
        },
        {
          number: 3,
          step: "Add tomatoes; cook 2 minutes or until thoroughly heated. Remove from heat.",
        },
        {
          number: 4,
          step: "Stir in salt and 1/4 cup basil.",
        },
        {
          number: 5,
          step: "Place pasta in a large bowl. Add tomato mixture, cheese, and remaining 1/4 cup basil; toss well. Garnish with fresh basil sprigs, if desired.",
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
      id: 11215,
      name: "garlic",
      original: "3 garlic cloves, minced",
      amount: 3,
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
      id: 11529,
      name: "tomato",
      original: "4 cups chopped tomato",
      amount: 4,
      unit: "cups",
      image: "tomato.png",
    },
    {
      id: 2044,
      name: "fresh basil",
      original: "1/2 cup chopped fresh basil",
      amount: 0.5,
      unit: "cup",
      image: "fresh-basil.jpg",
    },
    {
      id: 1026,
      name: "mozzarella",
      original: "1/2 cup fresh mozzarella, diced",
      amount: 0.5,
      unit: "cup",
      image: "mozzarella.png",
    },
  ],
  aggregateLikes: 203,
};

// Some related recipes we can suggest
const relatedRecipes = [
  {
    id: 654857,
    title: "Pasta On The Border",
    readyInMinutes: 30,
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
    // Filter sample recipes to only include vegetarian ones
    return sampleRecipes.filter(
      (recipe) =>
        recipe.diets &&
        recipe.diets.some(
          (diet) => diet.includes("vegetarian") || diet === "vegan"
        )
    );
  }

  try {
    // Make the actual API call if we have a key
    const result = await axios.get(`${API_BASE}/complexSearch`, {
      params: {
        ...params,
        apiKey: API_KEY,
        addRecipeInformation: true,
        number: 12, // limit results
        excludeIngredients: "beef,ground beef,steak", // exclude beef recipes
        diet: params.diet || "vegetarian", // Only vegetarian recipes if not specified
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
    return vegetarianPastaRecipe;
  }

  try {
    const result = await axios.get(`${API_BASE}/${id}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: true,
      },
    });

    // Check if this recipe contains beef or is non-vegetarian
    if (result.data) {
      // If the recipe is marked as non-vegetarian, reject it
      if (!result.data.vegetarian) {
        throw new Error(
          "This recipe is non-vegetarian and excluded from your preferences"
        );
      }

      // Double-check ingredients for meat products
      if (result.data.extendedIngredients) {
        const ingredients = result.data.extendedIngredients.map((ing) =>
          ing.name.toLowerCase()
        );

        const nonVegTerms = [
          "beef",
          "steak",
          "chicken",
          "pork",
          "ham",
          "bacon",
          "turkey",
          "lamb",
          "veal",
          "duck",
          "goose",
          "meat",
          "fish",
          "salmon",
          "tuna",
          "shrimp",
          "prawn",
          "crab",
          "lobster",
          "oyster",
          "mussel",
          "clam",
          "scallop",
          "anchovy",
          "sardine",
        ];

        const containsNonVeg = ingredients.some((ing) =>
          nonVegTerms.some((term) => ing.includes(term))
        );

        // If it contains non-vegetarian ingredients, throw an error
        if (containsNonVeg) {
          throw new Error(
            "This recipe contains non-vegetarian ingredients which are excluded from your preferences"
          );
        }
      }
    }

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
    // First get similar recipes
    const result = await axios.get(`${API_BASE}/${id}/similar`, {
      params: {
        apiKey: API_KEY,
        number: 12, // requesting more to filter out non-vegetarian ones
      },
    });

    // Then filter out any non-vegetarian recipes
    if (result.data && result.data.length > 0) {
      // For similar recipes endpoint, we need to do additional checks
      const recipeIds = result.data.map((recipe) => recipe.id).join(",");

      // Get bulk information about these recipes to check if they're vegetarian
      const detailsResult = await axios.get(`${API_BASE}/informationBulk`, {
        params: {
          apiKey: API_KEY,
          ids: recipeIds,
        },
      });

      // Filter out any non-vegetarian recipes
      const filteredRecipes = detailsResult.data
        .filter((recipe) => recipe.vegetarian === true)
        .map((recipe) => ({
          id: recipe.id,
          title: recipe.title,
          readyInMinutes: recipe.readyInMinutes,
        }))
        .slice(0, 4); // Limit to 4 recipes

      return filteredRecipes;
    }

    return result.data.slice(0, 4);
  } catch (err) {
    console.error(`Couldn't find similar recipes for ${id}:`, err.message);
    // In case of error, still return some data if possible
    if (err.response && err.response.status === 404) {
      return relatedRecipes;
    }
    throw err;
  }
};

// Get Indian recipes specifically
export const getIndianRecipes = async (query = "", additionalParams = {}) => {
  // For development without an API key
  if (offlineMode) {
    console.log("🔄 Using sample Indian recipe data");
    return [
      {
        id: 639851,
        title: "Chana Masala",
        image: "https://spoonacular.com/recipeImages/639851-312x231.jpg",
        imageType: "jpg",
        readyInMinutes: 30,
        spoonacularScore: 94,
        aggregateLikes: 176,
        dishTypes: ["lunch", "main course", "main dish", "dinner"],
        diets: ["vegetarian", "vegan"],
        summary:
          "A popular vegetarian dish from Northern India made with chickpeas simmered in a spicy tomato sauce with distinctive spices including garam masala and amchoor (dried mango powder).",
      },
      {
        id: 654698,
        title: "Palak Paneer",
        image: "https://spoonacular.com/recipeImages/654698-312x231.jpg",
        imageType: "jpg",
        readyInMinutes: 45,
        spoonacularScore: 92,
        aggregateLikes: 184,
        dishTypes: ["lunch", "main course", "main dish", "dinner"],
        diets: ["vegetarian"],
        summary:
          "A classic North Indian dish consisting of paneer cheese cubes in a smooth, creamy spinach sauce spiced with garam masala, cumin, and other traditional spices.",
      },
      {
        id: 658577,
        title: "Vegetable Biryani",
        image: "https://spoonacular.com/recipeImages/658577-312x231.jpg",
        imageType: "jpg",
        readyInMinutes: 60,
        spoonacularScore: 90,
        aggregateLikes: 165,
        dishTypes: ["lunch", "main course", "main dish", "dinner"],
        diets: ["vegetarian"],
        summary:
          "A fragrant rice dish cooked with aromatic spices, herbs, and mixed vegetables. This festive dish is layered and steamed to perfection.",
      },
      {
        id: 662968,
        title: "Chole Bhature",
        image: "https://spoonacular.com/recipeImages/662968-312x231.jpg",
        imageType: "jpg",
        readyInMinutes: 75,
        spoonacularScore: 88,
        aggregateLikes: 146,
        dishTypes: ["breakfast", "lunch", "main course"],
        diets: ["vegetarian"],
        summary:
          "A Punjabi dish combining spicy chickpea curry (chole) with deep-fried bread (bhature). This popular North Indian street food is often enjoyed as a hearty breakfast or lunch.",
      },
      {
        id: 661322,
        title: "Dosa with Sambar and Chutney",
        image: "https://spoonacular.com/recipeImages/661322-312x231.jpg",
        imageType: "jpg",
        readyInMinutes: 90,
        spoonacularScore: 89,
        aggregateLikes: 132,
        dishTypes: ["breakfast", "lunch"],
        diets: ["vegetarian", "gluten-free"],
        summary:
          "A South Indian specialty consisting of a thin, crispy crepe made from fermented rice and lentil batter, typically served with sambar (lentil soup) and coconut chutney.",
      },
      {
        id: 663559,
        title: "Aloo Gobi",
        image: "https://spoonacular.com/recipeImages/663559-312x231.jpg",
        imageType: "jpg",
        readyInMinutes: 35,
        spoonacularScore: 91,
        aggregateLikes: 107,
        dishTypes: ["side dish", "lunch", "main course"],
        diets: ["vegetarian", "vegan"],
        summary:
          "A dry vegetable dish made with potatoes (aloo), cauliflower (gobi) and Indian spices. This simple yet flavorful dish is a staple in Indian homes.",
      },
      {
        id: 664257,
        title: "Malai Kofta",
        image: "https://spoonacular.com/recipeImages/664257-312x231.jpg",
        imageType: "jpg",
        readyInMinutes: 60,
        spoonacularScore: 93,
        aggregateLikes: 98,
        dishTypes: ["lunch", "main course", "main dish", "dinner"],
        diets: ["vegetarian"],
        summary:
          "A luxurious North Indian dish featuring fried vegetable and paneer dumplings (kofta) served in a rich, creamy tomato sauce. Often prepared for special occasions and celebrations.",
      },
    ];
  }

  try {
    // Make the API call with Indian cuisine filter
    const result = await axios.get(`${API_BASE}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        cuisine: "indian",
        query: query,
        addRecipeInformation: true,
        number: 12,
        excludeIngredients: "beef,ground beef,steak", // exclude beef recipes
        diet: additionalParams.diet || "vegetarian", // Only vegetarian recipes if not specified
        ...additionalParams,
      },
    });

    return result.data.results;
  } catch (err) {
    if (err.response) {
      console.error(`API Error (${err.response.status}):`, err.response.data);
    } else {
      console.error("Error searching Indian recipes:", err.message);
    }
    throw err;
  }
};
