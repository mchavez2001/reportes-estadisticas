import { useEffect, useState } from "react";

const Reports = ({
  targetNumber,
  month,
  year,
  in_usd,
}: {
  targetNumber: number;
  month: number;
  year: number;
  in_usd: boolean;
}) => {
  const [count, setCount] = useState(0);
  const [currentMonthName, setCurrentMonthName] = useState("");

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const target = targetNumber;
  const duration = 3000;
  const steps = 100;

  useEffect(() => {
    setCurrentMonthName(months[month - 1]);
  }, [month]);

  useEffect(() => {
    let start = 0;
    const increment = target / steps;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      setCount(Math.ceil(start));
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [target]);

  const formatNumber = (num: number) => {
    return in_usd?`US$ ${num.toLocaleString("es-PE")} millones`:`S/ ${num.toLocaleString("es-PE")} millones`;
  };

  const prettyText = (text: string | number) => {
    return (
      <span className="bg-gradient-to-r from-[#3bb29a] to-[#0003a4] bg-clip-text text-transparent font-[500]">
        {text}
      </span>
    );
  };

  return (
    <div className="flex justify-center items-center flex-col m-auto max-w-[1199px] w-full p-4">
      <p className="text-center text-[#6f6f6e] text-2xl font-light mt-8 mb-8">
        {month === 1 ? (
          <>
            En {prettyText(currentMonthName)} del {prettyText(year)}, las
            empresas de seguros cubrieron siniestros por:
          </>
        ) : (
          <>
            De {prettyText("Enero")} a {prettyText(currentMonthName)} del {prettyText(year)} las
            empresas de seguros cubrieron siniestros por:
          </>
        )}
      </p>
      <p className="text-center text-[#2c9b76] text-3xl sm:text-[40px] font-bold">
        {formatNumber(count)}
      </p>
    </div>
  );
};

export default Reports;
