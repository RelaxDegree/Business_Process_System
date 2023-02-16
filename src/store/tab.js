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
        ] // 面包屑数据
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
        }
    }
}