import * as config from "config";
import * as process from "process";
import * as fs from "fs";

// ExpressJS
import * as express from "express";
import * as subdomain from "express-subdomain";
import * as httpProxy from "http-proxy";

let http_mode;
switch (process.env.NODE_ENV) {
  case "production":
    http_mode = "http://"; // Apply temporary HTTP before certificate SSL
    break;
  case "staging":
    http_mode = "http://";
    break;
  default:
    http_mode = "http://";
}

const server = express();
const router = express.Router();

for (const subdomain_setting of config.get("subdomain")) {
  const sub_router = express.Router();
  const http_proxy = httpProxy.createProxyServer();
  sub_router.all("/*", (req, res) => {
    http_proxy.web(req, res, {
      target: http_mode + subdomain_setting.host + ":" + subdomain_setting.port
    });
  });
  router.use(subdomain(subdomain_setting.name, sub_router));
}

if (config.get("domain")) {
  router.get("/", (req, res) => {
    res.send(config.get("domain.host") + ":" + config.get("domain.port"));
  });
}

server.use(router);

server.listen(config.get("port"), error => {
  if (error) {
    console.log(error);
  }
  console.log(`Milk Routing Server listening on ${config.get("host")}:${config.get("port")}`);
});
