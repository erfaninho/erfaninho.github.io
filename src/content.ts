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
    subheadline: "I Love Coding, Playing, Sharing!",
    overview:
      "This site is a small, open-source overview of what I do: projects I’ve shipped, what I’m studying, and the tools I use. Also you can reach me if you had any thoughts in yor mind using my email. Take a look at my Github also.",
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
      title: "Masters - Cognitive Neuroimaging and Data Science",
      place: "University of Birmingham - Birmingham - UK",
      period: "2024 – 2025",
      details: "Focused on Human Haptic Recognition of Softness in Virtual Reality environment.",
    },
    {
      title: "Bachelors - Electrical Engineering",
      place: "K.N. Toosi University of Technology - Tehran - Iran",
      period: "2019 – 2024",
      details: "Focused on transferring sensitive data through blockchain to maintain the Data Privacy.",
    },
  ] satisfies Study[],
  skills: [
    { name: "Languages", items: ["TypeScript", "JavaScript", "Python", "C#"] },
    { name: "Frameworks", items: ["React", "Django", "Pandas", "Numpy", "FastAPI", "RestfulAPI"] },
    { name: "Tools", items: ["Git", "Docker", "Linux"] },
  ] satisfies SkillGroup[],
  workExperience: [
    {
      title: "Fullstack Web Developer",
      company: "Motion Dynamics AI",
      period: "2025 – Ongoing",
      summary: "Full Stack web developer at Motion Dynamics AI working on delivering high quality, maintainable web services for company service clients.",
    },
  ] satisfies WorkExperience[],
  projects: [
    {
      name: "Golf Web Reports",
      summary:
        "Front-End using React combined with the C# .Net Back-End components to demonstrate data received and processed using AI from professional or semi-professional Golf Players to help them improve.",
      thumbUrl: "project_samples/web_report_sample.png",
      tags: ["Web", "React", "C#", "Front-End", ],
      links: [
      ],
    },
    {
      name: "Personal Website",
      summary: "The Web-Page that you are currently looking at xD. Please take a look over github Repo also.",
      thumbUrl: "project_samples/personal_website.png",
      tags: ["Web", "React", "Front-End", ],
      links: [{ label: "Repo", href: "https://github.com/erfaninho/erfaninho.github.io" }],
    },
  ] satisfies Project[],
};
