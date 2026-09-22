import { getSiteContent } from "../lib/getContent";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Publications from "../components/Publications";
import Projects from "../components/Projects";
import Timeline from "../components/Timeline";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const revalidate = 0; // always fetch fresh content so admin edits show instantly

export default async function Home() {
  const { profile, interests, publications, projects, timeline, skills } =
    await getSiteContent();

  return (
    <>
      <Nav name={profile?.full_name} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} interests={interests} />
        <Publications publications={publications} />
        <Projects projects={projects} />
        <Timeline entries={timeline} />
        <Skills skills={skills} />
        <Contact profile={profile} />
      </main>
      <Footer name={profile?.full_name} />
    </>
  );
}
