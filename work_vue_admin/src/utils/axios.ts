import axios, {
    type AxiosInstance,
    type InternalAxiosRequestConfig,
    type AxiosError,
    type AxiosResponse,
} from 'axios'
import { ElNotification } from 'element-plus'

const service: AxiosInstance = axios.create({
    //最基本的配置项:基础路径
    baseURL: 'https://www.demo.com',
    // baseURL:import.meta.env.VITE_API_URL
    //timeout：请求超时时间
    timeout: 5000,
})

//每次请求前都要做的一个事（请求拦截器）
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config
    },
    (error: AxiosError) => {
        ElNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
        })
        return Promise.reject(error)
        //把错误信息给它抛出去
    }
)

//每一个数据回来都要做一个什么处理（响应拦截器）
service.interceptors.response.use(
    (response: AxiosResponse) => {
        //统一处理返回过来的数据，返回response.data
        //只要状态码不是200，就返回response.data.message
        if (response.data.code != 200) {
            ElNotification({
                title: 'Error',
                message: response.data.message,
                type: 'error',
            })
        } else {
            return response.data
        }
    },
    (error: AxiosError) => {
        //下面的是物理拦截，只有连接中断，啥信息也不能返回时，才会走下面这步
        ElNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
        })
        return Promise.reject(error)
        //把错误信息给它抛出去
    }
)

export default service
