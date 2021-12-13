<template>
<div>
    <div>
    <Navbar/>
        <div class="inline-flex">
                <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 mt-4 mx-4 border rounded-lg bg-white shadow-lg">
                    <div class="relative flex gap-4">
                        
                        <div class="flex flex-col w-full">
                            <div class="flex flex-row justify-between">
                                <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">Number of Users</p>

                            </div>
                        </div>
                    </div>
                    <p class="-mt-4 text-gray-500">{{ usersData.length }}</p>
                </div>
                <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 mt-4 mx-4 border rounded-lg bg-white shadow-lg">
                    <div class="relative flex gap-4">
                        
                        <div class="flex flex-col w-full">
                            <div class="flex flex-row justify-between">
                                <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">Number of Posts</p>

                            </div>
                        </div>
                    </div>
                    <p class="-mt-4 text-gray-500">{{ postsData.length }}</p>
                </div>
                <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 mt-4 mx-4 border rounded-lg bg-white shadow-lg">
                    <div class="relative flex gap-4">
                        
                        <div class="flex flex-col w-full">
                            <div class="flex flex-row justify-between">
                                <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">Number of Comments</p>

                            </div>
                        </div>
                    </div>
                    <p class="-mt-4 text-gray-500">{{ commentsData.length }}</p>
                </div>
                <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 mt-4 mx-4 border rounded-lg bg-white shadow-lg">
                    <div class="relative flex gap-4">
                        
                        <div class="flex flex-col w-full">
                            <div class="flex flex-row justify-between">
                                <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">Most Commented</p>

                            </div>
                        </div>
                    </div>
                    <p class="-mt-4 text-gray-500">Lorem ipsum dolor sit amet </p>
                </div>
        </div>

    </div>
          <router-link
        to="/crudusers"
        tag="button"
        class="bg-yellow-500 mx-4 text-grey-800 font-bold py-2 px-4 border shadow-lg rounded-lg"
      >
        See all Users
      </router-link>
      <router-link
        to="/crudposts"
        tag="button"
        class="bg-yellow-500 mx-4 text-grey-800 font-bold py-2 px-4 border shadow-lg rounded-lg"
      >
        See all Posts
      </router-link>
                    <router-link
        to="/crudcategories"
        tag="button"
        class="bg-yellow-500 mx-4 text-grey-800 font-bold py-2 px-4 border shadow-lg rounded-lg"
      >
        See all Categories
      </router-link>
                          <router-link
        to="/crudcomments"
        tag="button"
        class="bg-yellow-500 mx-4 text-grey-800 font-bold py-2 px-4 border shadow-lg rounded-lg"
      >
        See all Comments
      </router-link>

</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
    name: "Dashboard",
    components: {
        Navbar,
    },
    
    computed: {
    commentsData () {
        return this.$store.getters['comment/getAllComments']
    },
    postsData () {
        
        return this.$store.getters['post/getAllPosts']
    },
    categoriesData () {
        return this.$store.getters['category/getAllCategories']
    },
    usersData () {
        return this.$store.getters['user/getAllUsers']
    }
  },
  mounted() {
    this.$store.dispatch("comment/getComments")
    this.$store.dispatch("post/getPosts")
    this.$store.dispatch("category/getCategories")
    this.$store.dispatch("user/getUsers")
  
  },
}
</script>