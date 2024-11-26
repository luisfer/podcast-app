import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('Header', () => {
  it('renders the title', () => {
    render(<Header />);
    
    const titleElement = screen.getByText('Podcaster');
    expect(titleElement).toBeInTheDocument();
  });

  it('includes a link to home', () => {
    render(<Header />);
    
    const linkElement = screen.getByRole('link', { name: 'Podcaster' });
    expect(linkElement).toHaveAttribute('href', '/');
  });

  it('renders with the correct styles', () => {
    render(<Header />);
    
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header');
  });
});