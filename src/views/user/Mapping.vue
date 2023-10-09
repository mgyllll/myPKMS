<template>
    <div id="mywordcloud" :style="{width: '100%', height: '661px'}" :data="worddata"></div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'
export default {
  name: 'VueWordCloud',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      worddata: [
        {name: '辣妈', value: 190},
        {name: '妈妈手', value: 190},
        {name: '尿失禁', value: 50},
        {name: '宫缩', value: 180},
        {name: '子宫脱垂', value: 170},
        {name: '剖腹产', value: 180},
        {name: '高血压', value: 175},
        {name: '乙肝妈妈', value: 155},
        {name: '月子餐', value: 210},
        {name: '月子饮食', value: 195},
        {name: '手机辐射', value: 500},
        {name: '子宫恢复', value: 20},
        {name: '恶露', value: 60},
        {name: '润肤乳', value: 320},
        {name: '润肤霜', value: 167},
        {name: '涂抹型药膏', value: 99},
        {name: '过敏性疾病', value: 111},
        {name: '开奶催奶', value: 22},
        {name: '堵奶', value: 123},
        {name: '乳汁淤积', value: 135},
        {name: '哺乳期', value: 135},
        {name: '抑郁', value: 165},
        {name: '坐月子', value: 215},
        {name: '大宝二宝', value: 220},
        {name: '二胎宝宝', value: 500},
        {
          name: '湿疹',
          value: 15000
        },
        {
          name: '脐带护理',
          value: 6000
        },
        {
          name: '睡反觉',
          value: 9386
        },
        {
          name: '睡觉翻白眼',
          value: 7500
        },
        {
          name: '脐带发炎',
          value: 7500
        },
        {
          name: '新生儿破伤风',
          value: 6500
        },
        {
          name: '脐带脱落',
          value: 6500
        },
        {
          name: '抚触',
          value: 6000
        },
        {
          name: '囟门',
          value: 4500
        },
        {
          name: '胎便',
          value: 3800
        },
        {
          name: '黄疸',
          value: 3000
        },
        {
          name: '感冒发烧',
          value: 2500
        },
        {
          name: '肺炎',
          value: 2300
        },
        {
          name: '打喷嚏',
          value: 2000
        },
        {
          name: '中耳炎',
          value: 1900
        },
        {
          name: '幼儿急疹',
          value: 1800
        },
        {
          name: '酒精降温',
          value: 1700
        },
        {
          name: '肠绞痛',
          value: 1000
        },
        {
          name: '英式带娃',
          value: 1500
        },
        {
          name: '大脑发育',
          value: 1200
        },
        {
          name: '感官刺激',
          value: 1100
        },
        {
          name: '运动健将',
          value: 500
        },
        {
          name: '领养婴儿',
          value: 800
        },
        {
          name: '病理性哭泣',
          value: 700
        }
      ]
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById('mywordcloud'))
      console.log('lll')
      const option = {
        title: {
          text: '',
          x: 'center'
        },
        backgroundColor: '#fff',
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: 'wordCloud',
            // 用来调整词之间的距离
            gridSize: 10,
            // 用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [30, 100],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            // 用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            // 随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              normal: {
                color: function () {
                  return (
                    'rgb(' +
                    Math.round(Math.random() * 255) +
                    ', ' +
                    Math.round(Math.random() * 255) +
                    ', ' +
                    Math.round(Math.random() * 255) +
                    ')'
                  )
                }
              }
            },
            // 位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '200%',
            height: '200%',
            // 数据
            data: this.worddata
          }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
