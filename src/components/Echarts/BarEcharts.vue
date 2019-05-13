<template>
  <div :style="{width:width,height:height}" :ref="id"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'BarEcharts',
  props: {
    id: {
      type: String,
      default: 'echarts'
    },
    width: {
      type: String,
      default: '95%'
    },
    height: {
      type: String,
      default: '95%'
    },
    dataArr: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    xAxisData () {
      return this.dataArr.map(item => {
        return item.name
      })
    },
    seriesData () {
      return this.dataArr.map(item => {
        return item.value
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
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '笔记数量',
            type: 'bar',
            barWidth: '50',
            data: this.seriesData
          }
        ]
      })
    }
  }
}
</script>
