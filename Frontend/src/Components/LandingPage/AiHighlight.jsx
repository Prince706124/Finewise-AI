import React from "react";
import { FaRobot } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";

function AiHighlight() {
  const navigate = useNavigate();
  const points = [
    "AI scans monthly expenses and find unusual spending patterns ",
    "Detects subscriptions ,impulse shopping and recurring money leaks",
    "Builds a practical category wise budget recomendation.",
    "Lets user directly chat and ask personalized financial questions",
  ];

  return (
    <>
      <section id="aiadvisor" className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#f4f1ff] text-[#5b3df5] flex items-center justify-center text-xl mb-5 ">
              <FaRobot />
            </div>
            <div className="mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everythings You Need For Smarter Money Control
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-8 ">
                Finewise AI combines expense Management , savings discipline and
                Intellegent AI analysis into one easy Dashboard.
              </p>
            </div>
            <div className="space-y-4 mb-8">
              {points.map((point, idx) => {
                return (
                  <div
                    id="idx"
                    key={idx}
                    className="bg-white  border border-gray-100 rounded-xl p-4 text-sm text-gray-700 "
                  >
                    {point}
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => navigate("/register")}
              className="px-5 py-3 bg-[#5b3df5] border rounded-2xl text-sm font-medium text-white hover:bg-[#7769fc] transition cursor-pointer flex items-center gap-4"
            >
              Experience AI Finance Planning <FaArrowRight />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white  rounded-2xl border border-gray-100 p-6 pb-30 shadow-sm hover:translate-y-1 transition">
              <h3 className="font-semibold text-lg mb-2">
                AI Spending Analysis
              </h3>
              <p className="text-sm text-gray-500">
                AI identifies top categories, rising expenses and unstable
                spending patterns.
              </p>
            </div>
            <div className="bg-white  rounded-2xl border border-gray-100 p-6 shadow-sm hover:translate-y-1 transition">
              <h3 className="font-semibold text-lg mb-2">
                Money Waste Detection
              </h3>
              <p className="text-sm text-gray-500">
                Recurring subscriptions and hidden small leakages are
                automatically highlighted.
              </p>
            </div>
            <div className="bg-white  rounded-2xl border border-gray-100  p-6 shadow-sm hover:translate-y-1 transition">
              <h3 className="font-semibold text-lg mb-2">
                Budget Recommendation
              </h3>
              <p className="text-sm text-gray-500">
                AI creates a safer monthly allocation model based on real usage
                behavior.
              </p>
            </div>
            <div className="bg-white  rounded-2xl border border-gray-100  p-6 shadow-sm hover:translate-y-1 transition">
              <h3 className="font-semibold text-lg mb-2">AI Chat Advisor</h3>
              <p className="text-sm text-gray-500">
                Users can ask finance-related questions and get advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AiHighlight;
