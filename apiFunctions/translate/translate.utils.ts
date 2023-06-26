import { TRANSLATE_API_URL } from "./translate.consts";

export const getRequestOptions = (text: string) => {
  return {
    method: "POST",
    url: TRANSLATE_API_URL,
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "9681a355admsh9b82bbb1eb04046p148313jsn63b145f7b11c",
      "X-RapidAPI-Host": "translate-it1.p.rapidapi.com",
    },
    data: {
      q: text,
      source: "en",
      target: "pl",
    },
  };
};
