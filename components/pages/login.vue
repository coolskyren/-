<template>
  <div class="bg-login">
    <!-- 表单视图 -->
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="ruleForm"
      label-width="90px"
      class="demo-ruleForm login"
    >
      <el-form-item label="手机号：" prop="username">
        <el-input v-model="userInfo.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="userInfo.password" show-password clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getuserlogin } from "@/util/axios";
export default {
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 11,
            message: "请输入正确用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "请输入6位正确密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login(forName) {
      this.$refs[forName].validate(valid => {
        if (valid) {
          getuserlogin(this.userInfo).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
              this.$router.push("/home");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.bg-login {
  width: 100vw;
  height: 100vh;
  background: $bgColorFirst;

  .login {
    background: $bgColorDefault;
    padding: 40px 10px;
    margin: -150px 0 0 -150px;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 430px;
    height: 220px;
    border-radius: 15px;

    .el-input {
      width: 300px;
    }
  }
}
</style>
