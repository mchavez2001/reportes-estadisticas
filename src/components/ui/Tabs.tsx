import { useState } from "react";
import slider01 from "../../../images/04092025-00001.jpg";
import slider02 from "../../../images/04092025-00002.jpg";
// import slider03 from "../../../images/1308202503.png";
// import slider04 from "../../../images/1308202504.png";
// import slider05 from "../../../images/1308202505.png";
import ImageSlider from "./ImageSlider";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");

  const tabs: Tab[] = [
    {
      id: "tab1",
      label: "Seguro de protección de tarjetas*",
      content: (
        <div className="px-6 py-12 flex items-center justify-center rounded-bl-lg rounded-br-lg border border-[#00C19F]">
          <img
            src={slider01}
            alt="Seguro de protección de tarjetas*"
            className="w-full max-w-[1078px]"
          />
        </div>
      ),
    },
    {
      id: "tab2",
      label: "Seguro de desgravamen*",
      content: (
        <div className="px-6 py-12 flex items-center justify-center rounded-bl-lg rounded-br-lg border border-[#00C19F]">
          <img
            src={slider02}
            alt="Seguro de protección de tarjetas*"
            className="w-full max-w-[1078px]"
          />
        </div>
      ),
    },
    // {
    //   id: "tab3",
    //   label: "Seguro de vida*",
    //   content: (
    //     <div className="px-6 py-12 flex items-center justify-center rounded-bl-lg rounded-br-lg border border-[#00C19F]">
    //       <img
    //         src={slider03}
    //         alt="Seguro de protección de tarjetas*"
    //         className="w-full max-w-[1078px]"
    //       />
    //     </div>
    //   ),
    // },
    // {
    //   id: "tab4",
    //   label: "SOAT",
    //   content: (
    //     <div className="px-6 py-12 flex items-center justify-center rounded-bl-lg rounded-br-lg border border-[#00C19F]">
    //       <img
    //         src={slider04}
    //         alt="Seguro de protección de tarjetas*"
    //         className="w-full max-w-[1078px]"
    //       />
    //     </div>
    //   ),
    // },
    // {
    //   id: "tab5",
    //   label: "Vehículos",
    //   content: (
    //     <div className="px-6 py-12 flex items-center justify-center rounded-bl-lg rounded-br-lg border border-[#00C19F]">
    //       <img
    //         src={slider05}
    //         alt="Seguro de protección de tarjetas*"
    //         className="w-full max-w-[1078px]"
    //       />
    //     </div>
    //   ),
    // },
  ];

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="w-full mx-auto mt-2 rounded-lg overflow-hidden">
      <div className="hidden lg:block">
        <div className="flex justify-between gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`w-full p-5 text-[#CECECE] font-medium focus:outline-none rounded-tr-lg rounded-tl-lg border border-b-0 border-[#CECECE] ${
                activeTab === tab.id
                  ? "bg-[#00C19F] text-[#fff] font-semibold text-[18px]"
                  : "hover:text-gray-700"
              }leading-[1.2rem]`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>{activeContent}</div>
      </div>

      <div className="lg:hidden">
        <ImageSlider />
      </div>
    </div>
  );
};

export default Tabs;
