import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EpisodesList } from './EpisodesList';

jest.mock('next/navigation', () => ({
  usePathname: () => '/podcast/1',
  useSearchParams: () => new URLSearchParams(),
}));

const mockEpisodes = [
  {
    id: '1',
    title: 'Episode 1',
    description: 'First Episode Description',
    publishDate: '2024-02-27',
    duration: '30:00',
    audioUrl: 'audio1.mp3'
  },
  {
    id: '2',
    title: 'Episode 2',
    description: 'Second Episode Description',
    publishDate: '2024-02-28',
    duration: '25:30',
    audioUrl: 'audio2.mp3'
  }
];

describe('EpisodesList', () => {
  it('renders episodes count', () => {
    render(<EpisodesList episodes={mockEpisodes} podcastId="1" />);
    expect(screen.getByText('Episodes: 2')).toBeInTheDocument();
  });

  it('renders episode list with correct information', () => {
    render(<EpisodesList episodes={mockEpisodes} podcastId="1" />);

    mockEpisodes.forEach(episode => {
      expect(screen.getByText(episode.title)).toBeInTheDocument();
      expect(screen.getByText(episode.publishDate)).toBeInTheDocument();
      expect(screen.getByText(episode.duration)).toBeInTheDocument();
    });
  });

  it('renders links to episode details', () => {
    render(<EpisodesList episodes={mockEpisodes} podcastId="1" />);

    mockEpisodes.forEach(episode => {
      const link = screen.getByRole('link', { name: episode.title });
      expect(link).toHaveAttribute('href', `/podcast/1/episode/${episode.id}`);
    });
  });
});