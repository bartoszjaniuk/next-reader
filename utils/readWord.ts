export const readWord = (word: string, audioRef: any) => {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${word}`;
  audioRef.current.setAttribute("src", url);
  audioRef.current.play();
};
