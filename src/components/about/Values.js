import {
    FiZap,
    FiShield,
    FiTrendingUp,
    FiBriefcase,
} from "react-icons/fi";

function Values() {
    const values = [
        {
            icon: <FiZap size={28} />,
            title: "Innovation",
            description:
                "Building smarter hiring experiences through modern technology.",
        },
        {
            icon: <FiShield size={28} />,
            title: "Trust",
            description:
                "Creating a secure and transparent platform for everyone.",
        },
        {
            icon: <FiTrendingUp size={28} />,
            title: "Growth",
            description:
                "Helping professionals and businesses reach new heights.",
        },
        {
            icon: <FiBriefcase size={28} />,
            title: "Opportunity",
            description:
                "Connecting talent with meaningful career opportunities.",
        },
    ];

    return (
        <section className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="text-center mb-12">

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
                        Our Values
                    </span>

                    <h2 className="text-4xl font-bold mt-6">
                        What Drives
                        <span className="text-indigo-600">
                            {" "}JobHub
                        </span>
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Our core values shape how we connect talent,
                        companies, and opportunities every day.
                    </p>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {values.map((value) => (
                        <div
                            key={value.title}
                            className="
                bg-white
                rounded-2xl
                p-6
                border
                border-gray-100
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
                "
                        >
                            <div
                                className="
                  w-14
                  h-14
                  rounded-full
                  bg-indigo-50
                  text-indigo-600
                  flex
                  items-center
                  justify-center
                  mb-5
                "
                            >
                                {value.icon}
                            </div>

                            <h3 className="text-xl font-semibold">
                                {value.title}
                            </h3>

                            <p className="text-gray-600 mt-3 leading-7">
                                {value.description}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default Values;