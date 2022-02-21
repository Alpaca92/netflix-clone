import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    black: {
      plain: string;
      dark: string;
      light: string;
    };
    white: {
      plain: string;
      light: string;
    };
  }
}
