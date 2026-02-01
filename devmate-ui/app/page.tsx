"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [intent, setIntent] = useState("explain");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    setResponse("");

    const res = await fetch("http://127.0.0.1:8000/api/ai/ask/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        intent,
        input,
      }),
    });

    const data = await res.json();
    setResponse(data.response);
    setLoading(false);
  };

  return (
    <main className="min-h-screen text-black bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">DevMate AI 🤖</h1>

        <div className="flex gap-2">
          <select
            className="border p-2 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
          </select>

          <select
            className="border p-2 rounded"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
          >
            <option value="explain">Explain</option>
            <option value="fix_error">Fix Error</option>
            <option value="optimize">Optimize</option>
          </select>
        </div>

        <textarea
          className="w-full border rounded p-3 h-40"
          placeholder="Paste your code or error here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {response && (
          <pre className="bg-gray-900 text-green-200 p-4 rounded whitespace-pre-wrap">
            {response}
          </pre>
        )}
      </div>
    </main>
  );
}
