enum EndpointsEnum {
  words = "words",
  users = "users",
  tokens = "tokens",
  aggregatedWords = "aggregatedWords",
  statistics = "statistics",
  settings = "settings",
  signin = "signin",
}

enum GamesEnum {
  sprint = "sprint",
  audiocall = "audiocall",
}

enum GameDifficulty {
  easiest = "0",
  easy = "1",
  moreThenEasy = "2",
  normal = "3",
  hard = "4",
  hardest = "5",
}

interface IGame {
  container: HTMLElement;
  group?: number;
  page?: number;
  type: GamesEnum.sprint | GamesEnum.audiocall;
  renderDifficulty(): void;
  renderTitle(): void;
  renderTimer(): void;
  generateQuestions(): Promise<void>;
  renderQuestion(question: IQuestion): void;
  renderSummary(rightAnswers: IQuestion[], wrongAnswers: IQuestion[]): void;
  startGame(): void;
  updateWordStats(isRight: boolean, question: IQuestion): Promise<void>;
  render(): Promise<void>;
}

interface IGameSprint {
  container: HTMLElement;
  questions: IQuestion[];
  render(): void;
}

interface IGameAudioCall {
  containter: HTMLElement;
  questions: IQuestion;
  render(): void;
}

interface ILogin {
  message?: string;
  token: string;
  refreshToken: string;
  userId?: string;
  name?: string;
}

interface IModalWindowElement {
  name: string;
  title: string;
  placeholder: string;
  type: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
}
interface IModalWindow {
  container: HTMLElement;
  title: string;
  id: string;
  elements: IModalWindowElement[];
  action: string;
  saveCallback:
    | ((
        email: string,
        name: string,
        password: string
      ) => Promise<
        IUser | IUserExistsError | IUserEmailOrPasswordIncorrect | unknown
      >)
    | ((
        email: string,
        password: string
      ) => Promise<ILogin | UserLoginInformationType | unknown>);
  render(): void;
  listen(): void;
}

interface ISettings {
  wordsPerDay: number;
  optional: undefined;
}

interface IFullStatistic {
  gameStatistic: IGameStatistics;
  wordStatistic: undefined;
}

interface IGameFullStatistics {
  correctAnswers: number;
  lastChanged: string;
  learnedWords: number;
  longestSeries: number;
  wrongAnswers: number;
}
interface IGameStatistics {
  audioCall: IGameFullStatistics;
  sprint: IGameFullStatistics;
}

interface IStatistics {
  learnedWords: number;
  optional: IFullStatistic;
}

interface IQuestion {
  question: string;
  rightAnswer: IWord;
  answers: IWord[];
}

interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
}

interface IUserExistsError {
  email: string;
}

interface IUserEmailOrPasswordIncorrect {
  email?: string;
  password?: string;
}

interface IWordInGame {
  right: number;
  rightInRow: number;
  wrong: number;
}

interface IUserWordDetail {
  isLearned?: string | boolean;
  isHard?: boolean;
  newWord?: string;
  sprint?: IWordInGame;
  audioCall?: IWordInGame;
}
interface IUserWord {
  difficulty: string;
  optional: IUserWordDetail | undefined;
}

interface IAggregatedWords {
  paginatedResults: IWord[] | undefined;
  totalCount: string[] | undefined;
}

interface IWord {
  id: string;
  group: number;
  page: number;
  image: string;
  audio: string;
  word: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

type CallbackType<T> = (data: T) => void;

type UserLoginInformationType = {
  email: string;
  password: string;
};

type DBErrorsSubType = {
  path: string[];
  message: string;
};

type DBErrorsType = {
  status: string;
  errors: DBErrorsSubType[];
};

type UserServerError422Type = {
  error: DBErrorsType;
};

interface MyObjectsInterface {
  [key: string]: string;
}

interface IStatisticsView {
  container: HTMLElement;
  render(): void;
}

export {
  EndpointsEnum,
  GameDifficulty,
  GamesEnum,
  IGame,
  IGameAudioCall,
  IGameSprint,
  ILogin,
  IModalWindow,
  IModalWindowElement,
  ISettings,
  IStatisticsView,
  IStatistics,
  IQuestion,
  IUser,
  IUserExistsError,
  IUserEmailOrPasswordIncorrect,
  IUserWord,
  IUserWordDetail,
  IWordInGame,
  IWord,
  IAggregatedWords,
  CallbackType,
  DBErrorsType,
  DBErrorsSubType,
  UserLoginInformationType,
  UserServerError422Type,
  MyObjectsInterface,
};
