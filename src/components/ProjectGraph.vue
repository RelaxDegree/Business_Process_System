<template>
    <el-container>
        <el-header style="text-align: right; font-size: 12px">
            <el-row :gutter="20">
                <el-col :span="19" :offset="1">
                    <el-tabs v-model="activeName" >

                        <el-tab-pane label="阶段一" name="first">
            
                        </el-tab-pane>
                        <el-tab-pane label="阶段二" name="second">
            
                        </el-tab-pane>
                        <el-tab-pane label="阶段三" name="third">
            
                        </el-tab-pane>
                        <el-tab-pane label="阶段四" name="fourth">
            
                        </el-tab-pane>
            
                      </el-tabs>
                </el-col>
                <el-col :span="4">
                    <el-button type="info" icon="el-icon-document" >查看文档</el-button>
                </el-col>
              </el-row>
          
          

        </el-header>
        
        <el-main class="graph" >
            <div class="box-img" @mousedown="handleMouseDown">
                <div class="mask" v-show="mask_show" :style="'width:' + mask_width + 'left:' + mask_left + 'height:' + mask_height + 'top:' + mask_top">
                </div>
                <div id="mychart" :style="{width: '300px', height: '300px'}"></div>
                
            </div>
        </el-main>
        
      </el-container>
</template>

<script>
export default {
    name : "proj-graph",
    data (){
        return {
            x : 0,
            y : 0,
            isSelect : false,
            activeName : 'first'
        }
    },
    mounted(){
        this.drawLine();
    },
    methods : {
        selectRec(event){
            console.log(event);
        },
        handleMouseDown(event){    // eslint-disable-line no-unused-vars
            positionList.is_show_mask = true;
            positionList.start_x = event.clientX;
            positionList.start_y = event.clientY;
            positionList.end_x = event.clientX;
            positionList.end_y = event.clientY;
            document.body.addEventListener("mousemove", handleMouseMove); //监听鼠标移动事件
            document.body.addEventListener("mouseup", handleMouseUp); //监听鼠标抬起事件
        },
        drawLine() 
        {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('mychart'))
            // 绘制图表配置
            let option = {
                tooltip: {},
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };
            // 窗口大小自适应方案
            myChart.setOption(option);
            setTimeout(function() {
                window.onresize = function() {
                    myChart.resize();
                }
            }, 200)
        }
    },
    computed : {
        mask_show : {
            get() {
                return `${positionList.is_show_mask}$`;
            },
        },
        mask_width : {
            get() {
                return `${Math.abs(positionList.end_x - positionList.start_x)}px;`;
            },
        },
        mask_height : {
            get() {
                return `${Math.abs(positionList.end_y - positionList.start_y)}px;`;
            },
        },
        mask_left : {
            get() {
                return `${Math.min(positionList.start_x, positionList.end_x) - positionList.box_screen_left}px;`;
            },
        },
        mask_top : {
            get() {
                return `${Math.min(positionList.start_y, positionList.end_y) - positionList.box_screen_top}px;`;
            },
        },
    },
}
    import {reactive} from 'vue'
    const positionList = reactive({
        is_show_mask: false,
        box_screen_left: 479,
        box_screen_top: 141,
        start_x: 0,
        start_y: 0,
        end_x: 0,
        end_y: 0
    })
    // const linkList = reactive({
    //     is_show_mask: false,
    //     box_screen_left: 480,
    //     box_screen_top: 137,
    //     start_x: 0,
    //     start_y: 0,
    //     end_x: 0,
    //     end_y: 0
    // })

    // const  handleMouseDown = (event)=> {    // eslint-disable-line no-unused-vars
    //     console.log(111);
    //     positionList.is_show_mask = true;
    //     positionList.start_x = event.clientX;
    //     positionList.start_y = event.clientY;
    //     positionList.end_x = event.clientX;
    //     positionList.end_y = event.clientY;
    //     document.body.addEventListener("mousemove", handleMouseMove); //监听鼠标移动事件
    //     document.body.addEventListener("mouseup", handleMouseUp); //监听鼠标抬起事件
    // }

    function  handleMouseMove(event) {
        positionList.end_x = event.clientX;
        positionList.end_y = event.clientY;
    }

    function handleMouseUp() {
        document.body.removeEventListener("mousemove", handleMouseMove);
        document.body.removeEventListener("mouseup", handleMouseUp);
        positionList.is_show_mask = false;
        // handleDomSelect();
        resSetXY();
    }
    // function handleDomSelect() {
    //     const dom_mask = window.document.querySelector(".mask");
    //     //getClientRects()每一个盒子的边界矩形的矩形集合
    //     const rect_select = dom_mask.getClientRects()[0];
    //     console.log(rect_select);

    // }
    // function  collide(rect1, rect2) {
    //     const maxX = Math.max(rect1.x + rect1.width, rect2.x + rect2.width);
    //     const maxY = Math.max(rect1.y + rect1.height, rect2.y + rect2.height);
    //     const minX = Math.min(rect1.x, rect2.x);
    //     const minY = Math.min(rect1.y, rect2.y);
    //     return maxX - minX <= rect1.width + rect2.width && maxY - minY <= rect1.height + rect2.height;
    // }
    //清除
    function  resSetXY() {
        positionList.start_x = 0;
        positionList.start_y = 0;
        positionList.end_x = 0;
        positionList.end_y = 0;
    }

</script>

<style>
.graph 
{
    background-color: #ffffff;
    background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.15) 3%, rgba(0, 0, 0, 0) 3%),
    linear-gradient(360deg, rgba(89, 87, 87, 0.18) 3%, rgba(45, 43, 43, 0) 3%);
    background-size: 20px 20px;
    background-repeat: repeat;
    background-position: center center;
}
.box-img{
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    height: 100%;
    width: 100%;
}
.mask 
{
    position: absolute;
    background: #409eff;
    opacity: 0.4;
    z-index: 100;
}
</style>