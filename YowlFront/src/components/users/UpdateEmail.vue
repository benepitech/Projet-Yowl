<template>
  <div class="row">
    <div class="col-md-6 offset-3">
          <Form @submit="handleUpdate" :validation-schema="schema" class="card mt-5 p-3 border  shadow-lg">
        
     

        <div class="form-group">
          <Field name="email" placeholder="Email" type="email" class="form-control border-yellow-600  border-2 my-4 "/>
          <ErrorMessage name="email" class="error-feedback" />
        </div>
    <div class="cascading-dropdown">

        </div>
        <div class="button-container">
          <router-link to="/profile" tag="button" class="btn btn-outline-danger">
            Cancel
          </router-link>
          <button type="submit" class="btn btn-outline-success">Save</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "UpdateUser",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    user_id: {
      type: String,
      required: true,
    },
  },
  data() {
const schema = yup.object().shape({
      email: yup
        .string()
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
    });
    

    return {
      loading: false,
      message: "",
      schema,
      
    };
  },

  methods: {
      handleUpdate(data) {
        const obj = {...data, id: parseInt(this.user_id) }
        this.loading = true;
        console.log(obj);
        this.$store.dispatch("user/updateUserItem", obj).then(
          () => {
            this.$store.dispatch('auth/logout');
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
  created() {
    this.user = {
      ...this.$route.params.user,
    };
  },
};

</script>
