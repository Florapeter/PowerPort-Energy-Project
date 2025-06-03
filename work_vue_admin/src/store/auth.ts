import { defineStore } from 'pinia'
import { loginApi } from '@/api/user'

interface LoginParams {
    username: string
    password: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        //token相当于令牌，用于每个页面的身份验证，需要存储在后台pinia
        token: sessionStorage.getItem('token') || '',
        //roles用于权限控制
        roles: sessionStorage.getItem('roles') ? JSON.parse(sessionStorage.getItem('roles')!) : [],
        username: sessionStorage.getItem('username') || '',
        menu: sessionStorage.getItem('menu') ? JSON.parse(sessionStorage.getItem('menu')!) : [],
    }),
    //action用于修改数据
    actions: {
        async login(data: LoginParams) {
            try {
                const {
                    data: {
                        token,
                        user: { username, roles },
                        menulist,
                    },
                } = await loginApi(data)
                this.token = token
                this.roles = roles
                this.username = username
                this.menu = menulist
                //本地只能存基本数据类型，不能存数组类型，需要通过JSON.stringify转为字符串
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('roles', JSON.stringify(roles))
                sessionStorage.setItem('username', username)
                sessionStorage.setItem('menu', JSON.stringify(menulist))
            } catch (error: any) {}
        },
        logout() {
            this.token=""
            this.roles=[]
            this.username=""
            this.menu = []
            sessionStorage.clear()
        },
    },
})
