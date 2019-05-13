<template>
  <div :style="{width:width,height:height}" :ref="id"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'PieEcharts',
  props: {
    id: {
      type: String,
      default: 'echarts'
    },
    width: {
      type: String,
      default: '90%'
    },
    height: {
      type: String,
      default: '90%'
    },
    dataArr: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    legendData () {
      return this.dataArr.map(item => {
        return item.name
      })
    }
  },
  watch: {
    dataArr: {
      handler (newValue, oldValue) {
        this.dataArr = newValue
        this.drawEcharts()
      },
      deep: true
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.$nextTick(() => {
      this.drawEcharts()
    })
  },
  methods: {
    drawEcharts () {
      let myEchart = echarts.init(this.$refs[this.id])
      myEchart.setOption({
        // title: {
        //   text: '饼图纹理',
        //   textStyle: {
        //     color: '#235894'
        //   }
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 'top',
          data: this.legendData
        },
        series: [{
          name: '笔记数量',
          type: 'pie',
          selectedMode: 'single',
          selectedOffset: 10,
          clockwise: true,
          label: {
            normal: {
              textStyle: {
                fontSize: 18,
                color: '#235894'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: '#235894'
              }
            }
          },
          data: this.dataArr
        }]
      })
    }
  }
}
</script>
