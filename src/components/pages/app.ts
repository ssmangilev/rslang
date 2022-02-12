import Control from "../services/controls";
import StartPage from "./startPage";
import InfoPage from "./projectInfo";
import ModalWindow from "../views/ModalWindow";
import Buttons from "../configuration/buttons";
import { createUser } from "../api/UsersEndpoint";
import { logIn } from "../api/SigninEndpoint";

class Application extends Control {
  constructor() {
    super(null);
    this.mainCycle();
  }

  private mainCycle() {
    const headerButton: HTMLElement = document.getElementById(
      "button-login"
    ) as HTMLElement;
    const header: HTMLElement = document.getElementById(
      "header-ui"
    ) as HTMLElement;
    const loginModalWindow = new ModalWindow(
      header,
      Buttons.onRegistration,
      "modal-window-login",
      [
        {
          name: "email",
          title: "E-mail",
          placeholder: "Please enter an e-mail",
          type: "email",
          required: true,
        },
        {
          name: "password",
          title: "Password",
          placeholder: "Please enter a password",
          type: "password",
          required: true,
          minLength: 8,
        },
      ],
      "Login",
      logIn
    );
    loginModalWindow.render();
    headerButton.addEventListener("click", (): void => {
      const modalLoginContainer: HTMLElement = document.getElementById(
        loginModalWindow.id
      ) as HTMLElement;
      modalLoginContainer.style.display = "block";
    });
    const startPage = new StartPage();
    const registrationModalWindow = new ModalWindow(
      document.body,
      Buttons.onRegistration,
      "modal-window-registration",
      [
        {
          name: "email",
          title: "E-mail",
          placeholder: "Please enter an e-mail",
          type: "email",
          required: true,
        },
        {
          name: "name",
          title: "Name",
          placeholder: "Please enter a Name",
          type: "text",
          required: true,
          minLength: 3,
        },
        {
          name: "password",
          title: "Password",
          placeholder: "Please enter a password",
          type: "password",
          required: true,
          minLength: 8,
        },
      ],
      "Registration",
      createUser
    );
    registrationModalWindow.render();
    startPage.onRegistration = () => {
      const modalContainer: HTMLElement = document.getElementById(
        registrationModalWindow.id
      ) as HTMLElement;
      modalContainer.style.display = "block";
    };
    startPage.onProjectInfo = () => {
      startPage.destroyСontent(document.getElementById("main") as HTMLElement);
      const infoPage = new InfoPage();

      infoPage.onStartPage = () => {
        infoPage.destroyСontent(document.getElementById("main") as HTMLElement);
        this.mainCycle();
      };
    };
  }
}

export default Application;
