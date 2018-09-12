module.exports = selectModel = model => {
  switch (model) {
    case "guide":
      Profile = require("../models/GuideProfiles");
      break;
    case "agent":
      Profile = require("../models/AgentProfiles");
      break;
    default:
      Profile = require("../models/TravellerProfiles");
  }
  return Profile;
};
