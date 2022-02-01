enum EndpointsEnum {
  words = "words",
  users = "users",
  tokens = "tokens",
  aggregatedWords = "aggregatedWords",
  statistics = "statistics",
  settings = "settings",
  signin = "signin",
}
<<<<<<< HEAD

interface ILogin {
  message?: string;
  token: string;
  refreshToken: string;
  userId?: string;
  name?: string;
}
=======
interface ILogin {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

>>>>>>> ba231a0 (feat: basic types, which API returns, were added)
interface ISettings {
  wordsPerDay: number;
  optional: undefined;
}

interface IStatistics {
  learnedWords: number;
  optional: undefined;
}

interface IUser {
<<<<<<< HEAD
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
=======
  id: string;
  name: string;
  email: string;
>>>>>>> ba231a0 (feat: basic types, which API returns, were added)
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

<<<<<<< HEAD
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

=======
>>>>>>> ba231a0 (feat: basic types, which API returns, were added)
export {
  EndpointsEnum,
  ILogin,
  ISettings,
  IStatistics,
  IUser,
<<<<<<< HEAD
  IUserExistsError,
  IUserEmailOrPasswordIncorrect,
  IUserWord,
  IWord,
  DBErrorsType,
  UserLoginInformationType,
  UserServerError422Type,
=======
  IUserWord,
  IWord,
  UserLoginInformationType,
>>>>>>> ba231a0 (feat: basic types, which API returns, were added)
};
