
import { useState, useEffect } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function GeminiChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");

  const VERCEL_API = "https://backend-47tqqozqi-kal2bes-projects.vercel.app/api/ask"; // replace with your Vercel URL

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

  };

  return (
    <div className="max-w-xl mx-auto p-4 text-black">
      <div className="border rounded p-3 h-96 overflow-y-auto mb-3 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg max-w-[80%] break-words ${
                msg.role === "user"
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && typingText && (
          <div className="text-gray-500 italic">{typingText}|</div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask Kalibe AI anything..."
          className="flex-1 border rounded px-3 py-2 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-emerald-700 text-white px-4 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
