import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //数据，相当于data
  state: {
    stage : [],
    task : [],
    taskFather : [],
    nowStage : [],
  },
  getters: {
    
  },
  //里面定义方法，操作state方发
  mutations: {
    ADDSTAGE(state, value)
    {
        state.stage.push(value);
    },
    ADDTASK(state, value)
    {
        state.task.push(value)
        state.taskFather.push('-1')
    },
    SETNOWSTAGE(state, value)
    {
        state.nowStage = value
        // console.log(value)
    }
  },
  // 操作异步操作mutation
  actions: {
    
  },
  modules: {
    
  },
})