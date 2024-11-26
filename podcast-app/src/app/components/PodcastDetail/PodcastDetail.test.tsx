import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PodcastDetail } from './PodcastDetail';
import { usePodcastDetails } from '@/hooks/usePodcastDetails';

jest.mock('@/hooks/usePodcastDetails');
jest.mock('next/navigation', () => ({
  usePathname: () => '/podcast/1',
  useSearchParams: () => new URLSearchParams(),
}));

const mockPodcast = {
  id: '1',
  title: 'Test Podcast',
  author: 'Test Author',
  description: 'Test Description',
  image: 'test.jpg'
};

const mockEpisodes = [
  {
    id: '1',
    title: 'Episode 1',
    description: 'Episode 1 Description',
    duration: '30:00',
    publishDate: '2024-02-27',
    audioUrl: 'audio1.mp3'
  }
];

describe('PodcastDetail', () => {

  it('renders loading state', () => {
    (usePodcastDetails as jest.Mock).mockReturnValue({
      podcast: null,
      episodes: [],
      loading: true,
      error: null
    });
    render(<PodcastDetail podcastId="1" />);
    expect(screen.getByTestId('loading-episodes')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (usePodcastDetails as jest.Mock).mockReturnValue({
      podcast: null,
      episodes: [],
      loading: false,
      error: new Error('Failed to load')
    });

    render(<PodcastDetail podcastId="1" />);
    expect(screen.getByText(/Failed to load/)).toBeInTheDocument();
  });

  it('renders podcast details and episodes', () => {
    (usePodcastDetails as jest.Mock).mockReturnValue({
      podcast: mockPodcast,
      episodes: mockEpisodes,
      loading: false,
      error: null
    });

    render(<PodcastDetail podcastId="1" />);

    // Check podcast info
    expect(screen.getByText('Test Podcast')).toBeInTheDocument();
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Check episodes
    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('30:00')).toBeInTheDocument();
  });
});