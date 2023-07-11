const config = require("../config");
const auth = require("basic-auth");
const db = require("../schema/schema");
const _ = require("lodash");

module.exports.isAuthen = async (req, res, next) => {
  let credentials = await auth(req);
  if (_.isEmpty(credentials) === false) {
    let authen = await check(credentials.name, credentials.pass);

    if (authen === true) {
      next();
    } else {
      res.send(401, {
        message: "Access denied, incorrect Username or Password.",
      });
      return;
    }
  } else {
    res.send(401, {
      message: "Access denied, incorrect Username or Password.",
    });
    return;
  }
};

async function check(userName, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAuth = await db.User.find({
        userName: userName,
        password: password,
      });
      if (checkAuth.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      console.log(err.message);
      resolve(false);
    }
  });
}
