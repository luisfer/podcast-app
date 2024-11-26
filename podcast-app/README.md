# Podcaster

![Podcast App](https://raw.githubusercontent.com/luisfer/podcast-app/refs/heads/main/podcast-app/public/images/1.png)

## Overview
Web application for listening to music podcasts, built with Next.js, React, and TypeScript. Users can browse top 100 podcasts, view podcast details, and listen to episodes.

## Technologies Used
- **Next.js 14**: App Router for server-side and client-side rendering
- **React**: UI library with hooks
- **TypeScript**: Type safety and better developer experience
- **React Query**: Data fetching and caching
- **CSS Modules**: Scoped styling without component libraries

## Architecture
### App Structure
```
src/
  ├── app/                  # Next.js App Router
  │   ├── podcast/         # Podcast routes
  │   └── components/      # Shared components
  ├── types/               # TypeScript interfaces
  ├── hooks/               # Custom hooks
  ├── api/                 # API functions
  └── lib/                 # Utilities
```

### Architecture Decisions
1. **Next.js App Router**
   - Provides built-in routing
   - Server-side rendering capabilities
   - Optimal for SEO

2. **React Query Integration**
   - Efficient data fetching and caching
   - Built-in loading and error states
   - Handles cache invalidation

3. **Custom CSS from Scratch**
   - No component libraries used
   - Demonstrates CSS proficiency
   - Fully responsive design
   - CSS module per component to make every component reusable, to closer to the micro-frontend architecture and the atomic design principles

4. **TypeScript Throughout**
   - Type safety across the application
   - Better development experience
   - Enhanced code maintainability

## Component Structure

1. **PodcastList**
   - Main view with filtering
   - Real-time search in titles and authors
   - Displays count of shown podcasts

2. **PodcastDetail**
   - Shows podcast information
   - Lists episodes with details
   - Uses shared sidebar component

3. **EpisodeDetail**
   - HTML5 audio player
   - HTML-rendered description
   - Reuses sidebar component

4. **Sidebar**
   - Reusable component
   - Used in PodcastDetail and EpisodeDetail components

5. **Header**
   - Reusable component
   - Sticky header
   - Uses breadcrumb to show the current path, clickable to navigate back

![Podcast App](https://raw.githubusercontent.com/luisfer/podcast-app/refs/heads/main/podcast-app/public/images/2.png)
## Cache Strategy
- 24-hour client-side caching using React Query
- Prevents unnecessary API calls
- Cache invalidation after 24 hours
- Improved user experience with instant loading

## Setup Instructions

### Development Mode
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Environment Requirements
- Node.js 18.17 or later
- NPM 10.2.4 or later

## Performance Considerations
1. **Client-side Caching**
   - Minimizes API calls
   - Improves response times
   - 24-hour cache duration

2. **Asset Optimization**
   - Development: unminimized assets
   - Production: minimized and concatenated assets

3. **Image Optimization**
   - Responsive images
   - Lazy loading

## Design Decisions
1. **Component Architecture**
   - Reusable components (sidebar, header)
   - Clear separation of concerns
   - Modular and maintainable

2. **State Management**
   - React Query for server state
   - Local state with hooks
   - Clear data flow

3. **Styling Approach**
   - CSS Modules for scoped styles
   - Custom variables for theming
   - No external UI libraries

## Key Features
- Browse top 100 podcasts
- Filter by title and author
- View podcast details
- Listen to episodes
- 24-hour caching
- Loading indicators
- Responsive design

![Podcast App](https://raw.githubusercontent.com/luisfer/podcast-app/refs/heads/main/podcast-app/public/images/3.png)


## Requirements vs Implementation

Core Views Required:

- Main view (/): Podcast list
- Podcast detail (/podcast/{podcastId})
- Episode detail (/podcast/{podcastId}/episode/{episodeId})


Main View Requirements:

- Shows top 100 podcasts
- 24h client-side cache for the list
- Text filtering (title and author)
- Real-time filtering
- Navigation to detail view works


Podcast Detail Requirements:

- Sidebar with image, title, author, description
- Shows episode count
- Episodes list with title, date, duration
- 24h cache for podcast details
- Navigation to episodes works


Episode Detail Requirements:

- Shows same sidebar as podcast detail
- Shows episode title
- Shows description with HTML rendered
- Has HTML5 native audio player


Header Requirements:

- Title links to main view
- Shows loading indicator during navigation


Technical Requirements:

- Clean URLs (no hash routing)
- Development mode (unminified assets)
- Production mode (minified assets)
- CSS written from scratch
- No component libraries used
- Using Context API
- TypeScript implementation


Code Quality Requirements:

- Clear code structure
- SOLID principles
- Layer separation
- Clean console (no errors)
- Proper README
- Modular solution
- Git usage with standard nomenclature


Optional Improvements:

- SSR implementation
- CSS variables usage
- Header with breadcrumbs

## Testing

- Jest for unit testing
- React Testing Library for UI testing
- @testing-library/jest-dom for better assertions

Make sure to run `npm install --save-dev @testing-library/jest-dom` to install the testing-library/jest-dom package. And to have:

```
import '@testing-library/jest-dom'
```

in your `jest.setup.js` file.