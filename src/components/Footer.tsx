import { config } from "../config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footerInner">
        <span className="muted">© {year} {config.title}</span>
        <span className="footerLinks">
          <a className="muted" href="#/?s=top">
            Back to top
          </a>
        </span>
      </div>
    </footer>
  );
}

