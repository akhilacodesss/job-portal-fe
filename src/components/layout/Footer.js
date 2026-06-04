import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import { FiSend } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-indigo-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              JobHub
            </h2>

            <p className="text-indigo-200 leading-7">
              Connecting talent with opportunities worldwide.
              Find your dream job today.
            </p>

            <div className="flex gap-3 mt-6">

              <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center cursor-pointer">
                <FaFacebookF />
              </div>

              <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center cursor-pointer">
                <FaTwitter />
              </div>

              <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center cursor-pointer">
                <FaLinkedinIn />
              </div>

              <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center cursor-pointer">
                <FaInstagram />
              </div>

            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">
              Company
            </h3>

            <ul className="space-y-3 text-indigo-200">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">
              Resources
            </h3>

            <ul className="space-y-3 text-indigo-200">
              <li>Job Search</li>
              <li>Help Center</li>
              <li>Career Tips</li>
              <li>Salaries</li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="font-semibold mb-4">
              For Employers
            </h3>

            <ul className="space-y-3 text-indigo-200">
              <li>Post a Job</li>
              <li>Browse Resumes</li>
              <li>Pricing</li>
              <li>Recruiting Solutions</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">
              Subscribe to our newsletter
            </h3>

            <p className="text-indigo-200 mb-4">
              Get the latest job updates and career tips.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  flex-1
                  px-4
                  py-3
                  rounded-l-xl
                  bg-indigo-900
                  text-white
                  outline-none
                "
              />

              <button
                className="
                  px-4
                  bg-indigo-600
                  rounded-r-xl
                "
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-indigo-900 mt-12 pt-6 text-center text-indigo-300">
          © 2026 JobHub. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;