export interface Podcast {
    id: string;
    title: string;
    author: string;
    description: string;
    image: string;
}
  
export interface Episode {
    id: string;
    title: string;
    description: string;
    audioUrl: string;
    publishDate: string;
    duration: string;
}