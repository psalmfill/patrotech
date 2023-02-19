<script setup>
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
          <el-button v-loading="isLoading" size="large" class="btn-block text-white" @click="login">Sign in</el-button>
        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import { reactive } from 'vue'
import axios from '../plugins/axios'
export default {
  data() {
    return {
      isLoading: false,
      form: reactive({
        phoneNumber: "",
        password: ""
      })
    }
  },
  methods: {
    login() {
      this.isLoading = true
      axios.post('/auth/login', this.form).then(response => {
        console.log('response', response)
        localStorage.setItem('access_token', JSON.stringify(response.data))

        this.isLoading = false
        // this.$router.push('/dashboard')
      window.location = '/dashboard'

      }).catch(error => {
        console.log('error', error)
        this.isLoading = false
      })
    }
  },

  created() {
    const token = localStorage.getItem('access_token')
    if (token) {
      window.location = '/dashboard'
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