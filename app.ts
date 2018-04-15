import * as express from "express";
import * as config from "config";

const server = express();

server.listen(config.get("port"), (req, res, error) => {
  if (error) {
    console.log(error);
    res.send(error);
  }
  console.log("Running server on port " + config.get("port"));
});
