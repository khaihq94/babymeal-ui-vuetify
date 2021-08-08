import store from '@/store'

export default class MultilingualConverter {
  static buildItemsByCurrentLanguage(items) {
    const currentLanguage = store.getters.getLocale
    var filteredItems = []
    items.forEach((item) => {
      const name = item.name.find((name) => name.language === currentLanguage)
      var content = ''
      if (name !== undefined) {
        content = name.content
      } else if (item.name !== undefined && item.name.length != 0) {
        content = item.name[0].name
      }
      if (content !== '') {
        filteredItems.push({
          id: item.id,
          content: content,
        })
      }
    })
    return filteredItems
  }
  static stringToSlug(str) {
    // remove accents
    var from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
      to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy'
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(RegExp(from[i], 'gi'), to[i])
    }

    str = str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-]/g, '-')
      .replace(/-+/g, '-')

    return str
  }
}
