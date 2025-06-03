<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round mr">
                            <el-icon><Document /></el-icon>
                        </div>
                        <h4>今日总收入（元）</h4>
                    </div>
                    <div class="total mt">
                        <h1 class="mr">{{ thousandSeparator(239824) }}</h1>
                        <div class="percent" style="color: green">-21%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon><Document /></el-icon>
                        </div>
                        <h4>本月总收入（万元）</h4>
                    </div>
                    <div class="total mt">
                        <h1 class="mr">{{ thousandSeparator(2924) }}</h1>
                        <div class="percent" style="color: green">-7%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round mr">
                            <el-icon><Document /></el-icon>
                        </div>
                        <h4>会员卡储值金额（元）</h4>
                    </div>
                    <div class="total mt">
                        <h1 class="mr">{{ thousandSeparator(1339824) }}</h1>
                        <div class="percent" style="color: green">-21%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round mr">
                            <el-icon><Document /></el-icon>
                        </div>
                        <h4>服务费总金额（元）</h4>
                    </div>
                    <div class="total mt">
                        <h1 class="mr">{{ thousandSeparator(336824) }}</h1>
                        <div class="percent" style="color: green">-19%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round mr">
                            <el-icon><Document /></el-icon>
                        </div>
                        <h4>停车费总金额（元）</h4>
                    </div>
                    <div class="total mt">
                        <h1 class="mr">{{ thousandSeparator(119824) }}</h1>
                        <div class="percent" style="color: green">-34%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round mr">
                            <el-icon><Document /></el-icon>
                        </div>
                        <h4>电费总金额（元）</h4>
                    </div>
                    <div class="total mt">
                        <h1 class="mr">{{ thousandSeparator(2239824) }}</h1>
                        <div class="percent">-19%</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-card class="mt">
            <div ref="chartRef" style="width: 100%; height: 300px"></div>
        </el-card>
        <el-card class="mt">
            <el-input v-model="name" style="max-width: 400px" placeholder="请输入站点名称">
                <template #append> 
                    <el-button icon="Search" @click="loadData"></el-button>
                </template>
            </el-input>
            <el-table :data="tableData" style="width: 100%" v-loading="Loading">
                <el-table-column type="index" label="序号" width="80px"></el-table-column>
                <el-table-column label="充电站名称" prop="name"></el-table-column>
                <el-table-column label="充电站ID" prop="id"></el-table-column>
                <el-table-column label="所属城市" prop="city"></el-table-column>
                <el-table-column label="充电桩总量(个)" prop="count"></el-table-column>
                <el-table-column label="单日总收入(元)" prop="day" sortable>
                    <!-- scope.row 代表当前表格行的数据对象 -->
                    <template #default="scope">
                        <span>{{ scope.row.day }}</span>
                        <el-tag :type="scope.row.percent > 0 ? 'danger' : 'success'" class="ml">
                            {{
                                scope.row.percent > 0
                                    ? '+' + scope.row.percent + '%'
                                    : scope.row.percent + '%'
                            }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="年度总收入(万元)" prop="month">
                    <template #default="scope">
                        <span>{{ scope.row.month }}</span>
                        <el-tag :type="scope.row.mpercent > 0 ? 'danger' : 'success'" class="ml">
                            {{
                                scope.row.mpercent > 0
                                    ? '+' + scope.row.mpercent + '%'
                                    : scope.row.mpercent + '%'
                            }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="电费营收(元)" prop="electricity"></el-table-column>
                <el-table-column label="停车费营收(元)" prop="parkingFee"></el-table-column>
                <el-table-column label="服务费营收(元)" prop="serviceFee"></el-table-column>
                <el-table-column label="会员储值金(元)" prop="member"></el-table-column>
            </el-table>
        </el-card>
        <el-pagination
            class="mt fr mb"
            v-model:current-page="pageInfo.page"
            v-model:page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="sizes, prev, pager, next, jumper,total "
            :total="totals"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
        />
    </div>
</template>

<script setup lang="ts">
import thousandSeparator from '@/utils/toThousands'
import { chartApi, revenueApi } from '@/api/chargingstation'
import { useChart } from '@/hooks/useChart'
import { usePagination } from '@/hooks/usePagination'
import { ref, reactive, onMounted } from 'vue'

const chartRef = ref(null)

const setChartData = async () => {
    const chartOptions = reactive({
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: [],
        },
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
        },
        yAxis: [
            {
                type: 'value',
                name: '销售',
                position: 'left',
            },
            {
                type: 'value',
                name: '访问量',
                position: 'right',
            },
        ],
        series: [
            {
                name: '',
                type: 'bar',
                data: [],
                yAxisIndex: 0,
                itemStyle: {
                    color: '#409eff',
                },
            },
            {
                name: '',
                type: 'line',
                data: [],
                yAxisIndex: 1,
                itemStyle: {
                    color: '#409eff',
                },
                smooth: true,
            },
        ],
    })
    //从接口获取数据
    const res = await chartApi()
    //对图表内的数据进行渲染
    chartOptions.legend.data = res.data.list.map((item: any) => item.name)
    for (let i = 0; i < res.data.list.length; i++) {
        chartOptions.series[i].name = res.data.list[i].name
        chartOptions.series[i].data = res.data.list[i].data
    }
    //返回渲染后的图表配置
    return chartOptions
}
useChart(chartRef, setChartData)

const name = ref<string>('')
const tableData = ref([])
const Loading = ref<boolean>(false)
const loadData = async () => {
    Loading.value = true
    const {
        data: { list, total },
    } = await revenueApi({ ...pageInfo, name: name.value })
    setTotals(total)
    Loading.value = false
    tableData.value = list
    tableData.value = list.map((item: any) => ({
        ...item,
        day: item.electricity + item.parkingFee + item.serviceFee + item.member,
    }))
}
const { totals, pageInfo, handleSizeChange, handleCurrentChange, setTotals } =
    usePagination(loadData)
onMounted(() => {
    loadData()
})
</script>

<style scoped lang="less">
.title {
    display: flex;
    align-items: center;
    .round {
        width: 30px;
        height: 30px;
        //背景圆形设置
        border-radius: 50%;
        background-color: rgb(235, 236, 245);
        //居中设置
        text-align: center;
        line-height: 30px;
        margin-right: 20px;
    }
    h4 {
        color: #666;
    }
}
.total {
    display: flex;
    align-items: center;
    h1 {
        font-size: 30px;
    }
    .percent {
        display: inline-block;
        padding: 3px 5px;
        height: 20px;
        font-size: 12px;
        background-color: rgb(235, 247, 239);
        border-radius: 2px;
        color: green;
        line-height: 20px;
    }
}
</style>
