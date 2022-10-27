import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import DashboardHomeView from "../views/dashboard/DashboardHomeView.vue";
import AdminsView from "../views/dashboard/AdminsView.vue";
import UsersView from "../views/dashboard/UsersView.vue";
import OfficersView from "../views/dashboard/OfficersView.vue";
import TasksView from "../views/dashboard/TasksView.vue";
import ProfileView from "../views/dashboard/ProfileView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      children: [
        {
          path: "",
          name: "dashboard-home",
          component: DashboardHomeView,
        },
        {
          path: "admins",
          name: "dashboard-admins",
          component: AdminsView,
        },
        {
          path: "users",
          name: "dashboard-users",
          component: UsersView,
        },
        {
          path: "officers",
          name: "dashboard-officers",
          component: OfficersView,
        },
        {
          path: "tasks",
          name: "dashboard-tasks",
          component: TasksView,
        },
        {
          path: "profile",
          name: "dashboard-profile",
          component: ProfileView,
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
