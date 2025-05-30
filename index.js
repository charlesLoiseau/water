const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan"); // Import morgan

const app = express();
const port = 3000;

app.use(morgan("combined")); // Log every request
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
const uri = "mongodb://localhost:27017";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connection to database!");
  })
  .catch((e) => {
    console.log(e);
  });

const indexRouter = require("./router/index");

app.use("/", indexRouter);

app.listen(port, () => console.log(`Listening on ${port}`));

module.export = app;
