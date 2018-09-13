class dbFunctions {
  unset({ model, userid, objectName, res, msg }) {
    //validate required props
    const r = model
      .findOneAndUpdate(
        { user: userid },
        {
          $unset: { [objectName]: {} }
        }
      )
      .then(newModel => {
        return res.status(200).json(msg);
      })
      .catch(err => console.log(err));
    return r;
  }

  set({ model, userid, objectName, data, res, msg }) {
    const r = model
      .findOneAndUpdate(
        { user: userid },
        {
          $set: {
            [objectName]: data
          }
        }
      )
      .then(newProfile => {
        return res.status(200).json(msg);
      })
      .catch(err => console.log(err));
    return r;
  }

  create({ model, userid, objectName, data, res, msg }) {
    const r = model
      .findOne({ user: userid }, objectName)
      .then(profile => {
        if (profile) {
          //UPDATE PROFILE
          model
            .findOneAndUpdate(
              { user: userid },
              { $set: data },
              {
                projection: objectName,
                new: true,
                upsert: true,
                returnNewDocument: true
              }
            )
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        } else {
          if (!msg) {
            return res.status(404).json(profile);
          }
          return res.status(404).json(msg);
        }
      })
      .catch(err => console.log(err));
    return r;
  }

  remove({ model, userid, res, msg }) {
    let promise = model.findOneAndRemove({ user: userid }).exec();
    return promise;
  }

  get({ model, userid, objectName, res }) {
    const r = model
      .findOne({ user: userid }, objectName)
      .then(profile => {
        return res.json(profile);
      })
      .catch(err => console.log(err));
    return r;
  }
}

module.exports = dbFunctions;
