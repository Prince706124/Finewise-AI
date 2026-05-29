import React from "react";

function HowItWorks() {
  const steps = [
    {
      no: "01",
      title: " Create Your Account",
      desc: "Register Login and set your monthly financial target to begin structured money tracking",
    },
    {
      no: "02",
      title: " Add Income & Daily Expenses ",
      desc: "Record all transcitions in categories like food ,shopping ,transport ,housing ,salary and bills ",
    },
    {
      no: "03",
      title: "Monitor Dashboad and Reports",
      desc: "Use charts and monthly reports , budget planner and category analysis to understand your habits.",
    },
    {
      no: "04",
      title: "Use AI to improve your savings ",
      desc: "Get AI based waste detections ,smart recomendations and ask personalized financial questions anytime",
    },
  ];

  return (
    <>
      <section
        id="howitworks"
        className="max-w-7xl mx-auto px-6 lg:px-10 pb-20"
      >
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Finwise AI Works
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-8 ">
            A simple but powerful workflow that transform random monthly
            spending into organized financial discipline
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((data, idx) => {
            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-100 p-7 hover:shadow-md hover:translate-y-1    transition bg-[#f6f7fb]"
              >
                <span className="text-3xl font-bold text-[#5b3df5]">
                  {data.no}
                </span>
                <h3 className="font-semibold text-lg mt-4 mb-3 ">
                  {data.title}
                </h3>
                <p className="text-gray-500 text-sm leading-7">{data.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default HowItWorks;
