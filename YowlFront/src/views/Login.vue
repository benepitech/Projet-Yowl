<template>
<div class="flex flex-col items-center" >
  <img src="..\assets\Logo.svg" alt="logo" class=" my-6 object-contain h-12 w-full ...">
  <h1 class="text-5xl mb-12" >Sign in</h1>
  <p class="mb-4 text-sm">Sign in and start posting anything you want!</p>
  <div class="col-md-3  ">

    <div class="items-center">
      
      <Form @submit="handleLogin" :validation-schema="schema" >
        <div class="form-group ">
  
          <Field name="login" placeholder="Login" type="text" class="form-control border-yellow-600 border-2 items-center " />
          <ErrorMessage name="login" class="error-feedback" />
        </div>
        <div class="form-group ">

          <Field name="password" type="password" placeholder="password" class="form-control border-yellow-600  border-2 my-4 " />
          <ErrorMessage name="password" class="error-feedback" />
          <a href="">Forgot Password ?</a>
        </div>

        <div class="form-group text-center">
          <button type="submit" class="form-control bg-yellow-200 mt-3 h-12 mb-20" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
     </Form>
    </div>
  </div>
  <div><div><img class = "absolute inset-x-0 bottom-0 w-full" src="../assets/Waves1.png" alt="wave" ></div></div>
</div>
</template>

<script>

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      login: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
            this.$router.push("/home");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
.block{
  margin: auto;

}
</style>