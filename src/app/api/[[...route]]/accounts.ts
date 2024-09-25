import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
  return c.text("hello account");
});

export default app;
