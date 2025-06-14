![image](https://github.com/user-attachments/assets/6f3c0821-d6a6-44c1-b89a-85877f69289e)# PowerPort-Energy-Project
动力汇谷能源管理综合平台
·项目介绍：动力港能源管理平台是基于公司充电能源业务，根据数据可视化的基本组成和数据特点，设计多个模块进行可视化展示功能以及相关数据的管理功能，便于公司对能源设备进行集中管理和监测。
·项目技术栈：Vue3 + Vue-Router + Pinia + Vite + Element-Plus + Echarts + 高德地图api + TinyMCE
·实现axios的二次封装，拦截器的封装，api接口的统一封装
·使用Echarts并封装了自定义组合式函数useCharts进行不同图表数据可视化渲染（能源统计、设备总览等）
·根据业务需求特点自主封装useTable和usePagination进行页面快捷开发
·使用递归动态渲染菜单导航，同时封装页签快捷导航组件，结合pinia存储实现与菜单路由联动
·使用高德地图api渲染地图并实现地图打点标记和信息窗体功能
·基于element plus组件进行二次封装，结合业务场景封装分步表单组件
·动态角色权限分配，并结合递归闭包处理权限菜单；同时，封装自定义指令实现按钮级权限控制
