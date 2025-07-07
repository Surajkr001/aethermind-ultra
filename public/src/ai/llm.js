import { pipeline } from "@xenova/transformers";

// Most powerful free models prioritized
const MODEL_PRIORITY = [
  { name: "r1", model: "Xenova/r1" },
  { name: "TinyLlama", model: "Xenova/TinyLlama-1.1B-Chat-v1.0" },
  { name: "distilgpt2", model: "Xenova/distilgpt2" }
];

// Try to load the best available local model. Fallback to free remote API.
export async function loadBestLLM(setLlmInfo) {
  for (const candidate of MODEL_PRIORITY) {
    try {
      const pipe = await pipeline("conversational", candidate.model);
      setLlmInfo && setLlmInfo({ model: candidate.name, local: true });
      window.onLlmSwitch && window.onLlmSwitch({ model: candidate.name, local: true });
      return { pipe, model: candidate.name, local: true };
    } catch (e) {
      // Try next model
      continue;
    }
  }
  // Fallback to HuggingFace free API (DistilGPT2, limited)
  setLlmInfo && setLlmInfo({ model: "HuggingFace API (distilgpt2)", local: false });
  window.onLlmSwitch && window.onLlmSwitch({ model: "HuggingFace API (distilgpt2)", local: false });
  return {
    pipe: async (input) => {
      const res = await fetch("https://api-inference.huggingface.co/models/distilgpt2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: input })
      });
      const data = await res.json();
      return [{ generated_text: data[0]?.generated_text || "Sorry, I couldn't answer." }];
    },
    model: "HuggingFace API (distilgpt2)",
    local: false
  };
}