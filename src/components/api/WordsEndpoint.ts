import APIConstants from "./APIConstants";
import { IWord } from "../types/types";

const getWords = async (group: string, page: string): Promise<Array<IWord>> => {
  const data: Array<IWord> = await fetch(
    `${APIConstants.wordsEndpoint}?group=${group}&page=${page}`,
    {
      method: "GET",
      headers: APIConstants.HEADERS_FOR_REQUESTS_WITHOUT_AUTH,
    }
  )
    .then((response: Response) => response.json())
    .then((respData: Array<IWord>) => respData);
  return data;
};

const getWord = async (wordId: string): Promise<IWord> => {
  const data: IWord = await fetch(`${APIConstants.wordsEndpoint}/${wordId}`, {
    method: "GET",
    headers: APIConstants.HEADERS_FOR_REQUESTS_WITHOUT_AUTH,
  })
    .then((response: Response) => response.json())
    .then((respData: IWord) => respData);
  return data;
};

export { getWord, getWords };
