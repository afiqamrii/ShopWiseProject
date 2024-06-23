const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3002 || anotherPort;

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Route for proxy
app.get("/proxy", async (req, res) => {
  const url = req.query.url;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
});

// Route for search
app.get("/search", async (req, res) => {
  const { q } = req.query;
  const apiKey = "5f45a9f461cefbe08f7a813e57f4ca38a08924c2de85c0916e89f63b6cc6f488";
  const apiUrl = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(q)}&google_domain=google.com&api_key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Export the Express app as a Cloud Function
exports.api = functions.https.onRequest(app);
