import { render, screen } from '@testing-library/react';
import HeadUpDisplay from '.';

describe('appearance of HeadUpDisplay', () => {
  it('renders right text when type props is success', () => {
    render(<HeadUpDisplay type="success" />);
    const headUpDisplayText = screen.getByRole('heading');

    expect(headUpDisplayText).toHaveTextContent('완료했습니다.');
  });

  it('renders right icon when type props is success', () => {
    render(<HeadUpDisplay type="success" />);
    const headUpDisplayIcon = screen.getByRole('img');

    expect(headUpDisplayIcon).toBeInTheDocument();
  });

  it('renders right text when type props is fail', () => {
    render(<HeadUpDisplay type="fail" />);
    const headUpDisplayText = screen.getByRole('heading');

    expect(headUpDisplayText).toHaveTextContent('실패했습니다.');
  });

  it('renders right icon when type props is fail', () => {
    render(<HeadUpDisplay type="fail" />);
    const headUpDisplayIcon = screen.getByRole('img');

    expect(headUpDisplayIcon).toBeInTheDocument();
  });
});
