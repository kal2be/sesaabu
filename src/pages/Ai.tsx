import { Layout } from '@/components/layout/Layout'
import React, { useState,useEffect } from 'react'
import { Bot } from "lucide-react";
import GeminiChat from './GeminiChat';

const DUMMY_AI_TEXT =
  "Hello 👋 I’m 'kalibe' your AI assistant. I can help explain things, answer questions, and guide you through this platform.";

function Ai() {
     const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);


  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setText((prev) => prev + DUMMY_AI_TEXT[index]);
      index++;

      if (index === DUMMY_AI_TEXT.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
  return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Layout>
         <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-abu-green-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
               SESA AI MODEL
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Chat with
              <span className="text-accent block mt-2">Kalibe AI</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 md:mx-52 ">
                   <div className="max-w-md bg-white border rounded-xl shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white animate-pulse" />
        </div>
        <span className="text-sm font-semibold text-gray-800">
          AI Assistant 'kalibe'
        </span>
      </div>

      {/* Message */}
      <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-800">
        {text}
        {isTyping && <span className="animate-pulse">▍</span>}
      </div>

      {/* Typing indicator */}
      {isTyping && (
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <Bot className="w-3 h-3 animate-pulse" />
          AI is typing...
        </p>
      )}
    </div>

            </p>
          </div>
        </div>
      </section>
      <GeminiChat/>
    </Layout>
    </>
  )
}

export default Ai