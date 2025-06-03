import type { Ref } from "vue";
import {onBeforeMount, onMounted, ref,markRaw} from 'vue'
import * as echarts from 'echarts';

export function useChart(chartRef:Ref<HTMLElement|null>,setChartData:any){
    const chartInstance = ref<echarts.ECharts|null>(null)
    // const chartOptions = ref(initialOptions)

    const initChart=async()=>{
        if(chartRef.value){
            // 基于准备好的ref，初始化echarts实例
            // var myChart = echarts.init();
            // 传入一个ref实例
            chartInstance.value =markRaw(echarts.init(chartRef.value))
            const options = await setChartData()
            //传入设置好的图表的配置
            chartInstance.value.setOption(options)
        }
    }

    const resizeChart=()=>{
        chartInstance.value?.resize()
    }

    onMounted(()=>{
        initChart()
        window.addEventListener('resize',resizeChart)
    })

    onBeforeMount(()=>{
        window.removeEventListener('resize',resizeChart)
        if(chartInstance.value){
            chartInstance.value.dispose()
        }
    })
}
