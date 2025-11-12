const Title = ({ title }: { title: string }) => {
  return (
    <h1 className="my-8 bg-gradient-to-r from-[#3bb29a] to-[#0003a4] bg-clip-text text-[24px] md:text-[28px] lg:text-[32px] text-transparent font-[500] font-montserrat">
      {title}
    </h1>
  );
};

export default Title;
