import { EndpointsEnum } from "../types/types";

export const BACKEND_ADDRESS = `https://rslangbackend.herokuapp.com`;
const WORDS_ENDPOINT = `${BACKEND_ADDRESS}/${EndpointsEnum.words}`;
const USERS_ENDPOINT = `${BACKEND_ADDRESS}/${EndpointsEnum.users}`;
const SIGNIN_ENDPOINT = `${BACKEND_ADDRESS}/${EndpointsEnum.signin}`;

const HEADERS_FOR_REQUESTS_WITH_AUTH = {
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-type": "application/json; charset=utf-8",
};

const HEADERS_FOR_REQUESTS_WITHOUT_AUTH = {
  Accept: "application/json",
  "Content-type": "application/json",
};

export default {
  wordsEndpoint: WORDS_ENDPOINT,
  usersEndpoint: USERS_ENDPOINT,
  signinEndpoint: SIGNIN_ENDPOINT,
  HEADERS_FOR_REQUESTS_WITH_AUTH,
  HEADERS_FOR_REQUESTS_WITHOUT_AUTH,
};
