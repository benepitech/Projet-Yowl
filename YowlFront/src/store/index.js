
import { createStore } from "vuex";
import { auth } from "./auth.module";
import { post } from "./posts.module";
import { comment } from "./comments.module";
import { category } from "./categories.module";
import { user } from "./users.module"
import { like } from "./likes.module"


const store = createStore({
  modules: {
    auth, post, comment, category, user, like
  },
});

export default store;