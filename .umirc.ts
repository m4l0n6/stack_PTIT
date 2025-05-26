import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: "/auth",
      component: "@/layouts/AuthLayout",
      routes: [
        {
          path: "/auth/login",
          component: "@/pages/Auth/Login/index",
        },
        {
          path: "/auth/register",
          component: "@/pages/Auth/Register/index",
        },
      ],
    },
    {
      path: "/",
      component: "@/layouts/BasicLayout",
      routes: [
        { path: "/", component: "@/pages/index" },
        { path: "questions", component: "@/pages/Questions/index" },
        { path: "question/:id", component: "@/pages/Question/Detail" },
        { path: "tags", component: "@/pages/Tags/index" },
        {
          path: "ask",
          component: "@/pages/Question/Create",
          wrappers: ["@/wrappers/auth"],
        },
        { path: "profile", component: "@/pages/Profile/index" },
      ],
    },
    {
      path: "dashboard",
      component: "@/layouts/AdminLayout",
      routes: [{ path: "dashboard", component: "@/pages/Admin/Dashboard" }],
      wrappers: ["@/wrappers/auth"],
    },
    {
      path: "*",
      component: "@/pages/404",
    },
  ],

  npmClient: "npm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/model", "@umijs/plugins/dist/tailwindcss"],
  model: {},
  mock: {
    include: ["src/mock/**/*.ts"],
  },
});
