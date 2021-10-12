var admin = require("firebase-admin");//use to validate token

var serviceAccount = require("../config/fbserviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports =admin
