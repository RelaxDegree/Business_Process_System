import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //数据，相当于data
  state: {
    projectMessage: {},
    stage : [],
    task : [],
    nowStage : [],
  },
  getters: {
    getStage : (state) => (stagenum) => {
      // console.log(stagenum)
      return state.stage[parseInt(stagenum - 1)]; //stageNum是页面ID   减一是
    }
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
  },
  SETNOWSTAGE(state, value)
  {
      state.nowStage = value
      // console.log(value)
  },
    // GETSTAGE(state, value)
    // {
    //   console.log(value);
    //   return 
    // }
    // 更新阶段信息 当修改了阶段信息后进行更新
    UPDATESTAGE(state, sta, stagenum)
    {
        state.stage[parseInt(stagenum)] = sta;
    },
    // 添加儿子  当在右侧示意图中添加了一条边时
    ADDTASKSON(state, para)
    {
      // console.log(para.fa)  
      for (var i = 0 ; i < state.task.length ; i ++)
        {
          if (i === parseInt(para.fa))
          {
            state.task[i].son.push(para.son);
            // console.log(state.task[i].son)
            break
          }
        }
    },
    // 删除儿子 当在右侧示意图中删除了一条边
    DELETETASKSON(state, para)
    {
      // console.log(para.son)  
      for (var i = 0 ; i < state.task.length ; i ++)
        {
          if (i === parseInt(para.fa))
          {
            state.task[i].son = state.task[i].son.filter((x) => x !== para.son);
            // console.log(state.task[i].son)
            break
          }
        }
    },
    // 任务节点移动 更新位置坐标
    MOVETASK(state, para)
    {
      for (var i = 0 ; i < state.task.length ; i ++)
        {
          if (i === parseInt(para.idx))
          {
            state.task[i].x = para.x
            state.task[i].y = para.y
            // console.log(state.task[i])
            break
          }
        }
    }
  },
  // 操作异步操作mutation
  actions: {
    
  },
  modules: {
    
  },
})