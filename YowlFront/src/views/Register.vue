<template>
<div class="flex flex-col items-center" >
  <img src="..\assets\Logo.svg" alt="logo" class=" my-8 object-contain h-12 w-full ...">
  <h1 class="text-5xl mb-12" >Sign up</h1>
  
  

  <div class="col-md-3  ">

    <div class="items-center">
      
          `<Form @submit="handleRegister" :validation-schema="schema" >
            <div class="form-group ">
      
              <Field name="login" placeholder="Username" type="text" class="form-control border-yellow-600 border-2 items-center mb-4" />
              <ErrorMessage name="login" class="error-feedback" />
            </div>
            <div class="form-group ">
      
              <Field name="email" placeholder="Email" type="email" class="form-control border-yellow-600 border-2 items-center " />
              <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form-group ">
              <Field name="password" type="password" placeholder="Password" class="form-control border-yellow-600  border-2 my-4 " />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group ">
              <Field name="password_confirmation" type="password" placeholder="Verify password" class="form-control border-yellow-600  border-2 my-4 " />
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
            </Form>`
    </div>
  </div>
  <div><img class = "inset-x-0 bottom-0 w-full" src="../assets/Waves1.png" alt="wave" ></div>
</div>
</template>

<script>

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "Register",
  components:{
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      login: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      password_confirmation: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/login")
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style scoped>

</style>