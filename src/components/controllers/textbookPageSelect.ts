/* eslint-disable import/prefer-default-export */
import { textbookPages } from "../configuration/textbookPages";
import { cardsLoader } from "../services/cardsLoader";

function updateSelcetPage(number: number) {
  const cardsContainer = document.getElementById("cards-container");
  if (cardsContainer) {
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
  }
  cardsLoader(`${localStorage.getItem("textbookSection")}`, `${number}`);
  localStorage.setItem("textbookPage", `${number}`);
}

function createTextbookPagesSelect(parent: HTMLElement) {
  const textbookSelectContainer = document.createElement("div");
  textbookSelectContainer.id = "textbook-pages-select-container";
  textbookSelectContainer.classList.add("textbook-pages-select-container");
  parent.appendChild(textbookSelectContainer);

  const textbookPagesSelect = document.createElement("select");
  textbookPagesSelect.id = "textbook-pages-select";
  textbookPagesSelect.classList.add("textbook-pages-select");

  const textbookButtonMinusPage = document.createElement("button");
  textbookButtonMinusPage.id = "textbook-pages-minus";
  textbookButtonMinusPage.classList.add("textbook-pages-minus");
  textbookSelectContainer.appendChild(textbookButtonMinusPage);

  textbookSelectContainer.appendChild(textbookPagesSelect);

  const textbookButtonPlusPage = document.createElement("button");
  textbookButtonPlusPage.id = "textbook-pages-plus";
  textbookButtonPlusPage.classList.add("textbook-pages-plus");
  textbookSelectContainer.appendChild(textbookButtonPlusPage);

  for (let i = 0; i < textbookPages.length; i += 1) {
    const option = document.createElement("option");
    option.value = textbookPages[i];
    option.text = textbookPages[i];
    textbookPagesSelect.appendChild(option);
  }

  let number = 0;
  const min = 0;
  const max = textbookPages.length - 1;

  textbookButtonMinusPage.onclick = () => {
    number = textbookPagesSelect.selectedIndex;
    if (number > min) {
      number -= 1;
      textbookPagesSelect.selectedIndex = number;
    }
    if (
      number !== (localStorage.getItem("textbookPage") as unknown as number)
    ) {
      updateSelcetPage(number);
    }
  };

  textbookButtonPlusPage.onclick = () => {
    number = textbookPagesSelect.selectedIndex;
    if (number < max) {
      number += 1;
      textbookPagesSelect.selectedIndex = number;
    }
    if (
      number !== (localStorage.getItem("textbookPage") as unknown as number)
    ) {
      updateSelcetPage(number);
    }
  };
}

export { createTextbookPagesSelect };
