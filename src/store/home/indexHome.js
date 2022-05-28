//home区
//引入请求
import {reqCategoryList} from '/src/api/index'
import { reqBannerList } from '/src/api/index';
import {reqFloorList} from '/src/api/index'
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
 },
 async floorList(context){
  const result =await reqFloorList()
  if(result.code==200){
      context.commit('FLOORLIST',result.data)
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
    },
    FLOORLIST(state,floorList){
     state.floorList=floorList
    }
}
const state={
    categroyList:[],
    //轮播图数据
    bannerList:[],
    //楼层数据
    floorList:[]
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