export const getImage = (path: string, format?: string) =>
  `https://image.tmdb.org/t/p/${format ? format : "original"}${path}`;

export const calculateRelativeOffset = (width: number) => {
  switch (true) {
    case width <= 500:
      return 2;
    case 500 < width && width <= 800:
      return 3;
    case 800 < width && width <= 1100:
      return 4;
    case 1100 < width && width <= 1400:
      return 5;
    default:
      return 6;
  }
};
