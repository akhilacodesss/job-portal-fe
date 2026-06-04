import contactHero from "../../assets/contact-hero.png";

function ContactHero() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-2 py-6 md:py-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium">
              Contact Us
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-6">
              Get In Touch
              <br />
              <span className="text-indigo-600">
                We'd Love To Hear From You!
              </span>
            </h1>

            <p className="text-gray-600 text-lg mt-6 max-w-xl">
              Have questions, feedback, or partnership inquiries?
              Reach out anytime. We're here to help.
            </p>

          </div>

          <div className="flex justify-center lg:justify-end">

            <img
              src={contactHero}
              alt="Contact Us"
              className="w-full max-w-lg"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactHero;