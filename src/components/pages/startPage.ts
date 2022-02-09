import Control from "../services/controls";
import Buttons from "../configuration/buttons";

function audioGmae() {
  console.log("Пример дальнейшего выполнения страницы");
}

class StartPage extends Control {
  onRegistration!: () => void;

  onProjectInfo!: () => void;

  constructor() {
    super(null);
    const registrButton = new Control(
      document.getElementById("main"),
      "button",
      "",
      "",
      `${Buttons.onRegistration}`
    );
    registrButton.node.onclick = () => this.onRegistration();

    const infoButton = new Control(
      document.getElementById("main"),
      "button",
      "",
      "",
      `${Buttons.onProjectInfo}`
    );
    infoButton.node.onclick = () => this.onProjectInfo();

    this.navGeneration();

    audioGmae(); /* An example of filling a class, it is also possible through methods */
  }

  private navGeneration() {
    const checkInfBtn = document.getElementById("nav-info");
    if (!checkInfBtn) {
      const infoNavButton = new Control(
        document.getElementById("nav"),
        "button",
        "nav-info",
        "nav-info",
        `${Buttons.onProjectInfo}`
      );
      infoNavButton.node.onclick = () => this.onProjectInfo();
    }
  }
}

export default StartPage;
