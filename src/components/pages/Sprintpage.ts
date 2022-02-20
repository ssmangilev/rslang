import Control from "../services/controls";
import { GamesEnum } from "../types/types";
import GameView from "../views/GameView";

class SprintPage extends Control {
  constructor() {
    super(null);

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("sprint");
    const sprint = new GameView(mainContainer, GamesEnum.sprint);
    sprint.render();
    const main = document.getElementById("main");
    if (main) {
      main.append(mainContainer);
    }
  }
}

export default SprintPage;
