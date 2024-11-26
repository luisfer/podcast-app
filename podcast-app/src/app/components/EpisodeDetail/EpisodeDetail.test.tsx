import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EpisodeDetail } from './EpisodeDetail';
import { usePodcastDetails } from '@/hooks/usePodcastDetails';

const mockLocalStorage = {
  store: {} as { [key: string]: string },
  getItem(key: string) {
    return this.store[key] || null;
  },
  setItem(key: string, value: string) {
    this.store[key] = value.toString();
  },
  clear() {
    this.store = {};
  }
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

jest.mock('@/hooks/usePodcastDetails');
jest.mock('next/navigation', () => ({
  usePathname: () => '/podcast/1/episode/1',
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
    description: '<p>Episode Description with <strong>HTML</strong></p>',
    publishDate: '2024-02-27',
    duration: '30:00',
    audioUrl: 'audio1.mp3'
  }
];

describe('EpisodeDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  it('renders loading state', () => {
    (usePodcastDetails as jest.Mock).mockReturnValue({
      podcast: null,
      episodes: [],
      loading: true,
      error: null
    });

    render(<EpisodeDetail podcastId="1" episodeId="1" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    (usePodcastDetails as jest.Mock).mockReturnValue({
      podcast: null,
      episodes: [],
      loading: false,
      error: new Error('Failed to load')
    });

    render(<EpisodeDetail podcastId="1" episodeId="1" />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('renders episode details with HTML description', () => {
    (usePodcastDetails as jest.Mock).mockReturnValue({
      podcast: mockPodcast,
      episodes: mockEpisodes,
      loading: false,
      error: null
    });

    render(<EpisodeDetail podcastId="1" episodeId="1" />);

    // Check episode title
    expect(screen.getByText('Episode 1')).toBeInTheDocument();

    // Check HTML rendered description
    const description = screen.getByText('HTML');
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('STRONG');

    // Check audio player
    const audioPlayer = screen.getByTestId('audio-player');
    expect(audioPlayer).toHaveAttribute('src', 'audio1.mp3');
  });

  it('renders not found state for invalid episode', () => {
    (usePodcastDetails as jest.Mock).mockReturnValue({
      podcast: mockPodcast,
      episodes: mockEpisodes,
      loading: false,
      error: null
    });

    render(<EpisodeDetail podcastId="1" episodeId="999" />);
    expect(screen.getByText(/episode not found/i)).toBeInTheDocument();
  });

  it('renders podcast sidebar', () => {
    (usePodcastDetails as jest.Mock).mockReturnValue({
      podcast: mockPodcast,
      episodes: mockEpisodes,
      loading: false,
      error: null
    });

    render(<EpisodeDetail podcastId="1" episodeId="1" />);

    // Check podcast sidebar info
    expect(screen.getByText(mockPodcast.title)).toBeInTheDocument();
    expect(screen.getByText(`by ${mockPodcast.author}`)).toBeInTheDocument();
    expect(screen.getByText(mockPodcast.description)).toBeInTheDocument();
  });
});