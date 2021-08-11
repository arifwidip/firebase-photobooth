const functions = require("firebase-functions");
const createProfile = require("./src/createProfile");

const {auth, db} = require("./src/admin");

const doStuffFromTheRequest = async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  const data = await db.collection("Users").doc(req.user.uid).get()

  return res.end(JSON.stringify({
    code: 200,
    data: data.data(),
    message: `Hello ${req.user.displayName || req.user.phoneNumber}`,
  }));
};

const checkAuth = (req, res) => {
  if (!req.headers.authorization ||
  !req.headers.authorization.startsWith("Bearer ")) {
    res.writeHead(403, {
      "Content-Type": "application/json",
    });

    return res.end("Authorization header not present in the request");
  }

  auth.verifyIdToken(req.headers.authorization.split("Bearer ")[1])
      .then((decoded) => {
        req.user = decoded;
        return doStuffFromTheRequest(req, res);
      }).catch((error) => {
        res.writeHead(403, {
          "Content-Type": "application/json",
        });

        return res.end("You are unauthorized to perform this action");
      });
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  checkAuth: functions.https.onRequest(checkAuth),
};

// admin.initializeApp(firebaseConfig);
// const db = admin.firestore();

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.createProfile = functions.auth.user().onCreate((user) => {
//   const {email, phoneNumber, uid} = user;

//   return db
//       .collection("Users")
//       .doc(uid)
//       .set({email, phoneNumber})
//       .catch(console.error);
// });

// exports.sendByeEmail = functions.auth.user().onDelete((user) => {
//   functions.logger.info(user);
// });
