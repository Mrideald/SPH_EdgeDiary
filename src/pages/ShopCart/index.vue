<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updataChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <!-- 因为input输入的是字符串，这边乘以1将它隐式转换成number类型 -->
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked&&cartInfoList.length>0"
          @change="allCheckedCart($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ allIsChecked }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "/node_modules/lodash/throttle";
export default {
  name: "ShopCart",

  mounted() {
    this.getData();
  },
  methods: {
    //获取购物车个人数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    //修改某一个产品的个数
    handler: throttle(async function (type, disNum, cart) {
      //type:为了区分这三种元素
      //disNum形参：+变化量(1) -变化量(-1) input最终的个数(并不是变化量)
      //cart：哪一个产品[身上有id]
      switch (type) {
        case "add":
          //带给服务器变化的量
          disNum = 1;
          break;
        case "minus":
          //判断产品的个数是否大于1
          //如果出现产品个数小于等于1，那么传递给服务器的数据原封不动
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        //如果输入的字符带给服务器是非法的
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            //disNum是变化量,带给服务器的数字应该是输入的数字减去原来的数字
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
        //也可以简化的，但为了方便读代码
        //disNum=isNaN(disNum)||disNum<1? 0:parseInt(disNum)-cart.skuNum
      }
      //派发action
      try {
        //代表数据修改成功，向服务器发请求更新数据
        await this.$store.dispatch("AddOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        //更新数据
        this.getData();
      } catch (error) {
        console.error(error);
      }
    }, 1500),

    //删除产品
    async deleteCart(cart) {
      try {
        //如果删除成功再次发请求
        await this.$store.dispatch("deleteCart", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //切换商品的选中状态
    async updataChecked(cart, event) {
      try {
        let check = event.target.checked ? "1" : "0";
        await this.$store.dispatch("checkCart", {
          skuId: cart.skuId,
          isChecked: check,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除选中所有商品
    async deleteAllCheckedCart(){
       try {
       await  this.$store.dispatch("deleteAllCheckedCart")
       this.getData()
       } catch (error) {
         alert(error.message)
       }
    },
    //全选所有商品
   async  allCheckedCart(event){
      try {
      let isChecked=event.target.checked? "1":"0"
       await this.$store.dispatch("allCheckedCart",isChecked)
       this.getData()
      } catch (error) {
          alert(error.message)
      }
    }

  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //计算总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    //计算选择产品总数
    allIsChecked() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.isChecked;
      });
      return sum;
    },
     //判断底部复选框是否勾选【全选产品都选中，才勾选】
  isAllChecked() {
    //array.every(()=>{}) 返回一个布尔值
    //如果ischecked全是1的话就会返回true 有一个不是一的话就会返回false
    return this.cartInfoList.every(item=>
      item.isChecked == 1
    );
  },
  },

};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
