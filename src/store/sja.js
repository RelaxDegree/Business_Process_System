export default {
  state: {
    documents : [],
    taskId : 0,
    allPros : [],
    allTasks : [],
    userProAndTask : [],
  },
  mutations: {
    getDocuments(state,docs){
      state.documents = docs
    },
    getTaskId(state,id){
      state.taskId = id
    },
    getAllPros(state,pros){
      // state.allPros = pros
      for(var i=0;i<pros.length;i++ ){
        if(pros[i].projectIsdone === false){
          state.allPros.push(pros[i])
        }
      }
    },
    getAllProAndTask(state,tasks){
      
      for( var i=0;i<tasks.length;i++){
        
        state.allTasks.push(tasks[i])
        // console.log(v)
      }
      
    },
    getUserProAndTask(state,users){
      for(var i=0;i<users.length;i++){
        let v = {
          taskId : '',
          taskDetail : '',
          projectName : ''
        }
        v.taskId = users[i].taskId
        v.taskDetail = users[i].taskDetail
        v.projectName = users[i].projectName
        state.userProAndTask.push(v)
      }
    },
    clearProAndTask(state){
      state.allPros=[]
      state.allProAndTask=[]
      state.userProAndTask=[]
    }


  }
}