import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { eq } from "drizzle-orm";

import { supabase } from "@/lib/supabase";
import { db, schema } from "@/lib/db";

const refreshToken = async (refresh_token: string) => {
  if (!refresh_token) {
    throw new Error("No refresh token");
  }

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token,
  });

  if (error) throw error;
  if (!data.session) throw new Error("No refreshed session");
  if (!data.user) throw new Error("No refreshed user");

  return {
    session: data.session,
    user: data.user,
  };
};

const getUserData = async (userId: string) => {
  const [userData] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, userId));

  if (!userData) throw new Error("No user data");

  return userData;
};

export const auth = (app: Elysia) =>
  app
    .use(cookie())
    .derive(async ({ setCookie, cookie: { access_token, refresh_token } }) => {
      if (!access_token && !refresh_token) {
        return {
          user: null,
        };
      }

      try {
        const { data, error } = await supabase.auth.getUser(access_token);

        if (error) throw error;
        if (!data?.user) throw new Error("No data");

        const user = await getUserData(data.user.id);
        return {
          user,
        };
      } catch (error) {
        try {
          const refreshed = await refreshToken(refresh_token!);

          setCookie("access_token", refreshed.session.access_token);
          setCookie("refresh_token", refreshed.session.refresh_token);

          const user = await getUserData(refreshed.user.id);
          return {
            user,
          };
        } catch (error) {
          return {
            user: null,
          };
        }
      }
    });
