import { ILogin, UserLoginInformationType } from "../types/types";
import APIConstants from "./APIConstants";

const logIn = async (
  email: string,
  password: string
): Promise<ILogin | UserLoginInformationType> => {
  const requestBody: UserLoginInformationType = {
    email,
    password,
  };
  const data: ILogin | UserLoginInformationType = await fetch(
    `${APIConstants.signinEndpoint}`,
    {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: APIConstants.HEADERS_FOR_REQUESTS_WITHOUT_AUTH,
    }
  )
    .then((response: Response) => {
      if (response.status === 200) {
        const json: Promise<ILogin> = response.json();
        json.then((resData: ILogin) => {
          Object.entries(resData).forEach((param: Array<string>): void => {
            if (param[0] !== "message") {
              if (!localStorage.getItem(param[0])) {
                localStorage.setItem(param[0], param[1]);
              }
            }
          });
        });
      }
      return {
        email: "Please check your email",
        password: "Please check your password",
      };
    })
    .catch((err) => err);
  return data;
};

const logOut = (): void => {
  localStorage.clear();
  window.location.reload();
};

export { logIn, logOut };
