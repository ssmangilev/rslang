import { getWords } from "../api/WordsEndpoint";
import { IWord } from "../types/types";

async function cardsLoader(group: string, page: string) {
  const wordsData = await getWords(group, page);
  const cardsContainer = document.getElementById(`cards-container`);

  // eslint-disable-next-line array-callback-return
  wordsData.map((word: IWord) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    const cardText = document.createElement("div");
    cardText.classList.add("card-text");

    const groupIcon = document.createElement("svg");
    groupIcon.insertAdjacentHTML(
      "afterbegin",
      `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="86" height="32" viewBox="0 0 86 32">
    <title>image2vector</title>
    <path fill="#000" d="M48.781 1.158c-2.463 0.572-3.686 1.87-3.698 3.924-0.014 2.392 1.326 3.49 5.622 4.61 2.088 0.544 2.798 1.487 1.81 2.403-1.121 1.039-3.315 0.365-3.591-1.104-0.137-0.733-0.13-0.731-2.431-0.603l-2.039 0.113 0.098 0.642c0.151 0.99 0.968 2.518 1.664 3.114 2.063 1.765 7.744 1.584 9.689-0.31l0.569-0.554 0.109 0.644c0.4 2.369 2.806 4.595 5.574 5.157l0.889 0.181-0.525 0.688c-1.733 2.27-1.782 6.912-0.098 9.323 2.577 3.689 9.829 3.582 12.215-0.18l0.444-0.7v3.339h11.239v-3.59h-6.712v-10.459h-4.527l-0.009 1.6c-0.008 1.307-0.043 1.544-0.195 1.295-0.86-1.411-2.535-2.583-4.177-2.922l-0.885-0.183 0.898-0.675c2.794-2.1 4.534-5.931 4.087-8.998-1.175-8.060-12.785-8.185-17.207-0.186-0.285 0.515-0.528 0.953-0.54 0.973s-0.41-0.34-0.885-0.799c-0.985-0.954-1.776-1.303-4.465-1.969-2.502-0.62-3.014-1.055-2.173-1.846 0.8-0.752 2.542-0.265 2.934 0.821 0.23 0.636 0.188 0.63 2.848 0.454l1.538-0.102-0.098-0.613c-0.454-2.84-4.028-4.404-7.973-3.487zM0.937 8.273v7.024h4.527v-5.62h0.46c0.726 0 1.165 0.534 2.565 3.122l1.309 2.419 2.517 0.043c1.384 0.024 2.516 0.001 2.516-0.050 0-0.791-2.821-5.356-3.604-5.832l-0.429-0.261 0.866-0.453c3.211-1.681 2.603-6.497-0.916-7.252-0.444-0.095-2.693-0.166-5.292-0.166h-4.519v7.024zM69.476 2.472c7.065 1.844 6.418 11.756-1.004 15.375-7.562 3.687-14.301-2.366-10.707-9.616 2.097-4.23 7.461-6.868 11.71-5.758zM8.583 4.415c1.59 0.804 0.535 2.288-1.717 2.416l-1.402 0.080v-2.697l1.366 0.002c0.782 0.001 1.531 0.086 1.753 0.198zM66.977 5.657c-1.243 0.33-2.507 1.586-2.508 2.492-0.002 1.48 1.181 2.014 3.043 1.373 1.139-0.392 1.429-0.392 1.64 0.001 0.357 0.668-0.813 1.349-1.496 0.87-0.343-0.24-1.608 0.517-1.621 0.97-0.020 0.682 1.706 0.94 2.763 0.413 3.357-1.673 2.404-5.264-1.078-4.063-1.392 0.48-1.691 0.501-1.691 0.115 0-0.606 0.947-1.044 1.36-0.631 0.169 0.169 1.449-0.68 1.449-0.961 0-0.42-1.134-0.774-1.862-0.58zM61.938 9.025c-0.745 0.539-0.78 0.399 0.586 2.338 0.841 1.193 1.164 1.782 1.132 2.061-0.056 0.477-0.591 0.604-0.967 0.229-0.239-0.239-0.301-0.22-0.867 0.265-1.429 1.224 0.743 2.275 2.357 1.141 1.773-1.246 1.776-2.019 0.013-4.593-1.367-1.997-1.43-2.037-2.255-1.44zM4.638 17.643c-2.554 0.403-4.049 1.896-4.069 4.064-0.020 2.212 1.414 3.472 4.966 4.361 2.177 0.545 2.894 0.961 2.894 1.678 0 2.019-3.614 1.817-3.996-0.223-0.134-0.712-0.117-0.708-2.422-0.583l-2.044 0.111 0.102 0.64c0.466 2.934 2.172 4.155 5.973 4.274 3.014 0.094 4.050-0.198 5.366-1.514l0.901-0.901 0.331 0.447c1.915 2.59 8.384 2.764 10.508 0.282 0.621-0.725 1.318-2.091 1.389-2.72 0.050-0.443 0.036-0.451-1.857-1.025l-1.907-0.579-0.256 0.77c-0.872 2.625-4.165 2.655-4.888 0.045-0.246-0.887-0.216-3.006 0.056-3.919 0.656-2.207 3.427-2.66 4.551-0.743 0.469 0.8 0.343 0.785 2.471 0.304 2.026-0.458 1.939-0.377 1.477-1.372-1.832-3.942-7.991-4.867-11.257-1.692l-0.911 0.886-0.378-0.645c-0.942-1.608-3.913-2.434-6.998-1.946zM47.766 17.647c-1.729 0.3-3.437 1.388-4.402 2.803-0.258 0.379-0.265 0.348-0.273-1.133l-0.008-1.522h-4.527v4.839h-4.527v-4.839h-4.527v14.049h4.527v-5.62h4.527v5.62h4.527v-3.176l0.489 0.737c2.034 3.070 8.325 3.609 11.188 0.958 3.313-3.067 2.663-10.044-1.115-11.972-1.458-0.744-4.017-1.068-5.879-0.745zM7.176 20.525c0.261 0.135 0.567 0.501 0.733 0.877l0.285 0.646 3.050-0.147-0.1 0.796c-0.132 1.053-0.191 1.093-1.066 0.706-0.412-0.182-1.565-0.535-2.564-0.786-2.363-0.592-2.657-0.719-2.778-1.2-0.224-0.89 1.339-1.462 2.441-0.892zM50.443 21.077c2.312 0.642 2.78 5.948 0.636 7.21-1.601 0.942-3.627 0.14-4.102-1.625-0.944-3.507 0.805-6.324 3.466-5.585zM69.316 21.073c2.686 0.746 2.631 6.782-0.068 7.509-2.17 0.584-3.614-0.924-3.603-3.762 0.012-2.949 1.409-4.375 3.671-3.746z"></path>
    </svg>`
    );

    const cardImage = document.createElement("img");
    cardImage.classList.add("card__image");
    cardImage.setAttribute(
      "src",
      `https://rslangbackend.herokuapp.com/${word.image}`
    );

    const cardName = document.createElement("h5");
    cardName.classList.add("card__header");
    cardName.append(groupIcon);
    cardName.innerHTML = `${word.word}-${word.transcription}`;

    const wordTranslate = document.createElement("h6");
    wordTranslate.classList.add("card__word-translate");
    wordTranslate.innerHTML = `${word.wordTranslate}`;

    const textMeaning = document.createElement("h6");
    textMeaning.classList.add("card__text-meaning");
    textMeaning.innerHTML = `${word.textMeaning}`;

    const textMeaningTranslate = document.createElement("h6");
    textMeaningTranslate.classList.add("card__text-meaning-translate");
    textMeaningTranslate.innerHTML = `${word.textMeaningTranslate}`;

    const textExample = document.createElement("h6");
    textExample.classList.add("card__text-example");
    textExample.innerHTML = `${word.textExample}`;

    const textExampleTranslate = document.createElement("h6");
    textExampleTranslate.classList.add("card__text-example-translate");
    textExampleTranslate.innerHTML = `${word.textExampleTranslate}`;

    cardsContainer?.append(cardContainer);
    cardContainer.append(cardImage);
    cardContainer.append(cardText);
    cardText.append(cardName);
    cardText.append(wordTranslate);
    cardText.append(textMeaning);
    cardText.append(textMeaningTranslate);
    cardText.append(textExample);
    cardText.append(textExampleTranslate);
  });
}

// eslint-disable-next-line import/prefer-default-export
export { cardsLoader };
