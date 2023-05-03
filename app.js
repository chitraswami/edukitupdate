const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 8080;
const authRoute = require("./routes/auth-route");

const mongoose = require("mongoose");
const cors = require("cors");

const { response } = require("express");
mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb://192.168.1.42:27017/demoapp",
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("database not connected");
    } else {
      console.log("database  connected");
    }
  }
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoute);
app.get("/", (req, res) => {});

app.get("/", async (req, res) => {
  res.send("Success");
});

app.listen(port, function (err) {
  console.log("Server listening on PORT", port);
});
