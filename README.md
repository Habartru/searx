## Bringo Search - Business Intelligence Assistant

An AI-powered chat interface that provides detailed information about UK companies using SearXNG integration.

### Prerequisites

- Node.js 18+ installed
- SearXNG instance running locally
- Git installed

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/Habartru/search-bringo.git
cd search-bringo
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory:
```bash
VITE_SEARXNG_URL=http://localhost:8080  # Replace with your local SearXNG URL
VITE_DB_API_URL=http://your-database-api
VITE_AI_API_URL=http://your-ai-api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### SearXNG Configuration

Ensure your local SearXNG instance has CORS properly configured in `settings.yml`:

```yaml
server:
  cors_enabled: true
  cors_origins: ["http://localhost:5173"]
```

### Project Structure

```
src/
├── components/     # React components
├── lib/           # Utility functions and API calls
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
└── App.tsx        # Main application component
```

### Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

### Environment Variables

- `VITE_SEARXNG_URL`: URL of your SearXNG instance
- `VITE_DB_API_URL`: URL of your database API
- `VITE_AI_API_URL`: URL of your AI service API

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request