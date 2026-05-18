import { content } from "../../content";
import { publicUrl } from "../../lib/publicUrl";
import HomeCard from "../HomeCard";
import Reveal from "../Reveal";
import { Wrench } from "lucide-react";
import type { CSSProperties } from "react";

type SkillsBackgroundStyle = CSSProperties & {
  "--skills-bg": string;
};

export default function SkillsCard() {
  const backgroundStyle: SkillsBackgroundStyle = {
    "--skills-bg": `url(${publicUrl("section-backgrounds/skills-blueprint.png")})`,
  };

  return (
    <HomeCard
      id="skills"
      title="Skills"
      subtitle="Technical strengths by area"
      icon={<Wrench size={24} />}
      className="skillsBlueprint"
      style={backgroundStyle}
    >
      <div className="grid gridSkills">
        {content.skills.map((g, index) => (
          <Reveal key={g.name} className={`card skillCard skillCardTone${index + 1}`}>
            <h3 className="h3">{g.name}</h3>
            <div className="pillRow">
              {g.items.map((item) => (
                <span key={item} className="pill skillPill">
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
