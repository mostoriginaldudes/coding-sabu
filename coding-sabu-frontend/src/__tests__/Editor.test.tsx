import { render } from '@testing-library/react';
import { matchers } from '@emotion/jest';
import Editor from 'components/Editor';

expect.extend(matchers);

const setValue = jest.fn();

let container: HTMLElement;
beforeEach(() => {
  const { container: containerEl } = render(<Editor setValue={setValue} />);
  container = containerEl;
});

describe('<Editor /> UI 테스트', () => {
  test('스냅샷과 일치한다.', () => {
    expect(container).toMatchSnapshot();
  });

  test('높이는 600px', () => {
    expect(container.firstElementChild).toHaveStyle({ height: '600px' });
  });
});
