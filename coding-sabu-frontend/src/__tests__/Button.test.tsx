import { render, screen } from '@testing-library/react';
import Button from 'components/Button';

describe('<Button /> UI 테스트', () => {
  test('버튼 색깔은 노랑', () => {
    render(<Button color="yellow">버튼</Button>);

    const ButtonComponent = screen.getByRole('button');
    expect(ButtonComponent).toMatchSnapshot();
  });

  test('버튼 색깔은 검정', () => {
    render(<Button color="black">버튼</Button>);

    const ButtonComponent = screen.getByRole('button');
    expect(ButtonComponent).toMatchSnapshot();
  });

  test('버튼 색깔은 하양', () => {
    render(<Button color="white">버튼</Button>);

    const ButtonComponent = screen.getByRole('button');
    expect(ButtonComponent).toMatchSnapshot();
  });

  test('버튼 텍스트 렌더링', () => {
    render(<Button color="white">버튼</Button>);

    const ButtonComponent = screen.getByRole('button');
    expect(ButtonComponent).toHaveTextContent('버튼');
  });
});
