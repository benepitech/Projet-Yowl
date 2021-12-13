<template>
  <div class="row">
    <div class="col-md-6 offset-3">
      <Form @submit="handleComment" :validation-schema="schema" class="card mt-5 p-3 border  shadow-lg">
        
     

        <div class="form-group">
          <Field name="content" placeholder="Enter your content" type="text" as="textarea" class="form-control border-yellow-600  border-2 my-4 "/>
          <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="button-container">
          <router-link to="/crudcomments" tag="button" class="btn btn-outline-danger">
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
    name: "CreateComment",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      content: yup.string().required("Content is required!"),
      
      
    });

    return {
      loading: false,
      message: "",
      schema,
 
    };
  },
  methods: {
    handleComment(data) {
      const obj = {...data, user_id: this.$store.getters['auth/getAuthId'] }  /////post_id is REQUIRED from ROUTER LINK
      this.loading = true;

      this.$store.dispatch("comment/addCommentItem", obj).then(
        () => {
          this.$router.push("/crudcomments");
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
      computed: {
  userId () {
    return this.$store.getters['auth/getAuthId']

    },

  },

};
</script>
