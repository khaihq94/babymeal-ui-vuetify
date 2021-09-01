export default class UnitContentModel {
  language = ''
  content = ''
  description = ''

  constructor(language, content, description) {
    this.language = language;
    this.content = content;
    this.description = description;
  }
}
