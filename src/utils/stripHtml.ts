export const stripHtml = (html: string) => {
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  const textContent = tmp.textContent || tmp.innerText || "";
  return textContent.replace(/\s+/g, " ").trim();
};
