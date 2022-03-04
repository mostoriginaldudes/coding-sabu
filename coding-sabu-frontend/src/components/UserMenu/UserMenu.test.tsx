import { render, screen } from 'utils/testUtil';
import UserMenu from '.';

describe('appearance of User Menu', () => {
  it('has 3 lists', () => {
    render(<UserMenu />);
    const userMenu = screen.getByRole('userMenu');

    expect(userMenu.childElementCount).toBe(3);
  });
});
