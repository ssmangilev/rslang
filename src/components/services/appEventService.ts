import { logOut } from "../api/SigninEndpoint";

export default class AppEventsService {
  burgerIcon;
  nav;
  loginBtn;

  constructor() {
    this.burgerIcon = <HTMLElement>document.querySelector(".top-navigation-ui");
    this.nav = <HTMLElement>document.getElementById("nav");
    this.loginBtn = <HTMLElement>document.getElementById("button-login");
  }

  addListeners(): void {
    this.burgerIcon.addEventListener("click", () => {
      this.burgerIcon.classList.toggle("opened");
      this.nav.classList.toggle("opened");
    });

    this.loginBtn.addEventListener("click", () => {
      if (this.loginBtn.classList.contains("logout")) {
        logOut();
      }
    });

    window.addEventListener("load", () => {
      if (localStorage.getItem("token")) {
        this.loginBtn.classList.add("logout");
      }
    });
  }
}
