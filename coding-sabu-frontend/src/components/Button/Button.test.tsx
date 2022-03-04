import { render, screen } from 'utils/testUtil';
import Button from '.';
import { colors } from 'styles/theme';

describe('appearance Button', () => {
  describe('renders yellow button', () => {
    it('renders yellow button successfully', () => {
      render(<Button color="yellow" radius="5px" />);
      const yellowButton = screen.getByRole('button');

      expect(yellowButton).toBeInTheDocument();
    });

    it('has yellow background color', () => {
      render(<Button color="yellow" radius="5px" />);
      const yellowButton = screen.getByRole('button');

      expect(yellowButton).toHaveStyle(`background-color: ${colors.yellow[4]}`);
    });

    it('has black font color', () => {
      render(<Button color="yellow" radius="5px" />);
      const yellowButton = screen.getByRole('button');

      expect(yellowButton).toHaveStyle(`color: ${colors.black}`);
    });
  });

  describe('renders black button', () => {
    it('renders black button successfully', () => {
      render(<Button color="black" radius="5px" />);
      const blackButton = screen.getByRole('button');

      expect(blackButton).toBeInTheDocument();
    });

    it('has black background color', () => {
      render(<Button color="black" radius="5px" />);
      const blackButton = screen.getByRole('button');

      expect(blackButton).toHaveStyle(`background-color: ${colors.black}`);
    });

    it('has white font color', () => {
      render(<Button color="black" radius="5px" />);
      const blackButton = screen.getByRole('button');

      expect(blackButton).toHaveStyle(`color: ${colors.white}`);
    });
  });

  describe('renders white button', () => {
    it('renders white button successfully', () => {
      render(<Button color="white" radius="5px" />);
      const whiteButton = screen.getByRole('button');

      expect(whiteButton).toBeInTheDocument();
    });

    it('has white background color', () => {
      render(<Button color="white" radius="5px" />);
      const whiteButton = screen.getByRole('button');

      expect(whiteButton).toHaveStyle(`background-color: ${colors.white}`);
    });

    it('has white font color', () => {
      render(<Button color="white" radius="5px" />);
      const whiteButton = screen.getByRole('button');

      expect(whiteButton).toHaveStyle(`color: ${colors.black}`);
    });

    it('has black border color', () => {
      render(<Button color="white" radius="5px" />);
      const whiteButton = screen.getByRole('button');

      expect(whiteButton).toHaveStyle(`border: 1px solid ${colors.black}`);
    });
  });
});
