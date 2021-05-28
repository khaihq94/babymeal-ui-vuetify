import TranslationModel from '@/model/TranslationModel'
import RecipeIngredientModel from '@/model/RecipeIngredientModel'

export default class RecipeModel {
  id = ''
  name = [TranslationModel]
  ageId = ''
  dishId = ''
  recipeIngredients = [RecipeIngredientModel]
  suggestionRecipesId = [String]
  mainImageId = ''
  imagesId = [String]
  preparationTime = [TranslationModel]
  videoUrl = ''
  source = []
  note = []
}
