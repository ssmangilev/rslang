import {
  DBErrorsType,
  UserServerError422Type,
  IUser,
  IUserEmailOrPasswordIncorrect,
  IUserExistsError,
  UserLoginInformationType,
  ILogin,
  DBErrorsSubType,
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

export default { getUser, createUser, updateUser, getNewTokens };
