import Control from "../services/controls";
import { Buttons } from "../configuration/buttons";
import { cardsLoader } from "../services/cardsLoader";
import { createTesxtbookSectionSelect } from "../controllers/textbookSectionSelect";
import { textbookSectionsColors } from "../configuration/textbookSections";
import { createTextbookPagesSelect } from "../controllers/textbookPageSelect";

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

    createTextbookPagesSelect(textbookNavigation);

    const textbookSectionSelect = document.getElementById(
      "textbook-section-select"
    ) as HTMLSelectElement;

    if (
      !localStorage.getItem("textbookSection") ||
      localStorage.getItem("textbookSection") === "0"
    ) {
      cardsLoader("0", "0");
      textbookSectionSelect.style.background = textbookSectionsColors["0"];
    } else {
      cardsLoader(`${localStorage.getItem("textbookSection")}`, "0");
      textbookSectionSelect.selectedIndex = localStorage.getItem(
        "textbookSection"
      ) as unknown as number;
      textbookSectionSelect.style.background =
        textbookSectionsColors[
          localStorage.getItem("textbookSection") as unknown as number
        ];
    }

    if (textbookSectionSelect) {
      textbookSectionSelect.onchange = () => {
        const index = textbookSectionSelect.selectedIndex;
        textbookSectionSelect.style.background = textbookSectionsColors[index];
        while (cardsContainer.firstChild) {
          cardsContainer.removeChild(cardsContainer.firstChild);
        }
        cardsLoader(`${index}`, "0");
        localStorage.setItem("textbookSection", `${index}`);
        /* localStorage.setItem('textbookPage', "1"); */
      };
    }
  }
}

export default TextbookPage;
