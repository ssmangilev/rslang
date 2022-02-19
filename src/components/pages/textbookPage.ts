import Control from "../services/controls";
import { Buttons } from "../configuration/buttons";
import { cardsLoader } from "../services/cardsLoader";
import { createTesxtbookSectionSelect } from "../controllers/tesxtbookSectionSelect";

class TextbookPage extends Control {
  onStartPage!: () => void;

  constructor() {
    super(null);

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("textbook-container");
    mainContainer.id = "textbook-container";

    const cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cards-container");
    cardsContainer.id = "cards-container";

    const textbookNavigation = document.createElement("div");
    textbookNavigation.classList.add("textbook-navigation");
    textbookNavigation.id = "textbook-navigation";

    const main = document.getElementById("main");
    if (main) {
      main.append(mainContainer);
      mainContainer.append(textbookNavigation);
      mainContainer.append(cardsContainer);
    }

    const onStartPage = new Control(
      textbookNavigation,
      "button",
      "",
      "",
      `${Buttons.onStartPage}`
    );
    onStartPage.node.onclick = () => {
      this.onStartPage();
    };

    createTesxtbookSectionSelect(textbookNavigation);

    const tesxtbookSectionSelect = document.getElementById(
      "tesxtbook-section-select"
    ) as HTMLSelectElement;

    cardsLoader("0", "0");
    if (tesxtbookSectionSelect) {
      tesxtbookSectionSelect.onchange = () => {
        const index = tesxtbookSectionSelect.selectedIndex;
        while (cardsContainer.firstChild) {
          cardsContainer.removeChild(cardsContainer.firstChild);
        }
        cardsLoader(`${index}`, "1");
      };
    }
  }
}

export default TextbookPage;
