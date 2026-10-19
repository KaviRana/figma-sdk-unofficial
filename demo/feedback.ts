// List unresolved comments on a Figma file, write FEEDBACK.md, and reply
// "Logged" to each unresolved thread not already replied to.
//
// Usage (Node 24+, from the repo root, after building ts/):
//   node demo/feedback.ts                  # live: reads FIGMA_APIKEY and FIGMA_FILE_KEY from .env
//   node demo/feedback.ts --save-fixture   # also saves the raw list response to fixtures/
//   node demo/feedback.ts --fetch-frame-names  # one GET file nodes call, saved to fixtures/file-nodes.json
//
// Each run calls only the comments endpoints: GET and POST /v1/files/{file_key}/comments.
// Frame names come from fixtures/file-nodes.json; GET /v1/files/{file_key}/nodes is
// called only with --fetch-frame-names, since that endpoint has a small monthly budget.

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { FigmaSDK } from '../ts/dist/FigmaSDK.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..')

export const REPLY = 'Logged'
export const NODES_FIXTURE = join(ROOT, 'fixtures', 'file-nodes.json')

type Comment = Record<string, any>

export type RunResult = {
  markdown: string
  unresolved: number
  replied: string[]
}


// The test transport stores a created reply's request fields, so it carries
// comment_id where the live API returns parent_id.
function parentOf(c: Comment): string | null {
  return c.parent_id || c.comment_id || null
}


function frameOf(c: Comment): string | null {
  return c.client_meta?.node_id ?? null
}


function when(iso: string | undefined): string {
  if (null == iso) {
    return 'unknown date'
  }
  return iso.replace('T', ' ').replace(/(:\d\d)(\.\d+)?Z$/, '$1 UTC')
}


function author(c: Comment): string {
  return c.user?.handle ?? 'unknown author'
}


function indent(text: string, pad: string): string {
  return String(text ?? '').split('\n').join('\n' + pad)
}


function reactionText(c: Comment): string {
  const counts = new Map<string, number>()
  for (const r of c.reactions ?? []) {
    counts.set(r.emoji, (counts.get(r.emoji) ?? 0) + 1)
  }
  return [...counts].map(([emoji, n]) => 1 < n ? `${emoji} ×${n}` : emoji).join(' ')
}


export function hasReply(threadReplies: Comment[]): boolean {
  return threadReplies.some((r) => REPLY === String(r.message ?? '').trim())
}


export function frameNames(nodesBody: any): Record<string, string> {
  const names: Record<string, string> = {}
  for (const [id, node] of Object.entries<any>(nodesBody?.nodes ?? {})) {
    if (null != node?.document?.name) {
      names[id] = node.document.name
    }
  }
  return names
}


function savedFrameNames(file: string): Record<string, string> {
  return existsSync(file) ? frameNames(JSON.parse(readFileSync(file, 'utf8'))) : {}
}


export function buildFeedback(comments: Comment[], fileKey: string, names: Record<string, string> = {}): string {
  const replies = new Map<string, Comment[]>()
  for (const c of comments) {
    const parent = parentOf(c)
    if (null != parent) {
      replies.set(parent, [...(replies.get(parent) ?? []), c])
    }
  }

  const open = comments
    .filter((c) => null == parentOf(c) && null == c.resolved_at)
    .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))

  const frames = new Map<string, Comment[]>()
  for (const c of open) {
    const key = frameOf(c) ?? ''
    frames.set(key, [...(frames.get(key) ?? []), c])
  }

  const anyReaction = comments.some((c) => 0 < (c.reactions ?? []).length)
  const anyAttachment = comments.some((c) =>
    Object.keys(c).some((k) => /attach|image|media/i.test(k)))

  const out: string[] = [
    '# Feedback',
    '',
    `Unresolved comments on Figma file \`${fileKey}\`, grouped by frame.`,
    'Frame names come from a saved file nodes response; a frame missing from it is shown by node id.',
    '',
  ]

  if (!anyAttachment) {
    out.push('> **Missing from API response:** image attachments. The comments response has no attachment field, so attachments are not shown.')
  }
  if (!anyReaction) {
    out.push('> **Missing from API response:** emoji reactions. Every `reactions` array in the response is empty.')
  }
  if (!anyAttachment || !anyReaction) {
    out.push('')
  }

  if (0 === open.length) {
    out.push('No unresolved comments.', '')
  }

  const keys = [...frames.keys()].sort((a, b) => ('' === a ? 1 : '' === b ? -1 : a.localeCompare(b)))
  for (const key of keys) {
    const heading = '' === key ? 'Not attached to a frame'
      : null != names[key] ? `${names[key]} (\`${key}\`)` : `Frame \`${key}\``
    out.push(`## ${heading}`, '')
    for (const c of frames.get(key)!) {
      out.push(`- [ ] ${indent(c.message, '      ')}`)
      const reacts = reactionText(c)
      out.push(`      — ${author(c)}, ${when(c.created_at)}${reacts ? ` · reactions: ${reacts}` : ''}`)
      const thread = (replies.get(c.id) ?? [])
        .filter((r) => REPLY !== String(r.message ?? '').trim())
        .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))
      for (const r of thread) {
        const rr = reactionText(r)
        out.push(`  - ${indent(r.message, '    ')}`)
        out.push(`    — ${author(r)}, ${when(r.created_at)}${rr ? ` · reactions: ${rr}` : ''}`)
      }
    }
    out.push('')
  }

  return out.join('\n')
}


export async function run(client: any, fileKey: string, outFile: string,
  names: Record<string, string> = {}): Promise<RunResult> {
  const listed = await client.Comment().list({ file_key: fileKey })
  const comments: Comment[] = listed.map((e: any) => e.data())

  const markdown = buildFeedback(comments, fileKey, names)
  writeFileSync(outFile, markdown)

  const open = comments.filter((c) => null == parentOf(c) && null == c.resolved_at)
  const replied: string[] = []
  for (const c of open) {
    const thread = comments.filter((r) => c.id === parentOf(r))
    if (hasReply(thread)) {
      continue
    }
    await client.Comment().create({ file_key: fileKey, comment_id: c.id, message: REPLY })
    replied.push(c.id)
  }

  return { markdown, unresolved: open.length, replied }
}


// Wraps fetch to save a raw GET response body; request headers are never touched or logged.
function savingFetch(file: string, path: RegExp) {
  return async (url: string, init: any) => {
    const res = await fetch(url, init)
    if ('GET' === (init?.method ?? 'GET').toUpperCase() && path.test(url)) {
      mkdirSync(dirname(file), { recursive: true })
      writeFileSync(file, JSON.stringify(JSON.parse(await res.clone().text()), null, 2) + '\n')
    }
    return res
  }
}


// One GET file nodes call for every frame that has a comment. Its own client has no
// retry, so a failure costs one call, not several.
export async function fetchFrameNames(apikey: string, fileKey: string, commentsClient: any,
  file: string = NODES_FIXTURE) {
  const listed = await commentsClient.Comment().list({ file_key: fileKey })
  const ids = [...new Set(listed.map((e: any) => frameOf(e.data())).filter(Boolean))].sort()
  if (0 === ids.length) {
    return
  }
  const nodes = new FigmaSDK({
    apikey,
    system: { fetch: savingFetch(file, /\/v1\/files\/[^/]+\/nodes\?/) },
  })
  // Without $action the selector picks GET /v1/images/{file_key} for these arguments.
  await nodes.File().load({ $action: 'node', file_key: fileKey, ids: ids.join(','), depth: 1 })
  console.log(`saved frame names for ${ids.length} frames to fixtures/file-nodes.json`)
}


async function main() {
  process.loadEnvFile(join(ROOT, '.env'))
  const apikey = process.env.FIGMA_APIKEY
  const fileKey = process.env.FIGMA_FILE_KEY
  if (!apikey || !fileKey) {
    throw new Error('FIGMA_APIKEY and FIGMA_FILE_KEY must be set in .env')
  }

  const fixture = join(ROOT, 'fixtures', 'comments.json')
  const client = new FigmaSDK({
    apikey,
    feature: {
      // 5 requests a minute, one at a time: the budget for live comments calls.
      ratelimit: { active: true, rate: 5 / 60, burst: 1 },
      retry: { active: true, retries: 1 },
    },
    ...(process.argv.includes('--save-fixture')
      ? { system: { fetch: savingFetch(fixture, /\/v1\/files\/[^/]+\/comments(\?|$)/) } } : {}),
  })

  if (process.argv.includes('--fetch-frame-names')) {
    await fetchFrameNames(apikey, fileKey, client)
  }

  const res = await run(client, fileKey, join(HERE, 'FEEDBACK.md'), savedFrameNames(NODES_FIXTURE))
  console.log(`unresolved threads: ${res.unresolved}`)
  console.log(`replied "${REPLY}" to: ${res.replied.length ? res.replied.join(', ') : 'none'}`)
  console.log('wrote demo/FEEDBACK.md')
}


if (import.meta.main) {
  main().catch((err) => {
    console.error(err?.message ?? err)
    process.exit(1)
  })
}
