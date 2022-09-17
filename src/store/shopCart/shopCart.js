import { reqGetCartList ,reqDeleteCart,reqCheckCart} from "/src/api/index";
const actions = {
  async getCartList(context) {
    let result = await reqGetCartList();
    if (result.code == 200) {
      context.commit("GETCARTLIST", result.data);
    }
  },
  async deleteCart(context,skuId){
     let result=await reqDeleteCart(skuId);
     if(result.code==200){
      return "ok"
     }else{
      return Promise.reject(new Error('faile'))
     }
  },
  async checkCart(context,{skuId,isChecked}){
  let result =await reqCheckCart(skuId,isChecked)
  if(result.code==200){
    return "ok";
  }else{
    return Promise.reject(new Error('faile'))
  }
  },
  //删除选中所有商品,调用上面的方法
  deleteAllCheckedCart(context){
    let promiseAll=[]
   context.getters.cartList.cartInfoList.forEach(item=>{
    let promiseCart=item.isChecked==1? context.dispatch("deleteCart",item.skuId):''
    promiseAll.push(promiseCart)
   })
    return Promise.all(promiseAll)
  },
  //全选所有商品，调用上面的方法
  allCheckedCart(context,isChecked){
    let promiseAll=[];
    context.getters.cartList.cartInfoList.forEach(item=>{
      let promise=context.dispatch("checkCart",{skuId:item.skuId,isChecked})
      promiseAll.push(promise)
    })
    return  Promise.all(promiseAll)
  }
};

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const state = {
  cartList: {},
};
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    }
};
export default {
  //问题 这边一写命名空间就报错
  actions,
  mutations,
  state,
  getters,
};
