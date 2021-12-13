<template>
  <div class="row">
    <div class="col-md-6 offset-3">
      <Form @submit="handleCategory" :validation-schema="schema" class="card mt-5 p-3 border  shadow-lg">
        
     

        <div class="form-group">
          <Field name="name" placeholder="Enter the category name" type="text"  class="form-control border-yellow-600  border-2 my-4 "/>
          <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="button-container">
          <router-link to="/crudcategories" tag="button" class="btn btn-outline-danger">
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
    name: "CreateCategory",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup.string().required("Content is required!"),
      
      
    });

    return {
      loading: false,
      message: "",
      schema,
 
    };
  },
  methods: {
    handleCategory(data) {
      
      this.loading = true;

      this.$store.dispatch("category/addCategoryItem", data).then(
        () => {
          this.$router.push("/crudcategories");
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
