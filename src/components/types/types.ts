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
<<<<<<< HEAD

interface ILogin {
  message?: string;
  token: string;
  refreshToken: string;
  userId?: string;
  name?: string;
}
=======
=======
>>>>>>> 6427683 (feat: basic API methods for User, Word, Login endpoints were added)
interface ILogin {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
=======

interface ILogin {
  message?: string;
  token: string;
  refreshToken: string;
  userId?: string;
  name?: string;
>>>>>>> 3533a83 (feat: basic API methods for User, Word, Login endpoints were added)
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
=======
  id: string;
  name: string;
  email: string;
=======
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
>>>>>>> 3533a83 (feat: basic API methods for User, Word, Login endpoints were added)
>>>>>>> 6427683 (feat: basic API methods for User, Word, Login endpoints were added)
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
<<<<<<< HEAD
=======
=======
>>>>>>> 6427683 (feat: basic API methods for User, Word, Login endpoints were added)
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

<<<<<<< HEAD
=======
>>>>>>> ba231a0 (feat: basic types, which API returns, were added)
=======
>>>>>>> 3533a83 (feat: basic API methods for User, Word, Login endpoints were added)
>>>>>>> 6427683 (feat: basic API methods for User, Word, Login endpoints were added)
export {
  EndpointsEnum,
  ILogin,
  ISettings,
  IStatistics,
  IUser,
<<<<<<< HEAD
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
=======
  IUserWord,
  IWord,
  UserLoginInformationType,
=======
  IUserExistsError,
  IUserEmailOrPasswordIncorrect,
  IUserWord,
  IWord,
  DBErrorsType,
  UserLoginInformationType,
  UserServerError422Type,
>>>>>>> 3533a83 (feat: basic API methods for User, Word, Login endpoints were added)
>>>>>>> 6427683 (feat: basic API methods for User, Word, Login endpoints were added)
};
