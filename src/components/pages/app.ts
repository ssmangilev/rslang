import Control from "../services/controls";
import RegistrPage from "./registration";
import StartPage from "./start-page";
import InfoPage from "./project-Info";

class Application extends Control {
  constructor() {
    super(null);
    this.mainCycle();
  }

  private mainCycle() {
    const startPage = new StartPage();
    startPage.onRegistration = () => {
      startPage.destroy(document.getElementById("main") as HTMLElement);
      const registrPage = new RegistrPage();

      registrPage.onStartPage = () => {
        registrPage.destroy(document.getElementById("main") as HTMLElement);
        this.mainCycle();
      };
    };

    startPage.onProjectInfo = () => {
      startPage.destroy(document.getElementById("main") as HTMLElement);
      const infoPage = new InfoPage();

      infoPage.onStartPage = () => {
        infoPage.destroy(document.getElementById("main") as HTMLElement);
        this.mainCycle();
      };
    };
  }
}

export default Application;
