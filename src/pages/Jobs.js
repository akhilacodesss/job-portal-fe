import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FiltersSidebar from "../components/jobs/FiltersSidebar";
import JobsSearchBar from "../components/jobs/JobsSearchBar";
import JobsList from "../components/jobs/JobsList";
import Pagination from "../components/jobs/Pagination";

function Jobs() {
  const [searchParams] = useSearchParams();
const category = searchParams.get("category") || "";
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState(
  searchParams.get("keyword") || ""
);

const [location, setLocation] = useState(
  searchParams.get("location") || ""
);

  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const salaryFilter =
          salary > 0
            ? `&maxSalary=${salary * 100000}`
            : "";


       const res = await fetch(
  `${process.env.REACT_APP_API_URL}/jobs?keyword=${keyword}&location=${location}&jobType=${jobType}&experience=${experience}&category=${category}${salaryFilter}&page=${page}`
);

        const data = await res.json();
        setJobs(data.jobs || []);
        setTotalPages(data.pages || 1);
        
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [
    keyword,
    location,
    jobType,
    experience,
    category,
    salary,
    page,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">

        <FiltersSidebar
          jobType={jobType}
          setJobType={setJobType}
          experience={experience}
          setExperience={setExperience}
          salary={salary}
          setSalary={setSalary}
          location={location}
          setLocation={setLocation}
        />

        <div>

          <JobsSearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            location={location}
            setLocation={setLocation}
          />

          {loading ? (
            <h2 className="text-xl font-semibold">
              Loading Jobs...
            </h2>
          ) : (
            <JobsList jobs={jobs} />
          )}

          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />

        </div>
      </div>
    </div>
  );
}

export default Jobs;