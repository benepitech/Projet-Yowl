import api from './api';


class CommentsDataService {
  getAll() {
    return api
    .get("/comments")
    .then((response) => {
      return response.data;
    });
  }

  get(id) {
    return api.get(`/comments/${id}`)
    .then((response) => {
      return response.data;
    });
  }

  create({post_id, user_id, content}) {
    return api.post("/comments", {
      post_id,
      user_id,
      content,
    });
  }

  update({id, post_id, user_id, content}) {
    return api
    .put(`/comments/${id}`, {
      post_id,
      user_id,
      content,
    });
  }

  delete(id) {
    return api.delete(`/comments/${id}`);
  }

  deleteAll() {
    return api.delete(`/comments`);
  }

}

export default new CommentsDataService();