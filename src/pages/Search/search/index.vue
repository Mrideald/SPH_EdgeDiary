<template>
  <div>
    <!-- 商品列表三级分类 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!-- 面包屑，带有x的结构 -->
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键词面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性展示 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的解构-->
              <ul class="sui-nav">
                <!-- 判断排序参数内是否含有1 若是含有1才显示这个样式 -->
                <!-- 等于-1是不包含1，不等于-1是包含1 -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a href="#"
                    >综合<span
                      :class="{
                        'el-icon-top': isAsc,
                        'el-icon-bottom': isDesc,
                      }"
                      v-show="isOne"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a href="#"
                    >价格<span
                      :class="{
                        'el-icon-top': isAsc,
                        'el-icon-bottom': isDesc,
                      }"
                      v-show="isTwo"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <!-- 商品列表 -->
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- fenyeqi -->
          <PaginationSpace
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "SearchContainer",
  data() {
    return {
      searchParams: {
        //一级分类id
        category1Id: "",
        //二级分类id
        category2Id: "",
        //三级分类id
        category3Id: "",
        //分类名字
        categoryName: "",
        //关键字
        keyword: "",
        //排序
        // 参数类型
        //排序方式
        //1: 综合,2: 价格 asc: 升序,desc: 降序
        //示例: "1:desc"
        order: "1:desc",
        //分页器用的：代表的是当前是第几页
        pageNo: 1,
        //代表每一页展示的数据个数
        pageSize: 10,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },

  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters("search", ["goodsList"]),
    // 对象写法
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  //组件挂载之前执行一次【先于mounted之前】
  beforeMount() {
    //复杂的写法 （传递的数据是什么）
    // this.searchParams.category1Id=this.$route.query.category1Id
    // this.searchParams.category2Id=this.$route.query.category2Id
    // this.searchParams.category3Id=this.$route.query.category3Id
    // this.searchParams.categoryName=this.$route.query.categoryName
    // this.searchParams.keyword=this.$route.params.keyword
    //简写
    //再发请求之前把接口需要的参数进行整理（在给服务器发请求之前把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  //组件挂载完毕执行一次（仅仅执行一次）
  mounted() {
    //在发请求之前带给服务器参数【searchParams参数发生变化有数值带给服务器】，然后服务器给你准备数据然后展示
    this.getData();
  },
  methods: {
    //向服务器发请求获取search模块数据（根据"参数不同"返回不同的数据进行展示）
    //把这次请求封装成一个函数，当你需要的时候调用
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    removeCategroyName() {
      //把带给服务器的参数置空了还要给服务器再次发请求
      //带给服务器的参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是把相应的字段变为undefined就不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //地址栏也需要需改：进行路由跳转(现在的路由跳转只是跳转到自己这里)
      //严谨：本意是删除query，如果路径当中出现params不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
    },
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //收集平台属性地方回调函数
    attrInfo(attr, attrValue) {
      //["属性ID：属性值：属性名"]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //跳转
      //加个判断，不然会重复进入props
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      this.getData();
    },
    //removeAttr删除售卖的属性
    removeAttr() {
      //再次整理参数
      this.searchParams.props = this.searchParams.props.filter(() => {
        return (this.attrValue = !this.attrValue); //过滤条件
      });
      //再次发请求
      this.getData();
    },
    //排序升序降序业务
    changeOrder(flag) {
      //flag形参，他是一个标记，代表用户点击的是综合（1），价格（2）
      let originOrder = this.searchParams.order;
      //获取一些初始状态
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      //准备一个新的order
      let newOrder = "";
      //如果点击的是综合
      if (flag == originOrder) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      }
      //如果点击的是价格
      else {
        newOrder = `${flag}:${originSort == "desc" ? "asc" : "desc"}`;
      }
      //将新的order赋予searchparams
      this.searchParams.order = newOrder;
      //再次发请求
      this.getData();
    },
    //自定义事件获取当前页
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  watch: {
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route: {
      //每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3
      //再次发请求之前整理带给服务器参数
      deep: true,
      handler(newValue, oldValue) {
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        //再次发起ajax请求
        this.getData();
        //分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会给他赋予新的数据
        //下一次发请求时重置categoryid数据
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        console.log(this.searchParams.category3Id);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
