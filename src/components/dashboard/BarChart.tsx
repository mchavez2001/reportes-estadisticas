import {
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  LabelList,
} from "recharts";
import { Info } from "lucide-react";

import type { CategoryData } from "../../types/dashboard";

import { GlosaryTerms } from "../../utils/dummyData";

interface BarChartProps {
  data: CategoryData;
  height?: number;
  last_month: number;
  last_year: number;
  in_usd: boolean;
}

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const BarChart = ({
  data,
  height = 300,
  last_month,
  last_year,
  in_usd,
}: BarChartProps) => {
  //--- Obtenemos cada término según el órden
  const getGlosaryTerm = (name: string) => {
    switch (name) {
      case "Primas de Seguros Netas":
        return GlosaryTerms[0].desc;
      case "Siniestros de Primas de Seguros Netos":
        return GlosaryTerms[1].desc;
      case "Siniestralidad":
        return GlosaryTerms[2].desc;
      default:
        return "";
    }
  };
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-[14px] text-center font-medium text-gray-800 mb-8">
        {data.name !== "Siniestralidad" && (
          <div className="flex items-center gap-2">
            <p className="flex-1 text-pretty">
              {data.name === "Siniestros"
                ? "Siniestros de Primas de Seguros Netos"
                : data.name}
              <br />{" "}
              {in_usd
                ? "(En miles de millones de US$)"
                : "(En miles de millones de soles)"}
            </p>

            {/* Tooltip del término */}
            <div className="group flex relative">
              <Info className="w-6 h-6" />
              <span
                className="text-pretty group-hover:opacity-100 transition-opacity bg-gray-800 px-3 py-2 text-sm text-gray-100 rounded-md 
                absolute top-full mt-2 opacity-0 w-auto max-w-md whitespace-normal left-[-100px] text-left z-10"
              >
                {getGlosaryTerm(data.name)}
              </span>
            </div>
          </div>
        )}
      </h3>

      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data.data}
            margin={{ top: 10, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="year"
              tickFormatter={(value, _) => {
                return value == last_year && last_month < 12
                  ? `${value}*`
                  : value;
              }}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: "#e0e0e0" }}
            />
            <Bar
              dataKey="value"
              name={data.name}
              fill={data.color}
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              <LabelList
                dataKey="value"
                position="top"
                fill="#666"
                fontSize={10}
                style={{ fontWeight: "bold" }}
                formatter={(value: number) =>
                  data.name === "Siniestralidad"
                    ? `${value.toLocaleString("es-PE", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}%`
                    : `${(value / 1000).toLocaleString("es-PE", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}`
                }
              />
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
