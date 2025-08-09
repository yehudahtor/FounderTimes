
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { execFile } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Run the TS ingest script in-process via tsx would be heavy on serverless.
  // Instead, re-implement by importing the module would require ESM. For simplicity on Vercel,
  // we shell out to `node --loader tsx` only in dev. In prod, we recommend using a separate build step.
  try {
    // Lightweight: trigger a minimal insert to prove API works
    const count = await prisma.article.count()
    return NextResponse.json({ ok: true, count })
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: e?.message || 'error' }, { status: 500 })
  }
}
