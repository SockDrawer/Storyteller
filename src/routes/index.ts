import * as core from "express-serve-static-core";

import { Router } from "express";
import UserRouter from "./users";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/users", UserRouter);

router.get("/", (_: core.Request, res: core.Response, __: core.NextFunction) => {
  res.render("index", { title: "Express" });
});

// Export the base-router
export default router;
