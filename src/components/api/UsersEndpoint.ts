import {
  DBErrorsType,
  UserServerError422Type,
  IUser,
  IUserEmailOrPasswordIncorrect,
  IUserExistsError,
  UserLoginInformationType,
  ILogin,
  DBErrorsSubType,
  IUserWord,
  IStatistics,
  IAggregatedWords,
  IWord,
} from "../types/types";
import APIConstants from "./APIConstants";

export async function getUser(userId: string): Promise<IUser | void> {
  const data: IUser | void = await fetch(
    `${APIConstants.usersEndpoint}/${userId}`,
    {
      method: "GET",
      headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
    }
  )
    .then((response: Response) => response.json())
    .then((respData: IUser) => respData)
    .catch((err: Error) => console.log(err));
  return data;
}

// eslint-disable-next-line consistent-return
export async function createUser(
  email: string,
  name: string,
  password: string
): Promise<
  IUser | IUserExistsError | IUserEmailOrPasswordIncorrect | undefined
> {
  try {
    const requestBody: IUser = {
      name,
      email,
      password,
    };
    const response: Response = await fetch(`${APIConstants.usersEndpoint}`, {
      method: "POST",
      headers: APIConstants.HEADERS_FOR_REQUESTS_WITHOUT_AUTH,
      body: JSON.stringify(requestBody),
    });
    if (response.status === 417) {
      return { email: "User with this email exists" } as IUserExistsError;
    }
    const data: IUser | UserServerError422Type = await response.json();
    if (response.status === 422) {
      const errorsPath: DBErrorsType = (data as UserServerError422Type).error;
      const errors: DBErrorsSubType[] =
        errorsPath.errors as unknown as DBErrorsSubType[];
      const errorsData: IUserEmailOrPasswordIncorrect = {};
      (errors as DBErrorsSubType[]).forEach((err: DBErrorsSubType): void => {
        if (err.path[0] === "email") {
          errorsData.email = err.message;
        }
        if (err.path[0] === "password") {
          errorsData.password = err.message;
        }
      });
      return errorsData as IUserEmailOrPasswordIncorrect;
    }
    return data as IUser;
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(
  userId: string,
  password: string,
  email: string
): Promise<IUser | unknown> {
  const requestBody: UserLoginInformationType = {
    email,
    password,
  };
  try {
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}`,
      {
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
        body: JSON.stringify(requestBody),
      }
    );
    const data: IUser = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getNewTokens(userId: string): Promise<void> {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("refreshToken") || ""}`,
    Accept: "application/json",
    "Content-type": "application/json; charset=utf-8",
  };
  try {
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}/tokens`,
      {
        headers,
      }
    );
    const data: ILogin = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserWord(
  userId: string,
  wordId: string
): Promise<IUserWord | unknown> {
  try {
    const response: Response = await fetch(
      `
    ${APIConstants.usersEndpoint}/${userId}/words/${wordId}`,
      {
        method: "GET",
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      getUserWord(userId, wordId);
    }
    if (response.status === 404) {
      return null;
    }
    const data: IUserWord = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserWords(
  userId: string
): Promise<IUserWord[] | unknown> {
  try {
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}/words`,
      {
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      getUserWords(userId);
    }
    const data: IUserWord[] = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function createUserWord(
  userId: string,
  wordId: string,
  wordData: IUserWord
): Promise<IUserWord | unknown> {
  try {
    const responseBody = JSON.stringify(wordData);
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}/words/${wordId}`,
      {
        method: "POST",
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
        body: responseBody,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      createUserWord(userId, wordId, wordData);
    }
    const data: IUserWord = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateUserWord(
  userId: string,
  wordId: string,
  wordData: IUserWord
): Promise<IUserWord | unknown> {
  try {
    const responseBody = JSON.stringify(wordData);
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}${userId}/words/${wordId}`,
      {
        method: "PUT",
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
        body: responseBody,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      updateUserWord(userId, wordId, wordData);
    }
    const data: IUserWord = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteUserWord(
  userId: string,
  wordId: string
): Promise<void | unknown> {
  try {
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}/words/${wordId}`,
      {
        method: "DELETE",
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      deleteUserWord(userId, wordId);
    }
    const data: IUserWord = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserStatistics(
  userId: string
): Promise<IStatistics | unknown> {
  try {
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}/statistics`,
      {
        method: "GET",
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      getUserStatistics(userId);
    }
    if (response.status === 404) {
      return null;
    }
    const data: IStatistics = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateUserStatistics(
  userId: string,
  statistics: IStatistics
): Promise<IStatistics | unknown> {
  try {
    const responseBody = JSON.stringify(statistics);
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}/statistics`,
      {
        method: "PUT",
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
        body: responseBody,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      updateUserStatistics(userId, statistics);
    }
    const data: IStatistics = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserNewWordsIds(
  userId: string
): Promise<string[] | unknown> {
  const WORDS_PER_PAGE = 3600;
  const filter = `{"$and":[{"userWord":{"$ne": null}, "userWord.optional.newWord":{"$ne": null}}]}`;
  try {
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}/aggregatedWords?wordsPerPage=${WORDS_PER_PAGE}&filter=${filter}`,
      {
        method: "GET",
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      getUserNewWordsIds(userId);
    }
    const data: IAggregatedWords[] = await response.json();
    const ids: string[] =
      data[0].paginatedResults?.map((word: IWord): string => word.id) || [];
    return ids;
  } catch (error) {
    return error;
  }
}

export async function getUserLearnedWordsIds(
  userId: string
): Promise<string[] | unknown> {
  const WORDS_PER_PAGE = 3600;
  const filter = `{"$and":[{"userWord":{"$ne": null}, "userWord.difficulty":"easy"}]}`;
  try {
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}/aggregatedWords?wordsPerPage=${WORDS_PER_PAGE}&filter=${filter}`,
      {
        method: "GET",
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      getUserLearnedWordsIds(userId);
    }
    const data: IAggregatedWords[] = await response.json();
    const ids: string[] =
      data[0].paginatedResults?.map((word: IWord): string => word.id) || [];
    return ids;
  } catch (error) {
    return error;
  }
}

export async function getUserLearnedWordsCountPerDay(
  userId: string
): Promise<number | unknown> {
  const WORDS_PER_PAGE = 3600;
  const dateString = new Date().toISOString().split("T")[0];
  const filter = `{"$and":[{"userWord.optional.isLearned": "${dateString}", "userWord.difficulty":"easy"}]}`;
  try {
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}/aggregatedWords?wordsPerPage=${WORDS_PER_PAGE}&filter=${filter}`,
      {
        method: "GET",
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      getUserLearnedWordsIds(userId);
    }
    const data: IAggregatedWords[] = await response.json();
    return data[0].paginatedResults?.length || 0;
  } catch (error) {
    return error;
  }
}

export async function getUserNewWordsCountPerDay(
  userId: string
): Promise<number | unknown> {
  const WORDS_PER_PAGE = 3600;
  const dateString = new Date().toISOString().split("T")[0];
  const filter = `{"userWord.optional.newWord": "${dateString}"}`;
  try {
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}/aggregatedWords?wordsPerPage=${WORDS_PER_PAGE}&filter=${filter}`,
      {
        method: "GET",
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      getUserLearnedWordsIds(userId);
    }
    const data: IAggregatedWords[] = await response.json();
    return data[0].paginatedResults?.length || 0;
  } catch (error) {
    return error;
  }
}

export async function getUserHardWordsIds(
  userId: string
): Promise<string[] | unknown> {
  const WORDS_PER_PAGE = 3600;
  const filter = `{"$and":[{"userWord":{"$ne": null}, "userWord.difficulty":"hard"}]}`;
  try {
    const response: Response = await fetch(
      `${APIConstants.usersEndpoint}/${userId}/aggregatedWords?wordsPerPage=${WORDS_PER_PAGE}&filter=${filter}`,
      {
        method: "GET",
        headers: APIConstants.HEADERS_FOR_REQUESTS_WITH_AUTH,
      }
    );
    if (response.status === 401) {
      getNewTokens(userId);
      getUserHardWordsIds(userId);
    }
    const data: IAggregatedWords[] = await response.json();
    const ids: string[] =
      data[0].paginatedResults?.map((word: IWord): string => word.id) || [];
    return ids;
  } catch (error) {
    return error;
  }
}

export default {
  getUser,
  createUser,
  updateUser,
  getNewTokens,
  getUserWord,
  createUserWord,
  updateUserWord,
  deleteUserWord,
  getUserWords,
  getUserStatistics,
  updateUserStatistics,
  getUserNewWordsIds,
  getUserLearnedWordsIds,
  getUserHardWordsIds,
};
