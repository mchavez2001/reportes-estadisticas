// ==========================================
// GRUPO 1: Importaciones y Constantes
// ==========================================
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import type {
  ChartDataPoint,
  ChartDataPointMonth,
} from "../../types/dashboard";

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
const yearColorsSiniestros = [...yearColorsPrimas];
const yearColorsSiniestralidad = [...yearColorsPrimas];

// ==========================================
// GRUPO 2: Interfaces y Tipos
// ==========================================
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
  // ==========================================
  // GRUPO 3: Hooks y Configuración Inicial
  // ==========================================
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [hoveringDataKey, setHoveringDataKey] = useState<string | null>(null);
  const [opacityMap, setOpacityMap] = useState<Record<string, number>>({});

  if (!isVisible || data.length === 0) {
    return null;
  }

  const isMonthly = "month" in data[0] && (data[0] as any).month !== null;
  const isSiniestralidad = type === "Siniestralidad";

  // Define la etiqueta del Eje Y
  const axisLabel = isSiniestralidad
    ? "Porcentaje (%)"
    : inUSD
    ? "Millones de US$"
    : "Millones de S/";

  // ==========================================
  // GRUPO 4: Procesamiento de Datos (MEMOIZADO)
  // ==========================================

  const years = useMemo(() => {
    return Array.from(new Set(data.map((d: any) => d.year))).sort();
  }, [data]);

  const hasManyYears = years.length > 4;
  const processedAnnualData = useMemo(() => {
    if (isMonthly) return [];
    if (!isSiniestralidad) return data as ChartDataPoint[];

    return data.map((d: any) => ({
      ...d,
      value: d.value * 100,
    })) as ChartDataPoint[];
  }, [data, isSiniestralidad, isMonthly]);

  const chartData = useMemo(() => {
    if (!isMonthly) return [];

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    return months
      .map((month) => {
        const monthData: Record<string, any> = { month };
        years.forEach((year) => {
          const item = data.find(
            (d: any) => d.month === month && d.year === year
          );
          const rawValue = item ? item.value : 0;
          monthData[year] = isSiniestralidad ? rawValue * 100 : rawValue;
        });
        return monthData;
      })
      .filter((monthData) => years.some((year) => monthData[year] !== 0));
  }, [isMonthly, years, data, isSiniestralidad]);

  // ==========================================
  // GRUPO 5: Configuración de Ejes y Formateadores
  // ==========================================

  const yearColors = useMemo(() => {
    if (type === "Siniestros de Primas de Seguros Netos")
      return yearColorsSiniestros;
    if (isSiniestralidad) return yearColorsSiniestralidad;
    return yearColorsPrimas;
  }, [type, isSiniestralidad]);

  const formatNumber = (value: number) => {
    return value.toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatAxisTick = (value: number) => {
    if (isSiniestralidad) {
      return `${value.toLocaleString("es-PE", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })}%`;
    }
    return formatNumber(value);
  };

  const commonYAxisProps = {
    label: {
      value: axisLabel,
      angle: -90,
      position: "insideLeft",
      offset: 0,
      style: { textAnchor: "middle", fontSize: 12 },
    },
    hide: isMobile,
    tick: { fontSize: 12 },
    tickLine: { stroke: "#e0e0e0" },
    width: isSiniestralidad ? 60 : 70,
    tickFormatter: formatAxisTick,
  };

  // ==========================================
  // GRUPO 6: Manejadores de Eventos y Efectos
  // ==========================================

  useEffect(() => {
    const newOpacityMap: Record<string, number> = {};
    years.forEach((year) => {
      newOpacityMap[year] =
        hoveringDataKey === null || hoveringDataKey === year.toString()
          ? 1
          : 0.2;
    });
    setOpacityMap(newOpacityMap);
  }, [hoveringDataKey, years]);

  const handleMouseEnter = (payload: any) =>
    setHoveringDataKey(payload.dataKey);
  const handleMouseLeave = () => setHoveringDataKey(null);

  // ==========================================
  // GRUPO 7: Componentes Auxiliares (Tooltip)
  // ==========================================
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const title = isMonthly
        ? new Date(0, label - 1).toLocaleString("es-PE", { month: "short" })
        : label;

      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200 z-50">
          <p className="font-semibold capitalize mb-1">{title}</p>
          {payload.map((item: any, index: number) => {
            let valueText = "";
            if (isSiniestralidad) {
              // Caso Porcentaje: "Año 2019: 18.00%"
              valueText = `${formatNumber(item.value)}%`;
            } else {
              // Caso Moneda: "Año 2019: S/ 1.27 millones"
              const currencyPrefix = inUSD ? "US$" : "S/";
              valueText = `${currencyPrefix} ${formatNumber(
                item.value
              )} millones`;
            }

            return (
              <p key={index} className="text-sm" style={{ color: item.color }}>
                {`Año ${item.name}: ${valueText}`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  // ==========================================
  // GRUPO 8: Renderizado Principal (JSX)
  // ==========================================
  return (
    <div
      id="results"
      className="mb-8 rounded-lg shadow-sm p-6 animate-fadeIn bg-white"
    >
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
            {subCategory === "" ? `Todos los riesgos` : subCategory}
          </span>
        </p>
      </div>

      <div className="w-full h-80">
        <div className="sm:hidden text-center text-sm font-medium mb-2 text-gray-600">
          {axisLabel}
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
                  new Date(0, m - 1).toLocaleString("es-PE", { month: "short" })
                }
                tick={{ fontSize: 12 }}
              />
              <YAxis {...commonYAxisProps} />
              <Tooltip content={<CustomTooltip />} />
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
              data={processedAnnualData}
              margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#e0e0e0" }}
              />
              <YAxis {...commonYAxisProps} />
              <Tooltip content={<CustomTooltip />} />
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
              <YAxis {...commonYAxisProps} />
              <Tooltip content={<CustomTooltip />} />
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
              data={processedAnnualData}
              margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 11 }}
                tickLine={{ stroke: "#e0e0e0" }}
                interval={0}
              />
              <YAxis {...commonYAxisProps} />
              <Tooltip content={<CustomTooltip />} />
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
                  new Date(0, m - 1).toLocaleString("es-PE", { month: "short" })
                }
                tick={{ fontSize: 12 }}
              />
              <YAxis {...commonYAxisProps} />
              <Tooltip content={<CustomTooltip />} />
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
                  new Date(0, m - 1).toLocaleString("es-PE", { month: "short" })
                }
                tick={{ fontSize: 12 }}
              />
              <YAxis {...commonYAxisProps} />
              <Tooltip content={<CustomTooltip />} />
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
