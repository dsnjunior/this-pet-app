import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";
import { eq, lt, gte, ne } from "drizzle-orm";

import { Template } from "@/components/template";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const onboarding = (app: Elysia) =>
  app.group("/onboarding", (app) =>
    app
      .use(auth)
      .use(html())
      .get("", async ({ html, user, set }) => {
        if (!user) {
          set.redirect = "/auth/sign-in";
          return null;
        }

        if (user.name) {
          set.redirect = "/onboarding/pets";
          return null;
        }

        return html(
          <Template title="onboarding">
            <Container>
              <Heading
                title="A little about you"
                description="We'll use this information to personalize your experience."
              />
              <form
                hx-encoding="multipart/form-data"
                hx-post=""
                _="on htmx:xhr:progress(loaded, total) set #progress.value to (loaded/total)*100"
                class="space-y-4"
              >
                <div>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={user.name ?? undefined}
                  />
                </div>
                <div>
                  {user.avatar && (
                    <Avatar>
                      <AvatarFallback>DJ</AvatarFallback>
                      <AvatarImage
                        src={
                          supabase.storage
                            .from("avatar-pictures")
                            .getPublicUrl(user.avatar).data.publicUrl
                        }
                        alt={user.name ?? undefined}
                      />
                    </Avatar>
                  )}
                  <Label for="picture">Picture (optional)</Label>
                  <Input type="file" name="picture" id="picture" />
                </div>
                <div>
                  <Button type="submit" _="">
                    Submit
                  </Button>
                </div>

                <progress id="progress" value="0" max="100" class="" />
              </form>
            </Container>
          </Template>
        );
      })
      .post(
        "",
        async ({ user, body, set }) => {
          if (!user) {
            set.redirect = "/auth/sign-in";
            return null;
          }

          const { name, picture } = body;

          const { data, error } = await supabase.storage
            .from("avatar-pictures")
            .upload(user.id, picture);

          if (error) {
            throw error;
          }

          await db
            .update(schema.users)
            .set({
              name,
              avatar: data.path,
            })
            .where(eq(schema.users.id, user.id));

          return null;
        },
        {
          body: t.Object({
            name: t.String({ minLength: 1 }),
            picture: t.File({ maxSize: 1024 * 1024 * 5, type: ["image"] }),
          }),
        }
      )
      .get("/pets", ({ html }) => {
        return html(<Template title="onboarding">TODO</Template>);
      })
  );
