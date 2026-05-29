import React from "react";
import { FaWallet } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { GoGoal } from "react-icons/go";
import { TbReportMoney } from "react-icons/tb";
import { FaLayerGroup } from "react-icons/fa";

function FeaturesSection() {
  const features = [
    {
      icons: <FaWallet />,
      title: "Track Every Income And Expense",
      desc: "Maintain a complete record of all your salary , freelancing , bills ,shoppings and daily spendings",
    },
    {
      icons: <FaRobot />,
      title: "AI Financial Advisory",
      desc: "Recieve smart monthly analysis ,saving opportunites ,money waste alerts and AI generated budget suggestions ",
    },
    {
      icons: <BsGraphUpArrow />,
      title: "Budget & Category Insights",
      desc: "Understand where your money goes by category wise spending ,limits ,overspending waring and monthly control",
    },
    {
      icons: <GoGoal />,
      title: "Financial Goals Tracking ",
      desc: "Create saving goals for emergency funds ,gadgets,vacations or investements and moitor your progress visually",
    },
    {
      icons: <TbReportMoney />,
      title: "Professional Monthly Reports ",
      desc: "Generate Financial summarises with total income ,total expense, net saving and monthly behavioral observations",
    },
    {
      icons: <FaLayerGroup />,
      title: "Unified Financial Dashboard",
      desc: "Generate Financial summarises with total income ,total expense, net saving and monthly behavioral observations",
    },
  ];

  return (
    <>
      <section id="features" className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everythings You Need For Smarter Money Control
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-8 ">
            Finewise AI combines expense Management , savings discipline and
            Intellegent AI analysis into one easy Dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((data, idx) => {
            return (
              <div
                key={idx}
                className="bg-white  rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f4f1ff] text-[#5b3df5] flex items-center justify-center text-xl mb-5 ">
                  {data.icons}
                </div>
                <h3 className="font-semibold text-lg mb-3">{data.title}</h3>
                <p className="text-gray-500 text-sm leading-7">{data.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default FeaturesSection;
