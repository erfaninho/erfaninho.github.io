const ABSOLUTE_URL = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

export function publicUrl(pathOrUrl: string) {
  if (ABSOLUTE_URL.test(pathOrUrl)) return pathOrUrl;

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = pathOrUrl.replace(/^\//, "");
  return `${normalizedBase}${normalizedPath}`;
}

