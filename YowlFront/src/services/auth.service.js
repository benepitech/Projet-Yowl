import api from "./api";
import tokenService from "./token.service";

class AuthService {
  //async 
  login({ login, password }) {

   /* try {

      const response = await api
        .post("/login", {
          login,
          password
        })

      return response.data;

    } catch(e) {
      console.warn(e);
      return null
    }
    */
    return api
    .post("/login", {
      login,
      password
    }).then((response) => {
        return response.data;
      });
  }

  logout() {
    tokenService.removeUser();
  }

  register({ login, email, password, password_confirmation, status }) {
    return api.post("/register", {
      login,
      email,
      password,
      password_confirmation,
      status
    });
  }
  update({id, login, email, password, password_confirmation}) {
    return api.put(`/users/${id}`, {
        login,
        email,
        password,
        password_confirmation,
    });
  }
  getAll() {
    return api
    .get("/users")
    .then((response) => {
      return response.data;
    });
  }

  get(id) {
    return api.get(`/users/${id}`)
    .then((response) => {
      return response.data;
    });
  }
  delete(id) {
    return api.delete(`/users/${id}`)
      .then((response) => {
        console.log(response);
      });
  }
}

export default new AuthService();