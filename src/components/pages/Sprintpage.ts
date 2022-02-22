import Control from "../services/controls";
import { GamesEnum } from "../types/types";
import GameView from "../views/GameView";

class SprintPage extends Control {
  group?: number;

  page?: number;
  constructor(group?: number, page?: number) {
    super(null);

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("sprint");
    if (!group && !page) {
      const sprint = new GameView(mainContainer, GamesEnum.sprint);
      sprint.render();
    }
    if ((group || group === 0) && (page || page === 0)) {
      const sprint = new GameView(mainContainer, GamesEnum.sprint, group, page);
      sprint.render();
    }
    const main = document.getElementById("main");
    if (main) {
      main.append(mainContainer);
    }
  }
}

export default SprintPage;
