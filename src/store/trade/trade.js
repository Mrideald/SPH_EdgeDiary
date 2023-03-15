import { reqAddressInfo, reqOrderInfo } from "@/api/index";

//maximum call stack size exceeded错误
const actions = {
  //获取用户地址信息
  async getAddressInfo(context) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      context.commit("GETADDRESSINFO", result.data);
    }
  },
  //获取商品页信息
  async getOrderInfo(context) {
    let result = await reqOrderInfo();
    if (result.code == 200) {
      context.commit("GETORDERINFO", result.data);
    }
  },
};
//因为我没写state出现了栈满错误  记下来！！！
const mutations = {
  GETADDRESSINFO(state,address) {
    state.address = address;
  },
  GETORDERINFO(state,orderInfo) {
    state.orderInfo = orderInfo;
  },
};

const state = {
  address: [],
  orderInfo: {},
};

const getters = {};

export default {
  actions,
  mutations,
  state,
  getters,
};
