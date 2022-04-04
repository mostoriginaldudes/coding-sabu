import { render, screen } from '@testing-library/react';
import { matchers } from '@emotion/jest';
import Button from 'components/Button';
import { colors } from 'styles/modules/theme';

expect.extend(matchers);

describe('<Button /> UI 테스트', () => {
  describe('color prop이 잘 전달됨', () => {
    test('버튼 색깔은 노랑', () => {
      render(<Button color="yellow">버튼</Button>);

      const ButtonComponent = screen.getByRole('button');
      expect(ButtonComponent).toHaveStyleRule('background-color', colors.yellow[4]);
    });

    test('버튼 색깔은 검정', () => {
      render(<Button color="black">버튼</Button>);

      const ButtonComponent = screen.getByRole('button');
      expect(ButtonComponent).toHaveStyleRule('background-color', colors.black);
    });

    test('버튼 색깔은 하양', () => {
      render(<Button color="white">버튼</Button>);

      const ButtonComponent = screen.getByRole('button');
      expect(ButtonComponent).toHaveStyleRule('background-color', colors.white);
    });
  });

  describe('render prop이 잘 전달됨', () => {
    test('버튼 텍스트 렌더링', () => {
      render(<Button color="white">버튼</Button>);

      const ButtonComponent = screen.getByRole('button');
      expect(ButtonComponent).toHaveTextContent('버튼');
    });
  });

  // describe('radius prop', () => {});
  // describe('height prop', () => {});
  // describe('hover 테스트', () => {});
  // describe('active 테스트', () => {});
});
