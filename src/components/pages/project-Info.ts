import Control from "../services/controls";

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
      "",
      "",
      "На главную"
    );
    onStartPage.node.onclick = () => {
      this.onStartPage();
    };
  }
}

export default InfoPage;
