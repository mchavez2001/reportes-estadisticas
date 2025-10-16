interface ReportCardProps {
  title: string;
  content: string;
  width?: string;
  image?: string; // 🔹 Nueva prop opcional
}

const ReportCard = ({ title, content, width, image }: ReportCardProps) => {
  return (
    <div
      className={`h-[180px] max-sm:w-[75vw] md:w-[${
        width || "265px"
      }] p-[25px] flex flex-col gap-3 bg-[#E6F9F5] rounded-[10px]`}
    >
      {/* Contenedor título + imagen */}
      <div className="flex items-center gap-2">
        {image && (
          <img src={image} alt={title} className="w-10 h-10 object-contain" />
        )}
        <h2 className="text-[#392A7E] text-[25px] font-bold">{title}</h2>
      </div>

      {/* Texto */}
      <p className="text-pretty font-light text-[#6F6F6E] leading-[1.3em]">
        {content}
      </p>
    </div>
  );
};

export default ReportCard;
