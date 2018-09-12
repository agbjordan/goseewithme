const passport = require("passport");

module.exports = class routeFunctions {
  publicRoute({ router, routeType, route, incFile }) {
    router[routeType](route, (req, res) => {
      const file = require(incFile);
      res = file(req, res);
    });
  }

  privateRoute({ router, routeType, route, incFile }) {
    const tokenType = "jwt";
    router[routeType](
      route,
      passport.authenticate(tokenType, { session: false }),
      (req, res) => {
        const file = require(incFile);
        res = file(req, res);
      }
    );
  }
};
