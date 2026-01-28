export type ProjectLink = { label: string; href: string };

export type Project = {
  name: string;
  summary: string;
  thumbUrl?: string;
  tags: string[];
  links: ProjectLink[];
};

export type Study = {
  title: string;
  place: string;
  period: string;
  details?: string;
};

export type SkillGroup = {
  name: string;
  items: string[];
};

export type WorkExperience = {
  title: string;
  company: string;
  period: string;
  summary: string;
};

export const content = {
  hero: {
    headline: "Erfan Echresh",
    subheadline: "I build things for the web and love learning new tech.",
    overview:
      "This site is a small, open-source overview of what I do: projects I’ve shipped, what I’m studying, and the tools I use.",
  },
  about: {
    title: "Overview",
    bullets: [
      "Focused on building reliable, user-friendly software.",
      "Interested in web development and modern tooling.",
      "Always learning and improving through projects.",
    ],
  },
  studies: [
    {
      title: "Degree / Program",
      place: "University / School",
      period: "202X – 202Y",
      details: "A short line about your focus area.",
    },
  ] satisfies Study[],
  skills: [
    { name: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
    { name: "Frameworks", items: ["React", "Node.js", "Express"] },
    { name: "Tools", items: ["Git", "Docker", "Linux"] },
  ] satisfies SkillGroup[],
  workExperience: [
    {
      title: "Role Title",
      company: "Company",
      period: "202X – 202Y",
      summary: "One concise line about what you did or delivered.",
    },
    {
      title: "Another Role",
      company: "Company",
      period: "202X – Present",
      summary: "Another concise line about impact or responsibilities.",
    },
  ] satisfies WorkExperience[],
  projects: [
    {
      name: "Project Name",
      summary:
        "One sentence describing what it is, what problem it solves, or what you learned.",
      thumbUrl: "placeholders/project.svg",
      tags: ["Web", "React", "Django", ],
      links: [
        { label: "Repo", href: "https://github.com/yourname/project" },
        { label: "Demo", href: "https://example.com" },
      ],
    },
    {
      name: "Another Project",
      summary: "A short description with a clear outcome.",
      thumbUrl: "placeholders/project.svg",
      tags: ["Tooling"],
      links: [{ label: "Repo", href: "https://github.com/yourname/another" }],
    },
  ] satisfies Project[],
};
