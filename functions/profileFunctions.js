class profileFunctions {
  getFollows({ userid, model }) {
    const dataGroup = "follows";
    let r = model
      .findOne({ user: userid }, dataGroup)
      .then(result => {
        return result;
      })
      .catch(err => console.log(err));
    return r;
  }

  getFollowers({ userid, model }) {
    const dataGroup = "followers";
    let r = model
      .findOne({ user: userid }, dataGroup)
      .then(result => {
        return result;
      })
      .catch(err => console.log(err));
    return r;
  }

  getLanguages({ userid, model }) {
    const dataGroup = "languages";
    let r = model
      .findOne({ user: userid }, dataGroup)
      .then(result => {
        return result;
      })
      .catch(err => console.log(err));
    return r;
  }

  getSocialMedia({ userid, model }) {
    const dataGroup = "socialMedia";
    let r = model
      .findOne({ user: userid }, dataGroup)
      .then(result => {
        return result;
      })
      .catch(err => console.log(err));
    return r;
  }
}

module.exports = profileFunctions;
