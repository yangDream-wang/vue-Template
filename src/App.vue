<template>
  <div id="app">
    <!-- 缓存所有的页面 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name:'App',
  created(){
  },
  mounted(){
    /**监听页面刷新,把当前store缓存至sessionStorage */
    window.addEventListener('unload',this.saveState);
  },
  methods:{
    saveState(){
      sessionStorage.setItem('userState', JSON.stringify(this.$store.state.user))
      sessionStorage.setItem('businessState', JSON.stringify(this.$store.state.business))
    },
  },
}
</script>
<style scoped>
@import url('assets/css/base.css');
@import url('assets/css/customClass.css');
</style>
