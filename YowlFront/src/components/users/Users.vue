<template>
  <div class="row">
<Navbar/>
    <div class="col-md-12  mt-5">
                <router-link
        to="/crudcreateusers"
        tag="button"
        class="bg-yellow-500  text-grey-800 font-bold py-2 px-4  shadow-lg rounded-lg float-right mb-2 mx-4"
      >
        New user
      </router-link>
      <table
        v-if="usersData != undefined"
        class="table table-hover  table-striped  border shadow-lg"
      >
        <thead>
          <th>#id</th>
          <th>Username</th>
          <th>Email</th>
          <th>Status</th>
          <th>Creation date / Updated at</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <user
            v-for="user in usersData"
            :key="user.id"
            :user="user"
          />
        </tbody>
      </table>
      <div v-else class="alert alert-primary border-0">No Result</div>

    </div>
  </div>
</template>

<script>
import User from "./User";
import Navbar from '../Navbar.vue'
export default {
  components: {
    User, Navbar
  },
  data: function () {
    return {
      users: []
    }
  },
computed: {
  usersData () {
    return this.$store.getters['user/getAllUsers']
    }
  },
  mounted() {
    this.$store.dispatch("user/getUsers")
  },
  
};
</script>
