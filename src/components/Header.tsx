import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Briefcase, GraduationCap, Mail, Rocket, User, Wrench } from "lucide-react";
import { config } from "../config";
import { publicUrl } from "../lib/publicUrl";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "overview", label: "Overview", Icon: User },
  { id: "projects", label: "Projects", Icon: Rocket },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "studies", label: "Studies", Icon: GraduationCap },
  { id: "skills", label: "Skills", Icon: Wrench },
];

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const scrollTop = window.scrollY || el.scrollTop || 0;
      const max = Math.max(1, el.scrollHeight - el.clientHeight);
      setScrollProgress(Math.max(0, Math.min(1, scrollTop / max)));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="header">
      <div className="scrollProgress" aria-hidden="true">
        <div className="scrollProgressBar" style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>
      <div className="container headerInner">
        <Link to="/" className="brand" aria-label="Home">
          {config.title}
        </Link>

        <nav className="nav" aria-label="Primary">
          {sections.map((s) => (
            <Link key={s.id} className="navLink" to={`/?s=${encodeURIComponent(s.id)}`}>
              <s.Icon className="navLinkIcon" size={16} aria-hidden="true" />
              {s.label}
            </Link>
          ))}
          <NavLink className="navLink" to="/contact">
            <Mail className="navLinkIcon" size={16} aria-hidden="true" />
            Contact
          </NavLink>
        </nav>

        <div className="headerActions">
          <div className="headerSocial" aria-label="Social links">
            {config.githubProfileUrl ? (
              <a
                className="socialIcon"
                href={config.githubProfileUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <img className="socialIconImg" src={publicUrl("logos/github.png")} alt="" />
              </a>
            ) : null}
            {config.linkedinUrl ? (
              <a
                className="socialIcon"
                href={config.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <img className="socialIconImg" src={publicUrl("logos/linkedin.png")} alt="" />
              </a>
            ) : null}
          </div>
          {config.githubRepoUrl ? (
            <a
            className="button buttonGhost"
            href={config.githubRepoUrl}
            target="_blank"
            rel="noreferrer"
            >
              View on GitHub
            </a>
          ) : null}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
