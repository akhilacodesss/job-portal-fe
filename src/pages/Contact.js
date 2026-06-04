import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

function Contact() {
  return (
    <>
      <ContactHero />

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-8">

            <ContactForm />
            <ContactInfo />

          </div>

        </div>
      </section>
    </>
  );
}

export default Contact;