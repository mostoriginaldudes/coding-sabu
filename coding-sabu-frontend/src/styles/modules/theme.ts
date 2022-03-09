import { css } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import openColor from 'open-color';

interface Sizes {
  desktop: 1024;
  tablet: 768;
  unitBig: 64;
  unitRegular: 48;
}

const sizes: Sizes = {
  desktop: 1024,
  tablet: 768,
  unitBig: 64,
  unitRegular: 48
};

const media = {
  desktop: (...args: TemplateStringsArray[]) =>
    css`
      @media (max-width: ${sizes.desktop / 16}em) {
        ${css(...(args as unknown as CSSInterpolation[]))}
      }
    `,
  tablet: (...args: TemplateStringsArray[]) =>
    css`
      @media (max-width: ${sizes.tablet / 16}em) {
        ${css(...(args as unknown as CSSInterpolation[]))}
      }
    `
} as const;

const colors = openColor;

export { sizes, media, colors };
