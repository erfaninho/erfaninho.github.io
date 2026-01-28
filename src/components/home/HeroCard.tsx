import { Link } from "react-router-dom";
import { config } from "../../config";
import { content } from "../../content";

export default function HeroCard() {
  return (
    <section className="hero" aria-label="Intro">
      <div className="heroGlow" aria-hidden="true" />
      <div className="heroTop">
        <img className="avatar" src={config.profileImageUrl} alt={config.title} />
        <div className="stack tight">
          <h1 className="h1">{content.hero.headline}</h1>
          <p className="heroSub">{content.hero.subheadline}</p>
        </div>
      </div>
      <p className="muted">{content.hero.overview}</p>

      <div className="heroActions">
        <a className="button" href="#/?s=projects">
          View projects
        </a>
        <Link className="button buttonGhost" to="/contact">
          Contact me
        </Link>
      </div>
    </section>
  );
}

