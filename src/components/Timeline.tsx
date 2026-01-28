import type { WorkExperience } from "../content";
import Reveal from "./Reveal";

type Props = {
  items: WorkExperience[];
};

export default function Timeline({ items }: Props) {
  return (
    <ol className="timeline" aria-label="Work experience timeline">
      {items.map((item) => (
        <li key={`${item.title}-${item.company}-${item.period}`} className="timelineItem">
          <Reveal className="timelineCard card" requireScroll>
            <div className="timelineTop">
              <div className="stack tight">
                <h3 className="h3">{item.title}</h3>
                <div className="muted">{item.company}</div>
              </div>
              <div className="muted">{item.period}</div>
            </div>
            <p className="muted">{item.summary}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

