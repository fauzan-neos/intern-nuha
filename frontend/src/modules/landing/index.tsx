import Navbar from "../../components/navbar";
import Hero from "./components/hero";
import Services from "./components/service";
import DoctorSchedule from "./components/doctorSchedule";
import CTA from "./components/cta";
import Footer from "../../components/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <DoctorSchedule />
      <CTA />
      <Footer />
    </>
  );
}