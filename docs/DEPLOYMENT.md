# Deployment Guide

## Vercel

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically

## Docker

```bash
docker build -t whatifai .
docker run -p 3000:3000 whatifai
```

## Environment Variables

- `OPENAI_API_KEY` - OpenAI API key
- `LAMATIC_API_KEY` - Lamatic API key
- `DATABASE_PATH` - SQLite database path
- `NODE_ENV` - Environment (development/production)