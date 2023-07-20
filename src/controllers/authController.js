let db = require("../utils/db");

let argon = require("argon2");

let registerUser = async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (!email) {
    res.status(400).json("Email is requried");
    return;
  }

  let hash;
  try {
    hash = await argon.hash(password);
  } catch (err) {
    console.log("Failed to has the password", err);
    res.sendStatus(500);
    return;
  }

  let sql = "insert into registerUser (email, hash) values (?, ?)";
  let params = [email, hash];

  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("Failed to register user", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

let loginUser = async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  let sql = "select has from registerUser where email = ?";
  let params = [email];

  db.query(sql, params, async function (err, results) {
    let storedHash;

    if (err) {
      console.log("fail to fetch for user", err);
    } else if (results.length > 1) {
      console.log("Returned more than 1 user for the email", email);
    } else if (results.length == 1) {
      storedHash = results[0].hash;
    } else if (results.length == 0) {
      console.log("did not find a user for email", email);
    }

    try {
      let pass = await argon.verify(storedHash, password);
      if (pass) {
        results.sendStatus(204);
      } else {
        results.sendStatus(401);
      }
    } catch (err) {
      console.log("failed when verifying the hash", err);
    }
  });
};

module.exports = {
  registerUser,
  loginUser,
};
