import store from '@/store'

export default class MultilingualConverter {
  static buildItemsByCurrentLanguage(items) {
    const currentLanguage = store.getters.getLocale
    var filteredItems = []
    items.forEach((item) => {
      const names = item.names.find((name) => name.lang === currentLanguage)
      var name = ''
      if (names !== undefined) {
        name = names.name
      } else if (item.names !== undefined && item.names.length != 0) {
        name = item.names[0].name
      }
      if (name !== '') {
        filteredItems.push({
          id: item.id,
          name: name,
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
