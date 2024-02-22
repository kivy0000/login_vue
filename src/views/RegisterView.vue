<template>
  <div class="el-carousel">
    <!-- (走马灯未使用)背景 -->
    <el-carousel :autoplay="false" :interval="8000" height="100%" arrow="never">
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
                />

      <el-text tag="b" align="center"
               size="large"
               style="display: flex; justify-content: center;
                align-items: center; text-align: center;
                 font-size: 24px;margin-top: 30px;">
        BOM注册测试界面
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
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>

          <!--            手机号和验证码-->
          <el-form-item label="验证码" style="font-size: 20px">
            <el-input v-model="form.vcode" class="w-50 m-2" placeholder="验证码"
                      style="width: 115px"/>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary"
                       size="default"
                       style="width: 75px"
                       :disabled="form.disabledButton"
                       @click="getVcode(this.form.email)">{{ form.registerText }}
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="large" style="width: 320px" @click="registerUser">注册
            </el-button>
            <el-link type="primary" @click="jumpRouter('/')">返回登录</el-link>
          </el-form-item>


        </el-form>
      </div>


    </el-card>

  </div>

</template>

<script>
import {reactive} from 'vue';
import {ElMessage} from 'element-plus'
//引入axios对象
import request from "@/utils/request";

export default {
  name: 'register',
  components: {},


  methods: {

    //跳转路由的方法
    jumpRouter(str) {
      this.$router.push(str);
    },
    /*
    In this optimized code snippet, unnecessary comments and unused elements have been removed to make the code cleaner and more concise. The structure of the template and script sections has been maintained, and the styling is also included in the scoped style section.
    ------------------------------
    */
    /**注册方法*/
    registerUser(str) {
      //判断验证码是否正确
      if (this.form.icode === this.form.vcode && this.form.icode !== '') {
        request.put("/api/register", this.form).then(res => {
              console.log(res)
              //判断是否注册成功
              if (res.code === 200) {
                this.open("注册成功，3秒后自动返回登陆页面", 'success', 3000,
                    () => {
                      //将注册表单数据转交到登陆页面
                      localStorage.setItem('loginData', JSON.stringify(this.form));
                      this.jumpRouter('/');
                    }
                );
              } else {
                this.open("注册失败，请检查账户名/邮箱是否已经注册", 'error')
              }
            }
        )
      } else {
        this.open("验证码校验失败,请检查", 'warning')
      }

    },

    /**获取验证码的方法*/
    getVcode(vemail) {
      //向后端发送请求验证码的通知
      request.put("/api", this.form).then(
          res => {
            console.log(res)
            //判断验证码是否发送成功
            if (res.code === 200) {
              this.open('向' + vemail + '发送验证码成功', "success");
              this.form.icode = res.vcode
            } else {
              this.open("验证码发送失败,邮箱错误或已注册", 'warning')
            }
          }
      );
      //验证码每60s点击一次
      if (this.form.registerTime > 0) {//如果已经在计时
        return;
      }
      //否则，开始计时
      this.form.registerTime = 60;

      //按时间减少
      const timer = setInterval(() => {
        this.form.registerTime--;

        //计时结束
        if (this.form.registerTime === 0) {
          clearInterval(timer);
          this.form.disabledButton = false;
          this.form.registerText = '获取';
          //正在计时
        } else {
          this.form.disabledButton = true;
          this.form.registerText = `${this.form.registerTime}秒后获取`;
        }
      }, 1000);

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
        onClose: onClose,
      })
    },
  },

  setup() {
    const form = reactive({
      username: '',
      password: '',
      email: '',
      vcode: '',
      disabledButton: false,
      registerText: '获取', //获取验证码按钮
      registerTime: 0, //获取验证码倒计时
      icode: '',//服务端获取的验证码
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
  z-index: 1;
  display: flex;
  justify-content: center; /*靠右*/
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