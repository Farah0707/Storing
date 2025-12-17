const User = require("../models/customerSchema");
var moment = require("moment");



const user_index_get = (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_view_get = (req, res) => {
   User.findById(req.params.id)
     .then((result) => {
       res.render("user/view", { obj: result, moment: moment });
     })
     .catch((err) => {
       console.log(err);
     });
};
 

const user_delete_delete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};


const user_update_put = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { user_index_get, user_edit_get, user_view_get, user_delete_delete, user_update_put };