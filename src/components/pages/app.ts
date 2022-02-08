import Control from "../services/controls";
import RegistrationPage from "./registrationPage";
import StartPage from "./startPage";
import InfoPage from "./projectInfo";
import TextbookPage from "./textbookPage";

class Application extends Control {
  constructor() {
    super(null);
    this.mainCycle();
  }

  private mainCycle() {
    const startPage = new StartPage();
    startPage.onRegistration = () => {
      startPage.destroyСontent(document.getElementById("main") as HTMLElement);
      const registrationPage = new RegistrationPage();

      registrationPage.onStartPage = () => {
        registrationPage.destroyСontent(
          document.getElementById("main") as HTMLElement
        );
        this.mainCycle();
      };
    };

    startPage.onProjectInfo = () => {
      startPage.destroyСontent(document.getElementById("main") as HTMLElement);
      const infoPage = new InfoPage();

      infoPage.onStartPage = () => {
        infoPage.destroyСontent(document.getElementById("main") as HTMLElement);
        this.mainCycle();
      };
    };

    startPage.onTextbookPage = () => {
      startPage.destroyСontent(document.getElementById("main") as HTMLElement);
      const textbookPage = new TextbookPage();

      textbookPage.onStartPage = () => {
        textbookPage.destroyСontent(
          document.getElementById("main") as HTMLElement
        );
        this.mainCycle();
      };
    };
  }
}

export default Application;
