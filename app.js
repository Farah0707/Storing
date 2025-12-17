const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const allRoutes = require("./routes/allRoutes");
const addUserRoute = require("./routes/addUser");


//auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer({});
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});



mongoose
  .connect(
    "mongodb+srv://storing:uRXYPgYXRnnschQF@cluster0.ecioab9.mongodb.net/all-data?appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/ is running`);
    });
  })
  .catch((err) => {
    console.log(err);
  });



app.use("/", allRoutes);
app.use("/", addUserRoute);