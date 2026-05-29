import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
function FinalCta() {
  const navigate = useNavigate();
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="bg-white  border border-gray-100 rounded-3xl p-10 shadow-sm">
          <div className=" text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Managing Money With More Clarity
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-8 ">
              Create your account, track daily finances, use AI to reduce
              unnecessary spending and build stronger monthly savings habits.
            </p>
          </div>
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-3 bg-[#5b3df5] border rounded-2xl text-sm font-medium text-white hover:bg-[#7769fc] transition cursor-pointer flex items-center gap-4 mx-auto"
          >
            Create Your Free Account <FaArrowRight />
          </button>
        </div>
      </section>
    </>
  );
}

export default FinalCta;
