const Administrators = require("../../../models/Administrators");
module.exports = function get(req, res) {
  errors = {
    notfound: ""
  };

  let admin = Administrators.findOne({ _id: req.params.id });

  //return promise
  admin.then(result => {
    if (!result) {
      errors.notfound = "No Administrators where found";
      return res.status(404).json(errors);
    }
    return res.status(200).json(result);
  });

  //catch errors
  admin.catch(err => {
    console.log(err);
    return res.status(404).json(err.response.data);
  });
};
