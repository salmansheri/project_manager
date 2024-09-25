import { users } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { Hono } from "hono";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import bcrypt from "bcryptjs";
const app = new Hono()
  .get("/", (c) => {
    return c.text("hello user");
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    ),
    async (c) => {
      const values = c.req.valid("json");
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(values.password, salt);

      const [data] = await db
        .insert(users)
        .values({
          id: createId(),
          email: values.email,
          password: hashedPassword,
        })
        .returning();
      if (!data) {
        return c.json(
          {
            error: "Cannot create User",
          },
          400,
        );
      }
      return c.json(
        {
          data,
        },
        200,
      );
    },
  );

export default app;
