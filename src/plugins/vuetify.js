import Vue from 'vue'

import Vuetify from 'vuetify/lib'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import store from '../store'
import i18n from './i18n'

const vuetify = new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
    current: 'en',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: store.getters.getThemeColor,
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
})

Vue.use(Vuetify)
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'mdi'
})

export default vuetify