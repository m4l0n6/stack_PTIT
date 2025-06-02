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
    },    {
      path: "/",
      component: "@/layouts/BasicLayout",
      routes: [
        { path: "/", component: "@/pages/index" },
        { path: "questions", component: "@/pages/Questions/index" },
        { path: "questions/tagged/:tagname", component: "@/pages/Questions/TaggedQuestions" },
        { path: "question/:id", component: "@/pages/Question/Detail" },
        { path: "tags", component: "@/pages/Tags/index" },
        {
          path: "ask",
          component: "@/pages/Question/Create",
          wrappers: ["@/wrappers/auth", "@/wrappers/roleAuth"],
          allowedRoles: ["teacher", "student"],
        },        {
          path: "users/:id/:name",
          component: "@/pages/Profile/index",
          wrappers: ["@/wrappers/auth", "@/wrappers/roleAuth"],
          allowedRoles: ["teacher", "student"],
          routes: [
            { path: "saves", component: "@/pages/Profile/components/Saves" },
            {
              path: "edit",
              component: "@/pages/Profile/components/Setting/ProfileSetting",
            },
            {
              path: "account",
              component: "@/pages/Profile/components/Setting/AccountSetting",
            },
            {
              path: "preferences",
              component:
                "@/pages/Profile/components/Setting/PreferencesSetting",
            },
          ],
        },
      ],
    },
    {
      path: "dashboard",
      component: "@/layouts/AdminLayout",
      routes: [
        { path: "", component: "@/pages/Admin/Dashboard" },
        { path: "users", component: "@/pages/Admin/Users" },
        {
          path: "questions",
          component: "@/pages/Admin/Questions",
          allowedRoles: ["admin"],
        },
      ],
      wrappers: ["@/wrappers/auth", "@/wrappers/roleAuth"],
      allowedRoles: ["admin"],
    },
    {
      path: "*",
      component: "@/pages/404",
    },
    {
      path: "/403",
      component: "@/pages/403",
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
