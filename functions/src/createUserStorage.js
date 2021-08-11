const {bucket} = require("./admin");

const createUserStorage = (userRecord) => {
  // const {email, phoneNumber, uid} = userRecord;

  return bucket.upload("logo512.png");
};

module.exports = createUserStorage;
