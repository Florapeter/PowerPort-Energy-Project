<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model.trim="searchParams.name" placeholder="请输入姓名："></el-input>
            </el-col>
            <el-col :span="6">
                <el-select v-model="searchParams.department" placeholder="请选择部门：">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="总裁办" value="总裁办"></el-option>
                    <el-option label="技术部" value="技术部"></el-option>
                    <el-option label="市场部" value="市场部"></el-option>
                    <el-option label="维修部" value="维修部"></el-option>
                    <el-option label="运营部" value="运营部"></el-option>
                    <el-option label="客服部" value="客服部"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="loadData">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-table :data="dataList" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="80px"> </el-table-column>
            <el-table-column prop="account" label="账号"> </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="phone" label="电话"> </el-table-column>
            <el-table-column prop="idNo" label="身份证号"> </el-table-column>
            <el-table-column prop="position" label="职位">
                <template #default="scope">
                    <el-tag type="primary">{{ scope.row.position }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="department" label="部门"> </el-table-column>
            <el-table-column prop="pageAuthority" label="页面权限">
                <template #default="scope">
                    <el-tag type="success">{{ scope.row.pageAuthority }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="btnAuthority" label="按钮权限">
                <template #default="scope">
                    <el-tag type="info">{{ scope.row.btnAuthority }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="280">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="settingAuth(scope.row.pageAuthority,scope.row.account)"> 权限设置 </el-button>
                    <el-button type="danger" size="small"> 删除 </el-button>
                    <el-button type="danger" size="small"> 禁用 </el-button>
                </template>
            </el-table-column>
        </el-table>
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
    </el-card>
    <AuthModel :visible="visible" :checked-keys="checkedKeys" @close="visible=false" :btnAuth="btnAuth" :account="accountNo" @reload="loadData"></AuthModel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHttp } from '@/hooks/useHttp'
import AuthModel from './AuthModel.vue'
import { getAuthApi } from '@/api/system'
import type { MenuItem } from '@/types/user'

interface searchType {
    name: string
    department: string
}
const searchParams = ref<searchType>({
    name: '',
    department: '',
})

const { dataList, loading, loadData, totals, pageInfo, handleCurrentChange, handleSizeChange,resetPagination } =
    useHttp('/permissionList', searchParams)

const visible = ref<boolean>(false)

function collectUrls(tree:MenuItem[]){
    const urls:string[] = []
    function traverse(node:MenuItem){
        if(node.url&&!node.children){
            urls.push(node.url)
        }
        if(node.children){
            node.children.forEach((child:MenuItem)=>traverse(child))
        }
    }
    tree.forEach((node:MenuItem)=>traverse(node))
    return urls
}

const btnAuth = ref<string[]>([])
const checkedKeys = ref<string[]>([])
const accountNo = ref<string>("")
const settingAuth =async (pageAuthority:string,account:string)=>{
    accountNo.value = account
   const {data:{list,btn}} =  await getAuthApi(pageAuthority);
   checkedKeys.value = collectUrls(list)
   visible.value = true
   btnAuth.value = btn
}

const handleReset=()=>{
    searchParams.value={
         name: '',
    department: '',
    }
    resetPagination()
}
</script>

<style scoped lang="less"></style>
