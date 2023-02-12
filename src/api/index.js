import http from '../utils/request'
import request from '@/utils/request';

// 请求首页数据
export const getData = () => {
    // 返回promise对象
    return http.get('/home/getData')
}

// 
export function login(data) {
    return request({
      url: '/vue-element-admin/user/login',
      method: 'post',
      data
    })
  }
  
  export function getInfo(token) {
    return request({
      url: '/vue-element-admin/user/info',
      method: 'get',
      params: { token }
    })
  }
  
  export function logout() {
    return request({
      url: '/vue-element-admin/user/logout',
      method: 'post'
    })
  }

// 请求user数据
export const getUser = (params) => {
    // 返回promise对象
    return http.get('/user/getUser')
}