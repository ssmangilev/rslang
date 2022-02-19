/* eslint-disable import/prefer-default-export */
import { textbookSections } from "../configuration/textbookSections";

function createTesxtbookSectionSelect(parent: HTMLElement) {
  const textbookSelectContainer = document.createElement("div");
  textbookSelectContainer.id = "textbook-select-container";
  textbookSelectContainer.classList.add("textbook-select-container");
  parent.appendChild(textbookSelectContainer);

  const textbookSectionSelect = document.createElement("select");
  textbookSectionSelect.id = "textbook-section-select";
  textbookSectionSelect.classList.add("textbook-section-select");
  textbookSelectContainer.appendChild(textbookSectionSelect);

  for (let i = 0; i < textbookSections.length; i += 1) {
    const option = document.createElement("option");
    option.value = textbookSections[i];
    option.text = textbookSections[i];
    textbookSectionSelect.appendChild(option);
  }
}

export { createTesxtbookSectionSelect };
