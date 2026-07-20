import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Candidate from "@/components/Candidate";
import Vision from "@/components/Vision";
import Priorities from "@/components/Priorities";
import Record from "@/components/Record";
import Endorsements from "@/components/Endorsements";
import Involved from "@/components/Involved";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Candidate />
        <Vision />
        <Priorities />
        <Record />
        <Endorsements />
        <Involved />
      </main>
      <Footer />
    </>
  );
}
