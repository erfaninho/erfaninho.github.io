import type { CSSProperties, PropsWithChildren, ReactNode } from "react";
import Reveal from "./Reveal";

type Props = PropsWithChildren<{
  id: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}>;

export default function HomeCard({ id, title, subtitle, icon, className, style, children }: Props) {
  const classes = ["homeCard", className ?? ""].filter(Boolean).join(" ");

  return (
    <Reveal as="section" id={id} className={classes} style={style}>
      <div className="homeCardHeadingWrap">
        <header className="sectionHeading homeCardHeading">
          {icon ? <div className="sectionIcon">{icon}</div> : null}
          <h2 className="sectionTitle">{title}</h2>
          {subtitle ? <p className="muted sectionSubtitle">{subtitle}</p> : null}
        </header>
      </div>

      <div className="homeCardBodyWrap">
        <div className="homeCardBody">{children}</div>
      </div>
    </Reveal>
  );
}
