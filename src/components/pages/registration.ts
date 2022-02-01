import Control from "../services/controls";

class RegistrPage extends Control {
  onStartPage!: () => void;

  constructor() {
    super(null);

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("registr-container");

    const main = document.getElementById("main");
    if (main) {
      main.append(mainContainer);
    }

    const onStartPage = new Control(mainContainer, "button", "", "", "Отмена");
    onStartPage.node.onclick = () => {
      this.onStartPage();
    };
  }
}

export default RegistrPage;
