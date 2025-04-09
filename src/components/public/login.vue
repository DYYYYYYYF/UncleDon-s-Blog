<template>
  <div class="LoginContainer">
    <h2>用户登录</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>用户名</label>
        <input v-model="username" type="text" required>
      </div>
      <div class="form-group">
        <label>密码</label>
        <input v-model="password" type="password" required>
      </div>
      <button type="submit">登录</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('/backend/user/login', {
          username: this.username,
          password: this.password
        });
        
        this.error = response?.data?.message || '登陆成功';
        this.$router.push('/UncleDon/FileOperationPage')
      } catch (err) {
        console.log(err);
        this.error = err.response?.data?.message || '登录失败';
      }
    }
  }
};
</script>


<style scoped>
#LoginContainer{
    height: 93vh;
}

</style>
