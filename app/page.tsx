
import { prisma } from '@/lib/prisma'
import { formatDistanceToNow } from 'date-fns'

export default async function Page() {
  const [interviews, breakthroughs] = await Promise.all([
    prisma.article.findMany({ where: { category: 'interview' }, orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }], take: 50 }),
    prisma.article.findMany({ where: { category: 'breakthrough' }, orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }], take: 50 }),
  ])

  return (
    <div className="container">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Founder Brief</h1>
        <p className="text-sm text-[var(--muted)] mt-1">20-minute daily read: founder interviews & AI breakthroughs. No fluff.</p>
      </header>

      <section className="mb-8 card">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Founder Interviews</h2>
          <span className="badge">new</span>
        </div>
        <ul>
          {interviews.map((a) => (
            <li key={a.id} className="item">
              <a href={a.url} target="_blank" rel="noreferrer" className="font-medium">{a.title}</a>
              <div className="text-xs text-[var(--muted)]">
                {a.source} • {a.publishedAt ? formatDistanceToNow(a.publishedAt, { addSuffix: true }) : 'recent'}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Breakthroughs</h2>
          <span className="badge">technical</span>
        </div>
        <ul>
          {breakthroughs.map((a) => (
            <li key={a.id} className="item">
              <a href={a.url} target="_blank" rel="noreferrer" className="font-medium">{a.title}</a>
              <div className="text-xs text-[var(--muted)]">
                {a.source} • {a.publishedAt ? formatDistanceToNow(a.publishedAt, { addSuffix: true }) : 'recent'}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-10 text-xs text-[var(--muted)]">
        <p>Tip: open a few tabs from each section and set a 20-minute timer.</p>
      </footer>
    </div>
  )
}
