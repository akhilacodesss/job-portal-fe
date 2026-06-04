function CompanyInfo({ job }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 mt-6">
      <h3 className="text-xl font-semibold mb-5">
        About Company
      </h3>

      <div className="flex items-center gap-4">
       <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center">
  <span className="text-indigo-600 font-bold text-xl">
    {job.company?.charAt(0)}
  </span>
</div>
        <div>
          <h4 className="font-semibold">
            {job.company}
          </h4>

          <p className="text-sm text-gray-500">
            {job.category}
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-7 mt-5">
        Hiring for {job.title} positions in {job.location}.
        Looking for candidates with {job.experience} experience.
      </p>
    </div>
  );
}

export default CompanyInfo;