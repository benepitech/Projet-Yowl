import AuthService from '../services/auth.service';
import tokenService from "../services/token.service";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {

      return AuthService.login(user).then(
        data => {
          commit('loginSuccess', data);
          return Promise.resolve(data);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    refreshtoken({ commit }, token) {
      commit('refreshtoken', token);
    }
    
  },
  mutations: {
    loginSuccess(state, data) {
      tokenService.setUser(data.data);
      state.status.loggedIn = true;
      state.user = data.data;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;

    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    refreshtoken(state, token) {
      state.status.loggedIn = true;
      state.user = { ...state.user, token: token };
    }
  },
  getters : {
    getAuthId: state => {
        return state.user.id
  }
}
}