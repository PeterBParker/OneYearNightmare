const functions = require("firebase-functions");
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

exports.addGuestToEmailList = functions
  .region("us-central1")
  .https.onCall((data, context) => {
    if (!validEmail(data.text)) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The email provided is invalid"
      );
    }
    const requestData = {
      contacts: [{ email: data.text }],
      list_ids: ["887040bc-71a4-489a-874a-c4cc0391f890"], //This is the Monsters and Myriads Contact List ID
    };
    const request = {
      url: "/v3/marketing/contacts",
      method: "PUT",
      body: requestData,
    };
    functions.logger.info(data.text, { structuredData: true });
    return client
      .request(request)
      .then(([response, body]) => {
        return { status: true };
      })
      .catch((error) => {
        functions.logger.info(error);
        return { status: false };
      });
  });

function validEmail(email) {
  if (email.length > 0) {
    return String(email)
      .toLowerCase()
      .match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/);
  } else {
    return false;
  }
}
