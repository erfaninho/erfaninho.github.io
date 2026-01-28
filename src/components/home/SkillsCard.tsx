import { content } from "../../content";
import HomeCard from "../HomeCard";
import Reveal from "../Reveal";
import { Wrench } from "lucide-react";

export default function SkillsCard() {
  return (
    <HomeCard id="skills" title="Skills" subtitle="Languages, frameworks, tools" icon={<Wrench size={24} />}>
      <div className="grid gridSkills">
        {content.skills.map((g) => (
          <Reveal key={g.name} className="card">
            <h3 className="h3">{g.name}</h3>
            <div className="pillRow">
              {g.items.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </HomeCard>
  );
}
