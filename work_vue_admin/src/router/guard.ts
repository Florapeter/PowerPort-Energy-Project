//导航守卫要记得在main.ts中引用
import router from "./index";
import { useUserStore } from "@/store/auth";
//导航前置守卫(既然是全局导航守卫，肯定要挂载到main.ts里的)
router.beforeEach((to)=>{
    const userStore = useUserStore();
    const isLogin = userStore.token;
    if(!isLogin){
        //未登录
        if(to.path!=="/login"){
            return {path:'/login'}
        }
    }else{
        //登录
        if(to.path==='/login'){
            return{path:'/'}
        }

        //首先你得保证你有needAuth属性，然后我的权限数组中有没有你对应的那个权限，也就是我的权限数组中包不包含你对应的权限属性
        if(to.meta?.needAuth && !userStore.roles.some((role:string)=>(to.meta.needAuth as string[]).includes(role))){
            return {path:'/'}
        }
    }
})