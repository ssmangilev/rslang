export default class AppEventsService {
  burgerIcon;

  nav;

  constructor() {
    this.burgerIcon = <HTMLElement>document.querySelector(".top-navigation-ui");
    this.nav = <HTMLElement>document.getElementById("nav");
  }

  addListeners(): void {
    this.burgerIcon.addEventListener("click", () => {
      this.burgerIcon.classList.toggle("opened");
      this.nav.classList.toggle("opened");
    });
  }
}
