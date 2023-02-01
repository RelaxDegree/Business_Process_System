<template>
    
    <div>
        <div ref="container" id="container">
        </div>
    </div>


</template>

<script>
import {Cell, Graph, Shape} from '@antv/x6'
import {store} from '../../store/index';
import  '@antv/x6-vue-shape';
export default {
    name : "proj-graph",
    store,
    graph: null,
    props:['stageNum','thisStage'],
    data (){
        return {
            
            activeName : 'first',
            // colors : [
            //     rgb(95,149,255),    // 正在编写（任务开始） 
            //     rgb(95,255,110),    // 正在审批
            //     rgb(95,149,255),    // 正在会签
            //     rgb(95,149,255),    // 任务结束
            // ],
            data : {
                nodes : [
                    
                ],
                edges : [

                ]
            }
            
        }
    },
    created() {},
    watch:{
		'$store.state.task'(newVal,oldVal)
      {
			//对数据执行操作
          var node = newVal[newVal.length - 1]
          if (node.stageNum == this.stageNum)
          {
            this.makeNode(newVal.length - 1, node.taskName, node.taskDetail)
          }            
		  }
	},
    mounted() {
    this.initGraph();

    },
    methods: {
    
    makeNode(taskID, taskName, taskDetail){
        this.data.nodes[this.data.nodes.length] = new Shape.Rect({
            x: 40,
            y: 40,
            id : 'node' + taskID,
            width: 200,
            height: 68,
            attrs: { 
                body: {
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#ffffff',
                },
                image: {
                    'xlink:href':
                        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
                    width: 16,
                    height: 16,
                    x: 12,
                    y: 12,
                },
                head: {
                    refWidth: '100%',
                    stroke: 'transparent',
                    height: 28,
                    fill: 'rgb(95,149,255)',
                },
                title: {
                text: taskName+'                正在审批',
                refX: 30,
                refY: 9,
                fill: '#ffffff',
                fontSize: 12,
                'text-anchor': 'start',
                },
                text: {
                text: taskDetail,
                refX: 8,
                refY: 45,
                fontSize: 12,
                fill: 'rgba(0,0,0,0.6)',
                'text-anchor': 'start',
                },
            },
            markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'rect',
      selector: 'head',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'title',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
  ],
    ports: {
        groups: {
        // 输出链接桩群组定义
            out: {
                position: 'bottom',
                attrs: {
                circle: {
                    r: 6,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                },
                },
            },
        },
        // 输入桩ID前面加上port标识
        items: [
      {
        id:  'port' + taskID,
        group: 'out',
      }]
    }
        })
        this.graph.addNode(this.data.nodes[this.data.nodes.length - 1])
    },
    zoom(){
        console.log(this.graph.node)

    },
    initGraph() {
      // Step 3 渲染画布
      this.graph = new Graph({
        container: this.$refs.container,
        connecting: {
            snap: {
            radius: 50,
            },

            allowMulti : false,
            allowLoop : false,
            highlight: true,
            createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                strokeWidth: 4,
                stroke: '#cfe7f2',
                strokeDasharray: 0,
                style: {
                  animation: 'ant-line 0s infinite linear',
                },
              },
              outline: {
                stroke: '#456d89',
                strokeWidth: 7,
              }
            },
            tools: {
                name: 'button-remove',
                args: { distance: -40 },
            },
            router: {
              name: 'er',
              args: {
                offset: 32,
                direction: 'T'
              }
            }
          })
        },
        },
        selecting: {
            enabled: true,
            showNodeSelectionBox : true,
            multiple: true,
            rubberband: true,
            movable: true,
            showNodeSelectionBox: true,
        },
        width: 1000,
        height: 440,
        panning: {
            enabled: false,
            modifiers: 'ctrl',
        },
        resizing: {
            enabled: true,
        },
        background: {
            color: '#fffbe6', // 设置画布背景颜色
        },
        grid: {
            size: 10,
            visible: true,
            type: 'doubleMesh',
            args: [
            { 
                color: '#eee', // 主网格线颜色
                thickness: 1,  // 主网格线宽度
            },
            { 
                color: '#ddd', // 次网格线颜色
                thickness: 1,  // 次网格线宽度
                factor: 4,     // 主次网格线间隔
            },
            ],
        },
        snapline: {
            enabled: true, // 对齐线
            sharp: true,
            tolerance: 10,
            clean: 5000,
        },
        scroller: {
            enabled: true,
            pageVisible: false,
            pageBreak: false,
            pannable: true
        },
      })
        this.graph.on('cell:click', ({cell}) => {
            // node.store.data.position.x += 200
            // console.log(node.store.data.position.x)

            cell.attr('body/stroke', 'red')
        }),
        // 创建的边连接节点后触发的事件
        this.graph.on('edge:connected', ({edge}) => {
            // node.store.data.position.x += 200
            // console.log(node.store.data.position.x)
            // console.log(edge) 
            let out = edge.source.port
            out = out.slice(4, out.length)
            let tar = edge.target.cell
            tar = tar.slice(4, tar.length)

            this.$store.commit("ADDTASKSON", {fa : out , son : tar})

        }),
        // 边删除的触发事件
        this.graph.on('edge:removed', ({edge}) => {

            // console.log(edge) 
            let out = edge.source.port
            out = out.slice(4, out.length)
            let tar = edge.target.cell
            tar = tar.slice(4, tar.length)
            this.$store.commit("DELETETASKSON", {fa : out , son : tar})
        }),
        // 节点移动的触发事件
        this.graph.on('node:moved', ({node}) => {

          // console.log(node) 
          let id = node.id
          id = id.slice(4, id.length)
          this.$store.commit("MOVETASK", {idx : id , 
            x : node.store.data.position.x , y : node.store.data.position.y})
          })
    }
  }
}

</script>

<style>
@keyframes ant-line {
    to {
        stroke-dashoffset: -1000
    }
}


</style>