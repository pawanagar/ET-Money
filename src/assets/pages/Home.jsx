import Hero from "../../components/Hero";
import CalculatorSection from "../../components/CalculatorSection";
import InvestmentSection from "../../components/InvestmentSection";
import WhyChoose from "../../components/WhyChoose";
import BlogSection from "../../components/BlogSection";

function Home() {
  return (
    <>
      <Hero />
      <CalculatorSection />
      <InvestmentSection />
      <WhyChoose />
      <BlogSection />
    </>
  );
}

export default Home;