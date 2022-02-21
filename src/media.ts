const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

const media = {
  desktop: customMediaQuery(1024),
  tablet: customMediaQuery(768),
};

export default media;
