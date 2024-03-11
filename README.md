<h1>A personal register and login page</h1>
<h2>version 0.5 (simpleAvailableVersion)</h2>
<h2>register</h2>
Function: front-end verification, sending axios requests to the back-end (verification, email verification, registration verification, registration business)
<h3>login</h3>
Functions: front-end verification, sending axios requests to the back-end (account password verification, password recovery, password recovery email verification, login verification, login business, session data saving)<h3>API</h3>
login:
  page:  http://localhost:8989/
  actualLoginService:  /api/login
  resetVerificationCode:  /api/reSetVcode
  resetPasswords:  /api/resetPassword
register: 
  page:  http://localhost:8989/register
  actualRegistrationService: /api/register
  registrationVerificationCode:  /api/getVcode
<h3>attention:</h3>
1. Some contents need to be specifically configured in request.js, vue.config.js, and vue files.
2.token and verification code need to read session or redis data for verification, redis is not used at present, if you need, you can also add your own;
to Be Continued......
<h2>-------------------------------------------------------------------------------------------</h2>

<h1>登录和注册页面</h1>
<h2>版本 0.5 (简单可用版本)</h2>
<h2>注册部分</h2>
功能：前端校验，向后端发送axios请求(验证、邮箱验证、注册验证、注册业务)
<h3>登陆部分</h3>
功能：前端校验，向后端发送axios请求(账号密码验证、找回密码、找回密码邮箱验证、登录验证、登录业务、session域中保存数据)
<h3>API接口</h3>
登陆:
  页面:  http://localhost:8989/
  实际登录业务:  /api/login
  重置验证码:  /api/reSetVcode
  重置密码:  /api/resetPassword
注册: 
  页面:  http://localhost:8989/register
  实际注册业务: /api/register
  注册验证码:  /api/getVcode

<h3>注意:</h3>
1.部分内容需要在request.js和vue.config.js,以及vue文件中具体配置;
2.token和验证码需要读取session/redis的数据做校验,目前未使用redis，如果你有需要，也可以自己添加;
未完待续......
