<!--
  功能：根组件
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-08-06 14:29:40
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='Index'>
    <!-- 缓存所有的页面 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <lazy-component>
      <div class="width-100 position-fixed" style="bottom:0;left:0;rigth:0;">
        <tabbar v-model="tabbarIndex" @change="tabbarChange" active-color="#07c160" inactive-color="#000">
          <tabbar-item icon="home-o">标签1</tabbar-item>
          <tabbar-item icon="search">标签2</tabbar-item>
          <tabbar-item icon="friends-o">标签3</tabbar-item>
          <tabbar-item icon="setting-o">我的</tabbar-item>
        </tabbar>
      </div>
    </lazy-component>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { Tabbar, TabbarItem, } from 'vant';

export default {
  components: {Tabbar, TabbarItem,},
  props:{/**接受父组件传值*/ },
  name:'Index',
  data() {
    return {
      banner_list:[],
      tabbarIndex:0,
    };
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ },
  methods: {/**所有方法*/
    tabbarChange(e){
      this.tabbarIndex = e;
      switch(e){
        case 0:this.$router.replace('/home');break;
        case 1:this.$router.replace('/tab2');break;
        case 2:this.$router.replace('/tab3');break;
        case 3:this.$router.replace('/tab4');break;
      }
    },
    gotoDetail(id){
      this.$router.push({ path:'/detail', query:{id:id} })
    }
  },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/
    switch(this.$route.path){
      case '/home':this.tabbarIndex = 0;break;
      case '/tab2':this.tabbarIndex = 1;break;
      case '/tab3':this.tabbarIndex = 2;break;
      case '/tab4':this.tabbarIndex = 3;break;
    }
    // this.$request.course.detail.banner_list({id:2}).then((res)=>{
    //   if(res.data.code == 1){
    //     this.banner_list = res.data.list
    //     this.$toast('佛列克山大解放了')
    //   }
    // })
  },
  mounted() {/**加载完组件时执行(加载完成之后执行)*/ },
  beforeCreate() {/**生命周期 - 创建之前*/},
  beforeMount() {/**生命周期 - 挂载之前*/},
  beforeUpdate() {/**生命周期 - 更新之前*/},
  updated() {/**生命周期 - 更新之后*/},
  beforeDestroy() {/**生命周期 - 销毁之前*/},
  destroyed() {/**生命周期 - 销毁完成*/},
  activated() {/**keep-alive组件激活时调用。仅针对keep-alive组件有效*/ 
  },
  deactivated() {/**keep-alive组件停用时调用。仅针对keep-alive组件有效*/ 
    
  },
}
</script>
<style scoped>
</style>