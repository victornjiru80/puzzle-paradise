import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Classes from "../components/Classes";
import PuzzlePrograms from "../components/PuzzlePrograms";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <Classes />
      <PuzzlePrograms />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Home;