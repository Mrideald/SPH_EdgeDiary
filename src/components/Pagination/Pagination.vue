<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="getLastPage" >上一页</button>
    <button v-show="startNumAndEndNum.start > 1" @click="getOnePage">1</button>
    <button v-show="startNumAndEndNum.start > 2">...</button>

    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo',page)"
      :class="{active:pageNo==page}"
    >
      {{ page }}
    </button>

    <button v-show="startNumAndEndNum.end < this.totalPage - 1">...</button>
    <button v-show="startNumAndEndNum.end < this.totalPage" @click="$emit('getPageNo',totalPage)">
      {{ totalPage }}
    </button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "PaginationSpace",
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      const { continues, totalPage, pageNo } = this;
      let start = 0;
      let end = 0;
      //不正常现象，连续页码大于总页码
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        //正常现象
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues; //end等于连续页码数
        } else if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
  methods: {
    //自定义事件获取当前页数 写俩个在这 其他的再到上面写
    getLastPage() {
      this.$emit("getPageNo", this.pageNo - 1);
    },
    getOnePage() {
      this.$emit("getPageNo", 1);
    },
  },
  props: ["pageNo", "pageSize", "total", "continues"],
};
</script>

<style lang="less" scoped>
.pagination {

  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background: skyblue;
}
</style>
