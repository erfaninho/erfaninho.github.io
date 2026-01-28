import { content } from "../../content";
import HomeCard from "../HomeCard";
import Reveal from "../Reveal";
import { GraduationCap } from "lucide-react";

export default function StudiesCard() {
  return (
    <HomeCard
      id="studies"
      title="Studies"
      subtitle="Education and focus areas"
      icon={<GraduationCap size={24} />}
    >
      <div className="stack">
        {content.studies.map((s) => (
          <Reveal key={`${s.title}-${s.place}`} className="card cardCompact">
            <div className="row">
              <div className="stack tight">
                <h3 className="h3">{s.title}</h3>
                <div className="muted">{s.place}</div>
              </div>
              <div className="muted">{s.period}</div>
            </div>
            {s.details ? <p className="muted">{s.details}</p> : null}
          </Reveal>
        ))}
      </div>
    </HomeCard>
  );
}
