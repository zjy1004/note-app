import axios from 'axios'

const env = process.env.NODE_ENV // 在生产环境的时候，将会被设置为productio
// 在开发环境的时候，将会被设置为development
let baseURL = env === 'development' ? '/api' : '/'

const instance = axios.create({
  baseURL,
  timeout: 15000
})

const xhr = {
  get (url, data, config) {
    return new Promise((resolve, reject) => {
      instance.get(url, { params: data }, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  fetch (url, data, config, methods) {
    return new Promise((resolve, reject) => {
      instance[methods](url, data, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  post (url, data, config) {
    return this.fetch(url, data, config, 'post')
  },
  delete (url, data, config) {
    return this.fetch(url, data, config, 'delete')
  },
  patch (url, data, config) {
    return this.fetch(url, data, config, 'patch')
  }
}

export default xhr
