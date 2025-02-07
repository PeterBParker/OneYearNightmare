const { onRequest } = require("firebase-functions/v2/https");
const RSS = require("rss");
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const client = require("@sendgrid/client");
const { info, debug } = require("firebase-functions/logger");

// Initialize Sendgrid for email services
client.setApiKey(process.env.SENDGRID_API_KEY);
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

// Initialize Firestore services
initializeApp();
const db = getFirestore();

// Helper functions for email services
function validEmail(email) {
  if (email.length > 0) {
    return String(email)
      .toLowerCase()
      .match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/);
  } else {
    return false;
  }
}

exports.addGuestToEmailList = onRequest({ cors: true }, (request, response) => {
  let newEmail = request.body.data.text;
  debug(newEmail, { structuredData: true });
  if (!validEmail(newEmail)) {
    response
      .status(400)
      .send({ status: false, error: "The email provided is invalid" });
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
      response.status(500).send({ status: false, error: error });
    });
});

// Helper functions for rss services
function getRSSFeed() {
    return new RSS({
      title: "Monsters and Myriads Comic",
      description:
        "Midwest mystery webcomic that's slightly spooky and mostly goofy",
      feed_url: "TODO", // Replace this with the public URL of the RSS file in the Cloud Storage
      site_url: "https://www.monstersandmyriads.com/read/",
      image_url: "https://www.monstersandmyriads.com/logo192.png",
      language: "en",
      pubDate: new Date(),
      ttl: "60", // Time to Live in minutes
    });
}

function getMxMPageURL(pageID) {
  return `https://monstersandmyriads.com/read/${pageID}`
}

exports.generateRSSFeed = onRequest({ cors: true }, (request, response) => {
  const feed = getRSSFeed();
  // Get all the pages sorted by global order
  const pagesSnapshot = await db.collection("book_data").doc("content").collection("pages").orderBy("global_order").get();
  if (!pagesSnapshot.exist) {
    // return not found error
    info("No pages found!")
    info(pagesSnapshot)
    response.status(404).send({status: false, error: "no pages found"})
  }
  const pages = pagesSnapshot.data();
  // Iterate through pages and add them to the feed
  for (page in pages) {
    feed.item({
      title: page["title"],
      description: page["description"],
      url: getMxMPageURL(page["uuid"]), // Need to get url of page
      guid: page["uuid"], // This must be unique and preserved. Use the page UUID?
      date: page["datetime"],
    })
  }
  // Convert the feed to xml
  const feedXML = feed.xml()
  // TODO Write the feed to the destination file in Cloud Storage

});
