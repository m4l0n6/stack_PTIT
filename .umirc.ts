import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: "/login",
      component: "@/pages/Login/index",
    },
    {
      path: "/register",
      component: "@/pages/Resgister/index",
    },
    {
      path: "/",
      component: "@/layouts/BasicLayout",
      routes: [
        { path: "/", component: "@/pages/index", },
        { path: 'questions', component: "@/pages/Questions/index", },
      ],
    },
    {
      path: "*",
      component: "@/pages/404",
    },
  ],

  npmClient: "npm",
  tailwindcss: {},
  plugins: [
    "@umijs/plugins/dist/model", // 
    "@umijs/plugins/dist/tailwindcss"
  ],
  model: {},
});
