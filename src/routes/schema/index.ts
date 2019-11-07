import * as core from "express-serve-static-core";

import { Router } from "express";

const prepare = async () => {
  const router = Router();

  router.get("/", (_: core.Request, res: core.Response, __: core.NextFunction) => {
    res.render("index", { title: "Express Schemas" });
  });
}

export default prepare;