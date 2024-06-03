<template>
  <div>

    <div><!-- 主体部分  -->
<!--      <router-view style="flex: 1"/>&lt;!&ndash; 内容区域，由路由到的视图组件展示 ,初始化路由为 /  &ndash;&gt;
change route hop to component hop
-->
      <component :is="routerUrl" ref="chirdRef" @changeRouterUrl="changeRouterUrl"></component>
    </div>

  </div>
</template>

<script>

import Register from "@/views/RegisterView"
import Login from "@/views/LoginView"
import {ref} from 'vue';

export default {
  name: "layout",
  components: {
    Register,
    Login,
  },
  setup() {

    //方便父子组件来回调用方法，使用这引用子组件
    const chirdRef = ref(null);


    const routerUrl = ref("Login");

    //更改显示的组件
    const changeRouterUrl = (value)=>{
      routerUrl.value = value;
    }

    return {
      routerUrl,
      changeRouterUrl,
      chirdRef,
    };
  }
}
</script>

<style scoped>

</style>
