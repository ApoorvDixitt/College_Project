# Recipe Finder App

A React application that allows users to search, explore, and save recipes. Built with React.js using functional components and hooks, React Router for navigation, React Context API for state management, and Tailwind CSS for styling.

## Features

- Search for recipes by name, ingredients, meal type, cuisine, and more
- View detailed recipe information including ingredients, instructions, and nutritional info
- Save favorite recipes
- Manage a shopping list of ingredients
- Responsive design for all screen sizes

## Tech Stack

- **React.js** (Functional Components, Hooks)
- **React Router** (Navigation)
- **React Context API** (State Management)
- **Tailwind CSS** (Styling)
- **Axios** (API Requests)
- **Spoonacular API** (Recipe Data)
- **LocalStorage** (Persistent Data Storage)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/recipe-finder-app.git
cd recipe-finder-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Spoonacular API key:

```
REACT_APP_SPOONACULAR_API_KEY=your_api_key_here
```

You can get a free API key from [Spoonacular Food API](https://spoonacular.com/food-api).

> Note: If you don't provide an API key, the app will use mock data for development.

4. Start the development server:

```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

```
recipe-finder-app/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/     # Reusable components (RecipeCard, Navbar, etc.)
│   ├── contexts/       # React Context for global state management
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── App.js          # Main app component
│   └── index.js        # React entry point
│
├── .env                # Environment variables (add your API key here)
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Usage

- **Home Page**: Search for recipes by name, ingredients, or filter by dietary preferences, cuisine, etc.
- **Recipe Details**: View detailed information about a recipe, including ingredients, instructions, and nutritional information. Add ingredients to your shopping list.
- **Favorites**: View and manage your favorite recipes.
- **Shopping List**: Access your shopping list from the Favorites page.

## Deployment

To build the app for production, run:

```bash
npm run build
```

This creates an optimized production build in the `build` folder, which can be deployed to services like Netlify, Vercel, or GitHub Pages.

## Credits

- Recipe data provided by [Spoonacular API](https://spoonacular.com/food-api)
- Icons from [Heroicons](https://heroicons.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## License

MIT
