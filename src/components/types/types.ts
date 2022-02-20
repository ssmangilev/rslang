enum EndpointsEnum {
  words = "words",
  users = "users",
  tokens = "tokens",
  aggregatedWords = "aggregatedWords",
  statistics = "statistics",
  settings = "settings",
  signin = "signin",
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

interface IStatistics {
  learnedWords: number;
  optional: undefined;
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

interface IUserWord {
  difficulty: string;
  optional: undefined;
}

interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
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

export {
  EndpointsEnum,
  ILogin,
  IModalWindow,
  IModalWindowElement,
  ISettings,
  IStatistics,
  IUser,
  IUserExistsError,
  IUserEmailOrPasswordIncorrect,
  IUserWord,
  IWord,
  CallbackType,
  DBErrorsType,
  DBErrorsSubType,
  UserLoginInformationType,
  UserServerError422Type,
  MyObjectsInterface,
};
