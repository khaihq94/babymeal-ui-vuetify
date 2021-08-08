// import i18n from '../../plugins/i18n'

const state = {
  mode: 'light',
  themeColor: '#2196f3',
  theme: 'blue',
  snackbar: {
    show: false,
    text: '',
    color: '',
    timeout: 3000,
  },
  locale: 'vi',
  notificatons: [
    {
      title: 'New user registered',
      color: 'light-green',
      icon: 'mdi-account-circle',
      timeLabel: 'Just now',
    },
    {
      title: 'New order received',
      color: 'light-blue',
      icon: 'mdi-cart-plus',
      timeLabel: '2 min ago',
    },
    {
      title: 'New payment made',
      color: 'cyan',
      icon: 'mdi-receipt',
      timeLabel: '24 min ago',
    },
    {
      title: 'New message from Michael',
      color: 'red',
      icon: 'mdi-email',
      timeLabel: '1 hour ago',
    },
  ],
}

// getters
const getters = {
  getSnackbar: (state) => state.snackbar,
  getLocale: (state) => state.locale,
  getTheme: (state) => state.theme,
  getThemeColor: (state) => state.themeColor,
  getNotification: (state) => state.notificatons,
}

// actions
const actions = {
  updateNotification({ commit }, text) {
    const note = {
      title: text,
      color: 'light-green',
      icon: 'mdi-account-circle',
      timeLabel: 'Just now',
    }
    commit('UPDATE_NOTIFICATION', note)
  },
  clearNotificaton({ commit }) {
    commit('CLEAR_NOTIFICATION')
  },
  showSuccessSnackbar({ commit }, text) {
    commit('SHOW_SNACKBAR', { text: text, color: 'success' })
    setTimeout(function(){ commit('HIDE_SNACKBAR') }, 3000);
  },
  showErrorSnackbar({ commit }, text) {
    commit('SHOW_SNACKBAR', { text: text, color: 'error' })
    setTimeout(function(){ commit('HIDE_SNACKBAR') }, 3000);
  },
}

// mutations
const mutations = {
  setThemeColor(state, payload) {
    state.themeColor = payload
  },
  setTheme(state, payload) {
    state.theme = payload
  },
  SET_LOCALE(state, locale) {
    state.locale = locale
  },
  UPDATE_NOTIFICATION(state, payload) {
    state.notificatons.push(payload)
  },
  CLEAR_NOTIFICATION(state) {
    state.notificatons = []
  },
  SHOW_SNACKBAR(state, { color, text }) {
    state.snackbar.show = true
    state.snackbar.color = color
    state.snackbar.text = text
  },
  HIDE_SNACKBAR(state) {
    state.snackbar.show = false
    state.snackbar.text = ""
    state.snackbar.color = ""
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
