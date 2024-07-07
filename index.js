const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const { PORT } = require("./config/index");
const dbconnect = require("./databse/index");
const app = express();

const corsOptions = {
  credentials: true,
  origin: true,
};

// Increase payload size limit for URL-encoded requests
app.use(express.json());

app.use(cors(corsOptions));

app.use(router);

dbconnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Started on port: ${PORT}`);
  });
});
