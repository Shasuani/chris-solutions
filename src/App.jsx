import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollPanel from "./components/ScrollPanel";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Naar hoofdinhoud
      </a>
      <Header />
      <ScrollPanel />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
