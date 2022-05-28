<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <RecommendContainer/>
    <RankContainer/>
    <LikeContainer/>
    <FloorContainer v-for="floor in floorList" :key="floor.id" :list="floor" />
    <BrandContainer/>
  </div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer";
import RecommendContainer from "./Recommend/RecommendContainer";
import RankContainer from "./RankContainer/RankContainer";
import LikeContainer from "./LikeContainer/LikeContainer";
import FloorContainer from "./FloorContainer/FloorContainer";
import BrandContainer from "./BrandContainer/BrandContainer";
import { mapState } from "vuex";
export default {
  name: "HomeContainer",
  components: {
    ListContainer,
    RecommendContainer,
    RankContainer,
    LikeContainer,
    FloorContainer,
    BrandContainer,
  },
  //挂载完毕向服务器发请求获取数据
  mounted() {
    this.$store.dispatch("home/floorList");
  },
   computed:{
    ...mapState({
      //下面这个state即为大仓库里的state
     floorList:state=>state.home.floorList
    })
  },
};
</script>

<style></style>
