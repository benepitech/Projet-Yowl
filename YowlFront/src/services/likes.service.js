import api from './api';


class LikesDataService {
  async getAll() {
    try {
      const response = await api
        .get("/likes")
        console.log(response.data);
      return response.data;
    } catch(e) {
      console.warn(e);
      return null
    }
  }

  getById(id) {
    return api.get(`/likes/${id}`)
    .then((response) => {
      return response.data;
    });
  }

  getByUser(user_id) {
    return api.get(`/likes/${user_id}`)
    .then((response) => {
      return response.data;
    });
  }

  getByPost(post_id) {
    return api.get(`/likes/${post_id}`)
    .then((response) => {
      return response.data;
    });
  }

  create({post_id, user_id, liked}) {
    return api.post("/likes", {
      post_id,
      user_id,
      liked,
    });
  }

  update({id, post_id, user_id, liked}) {
    return api
    .put(`/likes/${id}`, {
      post_id,
      user_id,
      liked,
    });
  }

  delete(id) {
    return api.delete(`/likes/${id}`);
  }

  deleteAll() {
    return api.delete(`/likes`);
  }

}

export default new LikesDataService();