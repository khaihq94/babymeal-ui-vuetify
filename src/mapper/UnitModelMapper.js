
export default class UnitModelMapper {
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
