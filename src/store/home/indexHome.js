//home区
//引入请求
import {reqCategoryList} from '/src/api/index'
import { reqBannerList } from '/src/api/index';
const actions={
async categroyList(context){
  const result =await reqCategoryList();
  if(result.code==200){
  context.commit('CATEGROYLIST',result.data)
  }
 },
 async getBannerList(context){
    const result=await reqBannerList();
    if(result.code==200){
    context.commit('BANNERLIST',result.data)
    }
 }
}
const mutations={
    CATEGROYLIST(state,categroyList){
    state.categroyList=categroyList,
    //这边只需16个，数组里面多了个东西，用pop弹出去
    categroyList=categroyList.pop()
    },
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList
    }
}
const state={
    categroyList:[],
    //轮播图数据
    bannerList:[]
}
const getters={

}
export default{
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}