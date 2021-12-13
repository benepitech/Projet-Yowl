import postsService from "../services/posts.service";

export const post = {
  namespaced: true,
  state: {
    postItems: [],
  },
  actions: {
    getPostsPage({ commit }) {
      return postsService.getAllPage().then((response) => {
        commit('UPDATE_POST_ITEMS', response.data?.posts)
      })
    },

    getPosts({ commit }) {
      return postsService.getAll().then((response) => {
        commit('UPDATE_POST_ITEMS', response.data?.posts)
      })
    },
    getPostbyid({ commit }) {
      return postsService.get().then((response) => {
        commit('UPDATE_POST_ITEMS', response.data?.posts)
      })
    },

    addPostItem({ commit }, PostItem) {
      return postsService.create(PostItem).then((response) => {
        commit('UPDATE_POST_ITEMS', response.data)
      })
    },
    updatePostItem({ commit }, PostItem) {
      return postsService.update(PostItem).then((response) => {
        commit('UPDATE_POST_ITEMS', response.data)
      })
    },
    removePostItem({ commit }, PostItem) {
      console.log(commit)
      return postsService.delete(PostItem)
    },
    removeAllPostItems({ commit }) {
      return postsService.deleteAll().then((response) => {
        commit('UPDATE_POST_ITEMS', response.data)
      })
    },
  },

  mutations: {
    UPDATE_POST_ITEMS(state, payload) {
      state.postItems = payload
    },
    DELETE_POST(state, id) {
      let index = state.posts.findIndex((elem) => elem.id === id)
      state.posts.splice(index, 1)
    },
  },
  getters: {
    getAllPosts: (state) => {
      return state.postItems
    },

  }
}

