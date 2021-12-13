import api from './api';


class CategoriesDataService {
  getAll() {
    return api
    .get("/categories")
    .then((response) => {
      return response.data;
    });
  }

  get(id) {
    return api.get(`/categories/${id}`)
    .then((response) => {
      return response.data;
    });
  }

  create({name}) {
    return api.post("/categories", {
        name
    });
  }

  update({id, name}) {
    return api.put(`/categories/${id}`, {
        name
    });
  }

  delete(id) {
    return api.delete(`/categories/${id}`);
  }

  deleteAll() {
    return api.delete(`/categories`);
  }

  findByTitle(name) {
    return api.get(`/categories?name=${name}`);
  }
}

export default new CategoriesDataService();