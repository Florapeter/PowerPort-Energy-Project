<template>
    <el-container>
        <el-aside width="200px">
            <Menu></Menu>
        </el-aside>
        <el-container>
            <el-header>
                <TopHeader></TopHeader>
            </el-header>
            <el-main>
                <TabsLayout></TabsLayout>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Menu from '@/components/navMenu/Menu.vue'
import TopHeader from '@/components/TopHeader/TopHeader.vue'
import TabsLayout from './TabsLayout.vue'
</script>

<style scoped lang="less">
.el-aside {
    height: 100vh;
    background-color: white;
    box-shadow: 10px 0 8px -2px rgba(0, 0, 0, 0.2);
}
.el-header {
    // !important优先级更高，把之前的给覆盖掉
    padding: 0px !important;
}
.el-main {
    height: 80vh;
    //超出的部分以滚动条的形式展示
    overflow: auto;
}
</style>
