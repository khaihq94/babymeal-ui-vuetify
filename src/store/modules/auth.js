import request from '@/util/request'
import colors from 'vuetify/es5/util/colors'

const randomColor = () => {
  const temp = Object.keys(colors)
  const key = temp[Math.floor(Math.random() * temp.length)]
  const color = colors[key].base
  return color
}

const state = {
  access_token: null,
  expires_in: 0,
  token_type: 'bearer',
  expiredDate: null,
  username: 'admin',
  avatar: null,
  userColor: '#2196f3',
  status: 'online',
}
const getters = {
  getAccessToken: (state) => {
    return state.access_token
  },
  getExpiredDate: (state) => state.expiredDate,
  getAvatar: (state) => state.avatar,
  getUsername: (state) => state.username,
  getUserStatus: (state) => state.status,
}
const actions = {
  // just for demo
  //replace you own login logic
  demoLogin({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === 'admin') {
        commit('SET_LOGIN', { token: 'demo', expires_in: 0 })
        return resolve({ message: 'success' })
      } else {
        return reject({ message: 'Auth Failed' })
      }
    })
  },
  login({ commit, dispatch }, { username, password }) {
    return request({
      url: '/authenticate',
      method: 'post',
      data: {
        username,
        password,
      },
    }).then((resp) => {
      commit('SET_LOGIN', resp)
      // dispatch('fetchProfile')
    })
  },
  register({ commit, dispatch }, data) {
    return request({
      url: '/register',
      method: 'post',
      data: data,
    }).then((resp) => {
      commit('SET_LOGIN', resp)
      // dispatch('fetchProfile')
      return resp
    })
  },
  logout({ commit, dispatch }) {
    dispatch('closeSocket')
    commit('SET_LOGOUT_MODE')
  },
  // get current login user info

  fetchProfile({ commit, dispatch, rootState }) {
    return request({
      url: '/admin/me',
      method: 'get',
    }).then((resp) => {
      commit('SET_LOGIN_PROFILE', resp.data)
      return resp
    })
  },
}
const mutations = {
  SET_LOGIN(state, { token, expiresIn }) {
    state.access_token = token
    state.expires_in = expiresIn | 0
    state.expiredDate = Date.now() + expiresIn
  },
  SET_ACCESS_TOKEN(state, token) {
    state.access_token = token
  },
  SET_LOGOUT_MODE(state) {
    state.access_token = null
    state.expires_in = 0
    state.expiredDate = null
  },
  SET_LOGIN_PROFILE(state, payload) {
    state.username = payload.username
    state.avatar = payload.avatar
    state.color = randomColor()
  },
  UPDATE_SELF_STATUS(state, status) {
    state.status = status
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
