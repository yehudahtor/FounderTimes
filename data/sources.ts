
export type Source = { kind: 'rss' | 'html', name: string, url: string, categoryHint?: 'interview' | 'breakthrough' }

// Keep this list curated, technical-leaning, interview-heavy.
export const SOURCES: Source[] = [
  // Founder interviews / operator deep-dives (often RSS)
  { kind: 'rss', name: '20VC', url: 'https://feeds.simplecast.com/tOjNXec5', categoryHint: 'interview' },
  { kind: 'rss', name: 'Acquired', url: 'https://feeds.transistor.fm/acquired', categoryHint: 'interview' },
  { kind: 'rss', name: 'Invest Like the Best', url: 'https://feeds.simplecast.com/JoR28o79', categoryHint: 'interview' },
  { kind: 'rss', name: 'The Logan Bartlett Show', url: 'https://feeds.megaphone.fm/DSND7131096457', categoryHint: 'interview' },
  { kind: 'rss', name: 'Lenny’s Podcast', url: 'https://feeds.simplecast.com/dHoohVNH', categoryHint: 'interview' },

  // Company / research blogs (breakthroughs)
  { kind: 'rss', name: 'OpenAI Blog', url: 'https://openai.com/blog/rss', categoryHint: 'breakthrough' },
  { kind: 'rss', name: 'Anthropic', url: 'https://www.anthropic.com/news/feed.xml', categoryHint: 'breakthrough' },
  { kind: 'rss', name: 'Google AI', url: 'https://ai.googleblog.com/atom.xml', categoryHint: 'breakthrough' },
  { kind: 'rss', name: 'DeepMind', url: 'https://deepmind.google/discover/rss.xml', categoryHint: 'breakthrough' },
  { kind: 'rss', name: 'Meta AI', url: 'https://ai.meta.com/blog/rss.xml', categoryHint: 'breakthrough' },
  { kind: 'rss', name: 'xAI', url: 'https://x.ai/blog.rss', categoryHint: 'breakthrough' },

  // Analysts / explainers (technical but readable)
  { kind: 'rss', name: 'SemiAnalysis', url: 'https://semianalysis.com/feed', categoryHint: 'breakthrough' },
  { kind: 'rss', name: 'Interconnects (Nathan Lambert)', url: 'https://www.interconnects.ai/feed', categoryHint: 'breakthrough' },
  { kind: 'rss', name: 'The Decoder', url: 'https://the-decoder.com/feed/' , categoryHint: 'breakthrough' },
  { kind: 'rss', name: 'IEEE Spectrum AI', url: 'https://spectrum.ieee.org/ai.rss', categoryHint: 'breakthrough' },
  { kind: 'rss', name: 'ACM Queue', url: 'https://queue.acm.org/rss/feeds/queuecontent.xml', categoryHint: 'breakthrough' },

  // arXiv hot feeds (high-signal)
  { kind: 'rss', name: 'arXiv cs.LG', url: 'http://export.arxiv.org/rss/cs.LG', categoryHint: 'breakthrough' },
  { kind: 'rss', name: 'arXiv cs.CL', url: 'http://export.arxiv.org/rss/cs.CL', categoryHint: 'breakthrough' },

  // Select newsletters (RSS) with heavy technical filters
  { kind: 'rss', name: 'Import AI', url: 'https://newsletter.importai.com/feed', categoryHint: 'breakthrough' },
  { kind: 'rss', name: 'BAAI Tech', url: 'https://baai.ac.cn/blog/feed', categoryHint: 'breakthrough' },

  // HTML-only (we parse landing/latest pages)
  { kind: 'html', name: 'Scale AI Blog', url: 'https://scale.com/blog', categoryHint: 'breakthrough' },
  { kind: 'html', name: 'Sequoia Articles', url: 'https://www.sequoiacap.com/articles/', categoryHint: 'interview' },
]
