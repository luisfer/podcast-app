import { render, screen, fireEvent } from '@testing-library/react';
import { PodcastList } from '@/app/components/PodcastList/PodcastList';
import { useTopPodcasts } from '@/hooks/useQueries';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
  
jest.mock('@/hooks/useQueries');

const mockPodcasts = [
  {
    id: '1',
    title: 'Test Podcast 1',
    author: 'Author 1',
    image: 'test1.jpg',
    description: 'Description 1'
  },
  {
    id: '2',
    title: 'Test Podcast 2',
    author: 'Author 2',
    image: 'test2.jpg',
    description: 'Description 2'
  }
];

describe('PodcastList', () => {
  beforeEach(() => {
    // Reset mock before each test
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null
    });

    render(<PodcastList />);
    expect(screen.getByText('Loading podcasts...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to load')
    });

    const { container } = render(<PodcastList />);
    expect(container.querySelector('.grid')).toBeEmptyDOMElement();
  });

  it('renders podcasts list', () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: mockPodcasts,
      isLoading: false,
      error: null
    });

    render(<PodcastList />);
    
    mockPodcasts.forEach(podcast => {
      expect(screen.getByText(podcast.title)).toBeInTheDocument();
      expect(screen.getByText(`Author: ${podcast.author}`)).toBeInTheDocument();
    });
  });

  it('filters podcasts by title', () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: mockPodcasts,
      isLoading: false,
      error: null
    });

    render(<PodcastList />);
    
    const searchInput = screen.getByPlaceholderText('Filter podcasts...');
    fireEvent.change(searchInput, { target: { value: 'Test Podcast 1' } });

    expect(screen.getByText('Test Podcast 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Podcast 2')).not.toBeInTheDocument();
  });

  it('filters podcasts by author', () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: mockPodcasts,
      isLoading: false,
      error: null
    });

    render(<PodcastList />);
    
    const searchInput = screen.getByPlaceholderText('Filter podcasts...');
    fireEvent.change(searchInput, { target: { value: 'Author 1' } });

    expect(screen.getByText('Test Podcast 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Podcast 2')).not.toBeInTheDocument();
  });

  it('shows correct podcast count', () => {
    (useTopPodcasts as jest.Mock).mockReturnValue({
      data: mockPodcasts,
      isLoading: false,
      error: null
    });

    render(<PodcastList />);
    
    const counter = screen.getByText('2');
    expect(counter).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Filter podcasts...');
    fireEvent.change(searchInput, { target: { value: 'Test Podcast 1' } });

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});