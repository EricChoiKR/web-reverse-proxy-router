import * as express from "express";
import * as subdomain from "express-subdomain";
import * as config from "config";

const server = express();

const blog_router = express.Router();

server.get("/", (req, res) => {
  console.log("/");
  res.send("OK");
});

// Blog
blog_router.get("/", (req, res) => {
  console.log("blog");
  res.send("Blog");
});

server.use(subdomain("blog", blog_router));

server.listen(config.get("port"), (req, res, error) => {
  if (error) {
    console.log(error);
    res.send(error);
  }
  console.log("Running server on port " + config.get("port"));
});
