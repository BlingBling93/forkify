export const elements = {
    searchForum: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipePage: document.querySelector('.recipe')
}

export const renderLoader = parent => {
    const spinner = 
    `<div class="loader">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>`;
    
    parent.insertAdjacentHTML('afterbegin', spinner);
};

export const cleanLoader = () => {
    const spinner = document.querySelector('.loader');
    if (spinner) spinner.parentElement.removeChild(spinner);
}