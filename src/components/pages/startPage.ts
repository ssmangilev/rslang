import Control from "../services/controls";
import Buttons from "../configuration/buttons";
import Links from "../configuration/links";
import { createLink } from "../utils/utils";

function audioGmae() {
  console.log("Пример дальнейшего выполнения страницы");
}

class StartPage extends Control {
  onRegistration!: () => void;
  onProjectInfo!: () => void;
  onStartPage!: () => void;
  onTextbookPage!: () => void;
  onAboutPage!: () => void;
  onStatPage!: () => void;
  createLink;
  main;

  constructor() {
    super(null);
    this.main = <HTMLElement>document.getElementById("main");
    this.render();
    const registrButton = new Control(
      document.getElementById("main-btns"),
      "button",
      "main__btn button",
      "",
      `${Buttons.onRegistration}`
    );
    registrButton.node.onclick = () => this.onRegistration();

    const infoButton = new Control(
      document.getElementById("main-btns"),
      "button",
      "main__btn button",
      "",
      `${Buttons.onProjectInfo}`
    );
    infoButton.node.onclick = () => {};

    this.createLink = createLink;

    this.navGeneration();
    (
      document.querySelector(".side-navigation__link_ebook") as HTMLElement
    ).addEventListener("click", () => {
      this.onTextbookPage();
    });
    (
      document.querySelector(".side-navigation__link_dictionary") as HTMLElement
    ).addEventListener("click", () => {
      console.log(1);
    });
    (
      document.querySelector(".side-navigation__link_sprint") as HTMLElement
    ).addEventListener("click", () => {
      console.log(1);
    });
    (
      document.querySelector(".side-navigation__link_audioTask") as HTMLElement
    ).addEventListener("click", () => {
      console.log(1);
    });
    (
      document.querySelector(".side-navigation__link_team") as HTMLElement
    ).addEventListener("click", () => {
      this.onAboutPage();
    });
    (
      document.querySelector(".side-navigation__link_statistics") as HTMLElement
    ).addEventListener("click", () => {
      this.onStatPage();
    });

    audioGmae(); /* An example of filling a class, it is also possible through methods */
  }

  private navGeneration() {
    Object.entries(Links).forEach((item) => {
      this.createLink(item[0], item[1]);
    });
  }

  private render() {
    const mainTitle = document.createElement("h1");
    mainTitle.classList.add("main-ui__title");
    mainTitle.innerText = "RSLang";
    this.main.append(mainTitle);
    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("main-ui__btns");
    btnsDiv.id = "main-btns";
    this.main.append(btnsDiv);
  }
}

export default StartPage;
