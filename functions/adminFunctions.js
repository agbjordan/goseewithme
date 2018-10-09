const moment = require("moment");

class userFunctions {
  getByUserID({ userid, model, data }) {
    let r = model.findOne({ user: userid }, data).exec();
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
    let promise = model.findOne({ handle: handle }, "handle").exec();
    return promise;
  }

  updateLoginStats({ email, model }) {
    const dateFormat = "ddd, DD MMM YYYY HH:mm:ss [GMT]";
    const newlastLogin = moment().format(dateFormat);

    //Update the login details
    model
      .findOneAndUpdate(
        { email },
        {
          $set: { lastLogin: newlastLogin },
          $inc: { totalLogins: 1 }
        },
        { upsert: true }
      )
      .catch(err => console.log(err));
    return;
  }
}

module.exports = userFunctions;
