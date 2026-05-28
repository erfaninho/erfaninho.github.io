import { Link } from "react-router-dom";
import { config } from "../../config";
import { content } from "../../content";
import { scrollToSectionSoon } from "../../hooks/useScrollToSection";
import { ArrowRight, BrainCircuit, Database, LockKeyhole, Mail, Network } from "lucide-react";
import {
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type MetricLens = {
  index: number;
  x: number;
  y: number;
  lensX: number;
  lensY: number;
  width: number;
  height: number;
};

const metricLensRadius = 48;
const metricLensScale = 1.9;

function clampLensPosition(x: number, y: number, width: number, height: number) {
  return {
    lensX: Math.min(Math.max(x, metricLensRadius), Math.max(metricLensRadius, width - metricLensRadius)),
    lensY: Math.min(Math.max(y, metricLensRadius), Math.max(metricLensRadius, height - metricLensRadius)),
  };
}

export default function HeroCard() {
  const metricRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [metricLens, setMetricLens] = useState<MetricLens | null>(null);

  useEffect(() => {
    const updateLensFromWindow = (event: MouseEvent | PointerEvent) => {
      const metricIndex = metricRefs.current.findIndex((node) => {
        if (!node) return false;
        const rect = node.getBoundingClientRect();
        return (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        );
      });

      const node = metricRefs.current[metricIndex];
      if (!node) {
        setMetricLens(null);
        return;
      }

      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const { lensX, lensY } = clampLensPosition(x, y, rect.width, rect.height);
      setMetricLens({
        index: metricIndex,
        x,
        y,
        lensX,
        lensY,
        width: rect.width,
        height: rect.height,
      });
    };

    window.addEventListener("mousemove", updateLensFromWindow, { passive: true });
    window.addEventListener("pointermove", updateLensFromWindow, { passive: true });
    return () => {
      window.removeEventListener("mousemove", updateLensFromWindow);
      window.removeEventListener("pointermove", updateLensFromWindow);
    };
  }, []);

  const updateMetricLens = (
    event: ReactMouseEvent<HTMLDivElement> | ReactPointerEvent<HTMLDivElement>,
    index: number,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const { lensX, lensY } = clampLensPosition(x, y, rect.width, rect.height);
    setMetricLens({
      index,
      x,
      y,
      lensX,
      lensY,
      width: rect.width,
      height: rect.height,
    });
  };

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
            <a className="button" href="#/?s=projects" onClick={() => scrollToSectionSoon("projects")}>
              View projects <ArrowRight size={18} />
            </a>
            <Link className="button contactCta" to="/contact">
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
            {content.hero.metrics.map((metric, index) => (
              <div
                key={metric.label}
                ref={(node) => {
                  metricRefs.current[index] = node;
                }}
                className="heroMetric"
                onMouseMove={(event) => updateMetricLens(event, index)}
                onPointerMove={(event) => updateMetricLens(event, index)}
                onPointerLeave={() => {
                  setMetricLens(null);
                }}
                onMouseLeave={() => {
                  setMetricLens(null);
                }}
              >
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                {metricLens?.index === index ? (
                  <div
                    className="metricLens"
                    aria-hidden="true"
                    style={{
                      left: `${metricLens.lensX}px`,
                      top: `${metricLens.lensY}px`,
                    }}
                  >
                    <div className="metricLensViewport">
                      <div
                        className="metricLensContent"
                        style={{
                          width: `${metricLens.width}px`,
                          height: `${metricLens.height}px`,
                          transform: `translate(${metricLensRadius - metricLens.x * metricLensScale}px, ${metricLensRadius - metricLens.y * metricLensScale}px) scale(${metricLensScale})`,
                        }}
                      >
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <aside className="heroPanel" aria-label="Profile summary">
          <figure className="portraitFrame">
            <img className="avatar" src={config.profileImageUrl} alt={config.title} />
            <figcaption>Python / Django Developer</figcaption>
          </figure>
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
