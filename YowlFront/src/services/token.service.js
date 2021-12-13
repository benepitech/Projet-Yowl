class tokenService {
    getLocalRefreshtoken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.refreshtoken;
    }
  
    getLocaltoken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.token;
    }
  
    updateLocaltoken(token) {
      let user = JSON.parse(localStorage.getItem("user"));
      user.token = token;
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    }
  
    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    removeUser() {
      localStorage.removeItem("user");
    }
  }
  
  export default new tokenService();