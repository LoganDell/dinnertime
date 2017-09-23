
import { Component } from '@angular/core';
import { ColumnConfig } from '../shared/models/column-config';
import { Recipe } from '../shared/models/recipe';
import { PageComponentBase } from '../shared/page-component-base';
import { Ingredient } from '../shared/models/ingredient';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../shared/services/recipe.service';
import { AlertService } from '../shared/services/alert.service';
import { DataTableConfig } from '../shared/models/data-table-config';
import { FilterBarConfig } from '../shared/models/filter-bar-config';
import { IngredientService } from '../shared/services/ingredient.service';

@Component({
    templateUrl: './recipe-edit.html'
  })
export class RecipeEditComponent extends PageComponentBase {

    public recipe: Recipe;
    public nutritionData: Ingredient;
    public dataTableConfig: DataTableConfig = new DataTableConfig();
    public filterBarConfig: FilterBarConfig = new FilterBarConfig();

    constructor(
        private _recipeService: RecipeService,
        private _alertService: AlertService,
        private _ingredientService: IngredientService,
        private _route: ActivatedRoute) {
        super();

        this._route.params.subscribe((params) => {
          this.initData(+params['recipeId']);
        });
      }

      private initData(recipeId: number): void {
        this._recipeService.get(recipeId).subscribe((recipe) => {
          console.log(recipe);
          this.recipe = recipe;
          this.calculateNutritionData();
        });
      }

      private calculateNutritionData(): void {
        this.nutritionData = new Ingredient(null);
      }

      public updateRecipe(): void {
        this._recipeService.update(this.recipe).subscribe(() => {
          this._alertService.toastSuccess('Ingredient Saved', this.recipe.name + ' nutrition data and metadata saved successfully.');
        });
    }
}