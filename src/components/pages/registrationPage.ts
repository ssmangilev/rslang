import Control from "../services/controls";
import Buttons from "../configuration/buttons";

class RegistrationPage extends Control {
  onStartPage!: () => void;

  constructor() {
    super(null);

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("registration-container");

    const main = document.getElementById("main");
    if (main) {
      main.append(mainContainer);
    }

    const onStartPage = new Control(
      mainContainer,
      "button",
      "",
      "",
      `${Buttons.cancellation}`
    );
    onStartPage.node.onclick = () => {
      this.onStartPage();
    };
  }
}

export default RegistrationPage;
