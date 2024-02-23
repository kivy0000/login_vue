<template>
  <!--  登陆页面  -->
  <div class="login-container">
    <!--  背景部分  -->
    <div class="el-carousel">
      <div class="imgeBack">
        <el-image :src="require('../assets/logo3.jpg')"/>
      </div>
    </div>

    <!--   登录卡片   -->
    <el-card class="login-card" style="z-index: 1">
      <el-image class="logo-image" :src="require('../assets/logo.jpg')"
      />

      <el-text class="titleText" tag="b" align="center"
               size="large"
               style="display: flex; justify-content: center;
                align-items: center; text-align: center;
                 font-size: 20px;margin-top: 30px;">
        BOM登陆测试界面
      </el-text>
      <!-- 登陆表单     -->
      <div class="formStyle">
        <el-form :model="form" label-width="80px" class="login-form">

          <el-form-item label="账号" style="font-size: 20px">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width: 280px;margin: auto" size="large" @click="notiOpen('123','error')">登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  style="width: 280px;margin: auto" size="large" @click="jumpRouter('/register')">注册
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-link type="primary">忘记密码?</el-link>
          </el-form-item>


        </el-form>
      </div>
    </el-card>

  </div>

</template>

<script>
import {reactive} from 'vue';
import {ElMessage} from 'element-plus'
import {ElNotification} from 'element-plus'
//引入axios对象
import request from "@/utils/request";

export default {
  name: 'Login',
  components: {},
  Rparse: {},

  // 初始化钩子函数，不在method里面
  created() {
    this.Rparse = {};
    //从注册页面填充（如果有）
    this.Rparse = JSON.parse(localStorage.getItem('loginData'));
    if (this.Rparse !== null) {
      console.log(this.Rparse);
      if (this.Rparse.username) {
        this.form.username = this.Rparse.username;
      }
      if (this.Rparse.password) {
        this.form.password = this.Rparse.password;
      }
      localStorage.clear();
    }
  },
  methods: {
    //跳转路由的方法
    jumpRouter(str) {
      this.$router.push(str);
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
    //侧面弹窗方法
    /**
     * @param str 提示信息
     * @param type 提示类型 success、warning等
     */
    notiOpen(title, type) {
      if (type === 'success') {
        ElNotification.success({
          title: '登录成功',
          offset: 50,
          duration: 4500,
        })
      } else if (type === 'warning') {
        ElNotification.warning({
          title: '用户未注册',
          offset: 50,
          duration: 4500,
        })
      } else {
        ElNotification.error({
          title: '账号或密码错误',
          offset: 50,
          duration: 4500,
        })
      }

    },

    /**
     * 登陆方法
     */
    userLogin() {
      //登陆逻辑

      this.open("用户未注册", "warning", 4000);
      //登陆成功
      this.open("登陆成功", 'success', 3000);

    }
  },
  setup() {
    //也可以在script中直接添加表单
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


    return {
      form,
    };
  },
};
</script>

<style scoped>

/* 登陆页面 */
.login-container {
  z-index: 1;
  display: flex;
  justify-content: center; /*靠右*/
  align-items: center; /* 靠上*/
  height: 90vh;
  opacity: 0.88; /*透明度*/
}
/*登录卡片*/
.login-card {
  z-index: 1;
  height: 75%;
  width: 330px;
  padding: 15px;

}
/**/
.titleText{

}
/*忘记密码*/
.el-link {
  margin-top: -10px;
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

.imgeBack {
  width: fit-content;
  height: fit-content;
}

</style>