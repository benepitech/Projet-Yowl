import authService from "../services/auth.service";

export const user = {
    namespaced: true,
    state : {
        userItems: []
    },
    actions : {
        getUsers ({ commit }) {
            return authService.getAll()
            .then((response) => {
                commit('UPDATE_USER_ITEMS', response.data?.users)
            });
            },
        getUserById ({ commit }) {
            return authService.get()
            .then((response) => {
                commit('UPDATE_USER_ITEMS', response.data?.users)
            });
            },

        updateUserItem ({ commit }, UserItem) {
            return authService.update(UserItem)
            .then((response) => {
                commit('UPDATE_USER_ITEMS', response.data)
            });
        },
        removeUserItem ({ commit }, UserItem) {
            console.log(commit)
            return authService.delete(UserItem)
        
        },
        removeAllUserItems ({ commit }) {
            return authService.deleteAll()
            .then((response) => {
            commit('UPDATE_USER_ITEMS', response.data)
        });
        }
    },

    mutations : {
        UPDATE_USER_ITEMS (state, payload) {
            state.userItems = payload;
        },
        DELETE_USER(state, id) {
            let index = state.users.findIndex((elem) => elem.id === id);
            state.users.splice(index, 1);
        }
    },
    getters : {
         getAllUsers: state => {
             return state.userItems
            }            
        }
     
            
 
        
    }
