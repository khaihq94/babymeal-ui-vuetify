
export default class IngredientModelMapper {
  static toModelForCreation(contents) {
    return {
      name: contents,
    }
  }

  static toModelForEditing(id, contents) {
    return {
      id: id,
      name: contents,
    }
  }
}
