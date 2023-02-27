export default {
    state: {
        isCollapse: false, // 菜单展开
        tablist: [
            {
                path: '/',
                name: 'home',
                label: '概览',
                icon: 's-home',
                url: 'Home/Home'
            }
        ], // 面包屑数据
        userInfo: {
            userId: '',
            name:'',
            password: '',
            otherInfo: '',
            groupId: '',
            headPic: ''
        }
    },
    mutations: {
        // 修改菜单展开状态
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            if (val.name !== 'home') {
                const index = state.tablist.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tablist.push(val)
                }
            }
        },
        // 更新个人信息
        updateUserInfo(userinfo) {
            state.userInfo.name = userinfo.name
            state.userInfo.password = userinfo.password
            state.userInfo.otherInfo = userinfo.otherInfo
            state.userInfo.groupId = userinfo.groupId
            state.userInfo.headPic = userinfo.headPic
        }
    }
}