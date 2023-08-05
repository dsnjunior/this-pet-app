import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

import { Template } from "@/components/template";
import { auth } from "@/libs/auth";

export const dashboard = (app: Elysia) =>
  app.group("/dashboard", (app) =>
    app
      .use(auth)
      .use(html())
      .get("", async ({ html, user, set }) => {
        if (!user) {
          set.redirect = "/auth/sign-in";
          return null;
        }
        return html(<Template title="dashboard">{user?.email}</Template>);
      })
  );
