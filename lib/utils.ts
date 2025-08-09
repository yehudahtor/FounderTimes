
import crypto from 'crypto'

export function idFor(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex')
}

const INTERVIEW_HINTS = [
  'interview','conversation','fireside','q&a','qa','playbook','how we built','founder','operator','lessons','scaling','growth'
]

const BREAKTHROUGH_HINTS = [
  'introducing','announcing','launch','paper','technical report','architecture','training','benchmark','capabilities','inference','deployment','speedup','throughput','latency','parameters','dataset'
]

export function classify(title: string, sourceHint?: 'interview'|'breakthrough') {
  const t = title.toLowerCase()
  let scoreInterview = 0
  let scoreBreakthrough = 0
  for (const k of INTERVIEW_HINTS) if (t.includes(k)) scoreInterview += 1
  for (const k of BREAKTHROUGH_HINTS) if (t.includes(k)) scoreBreakthrough += 1
  if (sourceHint === 'interview') scoreInterview += 0.75
  if (sourceHint === 'breakthrough') scoreBreakthrough += 0.75
  return scoreInterview >= scoreBreakthrough ? 'interview' : 'breakthrough'
}

export function score(title: string, source: string) {
  const t = title.toLowerCase()
  let s = 0
  const boosts = ['ai','model','founder','startup','scale','anthropic','openai','deepmind','xai','compute','gpu','llm','agent','autonomous','deployment','product']
  for (const b of boosts) if (t.includes(b)) s += 1
  if (/^openai|anthropic|deepmind|xai|meta ai|google ai|scale ai$/i.test(source)) s += 1.5
  return s
}
