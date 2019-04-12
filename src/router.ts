import Vue, { VueConstructor } from 'vue';
import Router from 'vue-router';
import SessionManage from './providers/SessionManage';
import Login from '@/views/public/Login.vue';
import Home from '@/views/Home.vue';
import UserCreate from '@/views/user/UserCreate.vue';
import Users from '@/views/user/Users.vue';
import UserDetail from '@/views/user/UserDetail.vue';
import UserHome from '@/views/user/UserHome.vue';
import ProcessCreate from '@/views/process/ProcessCreate.vue';
import ResetPassword from '@/views/public/ResetPassword.vue';

Vue.use(Router);
const routesConfig: {
  [name: string]: boolean
} = {
  "reset": true,
  "login": true,
  "notFound": true
}
const routes = [
  {
    path: "/usuarios",
    component: UserHome,
    children: [
      {
        name: "users",
        path: '',
        component: Users
      }, {
        name: "addUser",
        path: 'agregar',
        component: UserCreate
      },
      {
        name: "detailUser",
        path: ':idUser',
        component: UserDetail
      }
    ]
  },
  {
    name: "process",
    path: "/procesos",
    component: ProcessCreate
  },
  {
    name: "home",
    path: "/home",
    component: Home
  },
  {
    name: "reset",
    path: "/recuperar-contraseña/:token",
    component: ResetPassword
  },
  {
    name: "loginRedirect",
    path: "/login",
    redirect: "/"
  },
  {
    name: "login",
    path: "/",
    component: Login
  },
  {
    name: "notFound",
    path: "*",
    component: () => import('@/views/public/PageNotFound.vue')
  }
]

const RouterInstance = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
});

RouterInstance.beforeEach((to, from, next) => {
  if (!to.name) {
    next(false)
    return
  }
  if (to.name == "notFound") {
    next()
    return
  }
  if (SessionManage.get()) {
    (routesConfig[to.name]) ? next({ path: "/home" }) : next()
  } else {
    (routesConfig[to.name]) ? next() : next({ name: "notFound" })
  }
})

export default RouterInstance