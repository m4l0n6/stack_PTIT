import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: "/login",
      component: "@/pages/Auth/Login/index",
    },
    {
      path: "/register",
      component: "@/pages//Auth/Resgister/index",
    },
    {
      path: "/",
      component: "@/layouts/BasicLayout",
      routes: [
        { path: "/", component: "@/pages/index" },
        { path: "questions", component: "@/pages/Questions/index" },
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
