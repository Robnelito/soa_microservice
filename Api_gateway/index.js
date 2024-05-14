const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API gateway");
});

app.use(
  "/user",
  createProxyMiddleware({
    target: "http://localhost:3001",
    pathRewrite: {
      "^/user": "",
    },
  })
);

app.use(
  "/client",
  createProxyMiddleware({
    target: "http://localhost:3002",
    pathRewrite: {
      "^/client": "",
    },
  })
);

app.use(
  "/payment",
  createProxyMiddleware({
    target: "http://localhost:3003",
    pathRewrite: {
      "^/payment": "",
    },
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway on port ${PORT}`);
});
