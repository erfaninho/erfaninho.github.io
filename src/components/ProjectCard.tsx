import type { Project } from "../content";
import { publicUrl } from "../lib/publicUrl";
import Reveal from "./Reveal";
import { ExternalLink } from "lucide-react";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  return (
    <Reveal as="article" className="card projectCard">
      <div className="projectRow">
        <img
          className="projectThumb"
          src={publicUrl(project.thumbUrl || "placeholders/project.svg")}
          alt=""
          loading="lazy"
          decoding="async"
        />

        <div className="projectMeta">
          <div className="cardTop projectCardTop">
            <h3 className="h3">{project.name}</h3>
            <div className="pillRow" aria-label="Tags">
              {project.tags.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="muted">{project.summary}</p>

          <div className="projectEvidence">
            <div>
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>
            <div>
              <span>Outcome</span>
              <strong>{project.outcome}</strong>
            </div>
          </div>

          <ul className="projectHighlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div className="cardLinks projectCardLinks">
            {project.links.map((l) => (
              <a key={l.href} className="link" href={l.href} target="_blank" rel="noreferrer">
                {l.label} <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
