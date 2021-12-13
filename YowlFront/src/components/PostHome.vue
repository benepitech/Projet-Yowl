<template>
  
    <div class="note">
      <div class="left">

        <div class="header">
          <i class="far fa-grin-stars" :style="`color: ${backgColor}`"></i>
          <h4>Posted by {{ note.login }}</h4>
          <h3>
            the {{ note.created_at.slice(0, 10) }} at
            {{ note.created_at.slice(11, 16) }}
          </h3>
        </div>

        <div class="content">
          <h3 class="noteTitle">{{ note.title }}</h3>
          <h3>Category : {{ note.category }}</h3>
          <p v-if="note.content.length < 300">{{ note.content }}</p>
          <p v-else>{{ note.content.slice(0, 300) }}... clic to see more...</p>
          <h3>
            <i
              class="far fa-hand-point-right"
              style="color: rgb(35, 102, 190); font-size: 1.5rem"
            ></i>
            {{ note.url }}
          </h3>
        </div>


        <div class="footer">
          <h3>
            <button
              @click="myLike(note.id)"
              type="submit"
              class="fas fa-thumbs-up btn"
              style="color: green; font-size: 1.5rem"
            ></button>
            {{ note.likes_number }}
          </h3>
        <button v-on:click="goEdit(note.id)">
          <h3>
            <i
              class="far fa-comments"
              style="color: rgb(28, 96, 160); font-size: 1.5rem"
            ></i>
            {{ note.nbComments }} comments
          </h3>
        </button>
        </div>
      </div>

      <div class="right">
        <img src="../assets/p.jpg" alt="photo" />
      </div>
    </div>

</template>

<script>
export default {
  name: 'PostHome',
  data() {

    // variables reactives , mises a jour par vue des que modif
    return {
      backgColor: '',
    }
  },

  props: {
    //L'objet "props" définit quel data est attendu lors du rendu du component
    //recevoir donnee depuis le parent (celui qui appelle ça)
    index: Number,
    key: String,
    note: Object,
  },
  methods: {
    // necessite une intervention de l'user (contrairement a computed)
    goEdit(id) {

      //console.log(id)

      this.$router.push(`/postid/${id}`)
    },
   /* myLike(id) {
    const data = {user_id: this.$store.getters['auth/getAuthId'], post_id: id }
    this.likes.forEach(element => {
      if (element.user_id == this.$store.getters['auth/getAuthId'] && element.post_id == id){
        if(element.liked == 1){
          //put liked to false
          let obj = {id:element.id ,liked: 0, user_id:this.$store.getters['auth/getAuthId'], post_id: id }
          this.$store.dispatch("like/updateLikeItem", obj).then(
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

        }
        else{
          let obj = {id:element.id, liked: 1, user_id:this.$store.getters['auth/getAuthId'], post_id: id}
          this.$store.dispatch("like/updateLikeItem", obj).then(
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
        }
      }
      else{
        let obj = {...data, liked: 1}
        this.$store.dispatch("like/addLikeItem", obj).then(
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
      }
       
    });
      
    } */

  },
  computed: {
  userId () {
    return this.$store.getters['auth/getAuthId']
    },

  
  },

  created() {
    // variables crees dans le component, pour le
    let colors = ['4DA6F4', 'F4BC4D', 'E885DD', '7CF157']
    let rand = Math.floor(Math.random() * 4)
    let backgColor = colors[rand]
    this.backgColor = '#' + backgColor
  },

}
</script>

<style scoped lang="scss">
button {
  cursor: pointer;
}
.note {
  display: flex;
  width: 70rem;
  min-width: 70rem;
  height: 70rem;
  height: 100%;
  padding: 1rem;
  margin: 3rem;
  background-color: rgb(214, 114, 114);
  background-image: linear-gradient(35deg, rgba(240, 240, 240, 0.9));
  border: 2px solid rgb(177, 176, 176);
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 1rem 0 1rem;
}

.header i {
  color: rgb(51, 63, 153);
  font-size: 4rem;
  margin: 0 0.6rem;
}
.left {
  width: 70%;
}

.right {
  width: 30%;
}

.right img {
  width: 90%;
  border: 2px solid black;
  margin: auto;
}
.content {
  width: 97%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
}
.content h3 {
  margin: 0.6rem;
}
.content h3:nth-child(1) {
  font-size: 1.3rem;
}

.content h3:nth-child(2) {
  font-size: 1.2rem;
  color: rgb(51, 63, 153);
}

.content p {
  font-size: 1rem;
  text-align: left;
  border: 1px solid rgb(12, 83, 141);
  padding: 0.3rem;
  margin: 0.6rem;
}

.content h3:nth-child(3) {
  font-size: 1rem;
}

.footer {
  display: flex;
  justify-content: space-around;
  margin: 1rem;
}
</style>
