<template>
<div class="bg">
    <div class="login">
        <div class="logo">
            <img :src="logo" alt="" width="70px" height="70px">
            <h1 class="ml">动力港能源管理平台</h1>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="formRef">
            <el-form-item label="" prop="username">
                <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="Lock" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" style="width:100%" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script setup lang='ts'>
import logo from '@/assets/logo.png'
import { reactive,ref } from 'vue';
import type { FormRules,FormInstance } from 'element-plus';
import { useUserStore } from '@/store/auth';
import { useRouter } from 'vue-router';
//获取表单组件
let formRef = ref<FormInstance>()
//定义表单数据的泛型
interface RuleForm{
    username:string,
    password:string
}
//定义表单数据
const ruleForm:RuleForm = reactive({
    username:'',
    password:''
})
//定义表单数据的校验规则
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 4, max: 8, message: '用户名要求4-8位数字字母组合', trigger: 'blur' },
  ],
  password:[
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
        // pattern:/^(?=.*[a-zA-Z]).{1,9}$/,message: '密码至少包含字母，1-9位'
        // **pattern**: 正则表达式，用于验证输入。
        // pattern:/^\d{6}$/,message: '密码必须是6位纯数字',trigger:'blur'
    }
  ]})
const userStore = useUserStore()
const router = useRouter()
//定义登录函数的校验
const handleLogin = () =>{
    formRef.value?.validate(
        async(valid:boolean)=>{
        if(valid){
            //校验通过
           await userStore.login(ruleForm);
            router.push('/')
        }
    })
}
</script>

<style scoped lang='less'>
.bg{
    background-image:url("../assets/bg.png") ;
    // 全屏
    background-size: cover;
    // 位置位于中心
    background-position:center;
    background-repeat: no-repeat;
    height: 100vh;
    .login{ 
        width: 380px;
        height: 250px;
        padding: 50px;
        box-shadow: 0 0 10px 10px #f4f4f4;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -200px;
        left: 10%;
        .logo{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        h1{
            color: rgb(14, 53, 148);
        }
    }
    }
}
</style>