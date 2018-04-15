import * as config from "config";

// Express
import * as express from "express";
import * as subdomain from "express-subdomain";

const app = express();

const basic_router = express.Router();
const homepage_router = express.Router();
const milkyway_router = express.Router();

milkyway_router.get("/", (req, res) => {
  console.log("milkyway root");
  res.send("Milkyway Root");
});

basic_router.use(subdomain("blog", milkyway_router));

homepage_router.get("/", (req, res) => {
  console.log("homepage root");
  res.send("Homepage Root");
});

basic_router.use(homepage_router);

app.use(basic_router);

app.listen(config.get("port"), error => {
  console.log("Homepage server start", config.get("port"));
});
