<template>
    <div :style="{height:'660px',width:'100%'}" />
</template>
<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons')

export default {
  data () {
    return {
      chart: null,
      treeData1: {
        text1: 'AM巴西子网系统部',
        text2: '',
        text3: '',
        text4: '',
        zb: 5,
        children: [
          {text1: '副部长-解决方案', text2: '待评估/17C', text3: '宗勇', text4: '刚报到', zb: 3},
          {text1: '副部长-交付管理', text2: '19/18A', text3: 'Vinicius', text4: '2019/07/15', zb: 3},
          {text1: '系统部部长',
            text2: '21/20C',
            text3: '卿长春',
            text4: '2019/3/29',
            zb: 11,
            children: [
              {text1: '副部长-销售/SDT', text2: '20/2OC', text3: 'Marcio Costa', text4: '2019/3/29', zb: 11},
              {text1: 'AM(s)',
                text2: '/',
                text3: '5人',
                text4: '3+',
                zb: -3,
                children: [
                  {text1: 'AM', text2: '17/18', text3: 'Marcio Costa', text4: '2018/3/29', zb: -3},
                  {text1: 'AM', text2: '17/18', text3: 'Marcio Costa', text4: '2018/3/29', zb: -3},
                  {text1: 'AM', text2: '17/18', text3: 'Marcio Costa', text4: '2018/3/29', zb: -3},
                  {text1: 'AM', text2: '17/18', text3: 'Marcio Costa', text4: '2018/1/29', zb: 13}
                ]
              },
              {text1: 'SM', text2: '17/17A', text3: '杨胜海', text4: '2019/05/13', zb: 3},
              {text1: 'FM', text2: '18/18A', text3: 'Wagner ', text4: '2019/06/10', zb: 5},
              {text1: 'NPO', text2: '?/?', text3: 'XX', text4: ' ', zb: 13},
              {text1: '系统部CFO', text2: '?/?', text3: '常妙臻 ', text4: ' ', zb: 31}
            ]
          }
        ]
      },
      treeData: []
    }
  },
  watch: {
    treeData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  mounted () {
    this.$axios.get('/api/categories/tree').then(resp => {
      if (resp) {
        let tree = translateDataToTree(resp, '-1')
        console.log('树在这里', tree[0])
        this.treeData = tree[0]
      }
    })
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
    // const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    // sidebarElm.removeEventListener("transitionend", this.sidebarResizeHandler);
  },
  methods: {
    chartLabel (zb) {
      let color = ''
      if (zb === 0) color = '#ffc000'
      // if (zb === 0) color = '#c7000b'
      if (zb === 1) color = '#92d050'
      let obj = {
        label: {
          // formatter: ['{a|%text1%}', '{b|%text2%}', '{c|%text3%}', '{d|%text4%}'].join('\n'),
          formatter: ['{b|%text2%}', '{c|%text3%}'].join('\n'),
          color: '#333',
          fontSize: 12,
          fontFamily: 'Arial',
          verticalAlign: 'middle',
          backgroundColor: 'transparent',
          rich: {
            a: {
              backgroundColor: '#b9cde5',
              width: 100,
              height: 18,
              fontSize: 12,
              color: '#fff',
              borderWidth: 1,
              borderColor: '#385d8a',
              align: 'center'
            },
            b: {
              backgroundColor: color,
              width: 100,
              height: 20,
              fontSize: 12,
              color: '#fff',
              borderWidth: 0,
              borderColor: '#385d8a',
              align: 'center'
            },
            c: {
              backgroundColor: '#b9cde5',
              width: 100,
              height: 20,
              fontSize: 12,
              color: '#fff',
              borderWidth: 0,
              borderColor: '#385d8a',
              align: 'center'
            },
            d: {
              backgroundColor: color,
              width: 100,
              height: 18,
              fontSize: 12,
              color: '#fff',
              borderWidth: 1,
              borderColor: '#385d8a',
              align: 'center'
            }
          }

        }
      }

      return obj
    },
    initChart () {
      let data = this.treeData
      for (let i = 0; i < data.length; i++) {
        console.log(data)
      }
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.treeData)
    },
    // 替换label.formatter里的数据
    format (s, c) {
      return s.replace(/%(\w+)%/g, function (m, p) { return c[p] })
    },
    // 地柜替换数据
    dataBack (data) {
      let obj = {}
      // 例子，可以改
      obj.text1 = data.text1
      obj.text2 = data.text2
      obj.text3 = data.text3
      obj.text4 = data.text4
      let label = this.chartLabel(data.zb).label
      let str = this.format(label.formatter, obj)
      label.formatter = str
      data.label = label

      if (data.children && data.children.length > 0) {
        data.children.map((obj) => {
          this.dataBack(obj)
        })
      }
    },
    setOptions (data) {
      this.dataBack(data)
      console.log(data)
      // 第一层就放一个
      // data.label.formatter = this.format('{a|%text1%}', {text1: data.text1})
      this.chart.setOption({
        // toolbox: {
        //   show : true,
        //   feature : {
        //     mark : {show: true},
        //     dataView : {show: true, readOnly: false},
        //     restore : {show: true},
        //     saveAsImage : {show: true}
        //   }
        // },
        series: [
          {
            width: '100%',
            height: '50%',
            name: '统一授信视图',
            type: 'tree',
            orient: 'TB', // 竖向或水平   TB代表竖向  LR代表水平
            top: '5%',
            left: '0%',
            bottom: '5%',
            initialTreeDepth: 1, // 树图初始展开的层级（深度）
            expandAndCollapse: true, // 点击节点时不收起子节点，default: true
            symbolSize: [118, 50],
            roam: true,
            symbol: 'rect',
            edgeForkPosition: '100%',
            edgeShape: 'polyline',
            itemStyle: {
              color: 'transparent',
              borderWidth: 0
            },
            lineStyle: {
              color: '#D5D5D5',
              width: 1,
              curveness: 0.5 // 线弯曲度
            },
            data: [data]
          }
        ]
      })
    },
    sidebarResizeHandler (e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    }
  }
}

// eslint-disable-next-line no-unused-vars
// 数组生成树
function translateDataToTree (data, parentId) {
  let tree = []
  let temp
  data.forEach((item, index) => {
    if (data[index].parentNodeID === parentId) {
      let obj = data[index]
      temp = translateDataToTree(data, data[index].text1)
      if (temp.length > 0) {
        obj.children = temp
      }
      tree.push(obj)
    }
  })
  return tree
}
</script>
