const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const { MONGOURL } = require("./keys");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

mongoose.connect(MONGOURL);
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("Error in connection to Database", err);
});

require("./Models/User");
require("./Models/post");

app.use(express.json());
app.use(require("./Routes/auth"));
app.use(require("./Routes/post"));

//xZpLlWFMHKn3QB44

app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
