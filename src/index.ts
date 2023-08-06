import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";

import { auth } from "@/modules/auth";
import { dashboard } from "@/modules/dashboard";
import { onboarding } from "@/modules/onboarding";

const app = new Elysia()
  .use(staticPlugin())
  .use(auth)
  .use(dashboard)
  .use(onboarding)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
