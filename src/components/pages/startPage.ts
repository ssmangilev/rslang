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
  createLink;

  constructor() {
    super(null);
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
    infoButton.node.onclick = () => this.onProjectInfo();

    this.createLink = createLink;

    this.navGeneration();

    audioGmae(); /* An example of filling a class, it is also possible through methods */
  }

  private navGeneration() {
    Object.entries(Links).forEach((item) => {
      this.createLink(item[0], item[1]);
    });
  }
}

export default StartPage;
