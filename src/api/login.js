import http from '../utils/request'
import request from '@/utils/request';

// 用户登录
export function login(data) {
    return request({
        url: 'api/v1/users/login',
        method: 'post',
        data
    })
}

// 获取个人信息
export function getInfo() {
    return request({
        url: 'api/v1/users/info',
        method: 'get',
    })
}

// 用户登出
export function logout() {
    return request({
        url: '',
        method: 'post'
    })
}

// 用户注册
export function register(data) {
    return request({
        url: 'api/v1/users/register',
        method: 'post',
        data
    })
}

// 获取所有组
export function getgroups() {
    return request({
        url: 'api/v1/group/all',
        method: 'get'
    })
}