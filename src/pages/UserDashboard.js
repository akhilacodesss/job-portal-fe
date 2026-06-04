import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "My Profile",
      desc: "Update skills, bio and contact information",
      path: "/profile",
    },
    {
      title: "My Applications",
      desc: "Track all your job applications",
      path: "/my-applications",
    },
    {
      title: "Saved Jobs",
      desc: "View your bookmarked jobs",
      path: "/saved-jobs",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Manage your job search activity.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {cards.map((card) => (
            <div
              key={card.title}
              className="
                bg-white
                border
                rounded-2xl
                p-6
                hover:shadow-lg
                transition
              "
            >
              <h2 className="text-xl font-semibold">
                {card.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {card.desc}
              </p>

              <button
                onClick={() => navigate(card.path)}
                className="
                  mt-6
                  bg-indigo-600
                  text-white
                  px-5
                  py-2
                  rounded-xl
                "
              >
                Open
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default UserDashboard;