import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [idx, setIdx] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${idx}&limit=12`,
      );
      setUserData(response.data);
    } catch (error) {
      setError("Check Your Internet...");
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [idx]);

  let printUserData;

  if (error) {
    printUserData = (
      <h3 className="text-red-400 text-xl font-semibold text-center mt-10">
        {error}
      </h3>
    );
  } else if (loading) {
    printUserData = (
      <h3 className="text-gray-300 text-xl font-semibold text-center mt-10 animate-pulse">
        Loading images...
      </h3>
    );
  } else {
    printUserData = userData.map((elem, idx) => {
      return (
        <a
          key={idx}
          href={elem.url}
          target="_blank"
          rel="noreferrer"
          className="group"
        >
          <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 w-48">
            <div className="h-44 overflow-hidden">
              <img
                src={elem.download_url}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                alt=""
              />
            </div>
            <div className="p-3">
              <h2 className="text-white text-sm font-semibold truncate">
                {elem.author}
              </h2>
            </div>
          </div>
        </a>
      );
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold tracking-wide">Gallery</h1>
        <span className="bg-yellow-500 text-black px-4 py-1 rounded-full font-semibold">
          Page {idx}
        </span>
      </div>

      {/* Gallery */}
      <div className="flex flex-wrap gap-6 justify-center">{printUserData}</div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          className="px-6 py-2 rounded-full bg-zinc-800 text-white font-semibold hover:bg-yellow-500 hover:text-black transition disabled:opacity-40"
          disabled={idx === 1}
          onClick={() => {
            if (idx > 1) setIdx(idx - 1);
          }}
        >
          ⬅ Previous
        </button>

        <button
          className="px-6 py-2 rounded-full bg-yellow-500 text-black font-semibold hover:scale-105 transition"
          onClick={() => {
            setIdx(idx + 1);
          }}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default App;
