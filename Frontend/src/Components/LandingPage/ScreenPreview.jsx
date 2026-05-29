import React from "react";

function ScreenPreview() {
  const previews = [
    {
      title: "Unified Dashboard",
      desc: "Balance summary, expense charts, top categories and AI quick insights in one view.",
      image:
        "https://finwise-ai-expense-tracker.netlify.app/images/dashboard.png",
    },
    {
      title: "AI Financial Advisory",
      desc: "Personalized spending analysis, waste detection and smart saving opportunities.",
      image:
        "https://finwise-ai-expense-tracker.netlify.app/images/ai-advisor.png",
    },
    {
      title: "AI Chat Assistant",
      desc: "Ask direct questions about subscriptions, monthly spending and budget control.",
      image:
        "https://finwise-ai-expense-tracker.netlify.app/images/ai-chat.png",
    },
  ];

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className=" text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built Like A Complete Finance Operating System
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-8 ">
            Every major financial activity is centralized into one smooth and
            responsive dashboard experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {previews.map((data, i) => {
            return (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 dark:border-gray-800 p-7 hover:shadow-md hover:translate-y-1 transition"
              >
                <div className="h-44 rounded-xl bg-white dark:bg-[#111827] border mb-6 flex items-center justify-center text-gray-400 text-sm">
                  <img src={data.image} alt="" />
                </div>
                <h3 className="font-semibold text-lg mb-3 ">{data.title}</h3>
                <p className="text-gray-500 text-sm leading-7">{data.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default ScreenPreview;
