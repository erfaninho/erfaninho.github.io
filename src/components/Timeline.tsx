import type { WorkExperience } from "../content";
import { publicUrl } from "../lib/publicUrl";
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
            <img
              className="timelineImage"
              src={publicUrl(item.imageUrl)}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <div className="timelineContent">
              <div className="timelineTop">
                <div className="stack tight">
                  <h3 className="h3">{item.title}</h3>
                  <div className="muted">{item.company}</div>
                </div>
                <div className="muted">{item.period}</div>
              </div>
              <p className="muted">{item.summary}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
