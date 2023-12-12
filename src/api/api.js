import request from '@/utils/request';

// 创建项目时首先获取用户
export function procreateSetUser(params) {
    return request({
        url: "https://mock.apifox.cn/m2/1954906-0-default/51521746",
        method: 'get',
        params: params
    })
}
// 保存项目
export function procreateRelease(params) {
    return request({
        url: "https://mock.apifox.cn/m2/1954906-0-default/51518205",
        method: 'put',
        params: params,
    })
}
// // 项目审阅 获取项目数据
// export function propreviewGet(params) {
//     return request({
//         url: "https://mock.apifox.cn/m2/1954906-0-default/51521370",
//         method: 'get',
//         params: params,
//     })
// }

// 获取当前项目所有文档
export function getProjectAllDoc(params) {
    return request({
        url: "api/v1/documents/project",
        method: "get",
        params: params,
    })
}

export function getProjectDoc(params) {
    return request({
        url: 'api/v1/document/task',
        method: "get",
        params: params,
    })
}

export function getAllPros(params) {
    return request({
        url: 'api/v1/project/pr/id',
        method: "get",
        params: params,
    })
}

export function getProTask(params) {
    return request({
        url: 'api/v1/task/projectid',
        method: "get",
        params: params,
    })
}

export function getUserProAndTask(params) {
    return request({
        url: 'api/v1/task/user/id',
        method: "get",
        params: params,
    })
}

export function addUserProAndTask(params) {
    // return request({
    //   url: 'api/v1/project/useradd',
    //   method : "post",
    //   params : params,
    // })
    console.log(params)
    const config = {
        method: 'post',
        url: "api/v1/project/useradd"
    }
    if (params) config.data = params

    return request(config)
}

export function deleteUserProAndTask(params) {
    return request({
        url: 'api/v1/project/userdel',
        method: "delete",
        params: params,
    })
}

// 项目审阅 获取项目数据
export function propreviewGet(params){
    return request({
        url : "api/v1/project",
        method : 'get',
        params : params,
    })
}

//查询日志
export function findDiary(params){
    return request({
        url : "api/v1/project/log",
        method : 'get',
        params : params,
    })
}

export function updateDocument(params){
    return request({
        url : "api/v1/process/id",
        method : 'put',
        data : params,
    })
}

//其实，也不一定就是params，也可以是 query 还有 data 的呀！
//params是添加到url的请求字符串中的，用于get请求。会将参数加到 url后面。所以，传递的都是字符串。无法传递参数中含有json格式的数据
//而data是添加到请求体（body）中的， 用于post请求。添加到请求体（body）中，json 格式也是可以的。