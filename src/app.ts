// Definitions
import * as core from "express-serve-static-core";

export interface IErrorWithStatus extends Error {
  status: number;
 }

import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as createError from "http-errors";
import * as logger from "morgan";
import * as sassMiddleware from "node-sass-middleware";
import * as path from "path";

import indexRouter from "./routes/index";
import schemaRouter from "./routes/schema";

const application = express();

const configureApp = async (app: core.Application) => {

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(sassMiddleware({
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
    src: path.join(__dirname, "public"),
  }));
  app.use(express.static(path.join(__dirname, "public")));
  return app;
};

const configureRoutes = async (app: core.Application) => {
  app.use("/", indexRouter);
  app.use("/schema", await schemaRouter());
  return app;
};

const configureErrorHandling = async (app: core.Application) => {
  // catch 404 and forward to error handler
  app.use((_: Express.Request, __: Express.Response, next: core.NextFunction) => {
    next(createError(404));
  });

  // error handler
  app.use((err: IErrorWithStatus, req: core.Request, res: core.Response) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
  return app;
};

configureApp(application)
  .then(configureRoutes)
  .then(configureErrorHandling);

module.exports = application;
