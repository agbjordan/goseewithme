const moment = require("moment");

module.exports = class dateFunctions {
  //format date
  //return formatted date
  formatDate({ date, format }) {
    return date.moment().format(format);
  }

  //valid date
  //return true or false
  validateDate({ date }) {
    const newDate = moment(date);
    return newDate.isValid();
  }

  //add days
  //return date
  addDays({ date, days, format }) {
    const newDate = moment(date);
    newDate.add(days, "days");
    if (!format) {
      newDate.format(format);
    }
    return newDate;
  }
};
