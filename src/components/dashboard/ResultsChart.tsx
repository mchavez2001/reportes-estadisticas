//=== Librerías de terceros ===//
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

//=== Archivos de utilidades ===//
import type {
  ChartDataPoint,
  ChartDataPointMonth,
} from "../../types/dashboard";
import { formatAxisCurrency } from "../../utils/utils";

interface ResultsChartProps {
  data: ChartDataPoint[] | ChartDataPointMonth[];
  category: string;
  subCategory: string;
  color?: string;
  isVisible: boolean;
  type: string;
  inUSD: boolean;
  monthsFiltered: boolean;
}

const yearColorsPrimas = [
  "#1B9B77",
  "#854091",
  "#E6007E",
  "#009FE3",
  "#FFED00",
  "#F28E77",
  "#004F9F",
  "#DB0812",
  "#98C21D",
  "#522583",
  "#F7BFD9",
  "#C6C6C6",
];

const yearColorsSiniestros = [
  "#1B9B77",
  "#854091",
  "#E6007E",
  "#009FE3",
  "#FFED00",
  "#F28E77",
  "#004F9F",
  "#DB0812",
  "#98C21D",
  "#522583",
  "#F7BFD9",
  "#C6C6C6",
];

const yearColorsSiniestralidad = [
  "#1B9B77",
  "#854091",
  "#E6007E",
  "#009FE3",
  "#FFED00",
  "#F28E77",
  "#004F9F",
  "#DB0812",
  "#98C21D",
  "#522583",
  "#F7BFD9",
  "#C6C6C6",
];

const ResultsChart = ({
  data,
  type,
  category,
  subCategory,
  color = "#4F46E5",
  isVisible,
  inUSD,
  monthsFiltered,
}: ResultsChartProps) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 640px)",
  });
  if (!isVisible || data.length === 0) {
    return null;
  }

  //----- Empienza: Cambios 1/12 ------//
  // 1. Detectar el valor máximo en la data actual
  const maxValue = data.reduce((max: number, current: any) => {
    const val = Number(current.value) || 0;
    return val > max ? val : max;
  }, 0);

  // 2. Determinar la escala
  const isMillionsScale = maxValue >= 1000000;

  // 3. Definir la etiqueta del eje dinámicamente
  const axisLabel = isMillionsScale
    ? `${inUSD ? "Millones de US$" : "Millones de S/"}`
    : `${inUSD ? "Miles de US$" : "Miles de S/"}`;

  //----- Termina: Cambios 1/12 ------//

  const isMonthly = "month" in data[0];
  const years = Array.from(new Set(data.map((d: any) => d.year))).sort();
  const months = Array.from(new Set(data.map((d: any) => d.month))).sort();
  const hasManyYears = years.length * months.length > 48;

  let chartData: any[] = [];

  if (isMonthly) {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    chartData = months
      .map((month) => {
        const monthData: Record<string, any> = { month };
        years.forEach((year) => {
          const item = data.find(
            (d: any) => d.month === month && d.year === year
          );
          monthData[year] = item ? item.value : 0;
        });
        return monthData;
      })
      .filter((monthData) => {
        return years.some((year) => monthData[year] !== 0);
      });
  }

  let yearColors = yearColorsPrimas;

  switch (type) {
    case "Siniestros de Primas de Seguros Netos":
      yearColors = yearColorsSiniestros;
      break;
    case "Siniestralidad":
      yearColors = yearColorsSiniestralidad;
      break;
  }

  /* Efecto de opacidad */
  const [hoveringDataKey, setHoveringDataKey] = useState(null);
  //Mapa de año con opacidad
  const [opacityMap, setOpacityMap] = useState<Record<number, number>>(
    Object.fromEntries(years.map((year) => [year, 1]))
  );

  useEffect(() => {
    const newOpacityMap: Record<number, number> = {};

    switch (hoveringDataKey) {
      case null:
        years.forEach((year) => (newOpacityMap[year] = 1));
        break;
      default:
        years.forEach((year) => {
          newOpacityMap[year] = year == hoveringDataKey ? 1 : 0.2;
        });
        break;
    }

    setOpacityMap(newOpacityMap);
  }, [hoveringDataKey]);

  const handleMouseEnter = (payload: any) => {
    setHoveringDataKey(payload.dataKey);
  };

  const handleMouseLeave = () => {
    setHoveringDataKey(null);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-semibold">
            {isMonthly
              ? `${new Date(0, label - 1).toLocaleString("es-PE", {
                  month: "short",
                })}`
              : `${label}`}
          </p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {isMonthly && type === "Siniestralidad"
                ? `Año ${item.name}: ${item.value.toLocaleString("es-PE", {
                    maximumFractionDigits: 1,
                  })}%`
                : isMonthly
                ? `Año ${item.name}: ${
                    inUSD ? "" : "S/"
                  } ${item.value.toLocaleString("es-PE", {
                    maximumFractionDigits: 2,
                  })} millones de ${inUSD ? "US$" : "soles"}`
                : type === "Siniestralidad"
                ? `${item.value.toLocaleString("es-PE", {
                    maximumFractionDigits: 1,
                  })}%`
                : `${inUSD ? "" : "S/"} ${item.value.toLocaleString("es-PE", {
                    maximumFractionDigits: 2,
                  })} millones de ${inUSD ? "US$" : "soles"}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="results" className="mb-8 rounded-lg shadow-sm p-6 animate-fadeIn">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Resultados</h3>
        <p className="mt-4 text-gray-600 text-[14px] mb-4">
          Mostrando datos de{" "}
          <span className="bg-gradient-to-r from-[#3bb29a] to-[#0003a4] bg-clip-text text-transparent font-[600]">
            {type}
          </span>{" "}
          para{" "}
          <span className="bg-gradient-to-r from-[#0003a4] to-[#3bb29a] bg-clip-text text-transparent font-[600]">
            {category === "" ? `Todos los ramos` : category} /{" "}
          </span>
          <span className="bg-gradient-to-r from-[#0003a4] to-[#3bb29a] bg-clip-text text-transparent font-[600]">
            {subCategory === "" ? `Todos los riesgos` : subCategory}
          </span>
        </p>
      </div>

      <div className="w-full h-80">
        <div className="sm:hidden text-center text-sm font-medium mb-2">
          {inUSD ? "Millones de US$" : "Millones de S/"}
        </div>

        <ResponsiveContainer width="100%" height="100%" className="-mb-2">
          {monthsFiltered && isMonthly ? (
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <Legend />
              <XAxis
                dataKey="month"
                tickFormatter={(m) =>
                  new Date(0, m - 1).toLocaleString("es-PE", {
                    month: "short",
                  })
                }
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: `${inUSD ? "Millones de US$" : "Millones de S/"}`,
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  style: { textAnchor: "middle", fontSize: 12 },
                }}
                hide={isMobile ? true : false}
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#e0e0e0" }}
                width={60}
                // tickFormatter={(value, _) => {
                //   return value.toLocaleString("es-PE", {
                //     minimumFractionDigits: 1,
                //     maximumFractionDigits: 1,
                //   });
                // }}
                tickFormatter={(value) =>
                  formatAxisCurrency(value, isMillionsScale)
                }
              />
              <Tooltip
                content={<CustomTooltip />}
                contentStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              {years.map((year, index) => (
                <Bar
                  key={year}
                  dataKey={year.toString()}
                  name={year.toString()}
                  fill={yearColors[index % yearColors.length]}
                  barSize={years.length >= 3 ? undefined : 150}
                />
              ))}
            </BarChart>
          ) : type === "Siniestralidad" && !isMonthly ? (
            <LineChart
              data={data as ChartDataPoint[]}
              margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#e0e0e0" }}
              />
              <YAxis
                label={{
                  value: `Porcentaje`,
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  style: { textAnchor: "middle", fontSize: 12 },
                }}
                hide={isMobile ? true : false}
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                tickLine={{ stroke: "#e0e0e0" }}
                width={60}
                // tickFormatter={(value, _) => {
                //   return value.toLocaleString("es-PE", {
                //     minimumFractionDigits: 1,
                //     maximumFractionDigits: 1,
                //   });
                // }}
                tickFormatter={(value) =>
                  formatAxisCurrency(value, isMillionsScale)
                }
              />
              <Tooltip
                content={<CustomTooltip />}
                contentStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Line
                dataKey="value"
                type="monotone"
                name={`${subCategory} - Valor`}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          ) : type === "Siniestralidad" ? (
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <Legend
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <XAxis
                dataKey="month"
                tickFormatter={(m) =>
                  new Date(0, m - 1).toLocaleString("default", {
                    month: "short",
                  })
                }
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: `Porcentaje`,
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  style: { textAnchor: "middle", fontSize: 12 },
                }}
                hide={isMobile ? true : false}
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                tickLine={{ stroke: "#e0e0e0" }}
                width={60}
                // tickFormatter={(value, _) => {
                //   return value.toLocaleString("es-PE", {
                //     minimumFractionDigits: 1,
                //     maximumFractionDigits: 1,
                //   });
                // }}
                tickFormatter={(value) =>
                  formatAxisCurrency(value, isMillionsScale)
                }
              />
              <Tooltip
                content={<CustomTooltip />}
                contentStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              {years.map((year, index) => (
                <Line
                  key={year}
                  type="monotone"
                  dataKey={year.toString()}
                  name={year.toString()}
                  stroke={yearColors[index % yearColors.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  strokeOpacity={opacityMap[year]}
                />
              ))}
            </LineChart>
          ) : !isMonthly ? (
            <BarChart
              data={data as ChartDataPoint[]}
              margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 11 }}
                tickLine={{ stroke: "#e0e0e0" }}
                interval={0}
              />
              <YAxis
                label={{
                  value: `${inUSD ? "Millones de US$" : "Millones de S/"}`,
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  style: { textAnchor: "middle", fontSize: 12 },
                }}
                hide={isMobile ? true : false}
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#e0e0e0" }}
                width={60}
                // tickFormatter={(value, _) => {
                //   return value.toLocaleString("es-PE", {
                //     minimumFractionDigits: 1,
                //     maximumFractionDigits: 1,
                //   });
                // }}
                tickFormatter={(value) =>
                  formatAxisCurrency(value, isMillionsScale)
                }
              />
              <Tooltip
                content={<CustomTooltip />}
                contentStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Bar
                dataKey="value"
                name={`${subCategory} - Valor`}
                fill={color}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationEasing="ease-out"
                barSize={years.length > 3 ? undefined : 150}
              />
            </BarChart>
          ) : hasManyYears ? (
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <Legend
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <XAxis
                dataKey="month"
                tickFormatter={(m) =>
                  new Date(0, m - 1).toLocaleString("es-PE", {
                    month: "short",
                  })
                }
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: `${inUSD ? "Millones de US$" : "Millones de S/"}`,
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  style: { textAnchor: "middle", fontSize: 12 },
                }}
                hide={isMobile ? true : false}
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#e0e0e0" }}
                width={60}
                // tickFormatter={(value, _) => {
                //   return value.toLocaleString("es-PE", {
                //     minimumFractionDigits: 1,
                //     maximumFractionDigits: 1,
                //   });
                // }}
                tickFormatter={(value) =>
                  formatAxisCurrency(value, isMillionsScale)
                }
              />
              <Tooltip
                content={<CustomTooltip />}
                contentStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              {years.map((year, index) => (
                <Line
                  key={year}
                  type="monotone"
                  dataKey={year.toString()}
                  name={year.toString()}
                  stroke={yearColors[index % yearColors.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  strokeOpacity={opacityMap[year]}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <Legend />
              <XAxis
                dataKey="month"
                tickFormatter={(m) =>
                  new Date(0, m - 1).toLocaleString("es-PE", {
                    month: "short",
                  })
                }
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: `${inUSD ? "Millones de US$" : "Millones de S/"}`,
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  style: { textAnchor: "middle", fontSize: 12 },
                }}
                hide={isMobile ? true : false}
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#e0e0e0" }}
                width={60}
                // tickFormatter={(value, _) => {
                //   return value.toLocaleString("es-PE", {
                //     minimumFractionDigits: 1,
                //     maximumFractionDigits: 1,
                //   });
                // }}
                tickFormatter={(value) =>
                  formatAxisCurrency(value, isMillionsScale)
                }
              />
              <Tooltip
                content={<CustomTooltip />}
                contentStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              {years.map((year, index) => (
                <Bar
                  key={year}
                  dataKey={year.toString()}
                  name={year.toString()}
                  fill={yearColors[index % yearColors.length]}
                  barSize={years.length >= 3 ? undefined : 150}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>

        {/* Fuente */}
        <div className="mt-12 flex items-end justify-end">
          <p className="text-sm text-end text-[#6F6F6E]">
            Fuente: SBS | Elaboración: APESEG
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsChart;
