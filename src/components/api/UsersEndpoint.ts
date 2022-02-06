import {
  DBErrorsType,
  UserServerError422Type,
  IUser,
  IUserEmailOrPasswordIncorrect,
  IUserExistsError,
  UserLoginInformationType,
  ILogin,
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

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<IUser | IUserExistsError | IUserEmailOrPasswordIncorrect> {
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
      return { create_user_form: "User with this email exists" };
    }
    const data: IUser = await response.json();
    return data;
  } catch (err) {
    const formErrors: IUserEmailOrPasswordIncorrect = {};
    if (typeof err === "object") {
      if (
        (err as UserServerError422Type).error &&
        typeof (err as UserServerError422Type).error === "object" &&
        (err as UserServerError422Type).error.errors
      ) {
        (err as UserServerError422Type).error.errors.forEach(
          (e: DBErrorsType) => {
            console.log(e);
            if (e.path[0] === "email") {
              formErrors.email = e.message;
            } else if (e.path[0] === "password") {
              formErrors.password = e.message;
            }
          }
        );
      }
    }
    return formErrors;
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
    console.log(error);
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
