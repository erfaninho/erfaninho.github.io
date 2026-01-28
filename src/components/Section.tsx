import type { ReactNode } from "react";
import { PropsWithChildren } from "react";
import Reveal from "./Reveal";

type Props = PropsWithChildren<{
  id: string;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
}>;

export default function Section({ id, title, subtitle, icon, children }: Props) {
  return (
    <section id={id} className="section">
      {title ? (
        <Reveal className="sectionHeading">
          {icon ? <div className="sectionIcon">{icon}</div> : null}
          <h2 className="sectionTitle">{title}</h2>
          {subtitle ? <p className="muted sectionSubtitle">{subtitle}</p> : null}
        </Reveal>
      ) : null}
      {children}
    </section>
  );
}
