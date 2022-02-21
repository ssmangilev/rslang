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

    const cardAudio = document.createElement("audio");
    const cardAudioBtn = document.createElement("div");
    cardAudioBtn.classList.add("card-audio-btn", "pause");
    const cardAudioSrc = [
      `https://rslangbackend.herokuapp.com/${word.audio}`,
      `https://rslangbackend.herokuapp.com/${word.audioMeaning}`,
      `https://rslangbackend.herokuapp.com/${word.audioExample}`,
    ];
    cardAudio.src = cardAudioSrc["1"];

    cardAudioBtn.onclick = () => {
      cardAudioBtn.classList.toggle("pause");
      cardAudioBtn.classList.toggle("play");
      if (cardAudio.paused) {
        cardAudio.play();
      } else {
        cardAudio.pause();
        cardAudio.currentTime = 0;
      }
      cardAudio.currentTime = 0;
    };

    cardAudio.addEventListener("ended", function Audioended() {
      cardAudio.currentTime = 0;
      cardAudioBtn.classList.remove("play");
      cardAudioBtn.classList.add("pause");
    });

    const audios = document.getElementsByTagName("audio");
    const audioBtns = document.getElementsByClassName("card-audio-btn");
    document.addEventListener(
      "play",
      // eslint-disable-next-line func-names
      function (e) {
        for (let i = 0, len = audios.length; i < len; i += 1) {
          if (audios[i] !== e.target) {
            audios[i].pause();
            audios[i].currentTime = 0;
            audioBtns[i].classList.remove("play");
            audioBtns[i].classList.add("pause");
          }
        }
      },
      true
    );

    const cardImage = document.createElement("img");
    cardImage.classList.add("card__image");
    cardImage.setAttribute(
      "src",
      `https://rslangbackend.herokuapp.com/${word.image}`
    );

    const cardName = document.createElement("h5");
    cardName.classList.add("card__header");
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
    cardName.append(cardAudioBtn);
    cardName.append(cardAudio);
    cardText.append(wordTranslate);
    cardText.append(textMeaning);
    cardText.append(textMeaningTranslate);
    cardText.append(textExample);
    cardText.append(textExampleTranslate);
  });
}

// eslint-disable-next-line import/prefer-default-export
export { cardsLoader };
