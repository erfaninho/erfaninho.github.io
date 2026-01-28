import useScrollToSectionParam from "../hooks/useScrollToSection";
import ExperienceCard from "../components/home/ExperienceCard";
import HeroCard from "../components/home/HeroCard";
import OverviewCard from "../components/home/OverviewCard";
import ProjectsCard from "../components/home/ProjectsCard";
import SkillsCard from "../components/home/SkillsCard";
import StudiesCard from "../components/home/StudiesCard";

export default function Home() {
  useScrollToSectionParam("s");

  return (
    <main className="container page stack">
      <HeroCard />
      <OverviewCard />
      <ProjectsCard />
      <ExperienceCard />
      <StudiesCard />
      <SkillsCard />
    </main>
  );
}
