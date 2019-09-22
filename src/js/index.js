/* API key: 16aa3565eebf8ecbe5b0c3a6090f41b1
url https://www.food2fork.com/api/search */

import Search from "./models/Search";
import { elements, renderLoader, cleanLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import Recipe from './models/Recipe';


/* Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes 
*/

const state = {};

// Search Controller
const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        // New search object and add to state
        state.search = new Search(query);
        
        // Prepare UI for results
        searchView.clearInput();
        searchView.clearRecipes();
        renderLoader(elements.searchRes);
        try {
            await state.search.getRecipes();
            // Search for recipes
            
            // Render results on UI
            //console.log(state.search.recipes);
            cleanLoader();
            searchView.renderResults(state.search.recipes);

        } catch (error) {
            alert('something goes wrong!')
        }
    }
}

elements.searchForum.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', event => {
    const btn = event.target.closest('.btn-inline');
     
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearRecipes();
        searchView.renderResults(state.search.recipes, gotoPage);
    }
})

// Recipe Controller
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id)

    if (id) {
        // prepare UI for recipe 
        recipeView.clearInput();
        renderLoader(elements.recipePage);
        // create new recipe object
        state.recipe = new Recipe(id);

        try {
            // get ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe);
            // render results on UI
            state.recipe.changeUnit();
            state.recipe.calcTime();
            state.recipe.calcServings();
            // console.log(state.recipe);
            cleanLoader();
            recipeView.renderRecipe(state.recipe);
            
        } catch (error) {
            console.log(error);
        }
    }
}
//controlRecipe();
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipePage.addEventListener('click', event => {
    //console.log(event.target);
    if (event.target.matches('.btn-dec, .btn-dec *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateCounts('dec')
            recipeView.updateIngredient(state.recipe)
        }
    } else if (event.target.matches('.btn-inc, .btn-inc *')) {
        state.recipe.updateCounts('inc')
        recipeView.updateIngredient(state.recipe)
    }
    //console.log(state.recipe)
})


