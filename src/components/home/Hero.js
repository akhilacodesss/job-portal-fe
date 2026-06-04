import heroImage from "../../assets/hero.png";
import { FiSearch } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  function handleSearch() {
    navigate(
      `/jobs?keyword=${keyword}&location=${location}`
    );
  }

  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Find Your
              <br />
              <span className="text-indigo-600">
                Dream Job
              </span>
              <br />
              Today
            </h1>

            <p className="text-gray-600 mt-5 text-lg max-w-md">
              Discover top job opportunities from thousands of companies
              around the world.
            </p>

            <div className="bg-white shadow-lg rounded-xl p-3 mt-8 flex flex-col md:flex-row gap-3">

              <div className="flex items-center flex-1 gap-3">
                <FiSearch className="text-gray-400 text-lg" />

                <input
                  type="text"
                  value={keyword}
                  onChange={(e) =>
                    setKeyword(e.target.value)
                  }
                  placeholder="Job title, keyword or company"
                  className="w-full outline-none"
                />
              </div>

              <div className="flex items-center flex-1 gap-3">
                <IoLocationOutline className="text-gray-400 text-xl" />

                <input
                  type="text"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="Location"
                  className="w-full outline-none"
                />
              </div>

              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Search Jobs
              </button>

            </div>

          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={heroImage}
              alt="Job Search Illustration"
              className="w-full max-w-xl"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;