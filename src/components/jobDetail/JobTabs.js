function JobTabs({
  job,
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl mt-6">
      <div className="flex overflow-x-auto border-b">
        {[
          "description",
          "requirements",
          "company",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-6 py-4 capitalize whitespace-nowrap
              ${
                activeTab === tab
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-500"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-8">
        {activeTab === "description" && (
          <>
            <h2 className="text-xl font-semibold mb-5">
              Job Description
            </h2>

            <p className="text-gray-600 leading-8">
              {job.description}
            </p>
          </>
        )}

        {activeTab === "requirements" && (
          <>
            <h2 className="text-xl font-semibold mb-5">
              Requirements
            </h2>

            {job.requirements?.length > 0 ? (
              <ul className="list-disc pl-6 space-y-3 text-gray-600">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                No requirements specified.
              </p>
            )}
          </>
        )}

        {activeTab === "company" && (
          <>
            <h2 className="text-xl font-semibold mb-5">
              Company Information
            </h2>

            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Company:</strong> {job.company}
              </p>

              <p>
                <strong>Location:</strong> {job.location}
              </p>

              <p>
                <strong>Job Type:</strong> {job.jobType}
              </p>

              <p>
                <strong>Experience:</strong> {job.experience}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default JobTabs;