/* 
API key: 16aa3565eebf8ecbe5b0c3a6090f41b1
url https://www.food2fork.com/api/search
*/
import Axios from 'axios'

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getRecipes() {
        const key = '16aa3565eebf8ecbe5b0c3a6090f41b1';
        try{
            const res = await Axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipes = res.data.recipes;
            //console.log(recipes);
        } catch (error) {
            alert(error);
        }
    }
}
