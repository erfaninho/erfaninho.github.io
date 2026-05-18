import { Link } from "react-router-dom";
import { config } from "../../config";
import { content } from "../../content";
import { ArrowRight, BrainCircuit, Database, LockKeyhole, Mail, Network } from "lucide-react";

export default function HeroCard() {
  return (
    <section className="hero" aria-label="Intro">
      <div className="heroGlow" aria-hidden="true" />
      <div className="heroGridTexture" aria-hidden="true" />
      <div className="heroGrid">
        <div className="heroCopy">
          <p className="eyebrow">{content.hero.role}</p>
          <h1 className="h1">{content.hero.headline}</h1>
          <p className="heroSub">{content.hero.subheadline}</p>
          <p className="heroLead">{content.hero.overview}</p>

          <div className="heroActions">
            <a className="button" href="#/?s=projects">
              View projects <ArrowRight size={18} />
            </a>
            <Link className="button buttonGhost" to="/contact">
              Contact me <Mail size={18} />
            </Link>
          </div>

          <div className="proofGrid" aria-label="Portfolio highlights">
            {content.hero.proofPoints.map((point) => (
              <span key={point} className="proofItem">
                {point}
              </span>
            ))}
          </div>

          <div className="heroMetrics" aria-label="Resume metrics">
            {content.hero.metrics.map((metric) => (
              <div key={metric.label} className="heroMetric">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="heroPanel" aria-label="Profile summary">
          <img className="avatar" src={config.profileImageUrl} alt={config.title} />
          <div>
            <p className="heroPanelLabel">Currently</p>
            <p className="heroPanelText">Front-end developer at Motion Dynamics</p>
          </div>
          <div className="heroPanelStats">
            <div>
              <strong>4</strong>
              <span>Core skill areas</span>
            </div>
            <div>
              <strong>4</strong>
              <span>Featured systems</span>
            </div>
          </div>
        </aside>
      </div>

      <div className="systemsMap" aria-label="Technical background map">
        <div className="systemsMapTop">
          <span>Background map</span>
          <strong>Backend x AI x Data x Blockchain</strong>
        </div>
        <div className="systemsNodes">
          <div className="systemsNode nodeBackend">
            <Database size={20} />
            <span>Django APIs</span>
          </div>
          <div className="systemsNode nodeAI">
            <BrainCircuit size={20} />
            <span>AI interfaces</span>
          </div>
          <div className="systemsNode nodeSecure">
            <LockKeyhole size={20} />
            <span>MFA + secure flows</span>
          </div>
          <div className="systemsNode nodeChain">
            <Network size={20} />
            <span>Ethereum DApps</span>
          </div>
        </div>
      </div>
    </section>
  );
}
