import { publicUrl } from "./lib/publicUrl";

export const config = {
  title: import.meta.env.VITE_SITE_TITLE ?? "Your Name",
  profileImageUrl: publicUrl(import.meta.env.VITE_PROFILE_IMAGE_URL ?? "icon.ico"),
  githubRepoUrl: import.meta.env.VITE_GITHUB_REPO_URL ?? "",
  githubProfileUrl: import.meta.env.VITE_GITHUB_PROFILE_URL ?? "",
  linkedinUrl: import.meta.env.VITE_LINKEDIN_URL ?? "",
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? "you@example.com",
};
