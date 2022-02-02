import Control from "../services/controls";
import RegistrationPage from "./registrationPage";
import StartPage from "./startPage";
import InfoPage from "./projectInfo";

class Application extends Control {
  constructor() {
    super(null);
    this.mainCycle();
  }

  private mainCycle() {
    const startPage = new StartPage();
    startPage.onRegistration = () => {
      startPage.destroy(document.getElementById("main") as HTMLElement);
      const registrationPage = new RegistrationPage();

      registrationPage.onStartPage = () => {
        registrationPage.destroy(
          document.getElementById("main") as HTMLElement
        );
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
