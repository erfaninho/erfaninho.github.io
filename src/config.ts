import { publicUrl } from "./lib/publicUrl";

function splitCsv(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const config = {
  title: import.meta.env.VITE_SITE_TITLE ?? "Your Name",
  profileImageUrl: publicUrl(import.meta.env.VITE_PROFILE_IMAGE_URL ?? "icon.png"),
  githubRepoUrl: import.meta.env.VITE_GITHUB_REPO_URL ?? "",
  githubProfileUrl: import.meta.env.VITE_GITHUB_PROFILE_URL ?? "",
  linkedinUrl: import.meta.env.VITE_LINKEDIN_URL ?? "",
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? "you@example.com",
  apiCaller: {
    models: splitCsv(import.meta.env.VITE_API_MODELS ?? "gemini-2.5-flash-lite"),
    endpointTemplate:
      import.meta.env.VITE_API_ENDPOINT_TEMPLATE ??
      "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
  },
};
