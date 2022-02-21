/* eslint-disable @typescript-eslint/no-unused-vars */
import Control from "../services/controls";
import InfoPage from "./projectInfo";
import TextbookPage from "./textbookPage";
import StartPage from "./startPage";
import AboutPage from "./aboutTeam";
import ModalWindow from "../views/ModalWindow";
import Buttons from "../configuration/buttons";
import { createUser } from "../api/UsersEndpoint";
import { logIn } from "../api/SigninEndpoint";
import AppEventsService from "../services/appEventService";
import SprintPage from "./Sprintpage";
import AudioCallPage from "./AudioCallPage";

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
      if (!headerButton.classList.contains("logout")) {
        const modalLoginContainer: HTMLElement = document.getElementById(
          loginModalWindow.id
        ) as HTMLElement;
        modalLoginContainer.style.display = "block";
      }
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
      if (!localStorage.getItem("token")) {
        const modalContainer: HTMLElement = document.getElementById(
          registrationModalWindow.id
        ) as HTMLElement;
        modalContainer.style.display = "block";
      }
    };
    startPage.onProjectInfo = () => {
      startPage.destroyСontent(document.getElementById("main") as HTMLElement);
      const infoPage = new InfoPage();

      infoPage.onStartPage = () => {
        infoPage.destroyСontent(document.getElementById("main") as HTMLElement);
        infoPage.destroyСontent(document.getElementById("nav") as HTMLElement);
        this.mainCycle();
      };
    };

    startPage.onAboutPage = () => {
      startPage.destroyСontent(document.getElementById("main") as HTMLElement);
      const aboutTeam = new AboutPage();

      aboutTeam.onStartPage = () => {
        aboutTeam.destroyСontent(
          document.getElementById("main") as HTMLElement
        );
        aboutTeam.destroyСontent(document.getElementById("nav") as HTMLElement);
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
        textbookPage.destroyСontent(
          document.getElementById("nav") as HTMLElement
        );
        this.mainCycle();
      };
    };

    const eventService = new AppEventsService();
    eventService.addListeners();
    startPage.onSprint = () => {
      startPage.destroyСontent(document.getElementById("main") as HTMLElement);
      const sprintPage = new SprintPage();
    };
    startPage.onAudioCall = () => {
      startPage.destroyСontent(document.getElementById("main") as HTMLElement);
      const audioCallPage = new AudioCallPage();
    };
  }
}

export default Application;
