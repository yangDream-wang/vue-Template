<!--
  功能：Tab4
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-08-06 15:45:02
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='Tab4'>Tab4
    <van-button @click="clearToken" v-if="isLogin">退出</van-button>
    <van-button @click="goLogin" v-if="!isLogin">登录</van-button>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

export default {
  components: {},
  props:{/**接受父组件传值*/ },
  name:'Tab4',
  data() {
    return {
      isLogin:false
    };
  },
  computed: {/**计算属性*/  },
  watch: {/**监听data数据变化*/ },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/
    this.is_login()
  },
  methods: {/**所有方法*/
    is_login(){
       this.isLogin = localStorage.getItem('token') ? true:false
    },
    /**退出 */
    clearToken(){
      localStorage.clear()
      this.is_login()
      this.$toast('已退出')
    },
    /**登录 */
    goLogin(){
      this.$router.push({path:'/login'})
    }
  },
  mounted() {/**加载完组件时执行(加载完成之后执行)*/ },
  beforeCreate() {/**生命周期 - 创建之前*/},
  beforeMount() {/**生命周期 - 挂载之前*/},
  beforeUpdate() {/**生命周期 - 更新之前*/},
  updated() {/**生命周期 - 更新之后*/},
  beforeDestroy() {/**生命周期 - 销毁之前*/},
  destroyed() {/**生命周期 - 销毁完成*/},
  activated() {/**keep-alive组件激活时调用。仅针对keep-alive组件有效*/ 
    console.log(`activated`);
    this.is_login()
  },
  deactivated() {/**keep-alive组件停用时调用。仅针对keep-alive组件有效*/ },
}
</script>
<style scoped>

</style>