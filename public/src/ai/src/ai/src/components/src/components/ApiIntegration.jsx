import React, { useState, useEffect } from "react";

const APIS = [
  {
    key: "weather",
    name: "Weather (Berlin)",
    url: "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true",
    parse: data => `${data.current_weather?.temperature ?? "--"} °C`
  },
  {
    key: "crypto",
    name: "Bitcoin Price",
    url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
    parse: data => `$${data.bitcoin?.usd ?? "--"}`
  },
  {
    key: "catfact",
    name: "Cat Fact",
    url: "https://catfact.ninja/fact",
    parse: data => data.fact || "--"
  }
];

export default function ApiIntegration() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    APIS.forEach(api => {
      setLoading(l => ({ ...l, [api.key]: true }));
      fetch(api.url)
        .then(res => res.json())
        .then(data => setResults(r => ({ ...r, [api.key]: api.parse(data) })))
        .catch(() => setResults(r => ({ ...r, [api.key]: "Error" })))
        .finally(() => setLoading(l => ({ ...l, [api.key]: false })));
    });
  }, []);

  return (
    <section className="bg-gray-900 rounded-xl p-6 shadow-lg mt-8">
      <h2 className="text-xl font-bold mb-4 text-cyan-300">Live Free API Demos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {APIS.map(api => (
          <div key={api.key} className="bg-gray-800 rounded p-4 flex flex-col items-center">
            <span className="font-semibold">{api.name}</span>
            <span className="text-lg mt-2">{loading[api.key] ? "Loading..." : results[api.key]}</span>
          </div>
        ))}
      </div>
      <p className="text-xs mt-2 text-gray-500">
        Only free and public APIs are used. No keys, no cost.
      </p>
    </section>
  );
}