import { ILogin, UserLoginInformationType } from "../types/types";
import APIConstants from "./APIConstants";

async function logIn(
  email: string,
  password: string
): Promise<ILogin | UserLoginInformationType | unknown> {
  const requestBody: UserLoginInformationType = {
    email,
    password,
  };
  try {
    const response: Response = await fetch(`${APIConstants.signinEndpoint}`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: APIConstants.HEADERS_FOR_REQUESTS_WITHOUT_AUTH,
    });
    if (response.ok && response.status === 200) {
      const json: ILogin = await response.json();
      Object.entries(json).forEach((param: Array<string>): void => {
        if (param[0] !== "message") {
          localStorage.setItem(param[0], param[1]);
        }
      });
      return json;
    }
    if (response.status === 404) {
      return { email: `Could not find user with a email ${email}` };
    }
    return {
      email: "Please check your email",
      password: "Please check your password",
    };
  } catch (error) {
    return error;
  }
}

const logOut = (): void => {
  localStorage.clear();
  window.location.reload();
};

export { logIn, logOut };
