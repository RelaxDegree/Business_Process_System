import Vue from 'vue'
import Vuex from 'vuex'
import proCreate from './proCreate'
Vue.use(Vuex)
// const state =  {
//   // 项目信息
//   projectMessage: {},
//   // 阶段信息
//   stage : [],
//   // 任务信息
//   task : [],
//   nowStage : [],
//   // 全体人员
//   user : [],
//   // 用于项目查看的全部信息
//   propreview : {
//   }
// }
// const getters = {
//   getStage : (state) => (stageId) => {
//     // console.log(stageId)
//     return state.stage[parseInt(stageId - 1)]; //stageId是页面ID   减一是
//   },
//   getUser : (state) => {
//     return state.user;
//   },
//   getData : state => {
//     return {
//       project : state.projectMessage,
//       stage : state.stage,
//       "task" : state.task,
//     }
//   }
// }
// //里面定义方法，操作state方发
// const mutations = {
//   // 设置项目信息
//   SETPROJECT(state, pro)
//   {
//     state.projectMessage = pro;
//   },
//   // 添加阶段
//   ADDSTAGE(state, value)
//   {
//       state.stage.push(value);
//   },
//   // 添加任务
//   ADDTASK(state, value)
//   {
//       state.task.push(value)
//   },
//   SETNOWSTAGE(state, value)
//   {
//       state.nowStage = value
//       // console.log(value)
//   },
//   // 更新阶段信息 当修改了阶段信息后进行更新
//   UPDATESTAGE(state, sta, stageId)
//   {
//       state.stage[parseInt(stageId)] = sta;
//   },
//   // 添加儿子  当在右侧示意图中添加了一条边时
//   ADDTASKSON(state, para)
//   {
//     // console.log(para.fa)  
//     for (var i = 0 ; i < state.task.length ; i ++)
//       {
//         if (i === parseInt(para.fa))
//         {
//           state.task[i].son.push(para.son);
//           // console.log(state.task[i].son)
//           break
//         }
//       }
//   },
//   // 删除儿子 当在右侧示意图中删除了一条边
//   DELETETASKSON(state, para)
//   {
//     // console.log(para.son)  
//     for (var i = 0 ; i < state.task.length ; i ++)
//       {
//         if (i === parseInt(para.fa))
//         {
//           state.task[i].son = state.task[i].son.filter((px) => px !== para.son);
//           // console.log(state.task[i].son)
//           break
//         }
//       }
//   },
//   // 任务节点移动 更新位置坐标
//   MOVETASK(state, para)
//   {
//     for (var i = 0 ; i < state.task.length ; i ++)
//       {
//         if (i === parseInt(para.idx))
//         {
//           state.task[i].px = para.px
//           state.task[i].py = para.py
//           // console.log("节点移动", state.task[i], para)
//           break
//         }
//       }
//   },
//   // procreate组件的mounted方法调用，将从后端获取的数据传到总线
//   SETUSER(state, users)
//   {
//     state.user = users
//   },
//   // 更新任务
//   UPDATETASK(state, onetask)
//   {
//     for (var i = 0 ; i < state.task.length ; i ++)
//     {
//       if (state.task[i].stageId == onetask.stageId && state.task[i].taskNum == onetask.taskNum)
//       {
//         state.task[i] = onetask;
//         break;
//       }
//     }
//     // console.log("更新后的任务", state.task);
//   },
//   // 项目查阅设置初始信息
//   SETPROPREVIEW(state, params)
//   {
//     state.propreview = params;
//   } 
// }
// // 操作异步操作mutation
// const actions = {
  
// }
const modules = {
    proCreate
}
export const store = new Vuex.Store({
  //数据，相当于data
  modules,
})