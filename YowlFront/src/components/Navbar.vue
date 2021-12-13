<template>
<div>
  <!-- This example requires Tailwind CSS v2.0+ -->


    <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10 px-5 bg-red-800" >
      <div class="flex justify-start lg:w-0 lg:flex-1">
        <router-link to="/home" class="nav-link">
          <span class="sr-only">Workflow</span>
          <img class="h-8 w-auto sm:h-10 mx-4" src="../assets/logo.png" alt="">
        </router-link>
      </div>

      <nav class="hidden  md:flex space-x-10">
       <input type=text class="text-white mx-auto bg-red-800 placeholder-white" placeholder="Search for anything"> 

       <div class="navbar-nav mr-auto">
   
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/dashboard" class="whitespace-nowrap text-base font-medium text-white -500 ">DashBoard</router-link>
        </li>

      </div>



      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="whitespace-nowrap text-base font-medium text-white -500 ">
            
            {{ currentUser.login }}
          </router-link>
        </li>
        </div>
        <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="whitespace-nowrap text-base font-medium text-white -500 " @click.prevent="logOut">
             LogOut
          </a>
        </li>
      </div>
        </nav>
            <div v-if="!currentUser" class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">

          <router-link to="/register" class="whitespace-nowrap text-base font-medium text-white -500 ">
             Sign Up
          </router-link>


          <router-link to="/login" class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2  border-transparent text-white -500 text-base font-medium text-yellow">
             Login
          </router-link>

      </div>

    </div>


  


</div>
</template>

<script>


export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['status']) {
        return this.currentUser['status'].includes('1');
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/home');
    }
  },

};
</script>

<style>


</style>
