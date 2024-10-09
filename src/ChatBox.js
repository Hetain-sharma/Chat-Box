import React from "react";

import { useState } from "react";

function ChatBot() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchQuery = async () => {
    if (search.trim() === "") return;
    setLoading(true);

    const apiUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(
      search
    )}&format=json&pretty=1`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();

      setResults(data);
    } catch (error) {
      console.error("Error fetching DuckDuckGo response:", error);
      setResults(null);
    } finally {
      setLoading(false);
      setSearch("");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center my-8">
      <div className="bg-slate-300 h-80 w-2/4 p-5 overflow-auto rounded-xl my-7">
        {loading ? (
          <p>Loading...</p>
        ) : results ? (
          <div>
            <h2 className="font-bold">Search Results:</h2>
            {results.Heading ? (
              <div>
                <h3>{results.Heading}</h3>
                <p>{results.AbstractText || "No abstract available."}</p>
                {results.RelatedTopics && (
                  <ul>
                    {results.RelatedTopics.map((topic, index) => (
                      <li key={index} className="mb-2">
                        <a
                          href={topic.FirstURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600"
                        >
                          {topic.Text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        ) : (
          <p>Try searching for something.</p>
        )}
      </div>

      <div>
        <div className="bg-slate-700 h-32 w-[40rem] my-3 flex items-center justify-evenly rounded-xl ">
          <input
            placeholder="Search For something"
            className="h-12 w-96 rounded-xl p-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-stone-400 w-24 h-10 rounded-xl"
            onClick={searchQuery}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
