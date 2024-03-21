const { HfInference } = require("@huggingface/inference");
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

const RequestSummary = async (data) => {
  const response = await hf.summarization({
    model: "facebook/bart-large-cnn",
    inputs: data,
  });
  return response;
};

module.exports = RequestSummary;
