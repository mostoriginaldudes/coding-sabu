import { render, screen } from '../../utils/testUtil';
import userEvent from '@testing-library/user-event';
import GlobalNav from '.';

describe('appearance of global navigation bar', () => {
  it('renders logo image', () => {
    render(<GlobalNav />);
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('renders logo text', () => {
    render(<GlobalNav />);
    const logoText = screen.getByText('코딩사부');
    expect(logoText).toBeInTheDocument();
  });

  it('renders button for routing', () => {
    render(<GlobalNav />);
    const buttonForClassManagement = screen.getByText('수련 관리');
    expect(buttonForClassManagement).toBeInTheDocument();
  });

  it('renders icon for searching', () => {
    render(<GlobalNav />);
    const searchIcon = screen.getByRole('search');
    expect(searchIcon).toBeInTheDocument();
  });

  it('renders user menu', () => {
    render(<GlobalNav />);
    const toggleMenu = screen.getByRole('toggleMenu');

    userEvent.click(toggleMenu);

    const userMenu = screen.getByRole('userMenu');
    expect(userMenu).toBeInTheDocument();
  });

  it('has #EEE as background color', () => {
    render(<GlobalNav />);
    const globalNav = screen.getByTestId('header');

    expect(globalNav).toHaveStyle(`background-color: #eee`);
  });

  it('has contain as background size', () => {
    render(<GlobalNav />);
    const globalNav = screen.getByTestId('header');

    expect(globalNav).toHaveStyle(`background-size: contain`);
  });
});
