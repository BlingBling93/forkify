import Axios from "axios";

export default class Recipe {
    constructor(ID) {
        this.id = ID;
    }

    async getRecipe() {
        const key = '16aa3565eebf8ecbe5b0c3a6090f41b1';
        //const pref = 'https://cors-anywhere.herokuapp.com/'
        try {
            const res = await Axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            //console.log(res.data);
            this.img = res.data.recipe.image_url;
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.source = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            alert('Something went wrong!');
        }
    }

    calcTime() {
        // Assume each 3 ingredients need 15 min for preparation
        const numIng = this.ingredients.length;
        this.time = (Math.ceil(numIng / 3))* 15;
    }

    calcServings() {
        this.servings = 4;
    }

    changeUnit() {
        const unitsLong = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'ounces', 'ounce', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'tsp', 'tsp', 'oz', 'oz', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // uniform ingredients
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, units[index]);
            })

            // remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            // parse ingredients into count, unit, ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;

            if (unitIndex > -1) {
                // there is a unit
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrCount.join('+'))
                }
                
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arrIng[0], 10)) {
                // no unit but ingredient starts with a num
                objIng = {
                    count: arrIng[0],
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                } 
            } else {
                // no unit, no num
                objIng = {
                    count: '',
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        })
        this.ingredients = newIngredients;
    }
}

