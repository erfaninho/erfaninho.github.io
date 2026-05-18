import { useEffect, useRef } from "react";

type NodeKind = "backend" | "ai" | "secure" | "chain";

type Point3D = {
  baseX: number;
  baseY: number;
  baseZ: number;
  orbit: number;
  speed: number;
  size: number;
  kind: NodeKind;
};

type ProjectedPoint = {
  x: number;
  y: number;
  scale: number;
  alpha: number;
  size: number;
  kind: NodeKind;
};

const kinds: NodeKind[] = ["backend", "ai", "secure", "chain"];

function cssColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function makePoints(seed: number, count: number): Point3D[] {
  let value = seed || 42;
  const random = () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };

  return Array.from({ length: count }, (_, index) => ({
    baseX: (random() - 0.5) * 2.8,
    baseY: (random() - 0.5) * 1.5,
    baseZ: random() * 2.2 - 0.8,
    orbit: random() * Math.PI * 2,
    speed: 0.18 + random() * 0.34,
    size: 2 + random() * 4,
    kind: kinds[index % kinds.length] ?? "backend",
  }));
}

export default function GenerativeExperienceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const palette = {
      backend: cssColor("--brand", "#9f4f2f"),
      ai: cssColor("--accent-4", "#277c73"),
      secure: cssColor("--accent-3", "#b6862d"),
      chain: cssColor("--brand-2", "#446f4a"),
      line: cssColor("--border", "rgba(72, 55, 34, 0.18)"),
      text: cssColor("--muted", "rgba(33, 27, 20, 0.66)"),
    };

    const points = makePoints(2026, window.innerWidth < 760 ? 34 : 58);
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let scrollProgress = 0;

    const updateScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = window.scrollY / maxScroll;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (point: Point3D, time: number): ProjectedPoint => {
      const scrollOrbit = scrollProgress * Math.PI * 2;
      const driftX = Math.sin(time * point.speed + point.orbit) * 0.22;
      const driftY = Math.cos(time * point.speed * 0.8 + point.orbit) * 0.14;
      const driftZ = Math.sin(time * point.speed * 0.65 + point.orbit) * 0.42;
      const rotatedX = point.baseX * Math.cos(scrollOrbit * 0.16) - point.baseZ * Math.sin(scrollOrbit * 0.16);
      const rotatedZ = point.baseX * Math.sin(scrollOrbit * 0.16) + point.baseZ * Math.cos(scrollOrbit * 0.16);
      const z = rotatedZ + driftZ + Math.sin(scrollOrbit + point.orbit) * 0.12;
      const perspective = 1.7 / (1.7 + z);
      const x = width * (0.5 + (rotatedX + driftX) * 0.3 * perspective);
      const y = height * (0.5 + (point.baseY + driftY + Math.sin(scrollOrbit * 0.7) * 0.08) * 0.42 * perspective);

      return {
        x,
        y,
        scale: perspective,
        alpha: Math.max(0.12, Math.min(0.78, 0.42 + (1 - z) * 0.18)),
        size: point.size * perspective,
        kind: point.kind,
      };
    };

    const drawGlyph = (p: ProjectedPoint, label: string) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.strokeStyle = palette[p.kind];
      ctx.fillStyle = palette[p.kind];
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(p.x - 18 * p.scale, p.y - 18 * p.scale, 36 * p.scale, 36 * p.scale, 5 * p.scale);
      ctx.stroke();
      ctx.font = `${Math.max(8, 10 * p.scale)}px "IBM Plex Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, p.x, p.y);
      ctx.restore();
    };

    const draw = (now: number) => {
      const time = now * 0.001;
      ctx.clearRect(0, 0, width, height);

      const projected = points.map((point) => project(point, time));

      ctx.save();
      ctx.globalAlpha = 0.45;
      for (let i = 0; i < projected.length; i += 1) {
        for (let j = i + 1; j < projected.length; j += 1) {
          const a = projected[i];
          const b = projected[j];
          if (!a || !b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 150) continue;
          ctx.globalAlpha = (1 - distance / 150) * 0.18;
          ctx.strokeStyle = a.kind === b.kind ? palette[a.kind] : palette.line;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.restore();

      for (const p of projected) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = palette[p.kind];
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.5, p.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const glyphs: Array<[number, string]> = [
        [1, "API"],
        [9, "AI"],
        [17, "MFA"],
        [25, "ETH"],
      ];
      for (const [index, label] of glyphs) {
        const point = projected[index];
        if (point) drawGlyph(point, label);
      }

      ctx.save();
      ctx.globalAlpha = 0.34;
      ctx.fillStyle = palette.text;
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.fillText("JSON -> charts -> decisions", width * 0.08, height * 0.22);
      ctx.fillText("Django / PostgreSQL / REST", width * 0.62, height * 0.18);
      ctx.fillText("VR perception data", width * 0.18, height * 0.78);
      ctx.restore();

      raf = window.requestAnimationFrame(draw);
    };

    updateScroll();
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });
    raf = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="generativeExperienceBg"
      aria-hidden="true"
    />
  );
}
