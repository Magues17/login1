let db = require("../utils/db");
let jwt = require("jsonwebtoken");
let argon = require("argon2");

let registerUser = async function (req, res) {
  let email = req.body.email;
  let userName = req.body.userName;
  let password = req.body.password;
  
  // let firstName = req.body.firstName;
  // let lastName = req.body.lastName;
  // let address = req.body.address;


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

  let sql = "insert into registerUser (email, username, pwd) values (?, ?, ?)";
  let params = [email, userName, hash];

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

  let sql = "select pwd, id from registerUser where email = ?";
  let params = [email];

  db.query(sql, params, async function (err, results) {
    let storedHash;

    if (err) {
      console.log("fail to fetch for user", err);
    } else if (results.length > 1) {
      console.log("Returned more than 1 user for the Email", email);
    } else if (results.length == 1) {
    
      storedHash = results[0].pwd;
    } else if (results.length == 0) {
      console.log("did not find a user for Email", email);
    }

    try {
     
      
      let pass = await argon.verify(storedHash, password);
      
      if (pass) {
        // create an object, put any info to have in follow up request ( user Id, email,) 
        // use the json webtoken to sign the token, use a secret to sign that token, stored in the env file 
        // instead of the sening the 204 status send the json + token 

        let token = {
          id: results[0].id,
          username: email
      };
      let signedToken = jwt.sign(token, process.env.JWT_SECRET,{expiresIn: 86400});
      res.status(202).json(signedToken);

        // results.sendStatus(204);
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
