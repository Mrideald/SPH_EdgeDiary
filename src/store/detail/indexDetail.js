import {
  reqGoodsInfo,
  reqAddOrUpdateShopCart,
} from "/src/api/index";
import {getUUID} from '/src/utils/uuid_token'
const actions = {
  async getGoodInfo(context, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      context.commit("GETGOODINFO", result.data);
    }
  },
  async AddOrUpdateShopCart(context, { skuId, skuNum }) {
    //加入购物车返回的解构
    //加入购物车以后（发请求），前台将参数带给服务器
    //服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
    //因为服务器没有返回其余的数据，因此咱们不需要三连环存储数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    //代表服务器写入数据成功
    if (result.code == 200) {
      return "ok";
    } else {
      //代表加入购物车失败,返回一个错误
      return Promise.reject(new Error("faile"));
    }
  },
};

const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const state = {
  goodInfo: {},
  uuid_token:getUUID()
};
const getters = {
  //简化产品信息的数据
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  //产品售卖属性的简化
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
};
export default {
  //问题 这边一写命名空间就报错
  actions,
  mutations,
  state,
  getters,
};
