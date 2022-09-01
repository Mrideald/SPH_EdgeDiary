import { reqGoodsInfo } from "/src/api/index";
const actions={
 async getGoodInfo(context,skuId){
    let result =await reqGoodsInfo(skuId)
    if(result.code==200){
        context.commit("GETGOODINFO",result.data)
    }
 }
}

const mutations={
    GETGOODINFO(state,goodInfo){
  state.goodInfo=goodInfo
    }
}
const state={
    goodInfo:{}
}
const getters={
    categoryView(){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(){
        return state.goodInfo.skuInfo||{}
    }
}
export default {
    //问题 这边一写命名空间就报错
    actions,
    mutations,
    state,
    getters,
  };
