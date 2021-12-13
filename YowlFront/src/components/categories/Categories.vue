<template>
  <div class="row">
<Navbar/>
    <div class="col-md-6  ml-5 mt-5">
                      <router-link
        to="/crudcreatecategories"
        tag="button"
        class="bg-yellow-500  text-grey-800 font-bold py-2 px-4  shadow-lg rounded-lg float-right mb-2 mx-4"
      >
        New category
      </router-link>

      <table
        v-if="categoriesData != undefined"
        class="table table-hover  table-striped  border shadow-lg"
      >
        <thead>
          <th>#id</th>
          <th>name</th>
          <th>Actions</th>

        </thead>
        <tbody>
          <category
            v-for="category in categoriesData"
            :key="category.id"
            :category="category"
          />
        </tbody>
      </table>
      <div v-else class="alert alert-primary border-0">No Result</div>

    </div>
  </div>
</template>

<script>
import Category from "./Category";
import Navbar from '../Navbar.vue'
export default {
  components: {
    Category, Navbar
  },
  data: function () {
    return {
      categories: []
    }
  },
computed: {
  categoriesData () {
    return this.$store.getters['category/getAllCategories']
    }
  },
  mounted() {
    this.$store.dispatch("category/getCategories")
    console.log(this.$store.dispatch("category/getCategories"));
    console.log(this.$store.getters['category/getAllCategories']);
  },
  
};
</script>
