export const getImage = (path: string, format?: string) =>
  `https://image.tmdb.org/t/p/${format ? format : "original"}${path}`;
