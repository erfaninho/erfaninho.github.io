/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_TITLE?: string;
  readonly VITE_PROFILE_IMAGE_URL?: string;
  readonly VITE_GITHUB_REPO_URL?: string;
  readonly VITE_GITHUB_PROFILE_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
