const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());
app.options("*", cors());

app.use(
  "/api/mov",
  createProxyMiddleware({
    target: `http://${process.env.API_MOVIES}`,
    changeOrigin: true,
    pathRewrite: {
      "^/api/mov": "", // remove base path
    },
    logLevel: "debug",
  })
);

app.use(
  "/api/cin",
  createProxyMiddleware({
    target: `http://${process.env.API_CINEMA}`,
    changeOrigin: true,
    pathRewrite: {
      "^/api/cin": "", // remove base path
    },
    logLevel: "debug",
  })
);

app.use(
  "/api/book",
  createProxyMiddleware({
    target: `http://${process.env.API_BOOKING}`,
    changeOrigin: true,
    pathRewrite: {
      "^/api/book": "", // remove base path
    },
    logLevel: "debug",
  })
);

app.listen(3000);

console.log("[DEMO] Server: listening on port 3000");
