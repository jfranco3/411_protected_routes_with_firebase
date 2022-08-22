const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  try {
    const roles = {
      teacher: false,
      student: false,
    };
    roles[data.role] = true;
    // Tell our database to use data from our front-end to
    // create a claim/role
    await admin.auth().setCustomUserClaims(data.uid, roles);

    // The next 3 lines for testing purposes to see what is happening
    const userData = await admin.auth().getUserByEmail(data.email);
    // console.log("userDatauserData", userData);
    return { result: userData }; // Returning entire `userData` Object isn't
    // necessary in production; just return userData.metadata or a
    //  "success" string.
  } catch (error) {
    console.log(error);
    // See https://firebase.google.com/docs/functions/callable#handle_errors
  }
});
