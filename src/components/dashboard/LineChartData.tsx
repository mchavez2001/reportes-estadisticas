import {
  Line,
  XAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  YAxis,
} from "recharts";
import { Info } from "lucide-react";
import { useMemo } from "react"; // 1. Importamos useMemo

import type { CategoryData } from "../../types/dashboard";
import { GlosaryTerms } from "../../utils/dummyData";

interface LineChartProps {
  data: CategoryData;
  height?: number;
  last_month: number;
  last_year: number;
}

const LineChartData = ({
  data,
  height = 300,
  last_month,
  last_year,
}: LineChartProps) => {
  // 2. Procesamos la data: Si es Siniestralidad, multiplicamos por 100
  // para que escale correctamente en el dominio [0, 100]
  const chartData = useMemo(() => {
    if (data.name === "Siniestralidad") {
      return data.data.map((item) => ({
        ...item,
        value: item.value * 100, // Conversión de decimal (0.5) a porcentaje (50)
      }));
    }
    return data.data;
  }, [data]);

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
        {data.name === "Siniestralidad" && (
          <div className="flex items-center gap-2">
            <p className="flex-1 text-pretty">
              {data.name} <br />
              (Porcentaje)
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
          <LineChart
            data={chartData} // 3. Usamos la data procesada
            margin={{ top: 10, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

            {/* El dominio 0-100 ahora tiene sentido porque los datos son 40, 50, etc. */}
            <YAxis hide={true} domain={[0, 100]} />

            <XAxis
              dataKey="year"
              tickFormatter={(value, _) => {
                return value == last_year && last_month < 12
                  ? `${value}(*)`
                  : value;
              }}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: "#e0e0e0" }}
            />

            <Tooltip
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

            <Line
              dataKey="value"
              name={data.name}
              stroke={data.color} // 4. Agregado stroke para que la línea tenga color
              fill={data.color}
              strokeWidth={3} // 5. Agregado grosor para mejor visibilidad
              animationDuration={1500}
              animationEasing="ease-out"
              dot={{ r: 4, strokeWidth: 2 }} // Opcional: Estilo de puntos
              activeDot={{ r: 6 }}
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
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartData;
