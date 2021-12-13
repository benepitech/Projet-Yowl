<template>
  <div class="row">
    <div class="col-md-6 offset-3">
      <Form @submit="handlePost" :validation-schema="schema" class="card mt-5 p-3 border  shadow-lg">
        
     
        <div class="form-group">
          <Field name="title" placeholder="Choose a Title" type="text" class="form-control border-yellow-600  border-2 my-4 "/>
          <ErrorMessage name="title" class="error-feedback" />

        </div>
        
        <div class="form-group">
          <Field name="content" placeholder="Enter your content" type="text" class="form-control border-yellow-600  border-2 my-4 "/>
          <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
          <Field name="url" placeholder="Enter URL" type="text" class="form-control border-yellow-600  border-2 my-4 "/>
          <ErrorMessage name="url" class="error-feedback" />
        </div>
        <div class="cascading-dropdown">
            <div class="dropdown">
            <Field v-slot="{ value }" name="category_id" as="select" class="form-control border-yellow-600  border-2 my-4 " >
              <option value="" disabled>Select a category</option>
              <option v-for="category in categoriesData" :key="category.id" :value="category.id" :selected="value">{{ category.name }}</option>
            </Field>
            </div>
        </div>
        <div class="button-container">
          <router-link to="/crudposts" tag="button" class="btn btn-outline-danger">
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
    name: "CreatePost",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      title: yup.string().required("Username is required!"),
      content: yup.string().required("Content is required!"),
      url: yup.string().required("Url is required!"),
      category_id: yup.string().required("Category is required!"),
      
    });

    return {
      loading: false,
      message: "",
      schema,
      //selectedCategory: "",
 
    };
  },
  methods: {
    handlePost(data) {
      const obj = {...data, user_id: this.$store.getters['auth/getAuthId'] }
      this.loading = true;

      this.$store.dispatch("post/addPostItem", obj).then(
        () => {
          this.$router.push("/crudposts");
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
      categoriesData () {
    return this.$store.getters['category/getAllCategories']
    }

  },
    mounted() {
    this.$store.dispatch("category/getCategories")
  },

};
</script>

