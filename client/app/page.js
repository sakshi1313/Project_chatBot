"use client";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState(""); // input from the user.
  const [conversations, setConversations] = useState([]); // all the request by the user and response from the bot.
  const [isLoading, setIsLoading] = useState(false); // check loading for the API response
  const [displayMode, setDisplayMode] = useState("responsive");
  const [visibleSummaryIndex, setVisibleSummaryIndex] = useState(null);

  const getResponse = async () => {
    try {
      setInputText("");
      {
        inputText && setIsLoading(true);
      }

      {
        inputText &&
          setConversations([
            ...conversations,
            {
              user: inputText,
              bot: null,
              google: null,
            },
          ]);
      }
      const filterResponse = (text) => {
        const hasMarkdown = /\*\*/.test(text);
        const hasNewline = /\n/.test(text);

        if (!hasMarkdown && !hasNewline) {
          return text;
        }
        let filteredText = text.replace(/\*\*/g, "");
        filteredText = filteredText.replace(/\n/g, "");
        filteredText = filteredText.replace(/\*/g, "\n•");

        return filteredText;
      };

      const response = await fetch(`http://localhost:5000/${inputText}`);
      if (!response.ok) {
        throw new Error("Failed to fetch response from the bot");
      }
      const data = await response.json();
      console.log(data.data);
      const botResponse = filterResponse(
        data.data.candidates[0].content.parts[0].text
      );
      setInputText("");

      if (displayMode == "responsive") {
        setConversations([
          ...conversations,
          {
            user: inputText,
            bot: botResponse,
            google: null,
          },
        ]);
      } else {
        setConversations([
          ...conversations,
          {
            user: inputText,
            bot: botResponse,
            google: data.summaries,
          },
        ]);
      }
    } catch (error) {
      {
        inputText &&
          setConversations([
            ...conversations,
            {
              user: inputText,
              bot: "Sorry! I don't know....can only answer to text.",
              google: null,
            },
          ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSummaryVisibility = (index) => {
    setVisibleSummaryIndex(visibleSummaryIndex === index ? null : index);
  };

  const clearChat = () => {
    setIsLoading(false);
    setConversations([]);
  };

  const toggleDisplayMode = () => {
    setDisplayMode((prevMode) =>
      prevMode === "responsive" ? "informative" : "responsive"
    );
  };

  console.log(inputText);
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="bg-white shadow-lg rounded-lg rounded-br-none rounded-tl-none rounded-bl-noneg p-0 w-96 "
        style={{
          borderTopRightRadius: "40px",
          borderBottomLeftRadius: "40px",
          width: "570px",
        }}
      >
        {/*Title */}
        <div className="relative">
          <div
            className="bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold rounded-lg rounded-br-none rounded-tl-none rounded-bl-none  py-3 px-6 w-full flex justify-between items-center"
            style={{ borderTopRightRadius: "35px" }}
          >
            <div>TalkToMe🤗</div>
            <div className="flex items-center">
              <button
                onClick={toggleDisplayMode}
                className="text-sm text-white bg-blue-500 rounded-full px-2 py-1 focus:outline-none ml-4"
              >
                {displayMode === "responsive" ? "Responsive" : "Informative"}
              </button>

              <button
                onClick={clearChat}
                className="focus:outline-none hover:bg-red-600 rounded-full p-2 ml-auto"
              >
                X
              </button>
            </div>
          </div>
        </div>
        {/*Feed section*/}
        <div
          style={{
            overflowY: "auto", //scroll
            overflowX: "hidden",
          }}
        >
          <div
            className="flex flex-col gap-6 mt-6"
            style={{
              height: "300px",
            }}
          >
            {conversations.map((conversation, i) => (
              <div key={i}>
                {conversation.user !== null && (
                  <div
                    className="bg-white border border-pink-300 rounded-lg p-4 ml-64 shadow-md "
                    style={{ width: "300px" }}
                  >
                    {conversation.user}
                  </div>
                )}
                {conversation.bot !== null && (
                  <div
                    className="bg-white border border-pink-300 rounded-lg p-4 mt-6 ml-3 shadow-md"
                    style={{ width: "300px" }}
                  >
                    {conversation.bot}
                  </div>
                )}
                {conversation.google !== null &&
                  displayMode === "informative" && (
                    <div className="mt-6 ml-3">
                      {conversation.google.map(({ url, summary }, index) => (
                        <div key={index} className="mb-2">
                          <div className="flex items-center">
                            <a
                              href={url}
                              className="text-blue-600 font-semibold hover:underline overflow-hidden text-ellipsis whitespace-nowrap"
                              target="_blank"
                              rel="noopener noreferrer"
                              title={url}
                              style={{
                                maxWidth: "85%",
                                marginRight: "8px",
                              }}
                            >
                              {new URL(url).hostname}{" "}
                            </a>
                            <button
                              onClick={() => toggleSummaryVisibility(index)}
                              className="text-sm py-1 px-2 rounded bg-blue-500 text-white"
                              style={{
                                marginLeft: "6px",
                              }}
                            >
                              {visibleSummaryIndex === index ? "Hide" : "Show"}{" "}
                              Summary
                            </button>
                          </div>
                          {visibleSummaryIndex === index && (
                            <div className="mt-2 p-2 bg-blue-100 rounded">
                              <p className="text-sm">{summary}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/*Loading Animation*/}

            {isLoading && (
              <div className="flex items-center justify-center animate-pulse">
                <div className="h-2 w-2 bg-black rounded-full"></div>
                <div className="h-2 w-2 bg-black rounded-full ml-1"></div>
                <div className="h-2 w-2 bg-black rounded-full ml-1"></div>
              </div>
            )}
          </div>
        </div>

        {/*Text Input*/}

        <div className="flex mt-3 ">
          <textarea
            className="focus:outline-none border-t border-gray-200 rounded-lg rounded-br-none rounded-tr-none rounded-tl-none p-2 flex-1 resize-none"
            style={{ borderBottomLeftRadius: "35px" }}
            placeholder="Type something.."
            value={inputText}
            onChange={(evt) => setInputText(evt.target.value)}
          ></textarea>
          <button
            onClick={getResponse}
            className="bg-black hover:bg-gray-900 text-white font-bold rounded-br-none  rounded-bl-none py-1 px-2   ml-0"
          >
            ⇨
          </button>
        </div>
      </div>
    </div>
  );
}
