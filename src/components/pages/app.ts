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
import StatisticsPage from "./StatisticsPage";

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
      startPage.destroy??ontent(document.getElementById("main") as HTMLElement);
      const infoPage = new InfoPage();

      infoPage.onStartPage = () => {
        infoPage.destroy??ontent(document.getElementById("main") as HTMLElement);
        infoPage.destroy??ontent(document.getElementById("nav") as HTMLElement);
        this.mainCycle();
      };
    };

    startPage.onAboutPage = () => {
      startPage.destroy??ontent(document.getElementById("main") as HTMLElement);
      const aboutTeam = new AboutPage();

      aboutTeam.onStartPage = () => {
        aboutTeam.destroy??ontent(
          document.getElementById("main") as HTMLElement
        );
        aboutTeam.destroy??ontent(document.getElementById("nav") as HTMLElement);
        this.mainCycle();
      };
    };

    startPage.onTextbookPage = () => {
      startPage.destroy??ontent(document.getElementById("main") as HTMLElement);
      const textbookPage = new TextbookPage();

      textbookPage.onStartPage = () => {
        textbookPage.destroy??ontent(
          document.getElementById("main") as HTMLElement
        );
        textbookPage.destroy??ontent(
          document.getElementById("nav") as HTMLElement
        );
        this.mainCycle();
      };
      textbookPage.onSprint = () => {
        startPage.destroy??ontent(
          document.getElementById("main") as HTMLElement
        );
        const sprintPage = new SprintPage(
          +(localStorage.getItem("textbookSection") || 0),
          +(localStorage.getItem("textbookPage") || 0)
        );
      };

      textbookPage.onAudioCall = () => {
        startPage.destroy??ontent(
          document.getElementById("main") as HTMLElement
        );
        const audioCallPage = new AudioCallPage(
          +(localStorage.getItem("textbookSection") || 0),
          +(localStorage.getItem("textbookPage") || 0)
        );
      };
    };

    const eventService = new AppEventsService();
    eventService.addListeners();
    startPage.onSprint = () => {
      startPage.destroy??ontent(document.getElementById("main") as HTMLElement);
      const sprintPage = new SprintPage();
    };
    startPage.onAudioCall = () => {
      startPage.destroy??ontent(document.getElementById("main") as HTMLElement);
      const audioCallPage = new AudioCallPage();
    };

    startPage.onStatPage = () => {
      startPage.destroy??ontent(document.getElementById("main") as HTMLElement);
      const statsPage = new StatisticsPage();
    };
  }
}

export default Application;
