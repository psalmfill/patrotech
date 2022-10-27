<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <el-main class="container-fluid position-absolute h-100 p-0">


    <el-row class="h-100 patro-landing m-0">
      <el-col :span="16" class="patro-img-side">
        <div class="cover"></div>
      </el-col>
      <el-col :span="8" class="d-flex justify-center">
        <el-form :model="form" class="form" id="login-form" label-position="top">
          <div class="text-center mb-5">
            <h2>Welcome to Patrotech</h2>
            <small class="text-secondary">Security at its tip</small>
          </div>
          <el-form-item label="Phone Number">
            <el-input v-model="form.phoneNumber" size="large" />
          </el-form-item>
          <el-form-item label="Password" class="w-100">
            <el-input v-model="form.password" type="password" size="large" show-password />
          </el-form-item>
          <el-button size="large" class="btn-block text-white">Sign in</el-button>
        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import { reactive } from 'vue'
export default {
  data() {
    return {
      form: reactive({
        phoneNumber: "",
        password: ""
      })
    }
  }
}
</script>
<style scoped>
.patro-landing .patro-img-side {
  background-image: url('../assets/images/Security.jpeg');
  padding: 0;
}

.patro-landing .cover {
  display: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7)
}

#login-form {
  width: 80%;
  height: 300px;
  margin: auto;
}

#login-form button {
  background: #FF6633;
  /* border: 0 */
}
</style>