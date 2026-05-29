import React, { useState, useRef, useEffect } from "react";

import DashboardLayout from "../Components/Layouts/DashboardLayout";

import { FaPaperPlane } from "react-icons/fa";

import axiosInstance from "../api/axiosInstance";

function AIChat() {
  const quickQuestions = [
    "How can I save more money monthly?",

    "Where am I wasting money?",

    "Suggest a budget plan for ₹85,000 income",

    "How to control shopping expenses?",
  ];

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",

      text: "Hello 👋 I am your AI Financial Advisor. Ask me anything about savings, budgeting or expense management.",
    },
  ]);

  const chatEndRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // SEND MESSAGE
  const sendMessage = async (customMessage) => {
    const finalMessage = customMessage || message;

    if (!finalMessage.trim()) return;

    // USER MESSAGE
    const userMessage = {
      sender: "user",

      text: finalMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage("");

    setLoading(true);

    try {
      const response = await axiosInstance.post("/ai/chat", {
        message: finalMessage,
      });

      const aiMessage = {
        sender: "ai",

        text: response.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",

          text: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title={"AI Chat Advisor"}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[78vh]">
        {/* LEFT */}

        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6 h-full">
            <h2 className="text-3xl font-bold mb-8">
              Quick Financial Questions
            </h2>

            <div className="space-y-5">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  className="w-full text-left border border-[#ece8ff] bg-[#faf8ff] dark:bg-[#1f1f1f] rounded-xl p-5 hover:bg-[#f4f1ff] transition text-gray-700 dark:text-gray-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CHAT */}

        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 h-full flex flex-col overflow-hidden">
            {/* CHAT BODY */}

            <div className="flex-1 p-6 overflow-y-auto space-y-5">
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`max-w-3xl rounded-2xl p-5 leading-8 ${
                    item.sender === "user"
                      ? "bg-[#5b3df5] text-white ml-auto"
                      : "bg-[#f5f5f7] dark:bg-[#1f1f1f] text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {item.text}
                </div>
              ))}

              {/* LOADING */}

              {loading && (
                <div className="max-w-3xl bg-[#f5f5f7] dark:bg-[#1f1f1f] rounded-2xl p-5 text-gray-700 dark:text-gray-200">
                  AI is typing...
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* INPUT */}

            <div className="border-t border-gray-100 dark:border-gray-800 p-5">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Ask your financial question..."
                  className="flex-1 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#5b3df5]"
                />

                <button
                  onClick={() => sendMessage()}
                  className="w-14 h-14 rounded-xl bg-[#5b3df5] text-white flex items-center justify-center hover:opacity-90 transition"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AIChat;
