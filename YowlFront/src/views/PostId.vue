<template>
  <div>
    <Navbar />
    <div class="container mx-auto max-w-xl py-2 my-10">
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
    <div class="note">
      <div class="infos">
        <div class="left">
          <div class="header">
            <img :src="faceurl" alt="photo" />
            <h4>Posted by {{ content.login }}</h4>
            <h3>
              the {{ content.created_at1 }} at
              {{ content.created_at2 }}
            </h3>
          </div>

          <div class="content">
            <h3 class="noteTitle">{{ content.title }}</h3>
            <h3>Category : {{ content.category }}</h3>
            <p>{{ content.content }}</p>
            <h3>
              <i
                class="far fa-hand-point-right"
                style="color: rgb(35, 102, 190); font-size: 1.5rem"
              ></i>
              <a href="#">{{ content.url }}</a>
            </h3>
          </div>

          <div class="footer">
            <h3>
              <i
                id="likebutton"
                class="fas fa-heart"
                style="font-size: 1.5rem"
                :style="`color: ${likeColor}`"
                @click="goLike()"
              ></i>
              {{ likeNb }}
            </h3>
            <h3>
              <i
                class="far fa-comments"
                style="color: rgb(28, 96, 160); font-size: 1.5rem"
              ></i>
              {{ content.nbComments }} comments
            </h3>
          </div>
        </div>

        <div class="right">
          <img src="../assets/p.jpg" alt="photo" />
        </div>
      </div>
      <div class="comments">
        <h3>Comments :</h3>
        <div v-for="comm in comms" :key="comm.id">
          <div class="vif" v-if="content.id == comm.post_id">
            <h5>Posted by {{ comm.login }}</h5>
            <h5>
              the {{ comm.created_at.slice(0, 10) }} at
              {{ comm.created_at.slice(11, 16) }}
            </h5>
            <p :comm="comm">{{ comm.content }}</p>
          </div>
        </div>
      </div>
      <div class="addcomment">
        <Form @submit="handleComment" :validation-schema="schema">
          <div class="form-group">
            <Field
              name="content"
              placeholder="Enter your comment"
              type="text"
              as="textarea"
              class="search task"
            />
            <ErrorMessage name="title" class="error-feedback" />
            <div class="button-container">
              <button type="submit" class="btn btn-outline-success">
                Save
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

import PostsService from '../services/posts.service'
import CommentsService from '../services/comments.service'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'PostId',

  components: {
    Navbar,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      content: yup.string().required('Content is required!'),
    })
    return {
      loading: false,
      message: '',
      schema,
      content: {},
      comms: [],
      faceurl: '',
      likeColor: 'rgb(28, 96, 160)',
      likeNb: '',
    }
  },
  computed: {
    get(id) {
      return this.$store.getters.getPostbyid(id)
    },
    getAllComments() {
      return this.$store.getters.getAllComments
    },
    userId() {
      return this.$store.getters['auth/getAuthId']
    },
  },

  mounted() {
    let id = this.$route.params.id
    //console.log(id)

    PostsService.get(id).then(
      (response) => {
        this.content = response.data.post
        //console.log(this.content)
        //console.log(typeof this.content.created_at)
        this.content.created_at1 = this.content.created_at.slice(0, 10)
        this.content.created_at2 = this.content.created_at.slice(11, 16)
        this.likeNb = this.content.likes_number
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

    CommentsService.getAll().then(
      (response) => {
        this.comms = response.data.comments
        //console.log(this.comms)
        //console.log(this.comms[0].login)
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
  methods: {
    handleComment(data) {
      const obj = {
        ...data,
        user_id: this.$store.getters['auth/getAuthId'],
        post_id: parseInt(this.content.id),
      }
      this.loading = true
      //console.log(obj)
      this.$store.dispatch('comment/addCommentItem', obj).then(
        () => {
          location.reload()
        },
        (error) => {
          this.loading = false
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        }
      )
    },
    displayFace() {
      fetch('https://randomuser.me/api/')
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.results[0].picture.medium)
          this.faceurl = data.results[0].picture.medium
        })
    },
    goLike() {
      let likeButton = document.querySelector('#likebutton')
      // console.log(likeButton)
      if (likeButton.classList.contains('fa-thumbs-up')) {
        likeButton.classList.toggle('fa-thumbs-up')
        this.likeColor = 'rgb(28, 96, 160)'
        this.likeNb--
      } else {
        likeButton.classList.toggle('fa-thumbs-up')
        this.likeColor = 'green'
        this.likeNb++
      }
    },
  },
  created: function () {
    this.displayFace()
  },
}
</script>

<style scoped lang="scss">
button {
  cursor: pointer;
}

.infos {
  display: flex;
  height: auto;
}
.note {
  display: flex;
  flex-direction: column;
  width: 70rem;
  min-width: 70rem;
  height: auto;
  padding: 1rem;
  margin: auto;
  margin-bottom: 4rem;
  background-color: rgb(214, 114, 114);
  background-image: linear-gradient(
    35deg,
    rgba(233, 233, 233, 0.01),
    rgba(240, 240, 240, 0.9)
  );
  border: 2px solid rgb(177, 176, 176);
}

.header {
  display: flex;
  justify-content: space-around;
  margin: 1rem 1rem 0 1rem;
}

.header img {
  height: 6rem;
  border: 2px solid rgb(12, 83, 141);
  border-radius: 5px;
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
  display: flex;
  align-items: center;
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

a {
  font-size: 1rem;
  margin-left: 1rem;
}

.footer {
  display: flex;
  justify-content: space-around;
  margin: 1rem;
}

.info {
  height: 100%;
}

.comments {
  margin: 1rem;
  h3 {
    text-align: center;
    font-size: 1.2rem;
    color: rgb(51, 63, 153);
    margin: 1rem;
  }

  h5 {
    font-size: 0.8rem;
    color: rgb(100, 101, 112);
  }
}

.vif {
  border: 1px solid black;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
form {
}
.addcomment {
  width: 95%;
  margin-left: 10rem;
}

.search {
  background-color: transparent;
  border: 2px solid rgb(51, 63, 153);
  width: 70%;
  border-radius: 10px;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  margin: 1rem;
  color: rgb(8, 40, 68);
}

.search::placeholder {
  color: rgb(100, 101, 112);
}

.search:focus {
  outline: none;
}

.button-container {
  margin-top: 1.8rem;
}

.form-group {
  display: flex;
}
</style>
