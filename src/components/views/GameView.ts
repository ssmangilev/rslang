/* eslint-disable @typescript-eslint/no-unused-vars */
import { getWords } from "../api/WordsEndpoint";
import { BACKEND_ADDRESS } from "../api/APIConstants";
import {
  GameDifficulty,
  GamesEnum,
  IGame,
  IQuestion,
  IUser,
  IUserWord,
  IUserWordDetail,
  IWord,
  IWordInGame,
} from "../types/types";
import {
  getLoaderSVG,
  generateRandomNumber,
  shuffleWordsArray,
} from "../utils/utils";
import {
  createUserWord,
  getUserLearnedWordsIds,
  getUserNewWordsIds,
  getUserWord,
  getUserWords,
  updateUserStatistics,
  updateUserWord,
} from "../api/UsersEndpoint";
import Control from "../services/controls";
import Buttons from "../configuration/buttons";

export default class GameView implements IGame {
  onStartPage!: () => void;

  group?: number;

  page?: number;

  container: HTMLElement;

  type: GamesEnum.audiocall | GamesEnum.sprint;

  questionIndex: number;

  correctAnswersInRow: number;

  generatedQuestions: IQuestion[] | undefined;

  time: number;

  score: number;

  rightAnswers: number;

  wrongAnswers: number;

  rightAnswersArray: IWord[] | undefined;

  wrongAnswersArray: IWord[] | undefined;

  longestRightSeries: number;

  userNewWords: string[] | undefined | unknown;

  userWords: IUserWord[] | unknown;

  constructor(
    container: HTMLElement,
    type: GamesEnum.audiocall | GamesEnum.sprint,
    group?: number,
    page?: number
  ) {
    if (group) {
      this.group = group;
    }
    if (page) {
      this.page = page;
    }
    this.container = container;
    this.type = type;
    this.questionIndex = 0;
    this.correctAnswersInRow = 0;
    this.generatedQuestions = undefined;
    this.time = 60;
    this.score = 0;
    this.rightAnswers = 0;
    this.wrongAnswers = 0;
    this.longestRightSeries = 0;
    this.rightAnswersArray = [];
    this.wrongAnswersArray = [];
    this.userNewWords = [];
    this.userWords = [];
  }

  async updateWordStats(isRight: boolean, question: IQuestion): Promise<void> {
    let wordStats;
    const keyBy = (array: any[], key: string) =>
      (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});
    if (this.userWords) {
      const userWords = keyBy(this.userWords as any, "wordId");
      if (userWords[question.rightAnswer.id]) {
        wordStats = userWords[question.rightAnswer.id];
      } else {
        wordStats = {
          difficulty: "medium",
          optional: {
            isHard: false,
            isLearned: false,
            sprint: {
              right: 0,
              wrong: 0,
              rightInRow: 0,
            },
            audioCall: {
              right: 0,
              wrong: 0,
              rightInRow: 0,
            },
          },
        };
      }
    } else {
      wordStats = {
        difficulty: "medium",
        optional: {
          isLearned: false,
          isHard: false,
          sprint: {
            right: 0,
            wrong: 0,
            rightInRow: 0,
          },
          audioCall: {
            right: 0,
            wrong: 0,
            rightInRow: 0,
          },
        },
      };
    }
    if (!wordStats.optional.newWord) {
      // eslint-disable-next-line prefer-destructuring
      wordStats.optional.newWord = new Date().toISOString().split("T")[0];
    }
    if (isRight) {
      if (this.type === GamesEnum.sprint) {
        wordStats.optional.sprint.rightInRow += 1;
        wordStats.optional.sprint.right += 1;
      }
      if (this.type === GamesEnum.audiocall) {
        wordStats.optional.audioCall.rightInRow += 1;
        wordStats.optional.audioCall.right += 1;
      }
      if (wordStats.optional.sprint || wordStats.optional.audioCall) {
        if (wordStats.difficulty === "medium") {
          const sprintCount = wordStats.optional.sprint.rightInRow || 0;
          const audioCallCount = wordStats.optional.audioCall.rightInRow || 0;
          const count = sprintCount + audioCallCount;
          if (count === 3) {
            wordStats.difficulty = "easy";
            [wordStats.optional.isLearned] = new Date()
              .toISOString()
              .split("T");
          }
        }
        if (wordStats.difficulty === "hard") {
          const sprintCount = wordStats.optional.sprint.rightInRow || 0;
          const audioCallCount = wordStats.optional.audioCall.rightInRow || 0;
          const count = sprintCount + audioCallCount;
          if (count === 5) {
            wordStats.difficulty = "easy";
            [wordStats.optional.isLearned] = new Date()
              .toISOString()
              .split("T");
          }
        }
      }
    }
    if (!isRight) {
      if (this.type === GamesEnum.sprint) {
        wordStats.optional.sprint.rightInRow = 0;
        wordStats.optional.sprint.wrong += 1;
      }
      if (this.type === GamesEnum.audiocall) {
        wordStats.optional.audioCall.rightInRow = 0;
        wordStats.optional.audioCall.wrong += 1;
      }
      if (wordStats.optional.sprint || wordStats.optional.audioCall) {
        if (wordStats.difficulty === "easy") {
          wordStats.difficulty = "medium";
          wordStats.optional.isLearned = false;
        }
      }
    }
    if (wordStats.id) {
      delete wordStats.id;
      delete wordStats.wordId;
      await updateUserWord(
        localStorage.getItem("userId") || "",
        question.rightAnswer.id,
        wordStats
      );
    } else {
      await createUserWord(
        localStorage.getItem("userId") || "",
        question.rightAnswer.id,
        wordStats
      );
    }
  }

  renderTitle(): void {
    this.container.id = `${this.type}`;
    const scoreContainer: HTMLElement = document.createElement("div");
    scoreContainer.id = `${this.type}-score`;
    scoreContainer.className = "game-score";
    scoreContainer.innerHTML = `Текущий счёт: ${this.score}`;
    const diffContainer: HTMLElement = document.createElement("div");
    diffContainer.id = `${this.type}-difficulty-container`;
    diffContainer.className = "difficulty-container";
    const diffHeader: HTMLElement = document.createElement("div");
    diffHeader.id = `${this.type}-difficulty-header`;
    diffHeader.className = "difficulty-header";
    const gameTitle = document.createElement("p");
    gameTitle.id = `${this.type}-game-title`;
    gameTitle.className = "difficulty-container-title";
    const gameDescription = document.createElement("p");
    gameDescription.id = `${this.type}-game-description`;
    gameDescription.className = "difficulty-container-description";
    if (this.type === GamesEnum.sprint) {
      gameTitle.innerHTML = "Спринт";
      gameDescription.innerHTML =
        "Спринт - тренировка на скорость. Попробуй угадать как можно больше слов за 60 секунд.";
    } else {
      gameTitle.innerHTML = "Аудио-вызов";
      gameDescription.innerHTML =
        "Аудио-вызов улучшает твое восприятие речи на слух.";
    }
    const loaderContainer: HTMLElement = document.createElement("div");
    loaderContainer.className = "loader loaded";
    loaderContainer.id = `${this.type}-loader`;
    loaderContainer.innerHTML += getLoaderSVG();
    diffHeader.appendChild(gameTitle);
    diffHeader.appendChild(gameDescription);
    diffContainer.appendChild(diffHeader);
    this.container.appendChild(scoreContainer);
    this.container.appendChild(diffContainer);
    this.container.appendChild(loaderContainer);
  }

  renderDifficulty(): void {
    const diffButtons: HTMLElement = document.createElement("div");
    diffButtons.id = `${this.type}-difficulty-buttons`;
    diffButtons.className = "difficulty-buttons";
    const diffTitle: HTMLElement = document.createElement("div");
    diffTitle.id = `${this.type}-difficulty-title`;
    diffTitle.className = "difficulty-title";
    diffTitle.innerHTML = "Выберите сложность игры:";
    const diffButtonsContainer: HTMLElement = document.createElement("div");
    diffButtonsContainer.id = `${this.type}-difficulty-buttons-container`;
    diffButtonsContainer.className = "difficulty-buttons-container";
    const loaderContainer: HTMLElement = document.getElementById(
      `${this.type}-loader`
    ) as HTMLElement;
    Object.values(GameDifficulty).forEach((diff: string) => {
      const diffButton: HTMLButtonElement = document.createElement("button");
      diffButton.addEventListener("click", async () => {
        this.group = +diff;
        console.log(this.group);
        diffButtonsContainer.style.display = "none";
        loaderContainer.classList.remove("loaded");
        await this.generateQuestions();
        loaderContainer.classList.add("loaded");
      });
      diffButton.id = `${diff}-button`;
      diffButton.className = "button difficulty-button";
      diffButton.innerHTML = (+diff + 1).toString();
      diffButtons.appendChild(diffButton);
    });
    diffButtonsContainer.appendChild(diffTitle);
    diffButtonsContainer.appendChild(diffButtons);
    this.container.appendChild(diffButtonsContainer);
  }

  async generateQuestions(): Promise<void> {
    const QUESTIONS_LIMIT = this.type === GamesEnum.sprint ? 100 : 20;
    const PAGES_COUNT = 30;
    const MAX_QUESTION_PER_PAGE = 20;
    const SPRINT_ANSWERS_COUNT = 2;
    const AUDIOCALL_ANSWERS_COUNT = 5;
    const dataForLoading = [];
    const questionsWithAnswers: IQuestion[] = [];
    console.log(this.page);
    console.log(this.group);
    if (this.page && this.group) {
      let wordsData = await getWords(
        this.group.toString(),
        this.page.toString()
      );
      const learnedWordsIds: string[] | unknown = await getUserLearnedWordsIds(
        localStorage.getItem("userId") || ""
      );
      wordsData = wordsData.filter(
        (word: IWord): boolean =>
          (learnedWordsIds as string[]).indexOf(word.id) === -1
      );
      while (wordsData.length < QUESTIONS_LIMIT) {
        if (this.page > 0) {
          this.page -= 1;
          // eslint-disable-next-line no-await-in-loop
          let pageData = await getWords(
            this.group.toString(),
            this.page.toString()
          );
          pageData = pageData.filter(
            (word: IWord): boolean =>
              (learnedWordsIds as string[]).indexOf(word.id) === -1
          );
          wordsData = wordsData.concat(pageData);
        }
      }
      console.log(wordsData);
      wordsData.forEach((word: IWord): void => {
        const answers: IWord[] = [];
        answers.push(word);
        const answersCount =
          this.type === GamesEnum.sprint
            ? SPRINT_ANSWERS_COUNT
            : AUDIOCALL_ANSWERS_COUNT;
        while (answers.length < answersCount) {
          const newRandomAnswer = generateRandomNumber(wordsData.length);
          if (word.id !== wordsData[newRandomAnswer].id) {
            answers.push(wordsData[newRandomAnswer]);
          }
        }
        questionsWithAnswers.push({
          question: word.word,
          rightAnswer: word,
          answers,
        });
      });
    } else if (!this.page && (this.group === 0 || this.group)) {
      while (dataForLoading.length < QUESTIONS_LIMIT) {
        const randomPage = generateRandomNumber(PAGES_COUNT);
        dataForLoading.push(
          getWords(this.group?.toString(), randomPage.toString())
        );
      }
      const result = await Promise.all(dataForLoading);
      result.forEach((element: IWord[]): void => {
        const randomWord = generateRandomNumber(MAX_QUESTION_PER_PAGE);
        const answers: IWord[] = [];
        answers.push(element[randomWord]);
        const answersCount =
          this.type === GamesEnum.sprint
            ? SPRINT_ANSWERS_COUNT
            : AUDIOCALL_ANSWERS_COUNT;
        while (answers.length < answersCount) {
          const newRandomAnswer = generateRandomNumber(MAX_QUESTION_PER_PAGE);
          if (element[randomWord].id !== element[newRandomAnswer].id) {
            answers.push(element[newRandomAnswer]);
          }
        }
        questionsWithAnswers.push({
          question: element[randomWord].word,
          rightAnswer: element[randomWord],
          answers,
        });
      });
    }
    if (localStorage.getItem("userId")) {
      this.userNewWords = await getUserNewWordsIds(
        localStorage.getItem("userId") || ""
      );
      this.userWords = await getUserWords(localStorage.getItem("userId") || "");
    }
    this.generatedQuestions = questionsWithAnswers;
  }

  renderQuestion(question: IQuestion): void {
    const gameContainer: HTMLElement = document.getElementById(
      `${this.type}`
    ) as HTMLElement;
    gameContainer.style.display = "block";
    const scoreContainer: HTMLElement = document.getElementById(
      `${this.type}-score`
    ) as HTMLElement;
    const diffContainer: HTMLElement = document.getElementById(
      `${this.type}-difficulty-container`
    ) as HTMLElement;
    diffContainer.style.display = "none";
    if (this.type === GamesEnum.sprint) {
      if (document.getElementById(`${this.type}-question-container`)) {
        (
          document.getElementById(
            `${this.type}-question-container`
          ) as HTMLElement
        ).remove();
      }
      if (
        this.questionIndex === 0 ||
        !document.getElementById(`${this.type}-question-container`)
      ) {
        const questionContainer = document.createElement("div");
        questionContainer.id = `${this.type}-question-container`;
        questionContainer.className = "question-container-sprint";
        const word: HTMLElement = document.createElement("h3");
        word.id = `${this.type}-question-word`;
        word.className = "question-word-sprint";
        const translate: HTMLElement = document.createElement("h5");
        translate.id = `${this.type}-question-translate`;
        translate.className = "question-translate-sprint";
        const buttonsContainer: HTMLElement = document.createElement("div");
        buttonsContainer.id = `${this.type}-question-buttons-container`;
        buttonsContainer.className = "question-buttons-sprint";
        const rightButtonAnswer: HTMLButtonElement =
          document.createElement("button");
        rightButtonAnswer.id = `${this.type}-right-answer-button`;
        rightButtonAnswer.innerHTML = "Верно";
        rightButtonAnswer.className = "sprint-answer-button right-answer";
        const wrongButtonAnswer: HTMLButtonElement =
          document.createElement("button");
        wrongButtonAnswer.id = `${this.type}-wrong-answer-button`;
        wrongButtonAnswer.className = "sprint-answer-button wrong-answer";
        wrongButtonAnswer.innerHTML = "Не верно";
        questionContainer.appendChild(word);
        questionContainer.appendChild(translate);
        questionContainer.appendChild(buttonsContainer);
        buttonsContainer.appendChild(rightButtonAnswer);
        buttonsContainer.appendChild(wrongButtonAnswer);
        this.container.appendChild(questionContainer);
      }
      const typeTitleHeader: HTMLElement = document.getElementById(
        `${this.type}-difficulty-header`
      ) as HTMLElement;
      typeTitleHeader.style.display = "none";
      scoreContainer.style.display = "block";
      scoreContainer.style.marginBottom = "50px";
      const word: HTMLElement = document.getElementById(
        `${this.type}-question-word`
      ) as HTMLElement;
      const translate: HTMLElement = document.getElementById(
        `${this.type}-question-translate`
      ) as HTMLElement;
      const rightButtonAnswer: HTMLButtonElement = document.getElementById(
        `${this.type}-right-answer-button`
      ) as HTMLButtonElement;
      const wrongButtonAnswer: HTMLButtonElement = document.getElementById(
        `${this.type}-wrong-answer-button`
      ) as HTMLButtonElement;
      word.innerHTML = question.rightAnswer.word;
      const randomNumber = generateRandomNumber(2);
      const randomAnswer: IWord = question.answers[randomNumber];
      translate.innerHTML = randomAnswer.wordTranslate;
      if (randomAnswer.id === question.rightAnswer.id) {
        rightButtonAnswer.dataset.id = question.rightAnswer.id;
        if (randomNumber === 0) {
          wrongButtonAnswer.dataset.id = question.answers[1].id;
        } else {
          wrongButtonAnswer.dataset.id = question.answers[0].id;
        }
      } else {
        wrongButtonAnswer.dataset.id = question.rightAnswer.id;
        rightButtonAnswer.dataset.id = randomAnswer.id;
      }
      this.questionIndex += 1;
      const keyboardHandler = (event: KeyboardEvent): void => {
        if (event.code === "ArrowLeft") {
          rightButtonAnswer.click();
        }
        if (event.code === "ArrowRight") {
          wrongButtonAnswer.click();
        }
      };
      const handleAnswer = async (event: Event): Promise<void> => {
        if (event.target) {
          const id = (event.target as HTMLButtonElement).dataset?.id;
          if (id === question.rightAnswer.id) {
            await this.updateWordStats(true, question);
            this.score += 10;
            this.rightAnswers += 1;
            this.correctAnswersInRow += 1;
            this.rightAnswersArray?.push(question.rightAnswer);
            if (this.correctAnswersInRow % 3 === 0) {
              this.score += 40;
              scoreContainer.innerHTML = `Текущий счёт: ${this.score}`;
            }
            scoreContainer.innerHTML = `Текущий счёт: ${this.score}`;
          } else {
            await this.updateWordStats(false, question);
            if (this.longestRightSeries < this.correctAnswersInRow) {
              this.longestRightSeries = this.correctAnswersInRow;
            }
            this.wrongAnswers += 1;
            this.wrongAnswersArray?.push(question.rightAnswer);
            this.correctAnswersInRow = 0;
          }
          if (this.generatedQuestions) {
            event.target.removeEventListener("click", handleAnswer);
            document.removeEventListener("keydown", keyboardHandler);
            if (this.questionIndex < this.generatedQuestions.length) {
              this.renderQuestion(this.generatedQuestions[this.questionIndex]);
            } else {
              const timerContainer: HTMLElement = document.getElementById(
                `${this.type}-timer-container`
              ) as HTMLElement;
              timerContainer.style.display = "none";
              this.time = 0;
              this.renderSummary();
            }
          }
        }
      };
      rightButtonAnswer.addEventListener("click", handleAnswer);
      wrongButtonAnswer.addEventListener("click", handleAnswer);
      document.addEventListener("keydown", keyboardHandler);
    } else if (this.type === GamesEnum.audiocall) {
      const audio = new Audio(
        `${BACKEND_ADDRESS}/${question.rightAnswer.audio}`
      );
      const playButtonListener = () => {
        audio.play();
      };
      if (document.getElementById(`${this.type}-question-container`)) {
        (
          document.getElementById(
            `${this.type}-question-container`
          ) as HTMLElement
        ).remove();
      }
      if (
        this.questionIndex === 0 ||
        !document.getElementById(`${this.type}-question-container`)
      ) {
        const questionContainer = document.createElement("div");
        questionContainer.id = `${this.type}-question-container`;
        questionContainer.className = "question-container-audiocall";
        const word: HTMLElement = document.createElement("div");
        word.id = `${this.type}-question-word`;
        word.className = "question-word-audiocall";
        word.addEventListener("click", playButtonListener);
        const buttonsContainer: HTMLElement = document.createElement("div");
        buttonsContainer.id = `${this.type}-question-buttons-container`;
        buttonsContainer.className = "question-buttons-audiocall";
        this.questionIndex += 1;
        const keyboardHandler = (event: KeyboardEvent): void => {
          const buttons: HTMLCollectionOf<HTMLButtonElement> =
            document.getElementsByClassName(
              "question-button-audiocall"
            ) as HTMLCollectionOf<HTMLButtonElement>;
          Array.from(buttons).forEach((element: HTMLButtonElement): void => {
            if (element.dataset?.number === event.code[event.code.length - 1]) {
              element.click();
            }
          });
        };
        const handleAnswer = async (event: Event): Promise<void> => {
          if (event.target) {
            const button: HTMLButtonElement = event.target as HTMLButtonElement;
            const id = (event.target as HTMLButtonElement).dataset?.id;
            if (id === question.rightAnswer.id) {
              button.style.backgroundColor = "green";
              await this.updateWordStats(true, question);
              this.score += 10;
              this.rightAnswers += 1;
              this.correctAnswersInRow += 1;
              this.rightAnswersArray?.push(question.rightAnswer);
              if (this.correctAnswersInRow % 3 === 0) {
                this.score += 40;
                scoreContainer.innerHTML = `Текущий счёт: ${this.score}`;
              }
              scoreContainer.innerHTML = `Текущий счёт: ${this.score}`;
            } else {
              button.style.backgroundColor = "red";
              await this.updateWordStats(false, question);
              if (this.longestRightSeries < this.correctAnswersInRow) {
                this.longestRightSeries = this.correctAnswersInRow;
              }
              this.wrongAnswers += 1;
              this.wrongAnswersArray?.push(question.rightAnswer);
              this.correctAnswersInRow = 0;
            }
            if (this.generatedQuestions) {
              event.target.removeEventListener("click", handleAnswer);
              document.removeEventListener("keydown", keyboardHandler);
              word.removeEventListener("click", playButtonListener);
              if (this.questionIndex < this.generatedQuestions.length) {
                this.renderQuestion(
                  this.generatedQuestions[this.questionIndex]
                );
              } else {
                const timerContainer: HTMLElement = document.getElementById(
                  `${this.type}-timer-container`
                ) as HTMLElement;
                if (timerContainer) {
                  timerContainer.style.display = "none";
                }
                this.time = 0;
                this.renderSummary();
              }
            }
          }
        };
        shuffleWordsArray(question.answers).forEach(
          (answer: IWord, index: number) => {
            const answerButton: HTMLButtonElement =
              document.createElement("button");
            answerButton.id = `${this.type}-answer-button-${answer.id}-${
              index + 1
            }`;
            answerButton.className = "question-button-audiocall";
            answerButton.dataset.id = answer.id;
            answerButton.dataset.number = (index + 1).toString();
            answerButton.innerHTML = answer.wordTranslate;
            answerButton.addEventListener("click", handleAnswer);
            document.addEventListener("keydown", keyboardHandler);
            buttonsContainer.appendChild(answerButton);
          }
        );
        const withoutAnswerContainer: HTMLElement =
          document.createElement("div");
        withoutAnswerContainer.id = `${this.type}-without-answer-container`;
        const withountAnswerButton: HTMLButtonElement =
          document.createElement("button");
        withountAnswerButton.id = `${this.type}-without-answer-button`;
        withountAnswerButton.className = "audiocall-without-answer-button";
        withountAnswerButton.innerHTML = "Не знаю";
        withoutAnswerContainer.appendChild(withountAnswerButton);
        questionContainer.appendChild(word);
        questionContainer.appendChild(buttonsContainer);
        questionContainer.appendChild(withoutAnswerContainer);
        this.container.appendChild(questionContainer);
        audio.play();
      }
    }
  }

  renderSummary(): void {
    const score: HTMLElement = document.getElementById(
      `${this.type}-score`
    ) as HTMLElement;
    score.style.display = "none";
    const question: HTMLElement = document.getElementById(
      `${this.type}-question-container`
    ) as HTMLElement;
    question.style.display = "none";
    const gameResults: HTMLElement = document.createElement("div");
    const gameResultsHeader: HTMLElement = document.createElement("h3");
    const correctAnswers: HTMLElement = document.createElement("div");
    const correctAnswersHeader: HTMLElement = document.createElement("h3");
    const wrongAnswers: HTMLElement = document.createElement("div");
    const wrongAnswersHeader: HTMLElement = document.createElement("h3");
    gameResults.id = `${this.type}-results`;
    gameResults.className = `game-results`;
    gameResultsHeader.id = `${this.type}-results-header`;
    gameResultsHeader.className = "game-results-header";
    correctAnswers.id = `${this.type}-correct-answers`;
    correctAnswers.className = "game-correct-answers";
    correctAnswersHeader.id = `${this.type}-correct-answers-header`;
    correctAnswersHeader.className = "game-correct-answers-header";
    correctAnswersHeader.innerHTML = `Правильные ответы: ${this.rightAnswers}`;
    wrongAnswers.id = `${this.type}-wrong-answers`;
    wrongAnswers.className = "game-wrong-answers";
    wrongAnswersHeader.id = `${this.type}-wrong-answers-header`;
    wrongAnswersHeader.className = "game-wrong-answers-header";
    wrongAnswersHeader.innerHTML = `Ошибки: ${this.wrongAnswers}`;
    gameResults.appendChild(gameResultsHeader);
    correctAnswers.appendChild(correctAnswersHeader);
    if (this.rightAnswersArray) {
      this.rightAnswersArray.forEach((word: IWord): void => {
        const wordResultsContainer: HTMLElement = document.createElement("div");
        wordResultsContainer.id = `${word.id}-results-container`;
        wordResultsContainer.className = "game-word-results-container";
        const wordAudio: HTMLElement = document.createElement("div");
        const audio = new Audio(`${BACKEND_ADDRESS}/${word.audio}`);
        wordAudio.id = `${word.id}-results-audio`;
        wordAudio.className = "game-word-results-audio";
        wordAudio.addEventListener("click", () => audio.play());
        const wordDescription: HTMLElement = document.createElement("div");
        wordDescription.id = `${word.id}-results-description`;
        wordDescription.className = "game-word-results-description";
        wordDescription.innerHTML = word.word;
        const wordTranslate: HTMLElement = document.createElement("div");
        wordTranslate.id = `${word.id}-results-translate`;
        wordTranslate.className = "game-word-results-translate";
        wordTranslate.innerHTML = word.wordTranslate;
        wordResultsContainer.appendChild(wordAudio);
        wordResultsContainer.appendChild(wordDescription);
        wordResultsContainer.appendChild(wordTranslate);
        correctAnswers.appendChild(wordResultsContainer);
      });
    }
    wrongAnswers.appendChild(wrongAnswersHeader);
    if (this.wrongAnswersArray) {
      this.wrongAnswersArray.forEach((word: IWord): void => {
        const wordResultsContainer: HTMLElement = document.createElement("div");
        wordResultsContainer.id = `${word.id}-results-container`;
        wordResultsContainer.className = "game-word-results-container";
        const wordAudio: HTMLElement = document.createElement("div");
        const audio = new Audio(`${BACKEND_ADDRESS}/${word.audio}`);
        wordAudio.id = `${word.id}-results-audio`;
        wordAudio.className = "game-word-results-audio";
        wordAudio.addEventListener("click", () => audio.play());
        const wordDescription: HTMLElement = document.createElement("div");
        wordDescription.id = `${word.id}-results-description`;
        wordDescription.className = "game-word-results-description";
        wordDescription.innerHTML = word.word;
        const wordTranslate: HTMLElement = document.createElement("div");
        wordTranslate.id = `${word.id}-results-translate`;
        wordTranslate.className = "game-word-results-translate";
        wordTranslate.innerHTML = word.wordTranslate;
        wordResultsContainer.appendChild(wordAudio);
        wordResultsContainer.appendChild(wordDescription);
        wordResultsContainer.appendChild(wordTranslate);
        wrongAnswers.appendChild(wordResultsContainer);
      });
    }
    gameResults.appendChild(correctAnswers);
    gameResults.appendChild(wrongAnswers);
    const buttons: HTMLElement = document.createElement("div");
    const newGameButton: HTMLElement = document.createElement("button");
    newGameButton.id = `${this.type}-results-new-game-button`;
    newGameButton.className = "game-results-button";
    newGameButton.innerHTML = "Еще раз";
    const backButton: HTMLElement = document.createElement("button");
    backButton.id = `${this.type}-results-back-button`;
    backButton.className = "game-results-button";
    backButton.innerHTML = "На главную";
    const onStartPage = new Control(
      buttons,
      "button",
      "button route-btn route-btn_main",
      "",
      `${Buttons.onStartPage}`
    );
    onStartPage.node.onclick = () => {
      this.onStartPage();
    };
    buttons.appendChild(newGameButton);
    buttons.appendChild(backButton);
    gameResults.appendChild(buttons);
    this.container.appendChild(gameResults);
  }

  startGame(): void {
    if (this.generatedQuestions) {
      this.renderQuestion(this.generatedQuestions[this.questionIndex]);
    }
    if (this.type === GamesEnum.sprint) {
      this.renderTimer();
    }
  }

  renderTimer(): void {
    const timerContainer: HTMLElement = document.createElement("div");
    timerContainer.id = `${this.type}-timer-container`;
    timerContainer.className = "timer-container";
    timerContainer.innerHTML = `${this.time}`;
    const timerInterval = setInterval(() => {
      if (this.time > 0) {
        this.time -= 1;
        timerContainer.innerHTML = `${this.time}`;
      }
      if (this.time === 0) {
        if (this.generatedQuestions) {
          clearInterval(timerInterval);
          this.renderSummary();
        }
      }
    }, 1000);
    this.container.appendChild(timerContainer);
  }

  async render(): Promise<void> {
    console.log(this.group);
    console.log(this.page);
    await this.renderTitle();
    if (!this.page && !this.group) {
      await this.renderDifficulty();
      const myInterval = setInterval(() => {
        if (this.generatedQuestions) {
          this.startGame();
          clearInterval(myInterval);
        }
      }, 1000);
    } else {
      const loaderContainer: HTMLElement = document.getElementById(
        `${this.type}-loader`
      ) as HTMLElement;
      loaderContainer.classList.remove("loaded");
      await this.generateQuestions();
      loaderContainer.classList.add("loaded");
    }
  }
}
