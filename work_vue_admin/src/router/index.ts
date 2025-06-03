import { createRouter,createWebHistory } from "vue-router";
import routes from "./basicRouteMap";
//RouteRecordRaw是路由对象对应的泛型

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router
//将创建好的router导出，并在main.ts中引用