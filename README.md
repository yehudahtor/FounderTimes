
# Founder Brief

A minimal, no-fluff **morning & evening tech-founder newspaper**. Pulls **founder interviews** and **AI breakthroughs** from curated, high-signal sources. No API keys required.

## What you get
- **Twice-daily ingestion** (07:00 & 19:00 Asia/Jerusalem ≈ 04:00 & 16:00 UTC) via Vercel Cron
- **SQLite + Prisma** storage
- **Clean Next.js 14 UI** with two sections: *Founder Interviews* and *Breakthroughs*
- Curated sources: OpenAI, Anthropic, DeepMind, Google AI, Meta AI, xAI, Scale AI, 20VC, Acquired, SemiAnalysis, Interconnects, The Decoder, IEEE Spectrum, ACM Queue, arXiv (cs.LG, cs.CL), and more.

> Note: Vercel cron uses **UTC**. Schedules are set to `0 4,16 * * *`, which matches 07:00/19:00 in Israel **during daylight saving time**. Adjust in `vercel.json` if needed when DST changes (or use a time-zone aware schedule if available).

## Local setup
```bash
npm i
npm run db:push
npm run ingest   # one-time pull
npm run dev      # http://localhost:3000
```

## Deploy to Vercel
```bash
# assuming you have Vercel CLI
vercel
vercel --prod
```

## Add / modify sources
Edit `data/sources.ts`. RSS sources are easiest. For HTML sources, we heuristically extract on-site article links.

## How it ranks
A simple keyword-based classifier + score favors interviews and real technical launches. No AI/API cost.

## Roadmap (optional)
- Add per-source weights and duplication removal by canonical URL
- Add "Why this matters" 3 bullets (later via API key)
- Source-specific HTML parsers for better titles/dates
- Saved articles and "Mark as read"
