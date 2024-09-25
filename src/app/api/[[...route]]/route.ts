import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";
import User from "./user";
import Workspaces from "./workspaces";

const app = new Hono().basePath("/api");
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "Internal Server Error" });
});

const routes = app.route("/user", User).route("/workspaces", Workspaces);
export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export type AppType = typeof routes;
export default routes;
