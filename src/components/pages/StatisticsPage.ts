import Control from "../services/controls";
import { GamesEnum } from "../types/types";
import StatisticsView from "../views/StatisticsView";

class StatisticsPage extends Control {
  constructor() {
    super(null);

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("statistics");
    const stats = new StatisticsView(mainContainer);
    stats.render();
    const main = document.getElementById("main");
    if (main) {
      main.append(mainContainer);
    }
  }
}

export default StatisticsPage;
