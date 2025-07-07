// Monitors AI errors and switches to next available LLM if necessary
export function monitorAIError(error, currentModel, fallbackLLMs, onSwitch) {
  if (error && fallbackLLMs.length) {
    const nextLLM = fallbackLLMs.shift();
    onSwitch(nextLLM);
    return nextLLM;
  }
  return currentModel;
}