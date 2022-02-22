import Control from "../services/controls";
import Buttons from "../configuration/buttons";
import { cardsLoader } from "../services/cardsLoader";
import { createTesxtbookSectionSelect } from "../controllers/textbookSectionSelect";
import { textbookSectionsColors } from "../configuration/textbookSections";
import { createTextbookPagesSelect } from "../controllers/textbookPageSelect";

class TextbookPage extends Control {
  onStartPage!: () => void;

  onSprint!: () => void;

  onAudioCall!: () => void;

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

    const onSprintPage = new Control(
      textbookNavigation,
      "button",
      "sprint-button-ebook",
      "sprint-button-ebook",
      `${Buttons.onSprintPage}`,
      true
    );
    const onAudioCallPage = new Control(
      textbookNavigation,
      "button",
      "audiocall-button-ebook",
      "audiocall-button-ebook",
      `${Buttons.onAudioCallPage}`,
      true
    );

    onStartPage.node.onclick = () => {
      this.onStartPage();
    };

    onSprintPage.node.onclick = () => this.onSprint();

    onAudioCallPage.node.onclick = () => this.onAudioCall();

    createTesxtbookSectionSelect(textbookNavigation);

    createTextbookPagesSelect(textbookNavigation);

    const textbookSectionSelect = document.getElementById(
      "textbook-section-select"
    ) as HTMLSelectElement;

    const textbookPagesSelect = document.getElementById(
      "textbook-pages-select"
    ) as HTMLSelectElement;

    let page = "0";
    let group = "0";

    if (
      !localStorage.getItem("textbookSection") ||
      localStorage.getItem("textbookSection") === "0"
    ) {
      group = "0";
      textbookSectionSelect.selectedIndex = 0;
      textbookSectionSelect.style.background = textbookSectionsColors["0"];
    } else {
      group = localStorage.getItem("textbookSection") as string;
      textbookSectionSelect.selectedIndex = localStorage.getItem(
        "textbookSection"
      ) as unknown as number;
      textbookSectionSelect.style.background =
        textbookSectionsColors[
          localStorage.getItem("textbookSection") as unknown as number
        ];
    }

    if (
      !localStorage.getItem("textbookPage") ||
      localStorage.getItem("textbookPage") === "0"
    ) {
      page = "0";
      textbookPagesSelect.selectedIndex = 0;
    } else {
      page = localStorage.getItem("textbookPage") as string;
      textbookPagesSelect.selectedIndex = localStorage.getItem(
        "textbookPage"
      ) as unknown as number;
    }

    cardsLoader(`${group}`, `${page}`);

    if (textbookSectionSelect) {
      textbookSectionSelect.onchange = () => {
        const sectionIndex = textbookSectionSelect.selectedIndex;
        textbookSectionSelect.style.background =
          textbookSectionsColors[sectionIndex];
        while (cardsContainer.firstChild) {
          cardsContainer.removeChild(cardsContainer.firstChild);
        }
        cardsLoader(`${sectionIndex}`, "0");
        localStorage.setItem("textbookSection", `${sectionIndex}`);
        if (textbookPagesSelect) {
          localStorage.setItem("textbookPage", `${0}`);
          textbookPagesSelect.selectedIndex = 0;
        }
      };
    }

    if (textbookPagesSelect) {
      textbookPagesSelect.onchange = () => {
        const pageIndex = textbookPagesSelect.selectedIndex;
        while (cardsContainer.firstChild) {
          cardsContainer.removeChild(cardsContainer.firstChild);
        }
        cardsLoader(`${group}`, `${pageIndex}`);
        localStorage.setItem("textbookPage", `${pageIndex}`);
      };
    }
  }
}

export default TextbookPage;
