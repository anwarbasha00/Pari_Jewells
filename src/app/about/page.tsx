import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/about/Hero";
import Story from "../components/about/Story";
import Mission from "../components/about/Mission";
import WhyChooseUs from "../components/about/WhyChooseUs";
import OurPromise from "../components/about/OurPromise";
import CTA from "../components/about/CTA";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <Hero />

      <Story />

      <Mission />

      <WhyChooseUs />

      <OurPromise />

    <CTA />

      <Footer />
    </>
  );
}