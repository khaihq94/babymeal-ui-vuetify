import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import store from '@/store/index'
import en from '@/locale/en.json'
import vi from '@/locale/vi.json'
const translation = {
  en: en,
  vi: vi,
}
const i18n = new VueI18n({
  locale: store.getters.getLocale, // set locale
  messages: translation, // set locale messages
})

export default i18n
