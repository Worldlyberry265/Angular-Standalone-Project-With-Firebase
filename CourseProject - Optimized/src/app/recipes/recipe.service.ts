import { Injectable } from "@angular/core";
import { Recipe } from "./recipes.model";
import { Ingredient } from "../shared/ingredient.module";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Cheese Burger', 'Delicious burger topped with swiss white cheese', 'https://assets3.thrillist.com/v1/image/3107889/1584x1056/crop;jpeg_quality=60;progressive.jpg',
    //         [
    //             new Ingredient('Beed patty', 1),
    //             new Ingredient('Cheese', 2)
    //         ]),
    //     new Recipe('Fettucine Alfredo', 'The signiture of the Italian Cuisine', 'https://assets.bonappetit.com/photos/61b775620fb3fcc4cbf036c1/3:2/w_3000,h_2000,c_limit/20211208%20Spaghetti%20Squash%20with%20Tomato%20Sauce%20and%20Mozarella%20LEDE.jpg',
    //         [
    //             new Ingredient('Pasta', 1),
    //             new Ingredient('Parmesan Cheese', 2),
    //             new Ingredient('Mozeralla Cheese', 3)
    //         ]),
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {

    }
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}