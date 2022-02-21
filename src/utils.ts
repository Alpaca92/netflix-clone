export const getImage = (path: string, format?: string) =>
  `https://image.tmdb.org/t/p/${format ? format : "original"}${path}`;

export const getLastPage = (pages: number, offset: number) =>
  Math.ceil(pages / offset) - 1;

