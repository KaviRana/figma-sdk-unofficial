// Offline test: replays a real comments response saved in fixtures/comments.json.
// Run from the repo root: node --test "demo/*.test.ts"

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { FigmaSDK } from '../ts/dist/FigmaSDK.js'
import { run, frameNames, REPLY } from './feedback.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const FIXTURE = process.env.FEEDBACK_FIXTURE ?? join(ROOT, 'fixtures', 'comments.json')
const NODES = join(ROOT, 'fixtures', 'file-nodes.json')

const comments: any[] = JSON.parse(readFileSync(FIXTURE, 'utf8')).comments
const names = process.env.FEEDBACK_FIXTURE ? {} : frameNames(JSON.parse(readFileSync(NODES, 'utf8')))
const fileKey: string = comments[0]?.file_key ?? 'fixture'

const isTop = (c: any) => !c.parent_id
const open = comments.filter((c) => isTop(c) && null == c.resolved_at)
const resolved = comments.filter((c) => isTop(c) && null != c.resolved_at)


function seeded() {
  const comment: Record<string, any> = {}
  for (const c of comments) {
    comment[c.id] = { ...c, file_key: c.file_key ?? fileKey }
  }
  return FigmaSDK.test({ entity: { comment } })
}


test('fixture has the shapes the demo handles', () => {
  assert.ok(0 < open.length, 'an unresolved comment')
  assert.ok(0 < resolved.length, 'a resolved comment')
  assert.ok(comments.some((c) => !isTop(c)), 'a reply')
})


test('FEEDBACK.md lists unresolved threads with replies, skips resolved', async () => {
  const out = join(mkdtempSync(join(tmpdir(), 'feedback-')), 'FEEDBACK.md')
  const { markdown } = await run(seeded(), fileKey, out, names)
  assert.equal(readFileSync(out, 'utf8'), markdown)

  for (const id of new Set(open.map((c) => c.client_meta?.node_id).filter(Boolean))) {
    const heading = null != names[id] ? `## ${names[id]} (\`${id}\`)` : `## Frame \`${id}\``
    assert.ok(markdown.includes(heading), `heading for frame ${id}`)
  }

  for (const c of open) {
    const line = markdown.indexOf(`- [ ] ${c.message.split('\n')[0]}`)
    assert.ok(-1 < line, `unresolved comment ${c.id} listed verbatim`)
    assert.ok(markdown.includes(`— ${c.user.handle}, `), `author of ${c.id}`)
    for (const r of comments.filter((r) => c.id === r.parent_id && REPLY !== r.message)) {
      const at = markdown.indexOf(`  - ${r.message.split('\n')[0]}`, line)
      assert.ok(line < at, `reply ${r.id} under its parent ${c.id}`)
    }
  }
  for (const c of resolved) {
    assert.ok(!markdown.includes(`- [ ] ${c.message.split('\n')[0]}`), `resolved comment ${c.id} skipped`)
  }
})


test('replies once per unresolved thread; a second run adds nothing', async () => {
  const client = seeded()
  const dir = mkdtempSync(join(tmpdir(), 'feedback-'))
  const alreadyLogged = open.filter((c) =>
    comments.some((r) => c.id === r.parent_id && REPLY === r.message))

  const first = await run(client, fileKey, join(dir, 'a.md'))
  assert.equal(first.replied.length, open.length - alreadyLogged.length)

  const second = await run(client, fileKey, join(dir, 'b.md'))
  assert.deepEqual(second.replied, [])
})
