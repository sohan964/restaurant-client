const Banner = () => {
  const scrollToBranches = () => {
    document.getElementById("branches")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div
        className="hero h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bannerimgg.webp')",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className=" space-y-7">
            <h1 className=" lg:text-5xl text-3xl font-title tracking-widest font-bold">
              Welcome to Delta Kabab
            </h1>
            <p className=" w-9/12 mx-auto font-text tracking-wide lg:text-xl text-lg">
              Whether you crave smoky tandoori kababs, juicy seekh kababs, or
              mouthwatering shawarma, our menu promises an unforgettable
              experience with every bite.
            </p>
            <button onClick={scrollToBranches} className="btn btn-primary">
              Select Branch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
