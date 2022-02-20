import Control from "../services/controls";
import { GamesEnum } from "../types/types";
import GameView from "../views/GameView";

class AudioCallPage extends Control {
  constructor() {
    super(null);

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("audiocall");
    const audioCall = new GameView(mainContainer, GamesEnum.audiocall);
    audioCall.render();
    const main = document.getElementById("main");
    if (main) {
      main.append(mainContainer);
    }
  }
}

export default AudioCallPage;
