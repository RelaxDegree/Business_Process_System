<template>
    <el-container>
        <el-header style="text-align: right; font-size: 12px">
            <el-row  :span='16'>
                <el-col >
                    <el-tabs v-model="activeName" >
                        <el-tab-pane label="默认页面" name="default">
                            
                        </el-tab-pane>
                        <!-- <div 
                        
                        :thisStage="s"> -->
                        <el-tab-pane 
                        v-for="(s,index) of this.$store.state.stage"
                        :key="(index+1).toString()"
                        :label="constName+(index+1).toString()" :name="(index+1).toString()">

                        <SubGraph :stageNum="(index+1).toString()"></SubGraph>

                        </el-tab-pane>
                        <!-- </div> -->
             
                        <!-- <el-tab-pane label="阶段二" name="second">
                            <SubGraph></SubGraph>
                        </el-tab-pane>
                        <el-tab-pane label="阶段三" name="third">
                            <SubGraph></SubGraph>
                        </el-tab-pane>
                        <el-tab-pane label="阶段四" name="fourth">
                            <SubGraph></SubGraph>
                        </el-tab-pane> -->
        
                        
                            
                        
                      </el-tabs>
                </el-col>

              </el-row>
          
          

        </el-header>
        
        
        
      </el-container>
</template>
<script >
import SubGraph from '../ProjectCreate/ProjectSubgraph.vue';
import {store} from '../../store/index';

export default {
    name : "proj-graph",
    store,
    watch:{
		'$store.state.nowStage'(newVal,oldVal)
        {
			//对数据执行操作
          this.activeName = newVal
	    },
        // activeName(newVal)
        // {
        //     this.$store.commit('SETNOWSTAGE','newVal')
        // }
    },
    data (){
        return {
            constName : '阶段',
            activeName : 'default',
            data : {
                
            }
            
        }
    },
    created() {},
    mounted() {
    

    },
    methods: {
    },
    components : {
        SubGraph,
    }
}

</script>


<style>

</style>