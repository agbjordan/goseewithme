class userFunctions {
  getByUserID({ userid, model, data }) {
    let r = model
      .findOne({ user: userid }, data)
      .then(results => {
        return results;
      })
      .catch(err => console.log(err));
    return r;
  }

  doesHandleExist({ handle, model }) {
    let r = model
      .findOne({ handle: handle })
      .then(result => {
        if (result) {
          return true;
        } else {
          return false;
        }
      })
      .catch(err => console.log(err));
    return r;
  }
}

module.exports = userFunctions;
