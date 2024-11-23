const {onRequest} = require("firebase-functions/v2/https");
const client = require("@sendgrid/client");
const {
  info,
  debug,
} = require("firebase-functions/logger");
client.setApiKey(process.env.SENDGRID_API_KEY);

exports.addGuestToEmailList = onRequest({cors: true}, (request, response) => {
    let newEmail = request.body.data.text
    debug(newEmail, {structuredData: true})
    if (!validEmail(newEmail)) {
      response.status(400).send({status: false, error: "The email provided is invalid"});
    }
    const requestData = {
      contacts: [{ email: newEmail }],
      list_ids: ["887040bc-71a4-489a-874a-c4cc0391f890"], //This is the Monsters and Myriads Contact List ID
    };
    const sendgridRequest = {
      url: "/v3/marketing/contacts",
      method: "PUT",
      body: requestData,
    };
    return client
      .request(sendgridRequest)
      .then(([res, body]) => {
        response.status(200).send({ status: true });
      })
      .catch((error) => {
        info(error);
        response.status(500).send({status: false, error: error});
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

exports.publishPageAt = onRequest({cors: true}, (request, response) => {
  const TIME_MARGIN_SECONDS = 30
  const {pageData, fileName, publishAt} = request.body.data
  // Check if the date to publish the page at is more than a margin number of secs in the future
  let now = new Date()
  if (Date.parse(publishAt) > new Date(now.getTime() + TIME_MARGIN_SECONDS * 1000) ) {
    // Create the resources to track it as a page to be published in the future
    try {
      schedulePage(pageData, fileName)
    } catch (err) {
      response.status(500).send({status: false, error: error})
    }
    response.status(201).send({status: true})
  } else {
    // Publish the page now
    try{
      appendPage(pageData, fileName);
    } catch(err) {
      response.status(500).send({status: false, error: error})
    }
    response.status(201).send({status: true})
  }
})

function schedulePage(pagedata, fileName) {
  // TODO
}

function appendPage(pagedata, fileName) {
  // TODO
}