import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipesService: RecipeService,
        private authService: AuthService) {

    }

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        return this.http.put('https://courseproject-a6046-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes
        ).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        // this.authService.user.subscribe().unsubscribe instead of take(1)

        // return this.http.get<Recipe[]>('https://courseproject-a6046-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=' + user.token
        //or
        return this.http.get<Recipe[]>('https://courseproject-a6046-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }), tap(recipes => {
                    this.recipesService.setRecipes(recipes);
                })
            );
    }
}