import { TRANSLATE_API_URL } from "./translate.consts";

export const getRequestOptions = (text: string) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("to", "pl");
    encodedParams.append("text", text);
    return {
      method: "POST",
      url: TRANSLATE_API_URL,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "9681a355admsh9b82bbb1eb04046p148313jsn63b145f7b11c",
        "X-RapidAPI-Host": "translo.p.rapidapi.com",
      },
      data: encodedParams,
    };
  };