import Hero from "../components/home/Hero";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedJobs from "../components/home/FeaturedJobs";
import TopCompanies from "../components/home/TopCompanies";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";

function Home() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedJobs />
      <TopCompanies />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}

export default Home;