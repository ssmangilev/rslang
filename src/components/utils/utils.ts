import Control from "../services/controls";
import Links from "../configuration/links";

export default function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createLink(linkName: string, linkText: string) {
  const link = new Control(
    document.getElementById("nav"),
    "a",
    "side-navigation__link",
    `${linkName}Page`,
    `${Links.linkName}`
  );
  if (linkName === "main") {
    link.node.setAttribute("href", "/");
  } else {
    link.node.setAttribute("href", `/${linkName}`);
  }
  link.node.classList.add(`side-navigation__link_${linkName}`);
  link.node.innerText = linkText;
  link.node.onclick = (e) => e.preventDefault();
  return link;
}
