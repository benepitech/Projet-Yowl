<template>
  <div class="container">
    <Navbar/>
    <header class="jumbotron">
      <h1>
         Your Profile
      </h1>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.token.substring(0, 20)}} ... {{currentUser.token.substr(currentUser.token.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <div>
      <strong>Email:</strong>
      {{currentUser.email}}
      <router-link
        :to="'/updateemail/' + currentUser.id"
        tag="button"
        class="bg-yellow-500  text-grey-800 font-bold py-2 px-4  shadow-lg rounded-lg float-right mb-2 mx-4"
      >
        Edit Your Email
      </router-link>
     
    </div>
    <strong>Authorities:</strong>
    <ul>
      <li v-if="currentUser.status == 0">User</li>
      <li v-else>Admin</li>
    </ul>

        <div  id="notes">
      
                <PostHome  v-for="note in postsData" :key="note.id" :note="note" />
    
     

    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import PostHome from '../components/PostHome.vue'
export default {
  name: 'Profile',
  data() {
    return {
      user_id : this.$store.getters['auth/getAuthId'],
      posts : this.$store.getters['post/getAllPosts']
    }
  },
  components:{
    Navbar, PostHome,
  }, 
  computed: {
      userId () {
    return this.$store.getters['auth/getAuthId']

    },
    currentUser() {
      return this.$store.state.auth.user;
    },

    postsData () {
      return this.posts.filter(i => i.user_id == this.$store.getters['auth/getAuthId'])
  }
},
methods: {
  updateEmail() {

  }
},
  mounted() {
    this.$store.dispatch("post/getPosts");
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    console.log();
    
  }
};
</script>

