import request from '@/utils/request';

// 更新用户信息
export function updateUserInfo(data) {
    return request({
        url: 'api/v1/users/updateInfo',
        method: 'post',
        data
    })
}

// 获取用户活跃项目
export function getActPro(userId) {
    return request({
        url: `api/v1/users/projects?userId=${userId}`,
        method: 'get',
        
    })
}

// 获取用户活跃任务
export function getActTask(userId) {
    return request({
        url: `api/v1/tasks/userId?userId=${userId}`,
        method: 'get',
        
    })
}

// 替换头像
export function updateAvatar(data) {
    return request({
        url: 'api/v1/users/avatar',
        method: 'post',
        data
    })
}