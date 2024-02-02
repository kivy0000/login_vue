<template>
  <div class="el-carousel">
    <!-- (走马灯未使用)背景 -->
    <el-carousel :autoplay="true" :interval="8000" height="100%" arrow="never">
      <!--      <el-carousel-item>-->
      <!--        <el-image style="width: 100%; height: 100%" :src="require('../assets/logo.jpg')" :fit="fill" />-->
      <!--      </el-carousel-item>-->

      <!--      <el-carousel-item>-->
      <!--        <el-image style="width: 100%; height: 100%" :src="require('../assets/logo3.jpg')" :fit="fill" />-->
      <!--      </el-carousel-item>-->
      <!--      <el-carousel-item>-->
      <el-image style="width: 100%; height: 100%" :src="require('../assets/logo3.jpg')"/>
      <!--      </el-carousel-item>-->
      <!--      <el-carousel-item>-->
      <!--        <el-image style="width: 30%; height: 100%" :src="require('../assets/logo4.jpg')" :fit="fill" />-->
      <!--      </el-carousel-item>-->
    </el-carousel>
  </div>


  <!--  注册页面  -->
  <div class="login-container">

    <el-card class="login-card" style="z-index: 1;height: 75%;">
      <el-image class="logo-image" :src="require('../assets/logo.jpg')"
                :fit="fill"/>

      <el-text tag="b" align="center"
               size="large"
               style="display: flex; justify-content: center;
                align-items: center; text-align: center;
                 font-size: 24px;margin-top: 30px;">
        注册测试界面
      </el-text>
      <!-- 注册表单     -->
      <div class="formStyle">
        <el-form :model="form" label-width="80px" class="login-form">

          <el-form-item label="账号" style="font-size: 20px">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" style="font-size: 20px" p>
            <el-input v-model="form.email" placeholder="请输入邮箱" ></el-input>
          </el-form-item>

          <!--            手机号和验证码-->
          <el-form-item label="验证码" style="font-size: 20px">
            <el-input v-model="form.vcode" class="w-50 m-2" placeholder="验证码" style="width: 125px"/>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" size="default" style="width: 65px" @click="getVcode(this.form.email)">获取</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="large" style="width: 320px" @click="registerUser('/register')">注册
            </el-button>
            <el-link type="primary" @click="jumpRouter('/')">返回登录</el-link>
          </el-form-item>


        </el-form>
      </div>


    </el-card>

  </div>

</template>

<script type="text/javascript">
import {reactive} from 'vue';
import {ElMessage} from 'element-plus'

export default {
  name: 'register',
  components: {},
  methods: {
    //跳转路由的方法
    jumpRouter(str) {
      this.$router.push(str);
    },

    //注册方法
    registerUser(str) {
      this.open("注册成功，3秒后自动返回登陆页面", 'success', 3000,
          () => {
            this.jumpRouter('/');
          }
      );

    },
    //获取验证码的方法
    getVcode(vemail){
      //向后端发送请求验证码的通知
      this.open('向' +vemail + '发送验证码成功',"success");
    },
    //弹窗方法
    /**
     * @param str 提示信息
     * @param type 提示类型 success、warning等
     */
    open(str, type, duration, onClose) {
      ElMessage({
        message: str,
        type: type,
        duration: duration, //等待时间
        onClose: onClose
      })
    },
  },
  setup() {
    const form = reactive({
      username: '',
      password: '',
      email: '',
      vcode: '',

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
  justify-content: end; /*靠右*/
  align-items: center; /* 靠上*/
  height: 80vh;
  margin-right: 5vh;
  opacity: 0.88; /*透明度*/
}

.login-card {
  width: 330px;
  padding: 10px;
  margin-top: 30px;
  margin-right: 20px;


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