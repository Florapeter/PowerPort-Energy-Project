import {get} from "@/utils/http"

enum API{
    ChartData="/chartData",
    ChartData2 = "/chartData2",
    ChartData3 = "/chartData3",
    ChartData4 = "/chartData4",

}

function chartDataApi(){
    return get(API.ChartData)
}
function chartDataApi2(){
    return get(API.ChartData2)
}
function chartDataApi3(){
    return get(API.ChartData3)
}
function chartDataApi4(){
    return get(API.ChartData4)
}

export {chartDataApi,chartDataApi2,chartDataApi3,chartDataApi4}