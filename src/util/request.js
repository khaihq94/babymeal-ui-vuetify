import axios from 'axios'
import store from '@/store'
import router from '@/router/'

// create axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api base_url
  timeout: 50000, // timeout,
  headers: { 'Access-Control-Allow-Origin': '*' },
})

const err = (error) => {
  const { status, data } = error.response
  const { errors } = data
  let message = []
  for (let field in errors) {
    message.push(errors[field])
  }
  switch (status) {
    case 400:
      store.commit('SHOW_SNACKBAR', { text: data.message, color: 'error' })
      break
    case 422:
      store.dispatch('showErrorSnackbar', message);
      break
    case 401:
      store.dispatch('showErrorSnackbar', "sessionExpired");
      store.commit('SET_LOGOUT_MODE')
      router.push({name: "login"})
      break
    case 403:
      store.dispatch('showErrorSnackbar', message);
      break
    case 500:
      store.dispatch('showErrorSnackbar', 'server error');
      break
    default:
      break
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Content-Type'] = 'application/json'
  if(store.getters.getAccessToken != null) {
    config.headers['Authorization'] = 'Bearer ' + store.getters.getAccessToken
  }

  return config
}, err)

// response interceptor

service.interceptors.response.use(({ data, config }) => {
  if (['put', 'post', 'delete', 'patch'].includes(config.method) && data.meta) {
    store.commit('SHOW_SNACKBAR', { text: data.meta.message, color: 'success' })
  }

  return data
}, err)

export default service
