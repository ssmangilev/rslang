import Control from "../services/controls";
import { GamesEnum } from "../types/types";
import GameView from "../views/GameView";

class AudioCallPage extends Control {
  group?: number;

  page?: number;
  constructor(group?: number, page?: number) {
    super(null);
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("audiocall");
    if (!group && group !== 0 && !page && page !== 0) {
      const audioCall = new GameView(mainContainer, GamesEnum.audiocall);
      audioCall.render();
    }
    if ((group || group === 0) && (page || page === 0)) {
      console.log(group);
      console.log(page);
      const audioCall = new GameView(
        mainContainer,
        GamesEnum.audiocall,
        group,
        page
      );
      audioCall.render();
    }
    const main = document.getElementById("main");
    if (main) {
      main.append(mainContainer);
    }
  }
}

export default AudioCallPage;
