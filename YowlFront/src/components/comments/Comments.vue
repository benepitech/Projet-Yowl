<template>
  <div class="row">
    <Navbar/>
    <div class="col-md-12  mt-5">

      <table
        v-if="commentsData != undefined"
        class="table table-hover  table-striped  border shadow-lg"
      >
        <thead>
          <th>#id</th>
          <th>Content</th>
          <th>User / Id</th>
          <th>Post id</th>
          <th>Creation date / Updated at</th>
          <th>Actions</th>

        </thead>
        <tbody>
          <comment
            v-for="comment in commentsData"
            :key="comment.id"
            :comment="comment"
          />
        </tbody>
      </table>
      <div v-else class="alert alert-primary border-0">No Result</div>

    </div>
  </div>
</template>

<script>
import Comment from "./Comment";
import Navbar from '../Navbar.vue'
export default {
  components: {
    Comment, Navbar
  },
  data: function () {
    return {
      comments: []
    }
  },
computed: {
  commentsData () {
    return this.$store.getters['comment/getAllComments']
    }
  },
  mounted() {
    this.$store.dispatch("comment/getComments")
  },
  
};
</script>
