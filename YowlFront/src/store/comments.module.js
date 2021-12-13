import commentsService from "../services/comments.service";

export const comment = {
    namespaced: true,
    state : {
    commentItems: []
    },
    actions : {
        getComments ({ commit }) {
            return commentsService.getAll()
            .then((response) => {
                commit('UPDATE_COMMENT_ITEMS', response.data?.comments)
            });
            },
        addCommentItem ({ commit }, CommentItem) {
            
            return commentsService.create(CommentItem)
            .then((response) => {
            commit('UPDATE_COMMENT_ITEMS', response.data)
            });
        },
        updateCommentItem ({ commit }, CommentItem) {
            return commentsService.update(CommentItem)
            .then((response) => {
                commit('UPDATE_COMMENT_ITEMS', response.data)
            });
        },
        removeCommentItem ({ commit }, CommentItem) {
            console.log(commit)
            return commentsService.delete(CommentItem)
        
        },
        removeAllCommentItems ({ commit }) {
            return commentsService.deleteAll()
            .then((response) => {
            commit('UPDATE_COMMENT_ITEMS', response.data)
        });
        }
    },

    mutations : {
        UPDATE_COMMENT_ITEMS (state, payload) {
            state.commentItems = payload;
        },
        DELETE_COMMENT(state, id) {
            let index = state.comments.findIndex((elem) => elem.id === id);
            state.comments.splice(index, 1);
        }
    },
    getters : {
        getAllComments: state => {
            return state.commentItems
           } 
    }
}   
               
