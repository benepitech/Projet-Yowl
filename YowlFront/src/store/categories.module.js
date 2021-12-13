import categoriesService from "../services/categories.service";

export const category = {
    namespaced: true,
    state : {
    categoryItems: []
    },
    actions : {
        getCategories ({ commit }) {
            return categoriesService.getAll()
            .then((response) => {
                commit('UPDATE_CATEGORY_ITEMS', response.data?.categories)
            });
            },
        addCategoryItem ({ commit }, categoryItem) {
            return categoriesService.create(categoryItem)
            .then((response) => {
            commit('UPDATE_CATEGORY_ITEMS', response.data)
            });
        },
        updateCategoryItem ({ commit }, categoryItem) {
            return categoriesService.update(categoryItem)
            .then((response) => {
                commit('UPDATE_CATEGORY_ITEMS', response.data)
            });
        },
        removeCategoryItem ({ commit }, categoryItem) {
            return categoriesService.delete(categoryItem)
            .then((response) => {
            commit('UPDATE_CATEGORY_ITEMS', response.data)
        });
        },
        removeAllCategoryItems ({ commit }) {
            return categoriesService.deleteAll()
            .then((response) => {
            commit('UPDATE_CATEGORY_ITEMS', response.data)
        });
        }
    },

    mutations : {
        UPDATE_CATEGORY_ITEMS (state, payload) {
            state.categoryItems = payload;
        },
        DELETE_CATEGORY(state, id) {
            let index = state.categories.findIndex((elem) => elem.id === id);
            state.categories.splice(index, 1);
        }
    },
    getters : {
        getAllCategories: state => {
          return state.categoryItems
        }
    }
}
