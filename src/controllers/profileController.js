let db = require("../utils/db");
let jwt = require("jsonwebtoken");
let argon = require("argon2");


let updateProfile = async function (req, res)  {
  const userId = req.params.username;
  const {firstname, lastname, address, dateOfBirth} = req.body

  
if (!firstname || !lastname || !address || !dateOfBirth) {
  return res.status(400).json({ error: 'All fields are required' });
}


const query = 'UPDATE profile SET firstname=?, lastname=?, address=? dateofbirth=? WHERE username=?';
connection.query(query, [firstname, lastname, address, dateOfBirth, username], (err, result) => {
  if (err) {
    console.error('Error updating profile:', err);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
  console.log('Profile updated successfully');
  res.json({ message: 'Profile updated successfully' });
});
};



let getProfile = async function (req, res) {
  const userId = req.params.id;

  // Fetch the profile from the database based on the user ID
  const query = 'SELECT * FROM profile WHERE user_id=?';
  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching profile:', err);
      return res.status(500).json({ error: 'Failed to fetch profile' });
    }

    // Check if any rows were found, indicating the user ID exists
    if (result.length > 0) {
      console.log('Profile fetched successfully');
      const profileData = result[0]; // Assuming there's only one profile per user_id
      return res.json(profileData);
    } else {
      
      return res.status(404).json({ error: 'Profile not found' });
    }
  });
};


let deleteProfile = async function (req, res)  {
  const userId = req.params.id;

  const query = 'UPDATE profile SET address=NULL WHERE user_id=?';
  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting address from profile:', err);
      return res.status(500).json({ error: 'Failed to delete address from profile' });
    }

    
    if (result.affectedRows > 0) {
      console.log('Address deleted from profile successfully');
      return res.json({ message: 'Address deleted from profile successfully' });
    } else {
      
      return res.status(404).json({ error: 'Profile not found' });
    }
  });
};


  module.exports = {
    getProfile,
    deleteProfile,
    updateProfile,

  };