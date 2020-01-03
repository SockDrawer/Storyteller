import * as core from "express-serve-static-core";

import { Router } from "express";

import * as klaw from "klaw";
import { join } from "path";

const getSchemas = async (): Promise<Map<string, string>> => {
  const schemas: Map<string, string> = new Map();
  const base = join(__dirname, "../schemas");
  for await (const file of klaw(base)) {
    if (/[.]schema[.]json/.test(file.path)) {
      schemas.set(file.path.substring(base.length + 1), file.path);
    }
  }
  return schemas;
};

const getRouter = async () => {
  // Init router and path
  const router = Router();

  router.get("/", async (req: core.Request, res: core.Response) => {
    const schemas = await getSchemas();
    res.render("schemas/index", {
      baseurl: req.baseUrl,
      schemas: Array(schemas.entries()).map(([k, _]) => k[0]),
      title: "Schemas",
    });
  });

  router.get(/(.{1,})/, async (req: core.Request, res: core.Response) => {
    const schemas = await getSchemas();
    let path = req.params[0];
    if (path[0] === "/") {
      path = path.substring(1);
    }
    const schema = schemas.get(path);
    if (!schema) {
      res.status(404).send(`Schema ${path} not found`);
    } else  {
      res.status(200).sendFile(schema);
    }
  });

  return router;
};

// Export the router retreival function
export default getRouter;
