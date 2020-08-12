<!--
  功能：Home
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-08-06 15:46:06
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='home'>
    <v-pull-refresh class="height-100" v-model="isRefreshLoading" @refresh="onRefresh" disable="false">
      <v-list class="" v-model="listLoading" :finished="listFinished" finished-text="没有更多了" @load="onListLoad" :immediate-check="false">
        <div class="width-100 my-swipe">
          <v-swipe :autoplay="3000" indicator-color="white">
            <v-swipe-item v-for="(item, index) in bannerList" :key="index">
              <img :src="item.imageUrl" class="swipe-img"/>
            </v-swipe-item>
          </v-swipe>
        </div>
        <v-sticky>
          <div class="width-100 bg-white">
            <tab-controller ref='tabController' class="tab-controller" :titles="['推荐歌单','推荐MV','推荐新音乐']" @tabchange="tabchange" />
          </div>
        </v-sticky>
        <div class="goodsCom"><goods :data="recommendData[comTabIndex].list"></goods></div>
      </v-list>
    </v-pull-refresh>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import {PullRefresh,List,Sticky,Swipe, SwipeItem} from 'vant'
import { mapState, mapActions } from "vuex"
import TabController from "components/common/tabController/TabController"
import Goods from 'components/common/goods/Goods'
export default {
  components: {
    'v-pull-refresh':PullRefresh,
    'v-list':List,
    'v-swipe':Swipe, 
    'v-swipe-item':SwipeItem,
    'tab-controller':TabController,
    Goods,"v-sticky":Sticky,
  },
  props:{/**接受父组件传值*/ },
  name:'Home',
  data() {
    return {
      bannerList:[],
     /**是否处于刷新加载中 */
      isRefreshLoading: false,
      /**是否处于上拉加载中 */
      listLoading:false,
      /**是否加载上拉加载完毕 */
      listFinished:false,
      /**数据集 */
      recommendData: {
        song: { page: 1, list: [] },
        mv: { page: 0, list: [] },
        new: { page: 1, list: [] },
      },
      tabIndex:0,
      /**吸顶,出容器跟着消失 */
      container:null,
    };
  },
  computed: {/**计算属性*/ 
    comTabIndex(){
      if(this.tabIndex == 0){
        return 'song'
      }else if(this.tabIndex == 1){
        return 'mv'
      }else if(this.tabIndex == 2){
        return 'new'
      }
    },
  },
  watch: {/**监听data数据变化*/ },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/
    // console.log(`Home-create`);
    this.$request.mtnhao.index.bannerList().then((res)=>{
      this.bannerList = res.data.banners;
    })
    this.$nextTick(()=>{this.onListLoad()});
  },
  methods: {/**所有方法*/
    /**加载数据 */
    onListLoad(){
      if(this.tabIndex == 0){
        this.$request.mtnhao.index.newSong(15,this.recommendData.song.page).then((res)=>{
          /**数据完成设置处于未加载中 */
          this.listLoading = false
          /**下拉数据 */
          this.isRefreshLoading = false;
          /**数据全部加载完成*/
          if (res.data.result.length == 0) {
            this.listFinished = true;
            return
          }
          this.recommendData.song.page += 1;
          this.recommendData.song.list.push(...res.data.result)
        })
      }else if(this.tabIndex == 1){
        this.$request.mtnhao.index.mvAll().then((res)=>{
          /**数据完成设置处于未加载中 */
          this.listLoading = false
          /**下拉数据 */
          this.isRefreshLoading = false;
          /**数据全部加载完成*/
          if (res.data.result.length == 0) {
            this.listFinished = true;
            return
          }
          
          this.recommendData.mv.page += 1;
          this.recommendData.mv.list.push(...res.data.result)
        })
      }else if(this.tabIndex == 2){
        this.$request.mtnhao.index.personalized(15,this.recommendData.new.page).then((res)=>{
          /**数据完成设置处于未加载中 */
          this.listLoading = false
          /**下拉数据 */
          this.isRefreshLoading = false;
          /**数据全部加载完成*/
          if (res.data.result.length == 0) {
            this.listFinished = true;
            return
          }
          
          this.recommendData.new.page += 1;
          this.recommendData.new.list.push(...res.data.result)
        })
      }
      
    },
    /**下拉刷新 */
    onRefresh() {
      var tabIndex = '';
      if(this.tabIndex == 0){
        tabIndex = 'song'
      }else if(this.tabIndex == 1){
        tabIndex = 'mv'
      }else if(this.tabIndex == 2){
        tabIndex = 'new'
      }
      this.recommendData[tabIndex].page = 1;
      this.recommendData[tabIndex].list = [];
      this.onListLoad()
    },
    /**点击切换tab导航 */
    tabchange(e){
      this.tabIndex = e
      this.onListLoad()
    },
  },
  mounted() {/**加载完组件时执行(加载完成之后执行)*/ 

  },
  beforeCreate() {/**生命周期 - 创建之前*/},
  beforeMount() {/**生命周期 - 挂载之前*/},
  beforeUpdate() {/**生命周期 - 更新之前*/},
  updated() {/**生命周期 - 更新之后*/},
  beforeDestroy() {/**生命周期 - 销毁之前*/},
  destroyed() {/**生命周期 - 销毁完成*/},
  activated() {/**keep-alive组件激活时调用。仅针对keep-alive组件有效*/ 
    // console.log(`Home-activated`);
  },
  deactivated() {/**keep-alive组件停用时调用。仅针对keep-alive组件有效*/ 
    
  },
}
</script>
<style scoped>
  .my-swipe{
    max-height: 22vh;
    overflow: hidden;
  }
  .swipe-img{
    width: 100%;
  }
  .goodsCom{
    width:100%;
  }
</style>