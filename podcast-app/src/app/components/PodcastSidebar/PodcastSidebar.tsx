import Link from 'next/link';
import styles from './PodcastSidebar.module.css';

interface PodcastSidebarProps {
  id: string;
  title: string;
  author: string;
  image: string | null;
  description: string;
}

export function PodcastSidebar({ 
  id, 
  title, 
  author, 
  image, 
  description 
}: PodcastSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.imageContainer}>
        <Link href={`/podcast/${id}`}>
          {image && (
            <img 
              src={image} 
              alt={`${title} cover`} 
              className={styles.image}
            />
          )}
        </Link>
      </div>
      
      <div className={styles.infoContainer}>
        <Link 
          href={`/podcast/${id}`} 
          className={styles.title}
        >
          {title}
        </Link>
        <br />
        <Link 
          href={`/podcast/${id}`} 
          className={styles.author}
        >
          by {author}
        </Link>
      </div>

      <div className={styles.description}>
        <h3>Description:</h3>
        <p>{description}</p>
      </div>
    </aside>
  );
}