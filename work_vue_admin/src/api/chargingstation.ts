import type { RowType } from "@/types/station";
import { post,get } from "@/utils/http";

interface ListType{
    page:number,
    pageSize:number,
    name?:string,
    id?:string,
    status:number
}

interface RevenueType{
    page:number,
    pageSize:number,
    name:string
}

enum API{
    List = '/stationList',
    Edit = '/station/edit',
    Delete = '/station/delete',
    RevenueChart='/revenueChart',
    Revenue='/revenueList',
    CurrentList = '/currentList'
}

function listApi(data:ListType){
    return post(API.List,data)
}
function editApi(data:RowType){
    return post(API.Edit,data)
}
function deleteApi(id:string){
    return post(API.Delete,{id})
}
function chartApi(){
    return get(API.RevenueChart)
}
function revenueApi(data: RevenueType){
    return post(API.Revenue,data)
}
function currentListApi(){
    return post(API.CurrentList)
}

export {listApi,editApi,deleteApi,chartApi,revenueApi,currentListApi}