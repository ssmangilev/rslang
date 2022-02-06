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
  create_user_form: string;
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

type UserLoginInformationType = {
  email: string;
  password: string;
};

type DBErrorsType = {
  path: string[];
  message: string;
};

type UserServerError422Type = {
  error: {
    status: string;
    errors: DBErrorsType[];
  };
};

export {
  EndpointsEnum,
  ILogin,
  ISettings,
  IStatistics,
  IUser,
  IUserExistsError,
  IUserEmailOrPasswordIncorrect,
  IUserWord,
  IWord,
  DBErrorsType,
  UserLoginInformationType,
  UserServerError422Type,
};
