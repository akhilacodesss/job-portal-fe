import {
  FiMapPin,
  FiBriefcase,
  FiClock,
} from "react-icons/fi";
import {
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs";

import { IoCashOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const [saved, setSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function checkSaved() {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/saved-jobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        const isSaved = data.savedJobs?.some(
          (item) => item.job?._id === job._id
        );

        setSaved(isSaved);
      } catch (err) {
        console.log(err);
      }
    }

    checkSaved();
  }, [job._id]);

  async function toggleSaveJob() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      if (saved) {
        await fetch(
          `${process.env.REACT_APP_API_URL}saved-jobs/${job._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSaved(false);
      } else {
        await fetch(
          `${process.env.REACT_APP_API_URL}/saved-jobs/${job._id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSaved(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="
        bg-white
        border
        border-gray-100
        rounded-2xl
        p-6
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

        {/* Left */}
        <div className="flex gap-5">

          {/* Logo */}
          <div
            className="
    w-20
    h-20
    rounded-2xl
    border
    border-gray-100
    flex
    items-center
    justify-center
    shrink-0
    bg-indigo-50
  "
          >
            <span className="text-indigo-600 text-4xl font-bold">
              {job.company?.charAt(0)}
            </span>
          </div>
          {/* Info */}
          <div>

            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold text-gray-900">
                {job.title}
              </h3>

              <span
                className="
                  bg-green-100
                  text-green-700
                  text-xs
                  px-2
                  py-1
                  rounded-md
                  font-medium
                "
              >
                New
              </span>
            </div>

            <p className="text-gray-500 mt-1">
              {job.company}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-5 mt-4 text-gray-500 text-sm">

              <span className="flex items-center gap-1">
                <FiMapPin />
                {job.location}
              </span>

              <span className="flex items-center gap-1">
                <FiBriefcase />
                {job.jobType}
              </span>

              <span className="flex items-center gap-1">
                <FiClock />
                {job.experience}
              </span>

              <span className="flex items-center gap-1">
                <IoCashOutline />
                ₹{(job.salary?.min / 100000).toFixed(0)} LPA - ₹{(job.salary?.max / 100000).toFixed(0)} LPA
              </span>

            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-4">

              {job.skills?.map((skill) => (
                <span
                  key={skill}
                  className="
                    bg-slate-100
                    text-gray-600
                    text-sm
                    px-3
                    py-1
                    rounded-md
                  "
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-4">

          <button
            onClick={toggleSaveJob}
            className="
    w-12
    h-12
    border
    border-gray-200
    rounded-xl
    flex
    items-center
    justify-center
  "
          >
            {saved ? (
              <BsBookmarkFill
                size={20}
                className="text-indigo-600"
              />
            ) : (
              <BsBookmark size={20} />
            )}
          </button>

          <button
            onClick={() =>
              navigate(`/jobs/${job._id}`)
            }
            className="
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            View Details
          </button>

          <span className="text-sm text-gray-400">
            Posted Recently
          </span>

        </div>

      </div>
    </div>
  );
}

export default JobCard;