import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    black: {
      dark: string;
      light: string;
    };
    white: {
      dark: string;
      light: string;
    };
  }
}
