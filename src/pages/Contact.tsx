import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import { copyText } from "../lib/copy";
import Reveal from "../components/Reveal";

function buildMailto(to: string, subject: string, body: string) {
  const params = new URLSearchParams({
    subject,
    body,
  });
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const mailto = useMemo(() => {
    const subject = `Website message from ${name || "someone"}`;
    const body = [`From: ${from || "(not provided)"}`, "", message || "(no message)"].join("\n");
    return buildMailto(config.contactEmail, subject, body);
  }, [from, message, name]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    window.location.href = mailto;
  }

  async function onCopyEmail() {
    await copyText(config.contactEmail);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <main className="container page stack">
      <div className="stack">
        <h1 className="h2">Contact</h1>
        <p className="muted">
          This site is hosted on GitHub Pages (static), so messages open your email client.
        </p>
      </div>

      <Reveal as="form" className="card form" onSubmit={onSubmit}>
        <label className="field">
          <span className="label">Your name</span>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </label>

        <label className="field">
          <span className="label">Your email</span>
          <input
            className="input"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="jane@example.com"
            autoComplete="email"
            inputMode="email"
          />
        </label>

        <label className="field">
          <span className="label">Message</span>
          <textarea
            className="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What would you like to talk about?"
            rows={6}
          />
        </label>

        <div className="row">
          <button className="button" type="submit">
            Open email draft
          </button>
          <button className="button buttonGhost" type="button" onClick={onCopyEmail}>
            {copied ? "Copied!" : "Copy my email"}
          </button>
          <span className="muted grow">{config.contactEmail}</span>
        </div>
      </Reveal>

      <div className="row">
        <Link className="link" to="/">
          ← Back home
        </Link>
      </div>
    </main>
  );
}
