import aboutHero from "../../assets/about-hero.png";

function AboutHero() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-2 py-6 md:py-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>

            <span
              className="
                inline-block
                bg-indigo-100
                text-indigo-600
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
              "
            >
              About JobHub
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-6">
              Connecting Talent
              <br />
              With{" "}
              <span className="text-indigo-600">
                Opportunity
              </span>
            </h1>

            <p className="text-gray-600 text-lg mt-6 max-w-xl">
              Helping job seekers and employers connect
              through a modern hiring platform.
            </p>

          </div>

          {/* Right */}
          <div className="flex justify-center lg:justify-end">

            <img
              src={aboutHero}
              alt="About JobHub"
              className="w-full max-w-lg"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutHero;