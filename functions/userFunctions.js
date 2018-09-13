const moment = require("moment");

class userFunctions {
  getByUserID({ userid, model, data }) {
    let r = model
      .findById({ user: userid }, data)
      .then(results => {
        return results;
      })
      .catch(err => console.log(err));
    return r;
  }

  getUserFromUserID({ userid, model, data }) {
    let r = model
      .findById({ _id: userid }, data)
      .then(results => {
        return results;
      })
      .catch(err => console.log(err));
    return r;
  }

  doesHandleExist({ handle, model }) {
    let r = model
      .findOne({ handle: handle }, "handle", function(err, handleName) {
        if (err) return handleError(err);
        if (!handleName) return false;
        else return true;
      })
      .catch(err => console.log(err));
    return r;
  }

  updateLoginStats({ email }) {
    const dateFormat = "ddd, DD MMM YYYY HH:mm:ss [GMT]";
    const newlastLogin = moment().format(dateFormat);

    //Update the login details
    User.findOneAndUpdate(
      { email },
      {
        $set: { lastLogin: newlastLogin },
        $inc: { totalLogins: 1 }
      },
      { upsert: true }
    ).catch(err => console.log(err));
    return;
  }
}

module.exports = userFunctions;
