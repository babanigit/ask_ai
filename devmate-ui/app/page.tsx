"use client";

import { useState } from "react";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Home() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [intent, setIntent] = useState("explain");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    setResponse("");
        
    // const ENVIRONMENT = process.env.NEXT_PUBLIC_STREAM_ENV!;
    const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API!;

    const res = await fetch(
      BACKEND_API
      , {
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
        <h1 className="text-2xl font-bold">DevMate AI 
          {/* 🤖 */}
          </h1>

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
          <div className="mt-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
            {/* Header */}
            <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-gray-300 text-sm font-medium">
                  AI Response
                </span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(response)}
                className="text-gray-400 hover:text-gray-200 text-xs px-2 py-1 rounded hover:bg-gray-700 transition-colors"
              >
                Copy
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
              <div className="prose prose-invert prose-pre:bg-black prose-pre:shadow-inner max-w-none">
                <ReactMarkdown
                  components={{
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return  match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-md text-sm"
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-gray-800 px-1.5 py-0.5 rounded text-pink-400 text-sm"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold text-white mb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold text-gray-100 mb-3 mt-6">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold text-gray-200 mb-2 mt-4">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-white font-semibold">
                        {children}
                      </strong>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {response}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        <div>
          <div>
            response:
          </div>
        {response}
        </div>


      </div>
    </main>
  );
}
