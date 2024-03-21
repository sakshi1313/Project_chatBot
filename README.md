# Chatbot Project

## Overview
This project implements a chatbot that integrates various functionalities including Google search, web scraping, summarization, and a chatbot API. It can provide informative responses to user queries by utilizing these functionalities.

## Features
- Google Search Integration: Fetches top search results from Google using the Custom Search API.
- Web Scraping: Scrapes web pages to extract text content from URLs.
- Summarization: Generates summaries of text content using Hugging Face's Transformers library.
- Chatbot API: Utilizes a chatbot API for additional responses to user queries.

## Technologies Used
- Node.js
- Express.js
- Next.js
- Axios
- GeminiAPI
- Google Search API
- Hugging Face Transformers
- Playwright
  

## Setup
1. Clone the repository: `git clone https://github.com/sakshi1313/Project_chatBot.git`
2. Install dependencies: `npm install`
3. Set up environment variables:
   - `API_KEY`: API key for Google Custom Search API.
   - `SEARCH_ENGINE_ID`: Custom search engine ID for Google Custom Search.
   - `HF_ACCESS_TOKEN`: Access token for Hugging Face's API.
   - `API_CHATBOT`: URL for the chatbot API.
   - `API_GOOGLE_SEARCH`: URL for the Google Custom Search API.
4. Start the server: `nodemon app.js`
5. Start the client: `npm run dev`


## Usage
1. Enter a query in the textbox to trigger the chatbot.
2. The chatbot will fetch search results, summarize content, and provide responses based on the query.






