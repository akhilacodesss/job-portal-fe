function Team() {
    const team = [
        {
            name: "Sarah Johnson",
            role: "Founder & CEO",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            name: "Michael Chen",
            role: "HR Lead",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            name: "Emily Rodriguez",
            role: "Product Manager",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
        },
    ];

    return (
        <section className="bg-white">
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
                        Meet Our Team
                    </span>

                    <h2 className="text-4xl font-bold mt-6">
                        The People Behind
                        <span className="text-indigo-600">
                            {" "}JobHub
                        </span>
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        A passionate team dedicated to helping job seekers
                        and employers connect successfully.
                    </p>

                </div>

                <div className="grid md:grid-cols-3 gap-6">

                    {team.map((member) => (
                        <div
                            key={member.name}
                            className="
                bg-slate-50
                rounded-2xl
                p-6
                text-center
                border
                border-gray-100
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
                "
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="
                  w-24
                  h-24
                  rounded-full
                  object-cover
                  mx-auto
                "
                            />

                            <h3 className="text-xl font-semibold mt-5">
                                {member.name}
                            </h3>

                            <p className="text-indigo-600 mt-2">
                                {member.role}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default Team;