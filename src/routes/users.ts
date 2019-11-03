import * as core from "express-serve-static-core";

import { Router } from "express";

// Init router and path
const router = Router();

router.get("/", (_: core.Request, res: core.Response, __: core.NextFunction) => {
  res.render("index", { title: "Users" });
});

// Export the base-router
export default router;
