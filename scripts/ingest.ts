
import 'globalthis/auto' // safe for edge if needed
import Parser from 'rss-parser'
import { load } from 'cheerio'
import pLimit from 'p-limit'
import { prisma } from '../lib/prisma'
import { SOURCES } from '../data/sources'
import { idFor, classify, score } from '../lib/utils'

const parser = new Parser()

async function fetchRSS(name: string, url: string, categoryHint?: 'interview'|'breakthrough') {
  const feed = await parser.parseURL(url)
  const items = (feed.items || []).slice(0, 15)
  return items.map(i => ({
    title: i.title?.trim() || '(untitled)',
    url: (i.link || '').trim(),
    source: name,
    publishedAt: i.isoDate ? new Date(i.isoDate) : undefined,
    category: classify(i.title || '', categoryHint),
    score: score(i.title || '', name),
    summary: (i.contentSnippet || '').slice(0, 400)
  }))
}

async function fetchHTML(name: string, url: string, categoryHint?: 'interview'|'breakthrough') {
  const res = await fetch(url, { headers: { 'user-agent': 'FounderBriefBot/0.1' } })
  const html = await res.text()
  const $ = load(html)
  const links: {title:string,url:string}[] = []
  $('a').each((_, el) => {
    const href = $(el).attr('href') || ''
    const text = $(el).text().trim()
    if (!href || !text) return
    if (/^javascript:/i.test(href)) return
    // Heuristic: only keep on-site article links
    if (href.startsWith('/')) {
      links.push({ title: text, url: new URL(href, url).toString() })
    } else if (href.startsWith(url)) {
      links.push({ title: text, url: href })
    }
  })
  // Deduplicate by URL and keep best-looking titles
  const byUrl = new Map<string,string>()
  for (const l of links) {
    if (!byUrl.has(l.url) || byUrl.get(l.url)!.length < l.title.length) byUrl.set(l.url, l.title)
  }
  const items = Array.from(byUrl.entries()).slice(0, 20).map(([u,t])=> ({
    title: t,
    url: u,
    source: name,
    publishedAt: undefined as Date|undefined,
    category: classify(t, categoryHint),
    score: score(t, name),
    summary: undefined as string|undefined
  }))
  return items
}

async function main() {
  const limit = pLimit(5)
  const tasks = SOURCES.map(s => limit(async () => {
    try {
      if (s.kind === 'rss') return await fetchRSS(s.name, s.url, s.categoryHint)
      return await fetchHTML(s.name, s.url, s.categoryHint)
    } catch (e) {
      console.warn('source failed', s.name, e)
      return []
    }
  }))
  const results = (await Promise.all(tasks)).flat()

  // Upsert top N per run
  const picked = results
    .filter(r => r.url && r.title && r.title.length > 5)
    .sort((a,b) => (b.score - a.score))
    .slice(0, 120)

  for (const r of picked) {
    const id = idFor(r.url)
    await prisma.article.upsert({
      where: { id },
      update: {
        title: r.title, source: r.source, publishedAt: r.publishedAt, summary: r.summary,
        category: r.category, score: r.score, url: r.url
      },
      create: { id, ...r }
    })
  }

  // Trim DB to last 400 items to keep it light on Vercel
  const all = await prisma.article.findMany({ orderBy: { createdAt: 'desc' }, select: { id: true }, skip: 400 })
  if (all.length) {
    await prisma.article.deleteMany({ where: { id: { in: all.map(a => a.id) } } })
  }

  console.log(`Ingested ${picked.length} items.`)
}

main().then(()=>process.exit(0)).catch(e=>{ console.error(e); process.exit(1) })
