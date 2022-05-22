<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="goEnter" @mouseleave="goLeave">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="getSearch">
              <div class="item" v-for="c1 in categroyList" :key="c1.categoryId">
                <h3>
                  <a
                    :data-categroyName="c1.categoryName"
                    :data-categroy1id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categroyName="c2.categoryName"
                          :data-categroy2id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categroyName="c3.categoryName"
                            :data-categroy3id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      show: true,
    };
  },
  computed: {
    ...mapState({
      //对象写法：右侧需要的是一个函数，当使用这个计算属性的时候右侧函数会执行一次
      //下面这个state即为大仓库里的state
      categroyList: (state) => state.home.categroyList,
    }),
  },
  methods: {
    getSearch(event) {
      //获取到当前节点
      let element = event.target;
      //注意dataset里面都是小写
      //解构对象
      let { categroyname, categroy1id, categroy2id, categroy3id } =
        element.dataset;
      //如果你有这个属性，就接着下面的的操作
      if (categroyname) {
        //传递参数
        let location = { name: "search" };
        let query = { categroyName: categroyname }; //获取categroy
        if (categroy1id) {
          //获取id
          query.categroy1Id = categroy1id;
        } else if (categroy2id) {
          query.categroy2Id = categroy2id;
        } else if (categroy3id) {
          query.categroy3Id = categroy3id;
        }
        //传参
        location.query = query;
        this.$router.push(location);
      }
    },
    //进入全部商品分类时
    goEnter() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    goLeave() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
  //组件挂载完毕可以向服务器发请求
  mounted() {
    this.$store.dispatch("home/categroyList");
    if (this.$route.path != "/home") this.show = false;
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .item:hover {
          background-color: skyblue;
        }
      }
    }
    //过渡动画样式
    .sort-enter{
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active{
     overflow: hidden;
    transition:all 0.5s linear;
    }
  }
}
</style>
