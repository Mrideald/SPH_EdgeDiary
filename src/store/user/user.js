import { reqGetCode, reqUserRegister, reqUserLogin,reqGetUserInfo,reqLogout } from "/src/api/index";
import {setToken,getToken,removeToken} from '@/utils/token'

//登录和注册
const actions = {
  //获取验证码这个接口，把验证码返回，但正常情况是发到用户手机上面，这边是为了省钱
  async getCode(context, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      context.commit("GETCODE", result.data);
      return 100;
    } else {
      Promise.reject(new Error("faile"));
    }
  },
  //用户注册
  async getUserRegister(context, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //用户登录
  async userLogin(context, user) {
    let result = await reqUserLogin(user);
    if(result.code==200){
      setToken(result.data.token)
      context.commit("USERLOGIN",result.data.token)
    }else{
      Promise.reject(new Error('faile'))
    }
  },
  //获取用户信息
  async getUserInfo(context){
    let result =await reqGetUserInfo();
    if(result.code==200){
      context.commit("GETUSERINFO",result.data)
      return "ok"
    }
  },
  //退出登录
  async logOutInfo(context){
    let result=await reqLogout()
    if(result.code===200){
      context.commit('LOGOUT')
      return "ok"
    }else{
      Promise.reject(new Error('faile'))
    }
  }
};

const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state,token){
    state.token=token
  },
  GETUSERINFO(state,userInfo){
    state.userInfo=userInfo
  },
  LOGOUT(state){
    state.token="",
    state.userInfo={},
    removeToken()
  }
};
const state = {
  code: "",
  token:getToken(),
  userInfo:{}
};
const getters = {};
export default {
  actions,
  mutations,
  state,
  getters,
};
