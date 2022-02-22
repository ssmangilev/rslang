import Control from "../services/controls";
import { GamesEnum } from "../types/types";
import GameView from "../views/GameView";

class AudioCallPage extends Control {
  group?: number;

  page?: number;
  constructor(group?: number, page?: number) {
    super(null);
    this.group = group;
    this.page = page;
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("audiocall");
    if (!this.group && !this.page) {
      const audioCall = new GameView(mainContainer, GamesEnum.audiocall);
      audioCall.render();
    }
    if (this.group && this.page) {
      const audioCall = new GameView(
        mainContainer,
        GamesEnum.audiocall,
        this.group,
        this.page
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
