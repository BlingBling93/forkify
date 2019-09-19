import { elements } from './base'

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
};

export const clearRecipes = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
};


const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (curPage, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? curPage - 1 : curPage + 1}>
    <span>Page ${type === 'prev' ? curPage - 1 : curPage + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`

const renderButtons = (curPage, numRecipes, recPerPage) => {
    const pages = Math.ceil(numRecipes / recPerPage);
    let button;

    if (curPage === 1 && pages > 1) {
        // create a button go to next page
        button = createButton(curPage, 'next');
    } else if (curPage < pages) {
        // create a button go to next page
        button = `
        ${createButton(curPage, 'next')}
        ${createButton(curPage, 'prev')}
        `

    } else if (curPage === pages) {
        // create a button back to previous page
        button = createButton(curPage, 'prev');

    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, curPage = 1, recPerPage = 10) => {
    const start = (curPage - 1) * recPerPage;
    const end = curPage * recPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(curPage, recipes.length, recPerPage);
};