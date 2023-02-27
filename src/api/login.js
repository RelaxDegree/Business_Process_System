import http from '../utils/request'
import request from '@/utils/request';

// 用户登录
export function login(data) {
    console.log(data)
    return request({
        url: 'api/v1/users/login',
        method: 'post',
        data: data
    })
}

// 获取个人信息
export function getInfo(userId) {
    return request({
        url: 'api/v1/users/info',
        method: 'get',
        params: {userId}
    })
}

// 用户登出
export function logout() {
    return request({
        url: 'api/v1/users/logout',
        method: 'post'
    })
}

// 获取所有组
export function getgroups() {
    return request({
        url: 'api/v1/group/all',
        method: 'get'
    })
}
// 用户注册
export function register(data) {
    return request({
        url: 'api/v1/users/register',
        method: 'post',
        data: data
    })
}