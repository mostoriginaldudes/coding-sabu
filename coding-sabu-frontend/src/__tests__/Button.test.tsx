import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { matchers } from '@emotion/jest';
import Button from 'components/Button';
import { colors } from 'styles/modules/theme';

expect.extend(matchers);

const onClick = jest.fn();

const renderButton = (color: 'yellow' | 'white' | 'black') => {
  render(
    <Button color={color} onClick={onClick}>
      버튼
    </Button>
  );
  return screen.getByRole('button');
};

describe('<Button /> UI 테스트', () => {
  describe('color prop이 잘 전달된다.', () => {
    test('버튼 색깔은 노란색이다.', () => {
      const ButtonComponent = renderButton('yellow');
      expect(ButtonComponent).toHaveStyleRule('background-color', colors.yellow[4]);
    });

    test('버튼 색깔은 검은색이다.', () => {
      const ButtonComponent = renderButton('black');
      expect(ButtonComponent).toHaveStyleRule('background-color', colors.black);
    });

    test('버튼 색깔은 하얀색이다.', () => {
      const ButtonComponent = renderButton('white');
      expect(ButtonComponent).toHaveStyleRule('background-color', colors.white);
    });
  });

  describe('props 잘 전달된다.', () => {
    test('버튼 글자 보인다.', () => {
      const ButtonComponent = renderButton('white');
      expect(ButtonComponent).toHaveTextContent('버튼');
    });

    test('버튼이 한번 클릭된다.', () => {
      const ButtonComponent = renderButton('white');
      userEvent.click(ButtonComponent);
      expect(onClick.mock.calls.length).toBe(1);
    });

    test('onClick으로 전달된 함수가 호출된다.', () => {
      const ButtonComponent = renderButton('white');
      userEvent.click(ButtonComponent);
      expect(onClick).toBeCalled();
    });
  });
});
