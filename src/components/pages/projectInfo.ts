import Control from "../services/controls";
import Buttons from "../configuration/buttons";
import { infoPageDescription, infoPageTitles } from "../configuration/infoPage";

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

    const infoHTitle = document.createElement("h2");
    infoHTitle.classList.add("info-container__title");
    infoHTitle.innerHTML = infoPageTitles.mainTitle;

    const infoCardContainer = document.createElement("div");
    infoCardContainer.classList.add("info-container__cards-container");

    const infoCardWords = document.createElement("div");
    infoCardWords.classList.add("cards-container__info-card");
    const cardWordsTitle = document.createElement("h7");
    cardWordsTitle.innerHTML = infoPageTitles.cardWords;
    const cardWordsImg = document.createElement("img");
    cardWordsImg.src = "../assets/svg/bx-book-bookmark.svg";
    const cardWordsDescription = document.createElement("p");
    cardWordsDescription.innerHTML = infoPageDescription.cardWords;

    const infoCardGames = document.createElement("div");
    infoCardGames.classList.add("cards-container__info-card");
    const cardGamesTitle = document.createElement("h7");
    cardGamesTitle.innerHTML = infoPageTitles.cardGames;
    const cardGamesImg = document.createElement("img");
    cardGamesImg.src = "../assets/svg/game-controller-gamepad-svgrepo-com.svg";
    const cardGamesDescription = document.createElement("p");
    cardGamesDescription.innerHTML = infoPageDescription.cardGames;

    const infoCardProgress = document.createElement("div");
    infoCardProgress.classList.add("cards-container__info-card");
    const cardProgressTitle = document.createElement("h7");
    cardProgressTitle.innerHTML = infoPageTitles.cardProgress;
    const cardProgressImg = document.createElement("img");
    cardProgressImg.src = "../assets/svg/progress-report-svgrepo-com.svg";
    const cardProgressDescription = document.createElement("p");
    cardProgressDescription.innerHTML = infoPageDescription.cardProgress;

    mainContainer.append(infoHTitle);
    mainContainer.append(infoCardContainer);

    infoCardContainer.append(infoCardWords);
    infoCardWords.append(cardWordsTitle);
    infoCardWords.append(cardWordsImg);
    infoCardWords.append(cardWordsDescription);

    infoCardContainer.append(infoCardGames);
    infoCardGames.append(cardGamesTitle);
    infoCardGames.append(cardGamesImg);
    infoCardGames.append(cardGamesDescription);

    infoCardContainer.append(infoCardProgress);
    infoCardProgress.append(cardProgressTitle);
    infoCardProgress.append(cardProgressImg);
    infoCardProgress.append(cardProgressDescription);

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
