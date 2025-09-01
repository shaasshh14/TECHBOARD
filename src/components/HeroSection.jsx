import Spline from "@splinetool/react-spline";
const HeroSection = () => {
  return (
    <main className="flex lg:mt-20 flex-col lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)]">
      <div
        className="max-w-xl ml-[5%] z-10 mt-[90%] md:mt-[60%] lg:mt-0 "
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
      >
        <div className="relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full ">
          <div className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1 ">
            <i
              className="bx bx-diamond"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              Intoducing
            </i>
          </div>
        </div>
        <h1
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8"
        >
          TECHBOARD
          {/* <br />
          DEVELOPERS */}
        </h1>
        <p
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="text-base sm:text-lg tracking-wider text-gray-400 max-w-[25rem] lg:max-w-[30rem]"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
          provident aliquam ea modi eos laborum consectetur blanditiis corporis
          repellat labore ducimus temporibus consequuntur, iusto dolores harum
          alias tenetur impedit quas.
        </p>
        <div className="flex gap-4 mt-12">
          <a
            className="border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] bg-gray-300 text-black hover:text-white"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
            href="#"
          >
            DOCUMENTATION
            <i className="bx bx-link-external"></i>
          </a>

          <a
            className="border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] bg-gray-300 text-black hover:text-white"
            href="#"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            GetSarted
            <i className="bx bx-link-external"></i>
          </a>
        </div>
      </div>

      <Spline
        className="absolute lg:top-0 top-[-20%] bottom-0 lg:left-[25%] sm:left-[-2%] h-full "
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        scene="https://prod.spline.design/l-8qvm7a8Dp195v3/scene.splinecode"
      />
    </main>
  );
};

export default HeroSection;
