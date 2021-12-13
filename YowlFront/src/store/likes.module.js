import likesService from "../services/likes.service";

export const like = {
    namespaced: true,
    state : {
    likeItems: []
    },
    actions : {
        getLikes ({ commit }) {
            return likesService.getAll()
            .then((response) => {
                commit('UPDATE_LIKE_ITEMS', response.data?.likes)
            });
            },
        getLikeById({ commit }) {
            return likesService.getById()
                .then((response) => {
                    commit('UPDATE_LIKE_ITEMS', response.data?.likes)
                });
        },
        getLikeByUser({ commit }) {
            return likesService.getByUser()
                .then((response) => {
                    commit('UPDATE_LIKE_ITEMS', response.data?.likes)
                });
        },
        getLikeByPost({ commit }) {
            return likesService.getByPost()
                .then((response) => {
                    commit('UPDATE_LIKE_ITEMS', response.data?.likes)
                });
        },
        addLikeItem ({ commit }, LikeItem) {
            
            return likesService.create(LikeItem)
            .then((response) => {
            commit('UPDATE_LIKE_ITEMS', response.data)
            });
        },
        updateLikeItem ({ commit }, LikeItem) {
            return likesService.update(LikeItem)
            .then((response) => {
                commit('UPDATE_LIKE_ITEMS', response.data)
            });
        },
        removeLikeItem ({ commit }, LikeItem) {
            console.log(commit)
            return likesService.delete(LikeItem)
        
        },
        removeAllLikeItems ({ commit }) {
            return likesService.deleteAll()
            .then((response) => {
            commit('UPDATE_LIKE_ITEMS', response.data)
        });
        }
    },

    mutations : {
        UPDATE_LIKE_ITEMS (state, payload) {
            state.likeItems = payload;
        },
        DELETE_LIKE(state, id) {
            let index = state.likes.findIndex((elem) => elem.id === id);
            state.likes.splice(index, 1);
        }
    },
    getters : {
        getAllLikes: state => {
            return state.likeItems
           },

    }
}   
               
