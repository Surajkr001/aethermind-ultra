import React, { useState, useRef, useEffect } from "react";
import { loadBestLLM } from "../ai/llm";

// Loads and manages the most powerful available LLM, self-heals on error
export default function AIChatVoice({ setLlmInfo }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your voice-enabled AI assistant. Click the mic and talk to me." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const aiPipeRef = useRef(null);

  // Load the best LLM on mount
  useEffect(() => {
    async function initLLM() {
      aiPipeRef.current = await loadBestLLM(setLlmInfo);
    }
    initLLM();
  }, [setLlmInfo]);

  // --- Voice recognition (browser) ---
  const recognitionRef = useRef(null);
  function startVoiceInput() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      handleSend(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
    recognitionRef.current = recognition;
  }
  function stopVoiceInput() {
    recognitionRef.current?.stop();
    setIsListening(false);
  }

  // --- Text to speech ---
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    // Prefer natural female English voices
    const voices = window.speechSynthesis.getVoices();
    utter.voice = voices.find(v => v.lang === "en-US" && v.name.toLowerCase().includes("female")) || voices[0];
    window.speechSynthesis.speak(utter);
  }

  // --- AI Chat ---
  async function handleSend(userText) {
    if ((!userText && !input) || loading) return;
    setMessages(msgs => [...msgs, { role: "user", text: userText || input }]);
    setLoading(true);
    setInput("");
    try {
      const pipe = aiPipeRef.current.pipe;
      const response = await pipe(userText || input);
      const aiMsg = { role: "ai", text: response[0].generated_text || "..." };
      setMessages(msgs => [...msgs, aiMsg]);
      speak(aiMsg.text);
    } catch {
      setMessages(msgs => [
        ...msgs,
        { role: "ai", text: "Sorry, my AI brain is still loading! Try again soon." }
      ]);
    }
    setLoading(false);
  }

  return (
    <section className="bg-gray-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-cyan-300">AI Assistant (Voice + Text)</h2>
      <div className="space-y-2 h-48 overflow-y-auto mb-2 bg-gray-800 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm ${msg.role === "user" ? "text-right text-blue-200" : "text-left text-purple-200"}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && <div className="text-gray-400">Thinking...</div>}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          className="flex-1 px-2 py-1 rounded text-black"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={loading}
        />
        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1 rounded"
          type="submit"
          disabled={loading}
        >
          Send
        </button>
        <button
          type="button"
          className={`px-4 py-1 rounded ${isListening ? "bg-red-500" : "bg-gray-700"} text-white`}
          onClick={() => (isListening ? stopVoiceInput() : startVoiceInput())}
          disabled={loading}
        >
          {isListening ? "Stop" : "🎤"}
        </button>
      </form>
      <p className="text-xs mt-2 text-gray-500">
        Voice input/output runs in your browser. AI uses the best free LLM available (self-healing).
      </p>
    </section>
  );
}