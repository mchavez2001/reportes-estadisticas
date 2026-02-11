//=== Librerías de terceros ===//
import { useState } from "react";

//=== Archivos de utilidades ===//
import PDFFile from "../../assets/images/pdf_icon.png";

type Quarter = {
  name: string;
  pdfUrl: string;
};

type YearData = {
  year: number;
  quarters: Quarter[];
};

const TimeLineFiles = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const timelineData: YearData[] = [
    {
      year: 2025,
      quarters: [
        {
          name: "1er trimestre 2025",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2025/04/Resultados-Sistema-Asegurador-1T25-web.pdf",
        },
        {
          name: "2do trimestre 2025",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2025/10/Resultados-Sistema-Asegurador-2T25-web.pdf",
        },
        {
          name: "3er trimestre 2025",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2025/10/Resultados-Sistema-Asegurador-3T25-web.pdf",
        },
        {
          name: "4to trimestre 2025",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2026/02/Resultados-Sistema-Asegurador-4T25-web.pdf",
        },
      ],
    },
    {
      year: 2024,
      quarters: [
        {
          name: "1er trimestre 2024",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2024/04/Resultados_Sistema_Asegurador_1T24-web.pdf",
        },
        {
          name: "2do trimestre 2024",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2024/07/Resultados_Sistema_Asegurador_2T24.pdf",
        },
        {
          name: "3er trimestre 2024",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2024/10/Resultados_Sistema_Asegurador_3T24-web.pdf",
        },
        {
          name: "4to trimestre 2024",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2025/02/Resultados-Sistema-Asegurador-4T24-web.pdf",
        },
      ],
    },
    {
      year: 2023,
      quarters: [
        {
          name: "1er trimestre 2023",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2023/04/Resultados_Sistema_Asegurador_1T23.pdf",
        },
        {
          name: "2do trimestre 2023",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2023/07/Resultados_Sistema_Asegurador_2T23.pdf",
        },
        {
          name: "3er trimestre 2023",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2023/10/Resultados_Sistema_Asegurador_3T23.pdf",
        },
        {
          name: "4to trimestre 2023",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2024/04/Resultados_Sistema_Asegurador_4T23-web.pdf",
        },
      ],
    },
    {
      year: 2022,
      quarters: [
        {
          name: "1er trimestre 2022",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2022/04/Resultados_Sistema_Asegurador_1T22.pdf",
        },
        {
          name: "2do trimestre 2022",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2022/10/Resultados_Sistema_Asegurador_2T22.pdf",
        },
        {
          name: "3er trimestre 2022",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2022/10/Resultados_Sistema_Asegurador_3T22.pdf",
        },
        {
          name: "4to trimestre 2022",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2023/02/Resultados_Sistema_Asegurador_4T22.pdf",
        },
      ],
    },
    {
      year: 2021,
      quarters: [
        {
          name: "1er trimestre 2021",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2021/05/Resultados_Sistema_Asegurador_1T21.pdf",
        },
        {
          name: "2do trimestre 2021",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2021/08/Resultados_Sistema_Asegurador_2T21.pdf",
        },
        {
          name: "3er trimestre 2021",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2021/11/Resultados_Sistema_Asegurador_3T21.pdf",
        },
        {
          name: "4to trimestre 2021",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2022/02/Resultados_Sistema_Asegurador_4T21.pdf",
        },
      ],
    },
    {
      year: 2020,
      quarters: [
        {
          name: "1er trimestre 2020",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2020/06/Resultados_Sistema_Asegurador_1T20.pdf",
        },
        {
          name: "2do trimestre 2020",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2020/08/Resultados_Sistema_Asegurador_2T20.pdf",
        },
        {
          name: "3er trimestre 2020",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2020/11/Resultados_Sistema_Asegurador_3T20.pdf",
        },
        {
          name: "4to trimestre 2020",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2021/03/Resultados_Sistema_Asegurador_4T20-1.pdf",
        },
      ],
    },
    {
      year: 2019,
      quarters: [
        {
          name: "1er trimestre 2019",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2019/05/Resultados_Sistema_Asegurador_1T19.pdf",
        },
        {
          name: "2do trimestre 2019",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2019/08/Resultados_Sistema_Asegurador_2T19.pdf",
        },
        {
          name: "3er trimestre 2019",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2020/01/Resultados_Sistema_Asegurador_3T19.pdf",
        },
        {
          name: "4to trimestre 2019",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2020/02/Resultados_Sistema_Asegurador_4T19.pdf",
        },
      ],
    },
    {
      year: 2018,
      quarters: [
        {
          name: "1er trimestre 2018",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2018/05/Resultados_Sistema_Asegurador_1T18.pdf",
        },
        {
          name: "2do trimestre 2018",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2018/08/Resultados_Sistema_Asegurador_2T18.pdf",
        },
        {
          name: "3er trimestre 2018",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2018/11/Resultados_Sistema_Asegurador_3T18.pdf",
        },
        {
          name: "4to trimestre 2018",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2019/02/Resultados_Sistema_Asegurador_4T18.pdf",
        },
      ],
    },
    {
      year: 2017,
      quarters: [
        {
          name: "1er trimestre 2017",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2018/01/Resultados_Sistema_Asegurador_1T17.pdf",
        },
        {
          name: "2do trimestre 2017",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2018/01/Resultados_Sistema_Asegurador_2T17.pdf",
        },
        {
          name: "3er trimestre 2017",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2018/01/Resultados_Sistema_Asegurador_3T17.pdf",
        },
        {
          name: "4to trimestre 2017",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2018/03/Resultados_Sistema_Asegurador_4T17.pdf",
        },
      ],
    },
    {
      year: 2016,
      quarters: [
        {
          name: "1er trimestre 2016",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2016/11/Resultados_Sistema_Asegurador_1T16.pdf",
        },
        {
          name: "2do trimestre 2016",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2018/01/Resultados_Sistema_Asegurador_2T16.pdf",
        },
        {
          name: "3er trimestre 2016",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2018/01/Resultados_Sistema_Asegurador_3T17.pdf",
        },
        {
          name: "4to trimestre 2016",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2018/01/Resultados_Sistema_Asegurador_4T16.pdf",
        },
      ],
    },
    {
      year: 2015,
      quarters: [
        {
          name: "2do trimestre 2015",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2016/11/Resultados_Sistema_Asegurador_2T15.pdf",
        },
        {
          name: "3er trimestre 2015",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2016/11/Resultados_Sistema_Asegurador_3T15.pdf",
        },
        {
          name: "4to trimestre 2015",
          pdfUrl:
            "https://www.apeseg.org.pe/wp-content/uploads/2016/11/Resultados_Sistema_Asegurador_4T15.pdf",
        },
      ],
    },
  ];

  return (
    <div className="w-full h-[350px] max-w-full mx-auto p-4">
      {/* Línea de tiempo horizontal */}
      <div className="overflow-x-auto mb-6">
        <div className="flex justify-around gap-6 min-w-max pb-2">
          {timelineData.map((yearData) => (
            <button
              key={yearData.year}
              onClick={() => setSelectedYear(yearData.year)}
              className={`px-4 font-medium whitespace-nowrap   ${
                selectedYear === yearData.year
                  ? " border-b-2 border-[#00C19F] text-[#00C19F] text-[20px] font-semibold"
                  : " border-b border-[#C4B6CF] hover:bg-gray-300"
              } `}
            >
              {yearData.year}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de contenido */}
      <div className="w-full max-w-[836px] m-auto bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {timelineData
              .find((year) => year.year === selectedYear)
              ?.quarters.map((quarter) => (
                <tr
                  key={quarter.name}
                  className="flex items-center justify-between odd:bg-[#00C19F]/10"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-[16px] text-[#6F6F6E]">
                    {quarter.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#6F6F6E]">
                    <a
                      href={quarter.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <img
                        src={PDFFile}
                        alt={quarter.name}
                        className="w-full max-w-[36px]"
                      />
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeLineFiles;
