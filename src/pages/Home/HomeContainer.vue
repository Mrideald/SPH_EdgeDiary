<template>
  <div>
   <TypeNav></TypeNav>
   <ListContainer></ListContainer>
   <RecommendContainer></RecommendContainer>
   <RankContainer></RankContainer>
   <LikeContainer></LikeContainer>
   <FloorContainer></FloorContainer>
   <BrandContainer></BrandContainer>
  </div>
</template>

<script>
import ListContainer from './ListContainer/ListContainer'
import RecommendContainer from './Recommend/RecommendContainer'
import RankContainer from './RankContainer/RankContainer'
import LikeContainer from './LikeContainer/LikeContainer'
import FloorContainer from './FloorContainer/FloorContainer'
import BrandContainer from './BrandContainer/BrandContainer'
export default {

name:'HomeContainer',
components:{
  ListContainer,
  RecommendContainer,
  RankContainer,
  LikeContainer,
  FloorContainer,
  BrandContainer
  }
}
</script>

<style>

</style>