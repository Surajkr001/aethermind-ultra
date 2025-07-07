# AetherMind Ultra

Autonomous, browser-based, self-healing AI assistant using best free LLMs (Gemma, TinyLlama, DistilGPT2, etc.)—deployable on GitHub Pages.

## Overview

AetherMind Ultra is an innovative AI assistant designed to run entirely within your web browser. It leverages cutting-edge, lightweight Large Language Models (LLMs) to provide intelligent responses and perform various tasks without relying on external servers. This ensures privacy, reduces operational costs, and makes the AI accessible to everyone.

## Features

*   **In-Browser LLM Inference:** Powered by WebLLM, AetherMind Ultra runs AI models directly in your browser, utilizing WebGPU for hardware acceleration.
*   **Voice-Enabled Interaction:** Seamlessly interact with the AI using voice commands and receive spoken responses.
*   **Self-Healing Capabilities:** Designed to automatically adapt and utilize the best available free LLM, ensuring continuous operation.
*   **OpenAI API Compatibility:** Easily integrate with existing AI applications or services that use the OpenAI API.
*   **Lightweight Models:** Utilizes efficient models like Gemma and TinyLlama for optimal performance on various devices.
*   **Easy Deployment:** Deployable on platforms like GitHub Pages for simple and free hosting.

## Technologies Used

*   **React:** For building the user interface.
*   **Vite:** A fast build tool for modern web projects.
*   **WebLLM:** High-performance in-browser LLM inference engine.
*   **Gemma (Google DeepMind):** Lightweight, state-of-the-art open models.
*   **Xenova/transformers.js:** For running transformer models in the browser.
*   **Hugging Face API:** Fallback for remote LLM inference.

## Setup and Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Surajkr001/aethermind-ultra.git
    cd aethermind-ultra
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173/aethermind-ultra/` (or a similar address).

4.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the production-ready build.

## Deployment

This project is configured for easy deployment to GitHub Pages. To deploy:

1.  Ensure you have `gh-pages` installed (it's included in `devDependencies`).
2.  Run the deploy script:
    ```bash
    npm run deploy
    ```

## Documentation

- [Repository Analysis & Upgrade Report](docs/RepositoryAnalysis.md)
- [Research Findings: Free AI Technologies](docs/research_findings.md)

## Contributing

Contributions are welcome! Please refer to `CONTRIBUTING.md` for guidelines.

## License

This project is open-source and available under the [MIT License](LICENSE)
