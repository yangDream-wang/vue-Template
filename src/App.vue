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
}
</script>
<style scoped>
@import url('assets/css/base.css');
@import url('assets/css/customClass.css');
</style>
