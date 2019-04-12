import Vue, { VueConstructor } from 'vue';
import Router from 'vue-router';
import SessionManage from './providers/SessionManage';
import Login from '@/views/public/Login.vue';
import Home from '@/views/Home.vue';
import UserCreate from '@/views/user/UserCreate.vue';
import UserList from '@/views/user/UserList.vue';
import UserDetail from '@/views/user/UserDetail.vue';
import UserHome from '@/views/user/UserHome.vue';
import ProcessHome from '@/views/process/ProcessHome.vue';
import ProcessCreate from '@/views/process/ProcessCreate.vue';
import ProcessDetail from '@/views/process/ProcessDetail.vue';
import ProcessList from '@/views/process/ProcessList.vue';
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
        component: UserList
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
    path: "/procesos",
    component: ProcessHome,
    children: [
      {
        name: "process",
        path: '',
        component: ProcessList
      }, {
        name: "addProcess",
        path: 'agregar',
        component: ProcessCreate
      },
      {
        name: "detailProcess",
        path: ':idProcess',
        component: ProcessDetail
      }
    ]
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