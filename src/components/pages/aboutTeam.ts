import Control from "../services/controls";
import Buttons from "../configuration/buttons";

class AboutPage extends Control {
  onStartPage!: () => void;

  constructor() {
    super(null);

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("info-container");

    const main = document.getElementById("main");
    mainContainer.innerHTML = `
      <h2 class='info-container__title'>О команде</h2>
      <div class='info-container__content content'>
        <div class='content-card'>
          <div class='img-wrap'>
            <img class='content-img' alt='' src='https://avatars.githubusercontent.com/u/86509140?v=4'>
          </div>
          <div class='content-card__title'>Григорий Яворский</div>
          <a href='https://github.com/GrigoriyYav' class='content-card__github'>GrigoriyYav</a>
          <div class=''>Разработчик</div>
          <ul class='content-card__list list-task'>
            <li class='list-task__item'>1. E-book</li>
          </ul>
        </div>
        <div class='content-card'>
          <div class='img-wrap'>
            <img class='content-img' alt='' src='../../assets/team/photo.jpeg'>
          </div>
          <div class='content-card__title'>Сергей Мангилев</div>
          <a href='https://github.com/ssmangilev' class='content-card__github'>ssmangilev</a>
          <div class=''>Разработчик</div>
          <ul class='content-card__list list-task'>
            <li class='list-task__item'>1. Backend</li>
          </ul>
        </div>
        <div class='content-card'>
          <div class='img-wrap'>
            <img class='content-img' alt='' src='../../assets/team/photo2.jpg'>
          </div>
          <div class='content-card__title'>Денис Калинин</div>
          <a href='https://github.com/hokmyn' class='content-card__github'>hokmyn</a>
          <div class=''>Разработчик</div>
          <ul class='content-card__list list-task'>
            <li class='list-task__item'>1. Верстка</li>
          </ul>
        </div>
      </div>
    `;
    if (main) {
      main.append(mainContainer);
    }

    const onStartPage = new Control(
      mainContainer,
      "button",
      "button route-btn route-btn_main",
      "",
      `${Buttons.onStartPage}`
    );
    onStartPage.node.onclick = () => {
      this.onStartPage();
    };
    (
      document.querySelector(".side-navigation__link_main") as HTMLElement
    ).addEventListener("click", () => {
      this.onStartPage();
    });
  }
}

export default AboutPage;
