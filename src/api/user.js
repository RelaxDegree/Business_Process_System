import request from '@/utils/request';

// 获取项目组成员
export function getUser(groupId) {
    return request({
        url: 'api/v1/group/users',
        method: 'get',
        params : { groupId}
    })
}

// 获取项目成员
export function getProUser(id) {
    return request({
        url: 'api/v1/projects/users',
        method: 'get',
        params : { id }
    })
}
 
// 获取项目任务列表
export function getProTask( id ) {
    return request({
        url: 'api/v1/projects/tasks',
        method: 'get',
        params : { id }
    })
}

// 添加项目人员
export function addProUser(data) {
    return request({
        url: 'api/v1/projects/user',
        method: 'post',
        data
    })
}

// 删除项目人员
export function delProUser(userId, taskId) {
    return request({
        url: `api/v1/projects/user?userId=${userId}&taskId=${taskId}`,
        method: 'post',
    })
}

// 删除用户
export function delUser(userId) {
    return request({
        url: `api/v1/user/id?id=${userId}`,
        method: 'delete',
        
    })
}

// 根据用户id获取项目任务
export function getUserTask(userId) {
    return request({
        url: `api/v1/task/user/id?id=${userId}`,
        method: 'get',
        
    })
}

// 删除用户的任务
export function delUserTask(userId, taskId, state) {
    return request({
        url: `api/v1/project/userdel?id=${userId}&taskId=${taskId}&state=${state}`,
        method: 'delete',
        
    })
}