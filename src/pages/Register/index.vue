<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我已有账号，去
          <router-link to="/login" style="color: red">登录</router-link>
        </span>
      </h3>
      <el-form
        class="fromContainer"
        :model="form"
        label-width="100px"
        size="small"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="手机号:" prop="phone">
          <el-input style="width: 240px" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码:" prop="code">
          <el-input style="width: 240px" v-model="form.code"></el-input>
          <el-button style="margin-left: 10px" @click="getCode"
            >获取验证码</el-button
          >
        </el-form-item>
        <el-form-item label="登录密码:" prop="password1">
          <el-input style="width: 240px" v-model="form.password1"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="password">
          <el-input style="width: 240px" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label=" " prop="agree">
          <input
            @click="inputBox"
            type="checkbox"
            style="vertical-align: middle"
          />
          <span style="vertical-align: middle">
            同意 <a style="color: skyblue" href="#">《用户协议》</a></span
          >
        </el-form-item>
        <el-form-item>
          <el-button class="comfirmRegister" @click="userRegister"
            >完成注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterContainer",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        //手机表单数据
        //收集手机号
        phone: "",
        //收集验证码
        code: "",
        //密码
        password1: "",
        //确认密码
        password: "",
        //是否同意
        agree: false,
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
          },{ min: 3, max: 11, message: "长度在 3 到 11个数字" },
        ],
        code: [{ required: true, message: "请输入验证码" }],
        password1: [{ required: true, message: "请输入密码" }],
        password: [
          {
            validator: validatePass2,
            trigger: "blur",
            required: true,
          },
        ],
        agree:[
          {required:true}
        ]
      },
    };
  },
  methods: {
    //获取验证码
    async getCode() {
      //简单判断一下
      try {
        const { phone } = this.form;
        phone && (await this.$store.dispatch("getCode", phone));
        //将code属性值变为仓库中的验证码
        this.form.code = this.$store.state.user.code;
      } catch (error) {
        alert(error.message);
      }
    },
    //用户注册
    userRegister() {
      //校验表单
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const { phone, code, password1, password, agree } = this.form;
            if (
              agree &&
              phone &&
              code &&
              password1 == password &&
              (await this.$store.dispatch("getUserRegister", {
                phone,
                password,
                code,
              }))
            ) {
              alert("注册成功！请登录")
              this.$router.push("/login");
            }
          } catch (error) {
            alert(error.message);
          }
        }
      });
    },

    //复选框动态绑定
    inputBox(event) {
      this.$set(this.form, "agree", event.target.checked);
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 400px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;
    position: relative;

    .comfirmRegister {
      position: absolute;
      right: 54%;
    }
    .fromContainer {
      position: absolute;
      left: 33%;
    }

    h3 {
      display: flex;
      justify-content: center;
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 50px;
      span {
        position: absolute;
        right: 10px;
      }
    }
  }
  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
