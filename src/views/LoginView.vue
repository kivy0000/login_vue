<template>
  <!--  登陆页面  -->
  <div class="login-container">
    <!--  背景部分  -->
    <div class="el-carousel">
      <div class="imgeBack">
        <el-image :src="require('../assets/logo3.jpg')"/>
      </div>
    </div>
    <!--  忘记密码弹窗-->
    <el-dialog class="dialogPassword" style="width: 330px;height: 460px"
               title="找回密码" v-model="this.logform.dialogVisible">
      <!--   重置密码表单   -->
      <el-form :model="reform" label-width="80px" class="login-form">

        <el-form-item label="账号" style="font-size: 20px">
          <el-input v-model="reform.username" placeholder="请输入账号"></el-input>
        </el-form-item>


        <el-form-item label="邮箱" style="font-size: 20px">
          <el-input v-model="reform.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="新密码">
          <el-input v-model="reform.password" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>

        <!--            手机号和验证码-->
        <el-form-item label="验证码" style="font-size: 20px">
          <el-input v-model="reform.vcode" class="w-50 m-2" placeholder="验证码"
                    style="width: 115px"/>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary"
                     size="default"
                     style="width: 75px"
                     :disabled="reform.disabledButton"
                     @click="getVcode(this.reform.email)">{{ reform.registerText }}
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" style="width: 320px" @click="resetPassword">重置
          </el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <!--   登录卡片   -->
    <el-card class="login-card" style="z-index: 1">
      <el-image class="logo-image" :src="require('../assets/logo.jpg')"/>

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
            <el-button type="primary" style="width: 280px;margin: auto" size="large" @click="userLogin">登录
            </el-button>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 280px;margin: auto" size="large" @click="jumpRouter('/register')">注册
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-link type="primary" @click="userForget">忘记密码?</el-link>
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
  },/*// 初始化钩子函数，不在method里面*/
  methods: {
    //跳转路由的方法
    jumpRouter(str) {
      this.$router.push(str);
    },

    //打开忘记密码表单
    userForget() {
      this.logform.dialogVisible = true;
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

    /**重置获取验证码的方法*/
    getVcode(vemail) {
      this.reform.disabledButton = true;
      var demo = 400;
      if (this.reform.username === '' || this.reform.username === null || this.reform.email === '' || this.reform.email === null) {
        this.open("请输入账号/邮箱", 'warning');
        this.reform.disabledButton = false;
        return;
      }
      //向后端发送重置密码通知,异步，
      request.put("/api/reLogin", this.reform).then(res => {
            console.log(res);
            //接收状态码
            demo = res.code;
            //判断验证码是否发送成功
            if (demo === 200) {
              this.open('向' + vemail + '发送验证码成功', "success");
              this.reform.icode = res.vcode
            } else if (demo === 300) {
              this.open("该账号未注册，请注册", 'warning');
            } else if (demo === 500) {
              this.open("账号/邮箱不匹配，请检查", 'warning');
            } else {
              this.open("发送验证码失败，请检查账号/邮箱", 'error');
            }
            //验证码每60s点击一次,本地处理，较快
            if (this.reform.registerTime > 0) {//如果已经在计时
              this.reform.disabledButton = false;
              return;
              //错误访问，不计时
            }
            if (demo === 400 || demo === 300) {
              this.reform.disabledButton = false;
              return;
            }
            //否则，开始计时
            this.reform.registerTime = 60;
            //按时间减少
            const timer = setInterval(() => {
              this.reform.registerTime--;
              //计时结束
              if (this.reform.registerTime === 0) {
                clearInterval(timer);
                this.reform.disabledButton = false;
                this.reform.registerText = '获取';
                //正在计时
              } else {
                this.reform.disabledButton = true;
                this.reform.registerText = `${this.reform.registerTime}秒后获取`;
              }
            }, 1000);
          }
      );
    },

    /**重置密码的方法*/
    resetPassword() {
      //判断验证码是否正确
      if (this.reform.icode === this.reform.vcode && this.reform.icode !== '') {
        request.put("/api/resetPassword", this.reform).then(res => {
              console.log(res)
              //判断是否重置成功
              if (res.code === 200) {
                this.open("重置密码成功", 'success', 3000,
                    () => {
                      //注册完成使验证码失效
                      this.reform.icode = '';
                      //关闭页面
                      this.logform.dialogVisible = false;

                    }
                );
              } else {
                this.open("重置失败，请检查账户名/邮箱", 'error')
              }
            }
        )
      } else {
        this.open("验证码校验失败,请检查", 'warning')
      }

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


      //登陆成功
      this.notiOpen("登陆成功", 'success');

    }
  },
  /*

  在Vue3中，setup()函数是用来代替以前Vue2中的data()、methods()等选项
    setup()和data()的区别主要在于，data()是一个函数，返回一个对象，而setup()是一个函数，返回一个对象或者一个函数。setup()函数是在组件实例创建之前执行的，可以在setup()中创建响应式数据和引用数据。

  在Vue3中，可以使用reactive、ref等方法来创建响应式数据和引用数据。reactive()方法用来创建一个响应式对象，ref()方法用来创建一个包装对象，这个包装对象有一个.value属性来存储值。

  下面是一个简单的示例代码，演示了在Vue3中使用setup()函数创建响应式数据和引用数据：

  ```javascript
  <template>
    <div>
      {{ count }}
      <button @click="increase">Increase</button>
    </div>
  </template>

  <script>
  import { ref } from 'vue';

  export default {
    setup() {
      const count = ref(0);

      const increase = () => {
        count.value++;
      };

      return {
        count,
        increase
      };
    }
  };
  ```
  在上面的代码中，我们使用ref()方法创建了一个包装对象count，然后在setup()函数中返回了count和increase两个属性，count是一个响应式数据，increase是一个函数，用来增加count的值。当点击按钮时，count的值会增加。

  通过这种方式，我们可以在Vue3中使用setup()函数来创建响应式数据和引用数据，从而实现数据的响应式更新。
  */
  setup() {
    //也可以在script中直接添加表单
    //登陆表单
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
    //重置密码用的表单
    const reform = reactive({
      username: '',
      password: '',
      email: '',
      vcode: '',
      disabledButton: false,
      registerText: '获取', //获取验证码按钮
      registerTime: 0, //获取验证码倒计时
      icode: '',//服务端获取的验证码
    });
    const logform = reactive({
      dialogVisible: false,
    });


    return {
      form,
      reform,
      logform,
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
.titleText {

}

/*忘记密码弹窗 */
.dialogPassword {
}

/*忘记密码*/
.el-link {
  margin-top: -10px;
  /*margin-right: 4px;*/
  /*font-size: 12px;*/
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