<!--
  功能：详情页
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-08-06 15:05:56
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='Detail'>
    <!-- {{content}} -->
    <swipe class="my-swipe width-100" :autoplay="2000" >
      <swipe-item>
        <img :src="content.picUrl" class="width-100">
      </swipe-item>
      <swipe-item>
        <img :src="content.picUrl" class="width-100">
      </swipe-item>
    </swipe>
    <div class="width-100 border-red flex flex-direction">
      <div class="text-sm text-black text-cut padding-sm">{{content.name}}</div>
    </div>
    <div class="width-100 border-red flex flex-direction">
      <div class="text-xs text-gray text-cut padding-sm">{{content.pic}}</div>
    </div>
    <div class="width-100 position-fixed " style="bottom:0;left:0;right:0;">
      <goods-action>
        <goods-action-icon icon="chat-o" text="客服" />
        <goods-action-icon icon="cart-o" text="购物车"/>
        <goods-action-icon icon="shop-o" text="店铺"/>
        <goods-action-button
          type="danger"
          text="立即购买"
          @click="onClickButton"
        />
      </goods-action>
    </div>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { Swipe, SwipeItem,GoodsAction, GoodsActionIcon, GoodsActionButton} from 'vant';
export default {
  components: {Swipe, SwipeItem,GoodsAction, GoodsActionIcon, GoodsActionButton},
  props:{/**接受父组件传值*/ 

  },
  name:'Detail',
  data() {
    return {
      content:{},
    };
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ },
  methods: {/**所有方法*/
    /**立即购买 */
    onClickButton(){
      var isLogin = localStorage.getItem('token')
      if(!isLogin){
        this.$router.push('/login')
        return
      }
      this.$toast(isLogin)
    },
  },
  
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/
    const id = this.$route.query.id
    this.id = id
    this.$request.mtnhao.detail.songDetail(id).then((res)=>{
      this.content = res.data.songs[0].al
    })

  },
  mounted() {/**加载完组件时执行(加载完成之后执行)*/ },
  beforeCreate() {/**生命周期 - 创建之前*/},
  beforeMount() {/**生命周期 - 挂载之前*/},
  beforeUpdate() {/**生命周期 - 更新之前*/},
  updated() {/**生命周期 - 更新之后*/},
  beforeDestroy() {/**生命周期 - 销毁之前*/},
  destroyed() {/**生命周期 - 销毁完成*/},
  activated() {/**keep-alive组件激活时调用。仅针对keep-alive组件有效*/ },
  deactivated() {/**keep-alive组件停用时调用。仅针对keep-alive组件有效*/ },
}
</script>
<style scoped>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.my-swipe{

}
</style>