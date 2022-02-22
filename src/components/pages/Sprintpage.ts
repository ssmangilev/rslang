import Control from "../services/controls";
import { GamesEnum } from "../types/types";
import GameView from "../views/GameView";

class SprintPage extends Control {
  group?: number;

  page?: number;
  constructor(group?: number, page?: number) {
    super(null);
    this.group = group;
    this.page = page;
    console.log(this.group);
    console.log(this.page);
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("sprint");
    if (!this.group && !this.page) {
      const sprint = new GameView(mainContainer, GamesEnum.sprint);
      sprint.render();
    } else {
      console.log(this.group);
      console.log(this.page);
      const sprint = new GameView(
        mainContainer,
        GamesEnum.sprint,
        this.group,
        this.page
      );
      sprint.render();
    }
    const main = document.getElementById("main");
    if (main) {
      main.append(mainContainer);
    }
  }
}

export default SprintPage;
