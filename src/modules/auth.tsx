import { Elysia, t } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

import { supabase } from "@/libs/supabase";
import { auth as authLib } from "@/libs/auth";
import { db, schema } from "@/libs/db";

import { Template } from "@/components/template";

export const auth = (app: Elysia) =>
  app.group("/auth", (app) =>
    app
      .use(authLib)
      .use(html())
      .use(
        cookie({
          httpOnly: true,
          sameSite: true,
        })
      )
      .model({
        sign: t.Object({
          email: t.String({
            format: "email",
          }),
          password: t.String({
            minLength: 8,
          }),
        }),
      })
      .get("/sign-up", ({ html, user, set }) => {
        if (user) {
          set.redirect = "/dashboard";
          return null;
        }
        return html(
          <Template title="sign up">
            <form hx-trigger="submit" hx-post="" hx-swap="outerHTML">
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  class="block border-2"
                  placeholder="Email"
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  class="block border-2"
                  placeholder="Password"
                />
              </label>
              <button class="block" type="submit">
                <span>Sign up</span>
              </button>
              <i
                data-lucide="loader2"
                class="htmx-indicator w-6 h-6 animate-spin"
              />
            </form>
          </Template>
        );
      })
      .post(
        "/sign-up",
        async ({ body, html }) => {
          const { data, error } = await supabase.auth.signUp({
            email: body.email,
            password: body.password,
            options: {
              emailRedirectTo: "http://localhost:3000/auth/sign-in",
            },
          });

          if (error) return error;

          if (!data.user) return new Error("No user");

          await db.insert(schema.users).values({
            email: data.user.email ?? body.email,
            id: data.user.id,
            name: "",
          });

          return html(
            <div>
              <h1>Check your email</h1>
              <p>
                We sent a confirmation email to <b>{data.user.email}</b>.
              </p>
              <p>
                Click the link in the email to confirm your email address and
                complete the sign up process.
              </p>
            </div>
          );
        },
        { body: "sign" }
      )
      .get("/sign-in", ({ html, user, set }) => {
        if (user) {
          set.redirect = "/dashboard";
          return null;
        }
        return html(
          <Template title="sign in">
            <form hx-trigger="submit" hx-post="">
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  class="block border-2"
                  placeholder="Email"
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  class="block border-2"
                  placeholder="Password"
                />
              </label>
              <button class="block" type="submit">
                <span>
                  Sign in
                  <i
                    data-lucide="loader2"
                    class="htmx-indicator w-6 h-6 animate-spin"
                  />
                </span>
              </button>
            </form>
          </Template>
        );
      })
      .post(
        "/sign-in",
        async ({ setCookie, body, set }) => {
          const { data, error } = await supabase.auth.signInWithPassword(body);

          if (error) return error;

          setCookie("access_token", data.session.access_token);
          setCookie("refresh_token", data.session.refresh_token);

          set.headers["HX-Redirect"] = "/dashboard";
        },
        { body: "sign" }
      )
  );
