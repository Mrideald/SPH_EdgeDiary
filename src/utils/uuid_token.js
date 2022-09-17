import { v4 as uuidv4 } from 'uuid';
export const getUUID=()=>{
    //先从本地存储获取uuid()看看里面是否有uuid
    let uuid_token=localStorage.getItem('UUIDTOKEN')
    //如果没有
    if(!uuid_token){
        //生成游客身份
       uuid_token=uuidv4();
       //本次存储一次
       localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    return uuid_token;
}