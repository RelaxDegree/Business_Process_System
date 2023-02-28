<template>

  <div>
    <div ref="container" id="container">
    </div>
  </div>


</template>

<script>
import {Cell, Graph, Shape, Vector,View,} from '@antv/x6'
import {store} from '../../store/index';
export default {
  name : "prev-subgraph",
  store,
  graph: null,
  props:['stageId','thisStage'],
  data (){
    return {
      manual : false,
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
    '$store.state.proCreate.task'(newVal,oldVal)
    {
      //对数据执行操作
      var node = newVal[newVal.length - 1]
      if (node.stageId == this.stageId)
      {
        this.makeNode(newVal.length - 1, node.taskOpenTime,node.taskCloseTime, node.taskDetail)
      }
    }
  },
  mounted() {
    this.initGraph();
    this.showNodes();
  },
  methods: {
    showNodes(){
      console.log(this.$store.state.proPreview.task)

      for (var i = 0 ; i < this.$store.state.proPreview.task.length; i ++)
        {
          var t = this.$store.state.proPreview.task[i];
          if (t.stageId == this.stageId){
            // this.makeNode(t.taskId, t.taskOpenTime,t.taskCloseTime, t.taskDetail,t.taskProgress, t.px, t.py, t.f)
            this.makeNode(t);
          }
        }
    },
    makeNode(oneTask){
      console.log(oneTask.px,oneTask.py)
      var color = "";
      if (oneTask.taskProgress == "0")
      {
        color = "#808080";
      }
      else if (oneTask.taskProgress == "1" || oneTask.taskProgress == "2")
      {
        color = "#5F95FF";
      }
      else if (oneTask.taskProgress == "3")
      {
        color = "#008000"
      }
      this.data.nodes[this.data.nodes.length] = new Shape.Rect({
        resize: false, // 禁止节点大小调整
        x: oneTask.px,
        y: oneTask.py,
        id : 'node' + oneTask.taskId,
        width: 270,
        height: 68,
        attrs: {
          body: { // 颜色在这里修改
            stroke: color,
            strokeWidth: 1,
            fill: '#ffffff',
          },
          image: {
            'xlink:href': require('@/assets/logo.png'),
            width: 28,
            height: 28,
            x: 0,
            y: 0,
          },
          head: {
            refWidth: '100%',
            stroke: 'transparent',
            height: 28,
            fill: 'rgb(95,149,255)',
          },
          title: {
            text: "[" + oneTask.taskOpenTime + "] - " + "[" + oneTask.taskCloseTime + "]" ,
            refX: 30,
            refY: 9,
            fill: '#ffffff',
            fontSize: 12,
            'text-anchor': 'start',
          },
          text: {
            text: oneTask.taskDetail,
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
              id:  'port' + oneTask.taskId,
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
          allowBlank : false,
          allowMulti : false,
          allowLoop : false,
          highlight: true,
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  strokeWidth: 3,
                  stroke: '#cfe7f2',
                  strokeDasharray: 0,
                  style: {
                    animation: 'ant-line 30s infinite linear',
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
          modifiers : 'ctrl',
          className: 'x6-widget-selection-selected',
        },
        width: 1000,
        height: 520,
        panning: {
          enabled: true,
          modifiers: 'ctrl',
        },
        // resizing: {
        //     enabled: true,
        // },
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
          pannable: false
        },
        highlighting: {
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              attrs: {
                fill: '#fff',
                stroke: '#31d0c6',
                strokeWidth: 4,
              },
            },
          },
        },
      })
      // 创建的边连接节点后触发的事件
      this.graph.on('edge:connected', ({edge}) => {
        // node.store.data.position.x += 200
        // console.log(node.store.data.position.x)
        console.log(edge)
        let out = edge.source.port
        out = out.slice(4, out.length)
        let tar = edge.target.cell
        tar = tar.slice(4, tar.length)
        this.$store.commit("proCreate/ADDTASKSON", {fa : out , son : tar})
      }),
          // 边删除的触发事件
          this.graph.on('edge:removed', ({edge}) => {
            console.log(edge)
            let out = edge.source.port
            out = out.slice(4, out.length)
            let tar = edge.target.cell
            if (!tar) return;
            tar = tar.slice(4, tar.length)
            this.$store.commit("proCreate/DELETETASKSON", {fa : out , son : tar})
          }),
          // 节点移动的触发事件
          this.graph.on('node:moved', ({node}) => {
            // console.log(node)
            let id = node.id
            id = id.slice(4, id.length)
            this.$store.commit("proCreate/MOVETASK", {idx : id ,
              px : node.store.data.position.x , py : node.store.data.position.y})
          });
      var that = this;
      // 节点cell 高亮
      const highlightColor = {
        name: 'stroke',
        args: {
          attrs: {
            stroke: '#1A7AD6',
          },
        },
      };
      function flash(cell) {
        const cellView = that.graph.findViewByCell(cell)
        if (cellView) {
          cellView.highlight({
            "stroke" : "#1A7AD6"})
          setTimeout(() => cellView.unhighlight(), 300)
        }
      };

      this.graph.on('signal', (cell) => {
        if (cell.isEdge()) {
          const view = that.graph.findViewByCell(cell)
          if (view) {
            const token = Vector.create('circle', { r: 6, fill: '#1A7AD6' })
            const target = cell.getTargetCell()
            setTimeout(() => {
              view.sendToken(token.node, 1000, () => {
                if (target) {
                  that.graph.trigger('signal', target)
                }
              })
            }, 300)
          }
        }
        else
        {
          flash(cell)
          const edges = this.graph.model.getConnectedEdges(cell, {
            outgoing: true,
          })
          edges.forEach((edge) => this.graph.trigger('signal', edge))
        }
      })
      let manual = false
      this.graph.on('node:mousedown', ({ cell }) => {
        manual = true
        that.graph.trigger('signal', cell)
      })
      const trigger = () => {
        that.graph.trigger('signal', a)
        if (!manual) {
          setTimeout(trigger, 5000)
        }
      }
    }
  }
}
</script>

<style scoped>
@keyframes ant-line {
  to {
    stroke-dashoffset: -1000
  }
}
</style>