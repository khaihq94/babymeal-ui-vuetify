
export default class DishModelMapper {
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
