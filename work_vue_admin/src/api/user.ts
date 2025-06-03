import { post } from "@/utils/http";

enum API{
    LOGIN_URL = '/login'
}

interface LoginParams{
    username:string,
    password:string
}

function loginApi(data:LoginParams):Promise<any>{
    return post(API.LOGIN_URL,data)
}

export{loginApi}