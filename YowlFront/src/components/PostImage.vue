<template>
  <div class="home aa">
  
  <Navbar/>
<p class="m-7 text-5xl ...">Post an Image/Video</p>
<div>
<input type=text class="text-White border-2 border-red-800 bg-white-800 w-56 h-8 rounded-lg" placeholder="Title"> 
<h1></h1>
<p class="P-6 text-5xl ..."></p>
</div>


<p class="mb-6 text-5xl ..."></p>
<input type=text class="text-White border-2 border-red-800  bg-white-800 h-8 w-56 rounded-lg" placeholder="Insert Here"> 
<p class="mb-6 text-5xl ..."></p>
<button class="bg-yellow-500  text-grey-800 font-bold py-2 px-4 border shadow-lg rounded-lg">
  Post
</button>

    <img class = "absolute inset-x-0 bottom-0" src="../assets/Waves1.png" alt="wave" >
    
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'


export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300&display=swap');
.aa{font-family: "Outfit";}
</style>
