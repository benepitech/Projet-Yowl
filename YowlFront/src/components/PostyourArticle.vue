<template>
  <div class="home aa">

    <Navbar/>
    <div class=" container flex mb-5 flex-col items-center "> 
      <p class="mt-4 text-5xl ...">Post your Article</p>
      <Form @submit="handlePost" :validation-schema="schema" class="p-5  ">
          
          <div class="form-group">
            <Field name="title" placeholder="Title" type="text"   class="text-White border-2 border-yellow-600 mb-3 bg-white-800 w-56 h-8 rounded-lg"/>   
          </div>
          <div class="form-group">
            <Field v-slot="{ value }" name="category_id" as="select" class="text-White border-2 border-yellow-600 mb-3 bg-white-800 w-56 h-8 rounded-lg" >
                <option value="" disabled>Select a category</option>
                <option v-for="category in categoriesData" :key="category.id" :value="category.id" :selected="value">{{ category.name }}</option>
            </Field>
          </div>

          <div class="form-group">
              <Field name="url" type=text class="text-White border-2 mb-3 border-yellow-600 bg-white-800 w-56 h-8 rounded-lg" placeholder="Url"/> 
              <ErrorMessage name="Select Url" class="error-feedback" />
          </div>
          <div class="form-group">
              <Field name= "content" type=text class="text-White border-2 mb-3 border-yellow-600 bg-white-800 w-56 h-8 rounded-lg" as="textarea" placeholder="Content"/> 
          </div>
          <div class="form-group flex justify-center">
            <button type="submit" class=" justify-center inline-flex items-center bg-yellow-500 text-grey-800 font-bold py-2 px-4 shadow-lg rounded-lg">
                Post
            </button>
          </div>
      </Form>
    </div>
  </div>
<img class = "absolute inset-x-0 bottom-0 w-full" src="../assets/Waves1.png" alt="wave" />


</template>


<script>

// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import * as yup from "yup";
import { Form, ErrorMessage, Field } from "vee-validate";

export default {
  name: 'Home',
  components: {
    Navbar,
    Form,
    ErrorMessage,
    Field,
  },
  data() {
    const schema = yup.object().shape({
      title: yup.string().required(""),
      content: yup.string().required("Content is required!"),
      url: yup.string().required("Url is required!"),
      category_id: yup.string().required("Category is required!"),
      
    });

    return {
      loading: false,
      message: "",
      schema,
 
    };
  },
  methods: {
  
    handlePost(data) {console.log(data)
      const obj = {...data, user_id: this.$store.getters['auth/getAuthId'] }
      this.loading = true;

      this.$store.dispatch("post/addPostItem", obj).then(
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
}


</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300&display=swap');
.aa{font-family: "Outfit";}
</style>
