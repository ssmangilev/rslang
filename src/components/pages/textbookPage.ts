import Control from "../services/controls";
import { Buttons } from "../configuration/buttons";

class TextbookPage extends Control {
  onStartPage!: () => void;

  constructor() {
    super(null);

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("textbook-container");

    const main = document.getElementById("main");
    if (main) {
      main.append(mainContainer);
    }

    const onStartPage = new Control(
      mainContainer,
      "button",
      "",
      "",
      `${Buttons.onStartPage}`
    );
    onStartPage.node.onclick = () => {
      this.onStartPage();
    };
  }
}

export default TextbookPage;
