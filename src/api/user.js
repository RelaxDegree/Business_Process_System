import http from '../utils/request'
import request from '@/utils/request';

// 获取项目组成员
export function getUser(groupName) {
    return request({
        url: 'api/v1/group/users',
        method: 'get',
        params : { groupName }
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