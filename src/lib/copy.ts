export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {}

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
