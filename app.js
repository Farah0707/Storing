const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));
var moment = require("moment");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

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

//GET requests

app.get("/", (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", { arr: result , moment: moment});
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add"); 
});

app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});



app.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result , moment: moment});
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST requests
app.post("/user/add.html", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Delete request
app.delete("/edit/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id).then(() => {  
    res.redirect("/");
  }).catch((err) => {
    console.log(err);
  });
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
