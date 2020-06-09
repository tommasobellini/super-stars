<template>
  <div class="loginSection">
    <b-card class="loginCard" title="Login" sub-title="Enter your credentials">
      <div>
        <b-input-group prepend="Username" class="mt-3">
          <b-form-input v-model="username"></b-form-input>
        </b-input-group>
        <b-input-group prepend="Password" class="mt-3">
          <b-form-input v-model="password" type="password"></b-form-input>
        </b-input-group>
      </div>
      <div class="loginButton">
        <b-button @click="submitLogin()">Login</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "loginCard",
  data() {
    return {
      username: "",
      completeName: "",
      password: ""
    };
  },
  methods: {
    submitLogin() {
       localStorage.setItem('logged', true);
    }
  }
};
</script>

<style scoped>
.loginSection {
  margin-top: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.loginButton {
  margin-top: 20px;
}
</style>