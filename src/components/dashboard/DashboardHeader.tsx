const DashboardHeader = () => {
  return (
    <div className="pt-0 mb-4 bg-[#e6f9f5] min-h-[285px] flex justify-center items-center shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] z-[-1]">
      <h2 className="max-w-[1000px] mx-4 w-full text-[42px] sm:text-6xl sm:leading-[1.2em] text-balance bg-[linear-gradient(to_right,_#00c19f,_#392a7e_20%)] text-transparent bg-clip-text">
        Estadísticas de los seguros
      </h2>
    </div>
  );
};

export default DashboardHeader;
