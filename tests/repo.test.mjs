import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, test } from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const fromRoot = (...parts) => join(root, ...parts);

function read(path) {
  return readFileSync(fromRoot(path), "utf8");
}

function extractArrayItems(source, arrayName) {
  const match = source.match(new RegExp(`${arrayName}: \\[(?<body>[\\s\\S]*?)\\]\\s+satisfies`));
  assert.ok(match?.groups?.body, `Expected to find ${arrayName} array in content.ts`);

  return [...match.groups.body.matchAll(/name: "([^"]+)"/g)].map((item) => item[1]);
}

describe("portfolio content", () => {
  const contentSource = read("src/content.ts");

  test("keeps the four headline metrics used by the hero cards", () => {
    const metrics = [...contentSource.matchAll(/\{ value: "([^"]+)", label: "([^"]+)" \}/g)].map((match) => ({
      value: match[1],
      label: match[2],
    }));

    assert.deepEqual(metrics, [
      { value: "20%", label: "sales increase from e-commerce delivery" },
      { value: "50%", label: "less scheduling time in booking workflow" },
      { value: "5", label: "production and freelance roles" },
      { value: "MSc", label: "cognitive neuroimaging and data science" },
    ]);
  });

  test("keeps the expected featured project list", () => {
    assert.deepEqual(extractArrayItems(contentSource, "projects"), [
      "E-Commerce Platform",
      "Reservation System",
      "Golf Web Reports",
      "Medical Data DApp",
    ]);
  });

  test("references existing project thumbnail assets", () => {
    const thumbUrls = [...contentSource.matchAll(/thumbUrl: "([^"]+)"/g)].map((match) => match[1]);

    assert.equal(thumbUrls.length, 4);
    for (const thumbUrl of thumbUrls) {
      assert.ok(existsSync(fromRoot("public", thumbUrl)), `${thumbUrl} should exist in public/`);
    }
  });

  test("project tags include all filters expected by the project section", () => {
    const tags = new Set([...contentSource.matchAll(/tags: \[([^\]]+)\]/g)].flatMap((match) => {
      return [...match[1].matchAll(/"([^"]+)"/g)].map((tag) => tag[1]);
    }));

    for (const expectedTag of ["Django", "React", "Blockchain", "Ethereum", "Payments", "AI Insights"]) {
      assert.ok(tags.has(expectedTag), `Missing project tag: ${expectedTag}`);
    }
  });
});

describe("routing and navigation", () => {
  test("defines the public routes used by the site", () => {
    const appSource = read("src/App.tsx");

    assert.match(appSource, /<Route path="\/" element=\{<Home \/>\} \/>/);
    assert.match(appSource, /<Route path="\/api" element=\{<Api \/>\} \/>/);
    assert.match(appSource, /<Route path="\/contact" element=\{<Contact \/>\} \/>/);
    assert.match(appSource, /<Route path="\*" element=\{<NotFound \/>\} \/>/);
  });

  test("project filter uses accessible tabs and selected state", () => {
    const tagFilterSource = read("src/components/TagFilter.tsx");

    assert.match(tagFilterSource, /role="tablist"/);
    assert.match(tagFilterSource, /role="tab"/);
    assert.match(tagFilterSource, /aria-selected=\{isActive\}/);
    assert.match(tagFilterSource, /onClick=\{\(\) => onChange\(tag\)\}/);
  });
});

describe("hero metric magnifier", () => {
  const heroSource = read("src/components/home/HeroCard.tsx");
  const stylesSource = read("src/styles.css");

  test("renders a lens only for the active metric card", () => {
    assert.match(heroSource, /metricLens\?\.index === index/);
    assert.match(heroSource, /className="metricLens"/);
    assert.match(heroSource, /className="metricLensViewport"/);
    assert.match(heroSource, /className="metricLensContent"/);
  });

  test("clamps the lens inside metric card bounds", () => {
    assert.match(heroSource, /function clampLensPosition/);
    assert.match(heroSource, /Math\.min\(Math\.max\(x, metricLensRadius\)/);
    assert.match(heroSource, /Math\.min\(Math\.max\(y, metricLensRadius\)/);
  });

  test("hides the native cursor and draws a complete magnifier body", () => {
    assert.match(stylesSource, /\.heroMetric\s*\{[\s\S]*cursor: none;/);
    assert.match(stylesSource, /\.metricLens\s*\{[\s\S]*isolation: isolate;/);
    assert.match(stylesSource, /\.metricLens::before\s*\{[\s\S]*z-index: 0;/);
    assert.match(stylesSource, /\.metricLensViewport\s*\{[\s\S]*z-index: 1;/);
    assert.match(stylesSource, /\.metricLens::after\s*\{[\s\S]*z-index: 2;/);
  });

  test("does not render the removed floating hero tag objects", () => {
    assert.doesNotMatch(heroSource, /floatingObject/);
    assert.doesNotMatch(stylesSource, /\.floatingObject/);
    assert.doesNotMatch(stylesSource, /\.floatingStage/);
  });
});

describe("npm scripts", () => {
  test("exposes build, typecheck, and test commands", () => {
    const packageJson = JSON.parse(read("package.json"));

    assert.equal(packageJson.scripts.build, "tsc --noEmit && vite build");
    assert.equal(packageJson.scripts.typecheck, "tsc --noEmit --pretty false");
    assert.equal(packageJson.scripts.test, "node --test tests/*.test.mjs");
  });
});
