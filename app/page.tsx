import { promises as fs } from 'fs';
import path from 'path';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import SiteRoad from "@/components/SiteRoad";

async function getData() {
  const skillsPath = path.join(process.cwd(), 'data', 'skills.json');
  const projectsPath = path.join(process.cwd(), 'data', 'projects.json');

  const skillsData = await fs.readFile(skillsPath, 'utf8');
  const projectsData = await fs.readFile(projectsPath, 'utf8');

  return {
    skills: JSON.parse(skillsData),
    projects: JSON.parse(projectsData),
  };
}

export default async function Home() {
  const { skills, projects } = await getData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dellano Samuel Fernandez",
    "url": "https://dellano.dev",
    "jobTitle": "Systems Architect",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "SRM Easwari Engineering College"
    },
    "knowsAbout": ["High-Performance Computing", "Web Development", "AI Kernels", "Systems Architecture"],
    "sameAs": [
      "https://github.com/dellano", // Update with actual
      "https://linkedin.com/in/dellano", // Update with actual
    ]
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteRoad />
      <Navbar />
      <main className="relative z-10">
        <Hero />        
        <About />
        <Skills data={skills} />
        <Projects data={projects} />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
