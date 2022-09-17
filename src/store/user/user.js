import { reqGetCode, reqUserRegister, reqUserLogin } from "/src/api/index";

//登录和注册
const actions = {
  //获取验证码这个接口，把验证码返回，但正常情况是发到用户手机上面，这边是为了省钱
  async getCode(context, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      context.commit("GETCODE", result.data);
      return "ok";
    } else {
      Promise.reject(new Error("faile"));
    }
  },
  //用户注册
  async getUserRegister(context, user) {
    //这里有错误，一直显示参数格式不对
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("注册参数错误"));
    }
  },
  //用户登录 服务器返回不了东西
  async userLogin(context, user) {
    let result = await reqUserLogin(user);
    if(result.code==200){
      console.log("用户登录这请求成功了")
    }else{
      Promise.reject(new Error('用户登录这服务器有问题，返回不了token'))
    }
  },
};

const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
};
const state = {
  code: "",
};
const getters = {};
export default {
  actions,
  mutations,
  state,
  getters,
};
