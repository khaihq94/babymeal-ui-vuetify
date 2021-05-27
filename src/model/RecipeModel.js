import TranslationModel from '@/model/TranslationModel'
import RecipeIngredientModel from '@/model/RecipeIngredientModel'

export default class RecipeModel {
  id = ''
  names = [TranslationModel]
  ageId = ''
  dishId = ''
  recipeIngredients = [RecipeIngredientModel]
  suggestionRecipesId = [String]
  mainImageId = ''
  imagesId = [String]
  preparationTime = [TranslationModel]
  videoUrl = ''
  sources = [TranslationModel]
  notes = [TranslationModel]
}
