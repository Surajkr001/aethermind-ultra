import React, { useState, useEffect } from "react";
import AIChatVoice from "./components/AIChatVoice";
import ApiIntegration from "./components/ApiIntegration";
import "./App.css";

export default function App() {
  const [llmInfo, setLlmInfo] = useState({ model: "loading...", local: true });

  // Listen for LLM load events from child component
  useEffect(() => {
    window.onLlmSwitch = setLlmInfo;
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold text-cyan-400">AetherMind Ultra</h1>
        <p className="mt-2 text-gray-300">
          Fully autonomous, browser-based AI assistant—self-healing, voice-enabled, always free.
        </p>
        <div className="mt-4 text-xs text-gray-400">
          <b>Current LLM:</b> {llmInfo.model} {llmInfo.local ? "(runs in your browser)" : "(API call)"}
        </div>
      </header>
      <main className="max-w-3xl mx-auto space-y-8">
        <AIChatVoice setLlmInfo={setLlmInfo} />
        <ApiIntegration />
      </main>
      <footer className="text-center mt-16 text-gray-500 text-sm">
        &copy; 2025 Surajkr001 | Powered by transformers.js and free APIs | Hosted on GitHub Pages
      </footer>
    </div>
  );
}