/* eslint-disable import/prefer-default-export */
import { textbookSections } from "../configuration/textbookSections";

function createTesxtbookSectionSelect(parent: HTMLElement) {
  const tesxtbookSectionSelect = document.createElement("select");
  tesxtbookSectionSelect.id = "tesxtbook-section-select";
  tesxtbookSectionSelect.classList.add("tesxtbook-section-select");
  parent.appendChild(tesxtbookSectionSelect);

  for (let i = 0; i < textbookSections.length; i += 1) {
    const option = document.createElement("option");
    option.value = textbookSections[i];
    option.text = textbookSections[i];
    tesxtbookSectionSelect.appendChild(option);
  }
}

export { createTesxtbookSectionSelect };
