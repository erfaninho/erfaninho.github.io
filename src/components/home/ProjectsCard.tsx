import { useMemo, useState } from "react";
import { content } from "../../content";
import HomeCard from "../HomeCard";
import ProjectCard from "../ProjectCard";
import TagFilter from "../TagFilter";
import { Rocket } from "lucide-react";

export default function ProjectsCard() {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const p of content.projects) for (const t of p.tags) set.add(t);
    return ["all", ...Array.from(set).sort()];
  }, []);

  const [activeTag, setActiveTag] = useState("all");

  const visibleProjects = useMemo(() => {
    if (activeTag === "all") return content.projects;
    return content.projects.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <HomeCard id="projects" title="Projects" subtitle="Selected things I’ve worked on" icon={<Rocket size={24} />}>
      <TagFilter tags={allTags} active={activeTag} onChange={setActiveTag} />
      <div className="projectsList">
        {visibleProjects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </HomeCard>
  );
}
