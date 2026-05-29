import React from "react";

function StatsStrip() {
  const stats = [
    { value: "10k+", label: "Transcitions Tracked" },
    { value: "92%", label: "Users Improved Savings" },
    { value: "24/7", label: "AI Financial Monitoring" },
    { value: "100%", label: "Responsive Dashboard expriences" },
  ];

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => {
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 dark:border-gray-800 p-6 text-center shadow-sm hover:-translate-y-1 transition hover:shadow-md"
              >
                <h3 className="text-3xl font-bold text-[#5b3df5] mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default StatsStrip;
