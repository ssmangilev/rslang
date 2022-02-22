import Control from "../services/controls";
import Links from "../configuration/links";
import { IWord } from "../types/types";

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

export function getLoaderSVG(): string {
  return `<svg class="loader__image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path fill="#fff"
    d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
  </path>
</svg>`;
}

export function generateRandomNumber(limit: number): number {
  return Math.floor(Math.random() * limit);
}

export function shuffleWordsArray(array: IWord[]): IWord[] {
  return array.sort(() => Math.random() - 0.5);
}
