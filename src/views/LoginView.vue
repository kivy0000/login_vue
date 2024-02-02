<template>
  <div class="el-carousel">
    <!-- (走马灯未使用)背景 -->
    <el-carousel :autoplay="true"  :interval="8000" height="100%" arrow="never" >
<!--      <el-carousel-item>-->
<!--        <el-image style="width: 100%; height: 100%" :src="require('../assets/logo.jpg')" :fit="fill" />-->
<!--      </el-carousel-item>-->

<!--      <el-carousel-item>-->
<!--        <el-image style="width: 100%; height: 100%" :src="require('../assets/logo3.jpg')" :fit="fill" />-->
<!--      </el-carousel-item>-->
<!--      <el-carousel-item>-->
        <el-image  style="width: 100%; height: 100%" :src="require('../assets/logo3.jpg')" :fit="fill" />
<!--      </el-carousel-item>-->
<!--      <el-carousel-item>-->
<!--        <el-image style="width: 30%; height: 100%" :src="require('../assets/logo4.jpg')" :fit="fill" />-->
<!--      </el-carousel-item>-->
    </el-carousel>
  </div>


  <!--  登陆页面  -->
  <div class="login-container" >

    <el-card class="login-card" style="z-index: 1;height: 75%;">
      <el-image  class="logo-image" :src="require('../assets/logo.jpg')"
                 :fit="fill" />

      <el-text tag="b" align="center"
               size="large"
               style="display: flex; justify-content: center;
                align-items: center; text-align: center;
                 font-size: 24px;margin-top: 30px;">
        登陆测试界面</el-text>
      <!-- 登陆表单     -->
      <div class="formStyle">
        <el-form :model="form" label-width="80px" class="login-form">

          <el-form-item label="账号"  style="font-size: 20px">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="default" @click="login">登录</el-button>
            <el-button type="primary" size="default"@click="jumpRouter('/register')" >注册</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-link type="primary" >忘记密码?</el-link>
          </el-form-item>


        </el-form>
      </div>


    </el-card>

  </div>

</template>

<script>
import {reactive} from 'vue';

export default {
  name: 'Login',
  components: {},
  methods:{
    //跳转路由的方法
    jumpRouter(str){
      this.$router.push(str);
    }
  },
  setup() {
    const form = reactive({
      username: '',
      password: '',
    });
    const carouselIndex = reactive({
      index: 0,
    });

    return {
      form,
      carouselIndex,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: end;/*靠右*/
  align-items: center;/* 靠上*/
  height: 80vh;
  margin-right: 5vh;
  opacity: 0.88;/*透明度*/
}

.login-card {
  width: 330px;
  padding: 10px;
  margin-top: 30px;
  margin-right: 20px;


}
.el-link {
  margin-right: 4px;
  font-size: 12px;
}

.login-form {
  margin-top: 30px;
  margin-right: 30px;
  margin-left: -30px;
  font-size: 50px;



}

.el-carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.logo-image {
  width: 50%;
  height: 50%;
  margin: auto; /* 居中显示 */
  justify-content: center; /* 居中对齐 */
}

</style>