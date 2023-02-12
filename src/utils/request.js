import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store';
import { getToken } from '@/utils/auth'

const http = axios.create({
    // 通用地址前缀
    baseURL: 'http://1.117.144.92:8088',
    timeout: 1000
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    if (store.getters.token) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        config.headers['X-Token'] = getToken()
      }

    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const res = response.data
    if (res.code !== 200) { // 状态码不是200
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
  
        // 错误处理
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error);
});

export default http