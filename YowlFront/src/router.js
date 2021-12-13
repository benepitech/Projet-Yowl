import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import PostId from "./views/PostId.vue";
import PostHome from "./components/PostHome.vue";
// import PostHomeTxt from './components/PostHomeTxt.vue';
// import PostHomeImg from './components/PostHomeImg.vue';
// import PostHomeTxtFooter from './components/PostHomeTxtFooter.vue';
// import PostHomeTxtHeader from './components/PostHomeTxtHeader.vue';
// import PostHomeTxtBody from './components/PostHomeTxtBody.vue';
import PostImage from './components/PostImage.vue';
import PostLink from './components/PostLink.vue';
import PostyourArticle from './components/PostyourArticle.vue';
import Posts from "./components/posts/Posts";
import CreatePost from "./components/posts/CreatePost";
import UpdatePost from "./components/posts/UpdatePost";
import Comments from "./components/comments/Comments";
import CreateComment from "./components/comments/CreateComment";
import UpdateComment from "./components/comments/UpdateComment";
import Categories from "./components/categories/Categories";
import CreateCategory from "./components/categories/CreateCategory";
import UpdateCategory from "./components/categories/UpdateCategory";
import Users from "./components/users/Users";
import CreateUser from "./components/users/CreateUser";
import UpdateUser from "./components/users/UpdateUser";
import UpdateEmail from "./components/users/UpdateEmail";


// lazy-loaded
const Profile = () => import("./views/Profile.vue")
const Dashboard = () => import("./views/Dashboard.vue")
const BoardUser = () => import("./views/BoardUser.vue")

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    PostHome,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    PostHome,
  },

  {
    path: '/postid/:id',
    name: 'PostId',
    component: PostId,
  },
  {
    path: '/crudupdateposts/:id',
    name: 'CrudUpdatePosts',
    component: UpdatePost,
    props: (route) => {
      const post_id = route.params.id
      return { post_id }
    },
  },
  {

    path: "/crudcreateposts",
    name: "CrudCreatePosts",
    component: CreatePost
  }, 
  {
    path: "/crudposts",
    name: "Posts",
    component: Posts
  }, 

  {
    path: "/crudupdateusers/:id",
    name: "CrudUpdateUsers",
    component: UpdateUser,
    props: (route) => {
      const user_id = route.params.id;
      return { user_id }
    },  
  },
  {
    path: "/crudcreateusers",
    name: "CrudCreateUsers",
    component: CreateUser
  }, 
  {
    path: "/crudusers",
    name: "Users",
    component: Users
  }, 
  {
    path: "/updateemail/:id",
    name: "UpdateEmail",
    component: UpdateEmail,
    props: (route) => {
      const user_id = route.params.id;
      return { user_id }
    },  
  },


  {
    path: "/crudupdatecategories/:id",
    name: "CrudUpdateCategories",
    component: UpdateCategory,
    props: (route) => {
      const category_id = route.params.id;
      return { category_id }
    },  
  },
  {
    path: "/crudcreatecategories",
    name: "CrudCreateCategories",
    component: CreateCategory
  }, 
  {
    path: "/crudcategories",
    name: "Categories",
    component: Categories
  }, 


  {
    path: "/crudupdatecomments/:id/:post_id",
    name: "CrudUpdateComments",
    component: UpdateComment,
    props: (route) => {
      const comment_id = route.params.id;
      const post_id = route.params.post_id
      return { comment_id, post_id }
    },  
  },
  {
    path: "/crudcreatecomments",
    name: "CrudCreatecomments",
    component: CreateComment
  }, 
  {
    path: "/crudcomments",
    name: "Comments",
    component: Comments
  }, 
    
  {
    path: '/home',
    name: "Home",
    component: Home,
    PostHome,

    // PostHomeTxt,
    // PostHomeImg,
    // PostHomeTxtHeader,
    // PostHomeTxtBody,
    // PostHomeTxtFooter,

  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: Profile,
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: Dashboard,
  },
  {
    path: '/user',
    name: 'user',
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: '/postimage',
    name: 'PostImage',
    component: PostImage,
  },
  {
    path: '/postlink',
    name: 'PostLink',
    component: PostLink,
  },
  {
    path: '/postyourarticle',
    name: 'PostyourArticle',
    component: PostyourArticle,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  const publicPages = ['/','/login', '/register', '/home', '/postid',];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to home page
  if (authRequired && !loggedIn) {
    next('/home');
  } else {
    next();
  }
});