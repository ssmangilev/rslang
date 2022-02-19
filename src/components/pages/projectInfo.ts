import Control from "../services/controls";
import Buttons from "../configuration/buttons";

class InfoPage extends Control {
  onStartPage!: () => void;

  constructor() {
    super(null);

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("info-container");

    const main = document.getElementById("main");

    if (main) {
      main.append(mainContainer);
    }

    const onStartPage = new Control(
      mainContainer,
      "button",
      "button route-btn route-btn_main",
      "",
      `${Buttons.onStartPage}`
    );
    onStartPage.node.onclick = () => {
      this.onStartPage();
    };
  }
}

export default InfoPage;
