import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

function TestiMonial() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      text: "“This app showed me exactly where my salary was disappearing every month. AI insights are genuinely practical.”",
    },
    {
      name: "Sneha Verma",
      text: "“Everything from transactions to reports and savings planning stays organized. The dashboard is very easy to use.”",
    },
    {
      name: "Aman Gupta",
      text: "“AI chat advisor and budget suggestions made this much more useful than normal expense trackers.”",
    },
  ];

  return (
    <>
      <section id="reviews" className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className=" text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved By Users Building Better Financial Discipline
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-8 ">
            A smarter experience than spreadsheets, notebooks or traditional
            trackers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((data, i) => {
            return (
              <div
                key={i}
                className="bg-white  rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-md hover:translate-y-1 transition"
              >
                <FaRegUserCircle className="text-4xl text-gray-400 mb-5" />
                <p className="text-gray-600 leading-8 mb-5">{data.text}</p>
                <h4 className="font-semibold">{data.name}</h4>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default TestiMonial;
