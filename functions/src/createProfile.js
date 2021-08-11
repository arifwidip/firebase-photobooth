const {db} = require("./admin");

const createProfile = (userRecord) => {
  const {email, phoneNumber, uid} = userRecord;

  return db
      .collection("Users")
      .doc(uid)
      .set({email, phoneNumber})
      .catch(console.error);
};

module.exports = createProfile;
