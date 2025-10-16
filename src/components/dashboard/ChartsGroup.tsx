//=== Librerías de terceros ===//
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

//=== Componentes locales ===//
import BarChart from "./BarChart";
import LineChartData from "./LineChartData";

import type { CategoryData } from "../../types/dashboard";

interface BarChartGroupProps {
  data: CategoryData[];
  last_month: number;
  last_year: number;
  in_usd: boolean;
}

const ChartsGroup = ({
  data,
  last_month,
  last_year,
  in_usd,
}: BarChartGroupProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  if (isDesktop) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {data.map((category) =>
          category.typeChart !== "line" ? (
            <BarChart
              key={category.name}
              data={category}
              last_month={last_month}
              last_year={last_year}
              in_usd={in_usd}
            />
          ) : (
            <LineChartData
              key={category.name}
              data={category}
              last_month={last_month}
              last_year={last_year}
            />
          )
        )}
      </div>
    );
  }

  return (
    <div className="relative mb-10">
      <div className="overflow-hidden">
        <div
          className="transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          <div className="flex">
            {data.map((category) => (
              <div key={category.name} className="w-full flex-shrink-0">
                {category.typeChart !== "line" ? (
                  <BarChart
                    key={category.name}
                    data={category}
                    last_month={last_month}
                    last_year={last_year}
                    in_usd={in_usd}
                  />
                ) : (
                  <LineChartData
                    key={category.name}
                    data={category}
                    last_month={last_month}
                    last_year={last_year}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-indigo-600" : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show chart ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="absolute top-1/2 left-0 -translate-y-1/2 -ml-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
        onClick={handlePrev}
        aria-label="Previous chart"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      <button
        className="absolute top-1/2 right-0 -translate-y-1/2 -mr-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
        onClick={handleNext}
        aria-label="Next chart"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default ChartsGroup;
