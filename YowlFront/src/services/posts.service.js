import api from './api';


class PostsDataService {


  getAllPage() {
    return api.get('/posts').then((response) => {
      //console.log(response.data)
      return response.data
    })
  }


  async getAll() {
    try {
      const response = await api
        .get("/posts")
      return response.data;
    } catch(e) {
      console.warn(e);
      return null
    }

  }

  get(id) {
    return api.get(`/posts/${id}`).then((response) => {
      return response.data
    })
  }

  create({ title, content, category_id, user_id, url }) {
    return api
      .post('/posts', {
        title,
        content,
        category_id,
        user_id,
        url,
      })
      .then((response) => {
        return response
      })
  }

  update({ id, title, content, category_id, user_id, url }) {
    console.log(id)
    return api
      .put(`/posts/${id}`, {
        title,
        content,
        category_id,
        user_id,
        url,
      })
      .then((response) => {
        return response
      })
  }

  delete(id) {
    return api.delete(`/posts/${id}`).then((response) => {
      console.log(response)
    })
  }

  deleteAll() {
    return api.delete(`/posts`)
  }

  findByTitle(title) {
    return api.get(`/posts?title=${title}`)
  }
}

export default new PostsDataService();