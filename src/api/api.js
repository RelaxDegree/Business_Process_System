import request from "./request";
import qs from "qs";
 
const baseUrl = '/api/jwt/auth'
 

// 创建项目时首先获取用户
export function procreateSetUser(params) {
    return request({
        url : "https://mock.apifox.cn/m2/1954906-0-default/51521746",
        method : 'get',
        params : params
    })
}
// 保存项目
export function procreateRelease(params) {
    return request({
        url : "https://mock.apifox.cn/m2/1954906-0-default/51518205",
        method : 'put',
        params : params,
    })
}
// 项目审阅 获取项目数据
export function propreviewGet(params){
    return request({
        url : "https://mock.apifox.cn/m2/1954906-0-default/51521370",
        method : 'get',
        params : params,
    })
}
//其实，也不一定就是params，也可以是 query 还有 data 的呀！
//params是添加到url的请求字符串中的，用于get请求。会将参数加到 url后面。所以，传递的都是字符串。无法传递参数中含有json格式的数据
//而data是添加到请求体（body）中的， 用于post请求。添加到请求体（body）中，json 格式也是可以的。