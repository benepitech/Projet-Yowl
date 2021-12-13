<template>
  <div id=back>
    <Navbar />
    <div class="container mx-auto max-w-xl py-2   my-10">
      <div class="flex justify-center">
<router-link
        to="/postyourarticle"
        tag="button"
        class="bg-yellow-500 mx-4 text-grey-800 font-bold py-2 px-4 border shadow-lg rounded-lg"
      >
        Post your Article
      </router-link>
      </div>
    </div>
    <div  id="notes">
      <PostHome
        v-for="(note, index) in content"
        :index="index"
        :key="note.id"
        :note="note"
      />
    </div>
    
  </div>
</template>

<script>
import PostsService from '../services/posts.service'
import PostHome from '../components/PostHome.vue'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    PostHome,
    Navbar,
  },
  data() {
    return {
      content: [],
      page: 1,
    }
  },
 
  methods: {
    getInitialUsers() {
      PostsService.getAllPage().then(
        (response) => {
          this.content = response.data.posts.data
          console.log('initialUsers')
          console.log(this.content)
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        }
      )
    },
    getNextUser() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight
        if (bottomOfWindow) {
          PostsService.getAllPage().then(
            (response) => {
              this.content.push(...response.data.posts.data)
              console.log('nextUsers')
              console.log(this.content)
            },
            (error) => {
              this.content =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            }
          )
        }
      }
    },
  },
  beforeMount() {
    this.getInitialUsers()
  },
    
  computed: {
  getAllPosts () {
    return this.$store.getters['post/getAllPosts']
    },
   getAllLikes () {
    return this.$store.getters['like/getAllLikes']
    }
  },
  mounted() {
  this.getNextUser()
  
    
  }
}
</script>

<style>
#notes {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 97%;
  min-width: 450px;
  margin: 0;
  padding: 1rem;
}
</style>