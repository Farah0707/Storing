const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Mydata = require("./models/mydataSchema");

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});

app.get("/index.html", (req, res) => {
  res.send("<h1>data saved successfully</h1>");
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

app.post("/", (req, res) => {
  console.log(req.body);
  const mydata = new Mydata(req.body);
  mydata
    .save()
    .then((result) => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.log(err);
    });
});
