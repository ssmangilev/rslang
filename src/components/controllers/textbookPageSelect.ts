/* eslint-disable import/prefer-default-export */
import { textbookPages } from "../configuration/textbookPages";

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
}

export { createTextbookPagesSelect };
