const axios = require("axios");
const RequestSummary = require("../utilities/RequestSummary");
const ScrapePage = require("../utilities/ScrapePage");

module.exports.results = async (req, res) => {
  const text = req.params.q;
  let combinedResponse = {
    data: {},
    links: [],
    summaries: [],
  };

  let results = [];
  let linksArray = [];
  // ------------------------------------- API for google search -----------------------------------------------
  await axios
    .get(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.API_GOOGLE_SEARCH}&cx=${process.env.SEARCH_ENGINE_ID}&q=${text}`
    )
    .then((response) => {
      if (response.status === 200) {
        results = response.data.items;
        for (let i = 0; i < Math.min(5, results.length); i++) {
          const obj = results[i];
          if (obj.link) {
            linksArray.push(obj.link);
            combinedResponse.links.push(obj.link);
          }
        }
      }
      console.log("Got links");
    })
    .catch((err) => res.send({ message: "Error in fetching data" }));
  // --------------------------------------------------------------- API for summary----------------------------------
  await Promise.all(
    linksArray.map(async (url) => {
      try {
        const scrapedData = await ScrapePage(url);
        const summaryResponse = await RequestSummary(scrapedData);
        if (summaryResponse && summaryResponse.summary_text) {
          combinedResponse.summaries.push({
            url: url,
            summary: summaryResponse.summary_text,
          });
        }
      } catch (error) {
        console.error(`Error in processing ${url}:`, error);
      }
    })
  );

  // --------------------------- API for chatbot-------------------------------------------------------------------------------

  const payload = {
    contents: [
      {
        parts: [
          {
            text: text,
          },
        ],
      },
    ],
  };

  try {
    const response1 = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.API_KEY}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    combinedResponse.data = response1.data;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error in fetching data" });
  }

  console.log(combinedResponse);
  res.send(combinedResponse);
};
