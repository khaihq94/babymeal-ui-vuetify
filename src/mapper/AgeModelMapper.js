
export default class AgeModelMapper {
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
