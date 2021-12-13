<template>

  <div class="row">
<Navbar />
    <div class="col-md-9  mt-5 ml-40">
                <router-link
        to="/crudcreateposts"
        tag="button"
        class="bg-yellow-500  text-grey-800 font-bold py-2 px-4  shadow-lg rounded-lg float-right mb-2 mx-4"
      >
        New post
      </router-link>
      <table
        v-if="postsData != undefined"
        class="table table-hover table-fixed table-striped  border shadow-lg"
      >
        <thead>
          <th>#id</th>
          <th>Title</th>
          <th>Content</th>
          <th>Link of the Post</th>
          <th>Category</th>
          <th>Number of Likes</th>
          <th>User / Id</th>
          <th>Creation date / Updated at</th>
          <th>Actions</th>

        </thead>
        <tbody>
          <post
            v-for="post in postsData"
            :key="post.id"
            :post="post"
          />
        </tbody>
      </table>
      <div v-else class="alert alert-primary border-0">No Result</div>

    </div>
  </div>
</template>

<script>
import Post from "./Post";
import Navbar from '../Navbar.vue'
export default {
  components: {
    Post, Navbar
  },
  data: function () {
    return {
      posts: []
    }
  },
computed: {
  postsData () {
    return this.$store.getters['post/getAllPosts']
    }
  },
  mounted() {
    this.$store.dispatch("post/getPosts")
  },
  
};
</script>
