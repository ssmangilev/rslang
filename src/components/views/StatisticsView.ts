import {
  getUserLearnedWordsCountPerDay,
  getUserNewWordsCountPerDay,
  getUserStatistics,
} from "../api/UsersEndpoint";
import { IStatistics, IStatisticsView } from "../types/types";

export default class StatisticsView implements IStatisticsView {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  async render(): Promise<void> {
    const userStats: IStatistics | unknown = await getUserStatistics(
      localStorage.getItem("userId") || ""
    );
    const newWordsProDay = await getUserNewWordsCountPerDay(
      localStorage.getItem("userId") || ""
    );
    const learnedWordsProDay = await getUserLearnedWordsCountPerDay(
      localStorage.getItem("userId") || ""
    );
    if (userStats) {
      const statsContainer: HTMLElement = document.createElement("div");
      statsContainer.id = "statistics-container";
      statsContainer.className = "statistics-container";
      const sprintStats: HTMLElement = document.createElement("div");
      sprintStats.id = "sprint-statistics-container";
      sprintStats.className = "sprint-statistics-container";
      const sprintHeader: HTMLElement = document.createElement("h2");
      const sprintP1: HTMLElement = document.createElement("p");
      const sprintP2: HTMLElement = document.createElement("p");
      const sprintP3: HTMLElement = document.createElement("p");
      sprintHeader.innerHTML = "Спринт";
      sprintP1.innerHTML = `Новых слов за день: ${
        (userStats as IStatistics).optional.gameStatistic.sprint.learnedWords
      }`;
      sprintP2.innerHTML = `Процент правильных ответов: ${Math.round(
        (userStats as IStatistics).optional.gameStatistic.sprint
          .correctAnswers /
          ((userStats as IStatistics).optional.gameStatistic.sprint
            .correctAnswers +
            (userStats as IStatistics).optional.gameStatistic.sprint
              .wrongAnswers)
      )}`;
      sprintP3.innerHTML = `Самая длинная серия ответов без ошибок: ${
        (userStats as IStatistics).optional.gameStatistic.sprint.longestSeries
      }`;
      sprintStats.appendChild(sprintHeader);
      sprintStats.appendChild(sprintP1);
      sprintStats.appendChild(sprintP2);
      sprintStats.appendChild(sprintP3);
      const audioCallStats: HTMLElement = document.createElement("div");
      audioCallStats.id = "audiocall-statistics-container";
      audioCallStats.className = "audiocall-statistics-container";
      const audioHeader: HTMLElement = document.createElement("h2");
      audioHeader.innerHTML = "Аудио-вызов";
      const audioP1: HTMLElement = document.createElement("p");
      const audioP2: HTMLElement = document.createElement("p");
      const audioP3: HTMLElement = document.createElement("p");
      audioP1.innerHTML = `Новых слов за день: ${
        (userStats as IStatistics).optional.gameStatistic.audioCall.learnedWords
      }`;
      audioP2.innerHTML = `Процент правильных ответов: ${Math.round(
        (userStats as IStatistics).optional.gameStatistic.audioCall
          .correctAnswers /
          ((userStats as IStatistics).optional.gameStatistic.audioCall
            .correctAnswers +
            (userStats as IStatistics).optional.gameStatistic.audioCall
              .wrongAnswers)
      )}`;
      audioP3.innerHTML = `Самая длинная серия ответов без ошибок: ${
        (userStats as IStatistics).optional.gameStatistic.audioCall
          .longestSeries
      }`;
      audioCallStats.appendChild(audioHeader);
      audioCallStats.appendChild(audioP1);
      audioCallStats.appendChild(audioP2);
      audioCallStats.appendChild(audioP3);
      const wordStats: HTMLElement = document.createElement("div");
      wordStats.id = "words-stats";
      wordStats.className = "words-stats";
      const wordHeader: HTMLElement = document.createElement("h2");
      const wordsP1: HTMLElement = document.createElement("p");
      const wordsP2: HTMLElement = document.createElement("p");
      const wordsP3: HTMLElement = document.createElement("p");
      wordHeader.innerHTML = "Статистика по словам за день";
      wordsP1.innerHTML = `Новых слов за день: ${newWordsProDay}`;
      wordsP2.innerHTML = `Изученных слов за день: ${learnedWordsProDay}`;
      wordsP3.innerHTML = `Общий процент правильных ответов: ${Math.round(
        ((userStats as IStatistics).optional.gameStatistic.audioCall
          .correctAnswers +
          (userStats as IStatistics).optional.gameStatistic.sprint
            .correctAnswers) /
          (userStats as IStatistics).optional.gameStatistic.audioCall
            .correctAnswers +
          (userStats as IStatistics).optional.gameStatistic.sprint
            .correctAnswers +
          (userStats as IStatistics).optional.gameStatistic.audioCall
            .wrongAnswers +
          (userStats as IStatistics).optional.gameStatistic.sprint.wrongAnswers
      )}`;
      wordStats.appendChild(wordHeader);
      wordStats.appendChild(wordsP1);
      wordStats.appendChild(wordsP2);
      wordStats.appendChild(wordsP3);
      statsContainer.appendChild(sprintStats);
      statsContainer.appendChild(audioCallStats);
      statsContainer.appendChild(wordStats);
      this.container.appendChild(statsContainer);
    } else {
      this.container.innerHTML = "Нет данных";
    }
  }
}
