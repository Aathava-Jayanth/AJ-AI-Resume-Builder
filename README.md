# 📄 AJ Intelligent AI Resume Builder

**Craft a professional, high-impact resume in minutes.** Powered by **Tambo AI** to transform your raw experience into a polished career narrative.

---

## 👤 Developer Information
* **Name:** Aathavajayanth A S
* **Email:** aathavajayanth@gmail.com
* **GitHub:** [github.com/Aathava-Jayanth](https://github.com/Aathava-Jayanth)

---

## 🚀 Quick Start
Get your AI-powered NextJS app running in minutes:

1.  **Initialize:** 
    ```bash
    npm create-tambo@latest my-tambo-app
    ```
2.  **Install Dependencies:** 
    ```bash
    npm install
    ```
3.  **Configure API:** * Rename `example.env.local` to `.env.local`.
    * Add your free API key from [tambo.co/dashboard](https://tambo.co/dashboard).

4.  **Launch:** 

    ```bash
    npm run dev
    ```
    *Visit `localhost:3000` to start building.*

---

## 🛠️ Core Concepts

### 1. Generative Components
Tambo allows the AI to render actual UI components (like Graphs or Resume Templates) instead of just plain text.
* **Registration:** Define components in `src/lib/tambo.ts` using `propsSchema`.
* **Expansion:** Use `npx tambo add [component-name]` to quickly inject new UI elements.

### 2. Custom Tools
Tools allow the AI to perform specific actions or fetch external data.
* **Input Schema:** Defines what information the AI needs to collect.
* **Output Schema:** Defines the structure of the data the AI receives back.

### 3. TamboProvider
The "brain" of the app. Your `Layout.tsx` must wrap the application in the `TamboProvider` to share the API key, components, and tools throughout the project.

---

## 🎙️ Advanced Features
* **Voice Input:** Includes a `DictationButton` using the `useTamboVoice` hook for hands-free interaction.
* **MCP (Model Context Protocol):** Connects the AI to external prompts and resources using specialized hooks.
* **Flexible Layouts:** Display AI-generated components anywhere in your UI by accessing the `renderedComponent` field from the latest message.

---

## 📖 Resources
* **Official Docs:** [docs.tambo.co](https://docs.tambo.co)
* **Tambo Dashboard:** [tambo.co/dashboard](https://tambo.co/dashboard)

---
*Created with Tambo AI Engine - Sophisticated Agent Orchestration.*