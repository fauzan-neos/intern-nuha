import Navbar from "@/src/components/navbar";
import Hero from "@/src/modules/landing/components/hero";
import Services from "@/src/modules/landing/components/service";
import DoctorSchedule from "@/src/modules/landing/components/doctorSchedule";
import CTA from "@/src/modules/landing/components/cta";
import Footer from "@/src/components/footer";

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