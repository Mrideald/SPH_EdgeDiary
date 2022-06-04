import { reqGetSearchInfo } from "/src/api/index";
//Search区
const actions = {
  async getSearchList(context, params = {}) {
    //当reqGetSearchInfo函数在获取服务器数据时至少要传一个参数（空对象）
    //params形参：当用户派发action的时候第二个参数传过来的，至少是一个空对象
    const result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      context.commit("GETSEARCHLIST", result.data);
    }
  },
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const state = {
  searchList: [],
};
//项目当中getters主要作用是：简化仓库中的数据（简化数据而生）
//可以把我们将来要在组件中要使用的数据简化一下，将来用的时候就会很方便
const getters = {
  //如果服务器数据回来了没问题就是一个数组
  //但是如果有网络问题，或者没网，那么这边返回的数据应该是undefined
  //计算新的属性的属性值至少给人家来一个数组
  goodsList(state){
    return state.searchList.goodsList||[]
  },
  attrsList(state){
    return state.searchList.attrsList||[]
  },
  trademarkList(state){
    return state.searchList.trademarkList||[]
  }
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
