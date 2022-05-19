//home区
import {reqCategoryList} from '/src/api/index'
const actions={
async categroyList(context){
  const result =await reqCategoryList();
  if(result.code==200){
  context.commit('CATEGROYLIST',result.data)
  }
 }
}
const mutations={
    CATEGROYLIST(state,categroyList){
    state.categroyList=categroyList,
    //这边只需16个，数组里面多了个东西，用pop弹出去
    categroyList=categroyList.pop()
    }
}
const state={
    categroyList:[]
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