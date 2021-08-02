export default {
  methods: {
    dynamicLocalization: function (translate) {
      if (typeof translate === 'string') {
        return this.$i18n.t(translate)
      } else if (translate === void 0) {
        return this.$i18n.t('loading')
      }
      if (translate === undefined || translate === null || translate.length === 0) {
        return ''
      }
      var name = translate.find((i18nContent) => i18nContent.language === this.$i18n.locale)
      if (name !== undefined) {
        return name.content
      }
      return translate[0].content + ' (' + this.$i18n.t(translate[0].language) + ')'
    },
  },
}
