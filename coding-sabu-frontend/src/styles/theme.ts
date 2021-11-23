import { css } from "@emotion/react";
import openColor from "open-color";

interface Sizes {
  desktop: 1024;
  tablet: 768;
  unitDesktop: "64px";
  unitTablet: "48px";
}

const sizes: Sizes = {
  desktop: 1024,
  tablet: 768,
  unitDesktop: "64px",
  unitTablet: "48px"
};

const media = {
  desktop: (...args: any) =>
    css`
      @media (max-width: ${sizes.desktop / 16}em) {
        ${css(...args)}
      }
    `,
  tablet: (...args: any) =>
    css`
      @media (max-width: ${sizes.tablet / 16}em) {
        ${css(...args)}
      }
    `
} as const;

const colors = openColor;

export { sizes, media, colors };
