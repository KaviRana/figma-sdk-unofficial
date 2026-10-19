

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FigmaSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('CommentReactionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIGMA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FigmaSDK.test()
    const ent = testsdk.CommentReaction()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FigmaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CommentReaction().list({"file_id":1,"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIGMA_TEST_LIVE
    for (const op of ['remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'comment_reaction.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"sh":"The UTC ISO 8601 time at which the reaction was left.","t":"`$STRING`","key$":"created_at","index$":0},"emoji":{"a":true,"h":"Emoji","n":"emoji","r":true,"sh":"The emoji type of reaction as shortcode (e.g.","t":"`$STRING`","key$":"emoji","index$":1},"error":{"a":true,"h":"Error","n":"error","r":true,"sh":"For successful requests, this value is always `false`.","t":"`$BOOLEAN`","key$":"error","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"The status of the request.","t":"`$NUMBER`","key$":"status","index$":4},"user":{"a":true,"h":"User","n":"user","r":true,"sh":"The user who left the reaction.","t":"`$OBJECT`","key$":"user","index$":5}},"id":{"field":"id","name":"id"},"name":"comment_reaction","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["emoji"],"co":{"id":"POST /v1/files/{file_key}/comments/{comment_id}/reactions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"file_id","or":"file_key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"comment_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v1/files/{file_key}/comments/{comment_id}/reactions","q":{"exist":["file_id","id"]},"r":{"param":{"comment_id":"id","file_key":"file_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"files"},{"var":"file_id"},{"lit":"comments"},{"var":"id"},{"lit":"reactions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/files/{file_key}/comments/{comment_id}/reactions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"file_id","or":"file_key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"comment_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/files/{file_key}/comments/{comment_id}/reactions","q":{"exist":["file_id","id"]},"r":{"param":{"comment_id":"id","file_key":"file_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"files"},{"var":"file_id"},{"lit":"comments"},{"var":"id"},{"lit":"reactions"}],"t":{"req":"`reqdata`","res":"`body.reactions`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v1/files/{file_key}/comments/{comment_id}/reactions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"file_id","or":"file_key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"comment_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"emoji","or":"emoji","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v1/files/{file_key}/comments/{comment_id}/reactions","q":{"exist":["emoji","file_id","id"]},"r":{"param":{"comment_id":"id","file_key":"file_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"files"},{"var":"file_id"},{"lit":"comments"},{"var":"id"},{"lit":"reactions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.file"]]},"key$":"comment_reaction","name__orig":"comment_reaction","Name":"CommentReaction","name_":"comment_reaction","name-":"comment-reaction","NAME":"COMMENT_REACTION","index$":3}, {"active":true,"entity":"comment_reaction","key$":"BasicCommentReactionFlow","kind":"basic","name":"BasicCommentReactionFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"comment_reaction_ref01"},"m":{"comment_id":"comment01","file_id":"file01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{},"m":{"comment_id":"comment01","file_id":"file01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"comment_reaction_ref01"}}],"unreachable":true},{"a":true,"d":{},"i":{"ref":"comment_reaction_ref01","suffix":"_rm0"},"m":{"file_id":"file01","id":"comment_reaction01"},"o":"remove","s":[],"v":[],"index$":0},{"a":false,"d":{},"i":{"suffix":"_rt0"},"m":{"comment_id":"comment01","file_id":"file01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"comment_reaction_ref01"}}],"unreachable":true}]}, 'CommentReaction', {"POST /v1/files/{file_key}/comments/{comment_id}/reactions":{"protocol":"http","requestBody":{"description":"Reaction to post.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"emoji":{"type":"string","description":"The emoji type of reaction as shortcode (e.g. `:heart:`, `:+1::skin-tone-2:`). The list of accepted emoji shortcodes can be found in [this file](https://raw.githubusercontent.com/missive/emoji-mart/main/packages/emoji-mart-data/sets/14/native.json) under the top-level emojis and aliases fields, with optional skin tone modifiers when applicable.","x-ref":"#/components/schemas/Emoji","key$":"emoji"}},"required":["emoji"],"index$":1}}}},"parameters":[{"name":"file_key","in":"path","description":"File to post comment reactions to. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.","required":true,"schema":{"type":"string"},"index$":0},{"name":"comment_id","in":"path","description":"ID of comment to react to.","required":true,"schema":{"type":"string"},"index$":1}]},"GET /v1/files/{file_key}/comments/{comment_id}/reactions":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"File to get comment containing reactions from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.","required":true,"schema":{"type":"string"},"index$":0},{"name":"comment_id","in":"path","description":"ID of comment to get reactions from.","required":true,"schema":{"type":"string"},"index$":1},{"name":"cursor","in":"query","description":"Cursor for pagination, retrieved from the response of the previous call.","schema":{"type":"string"},"index$":2}]},"DELETE /v1/files/{file_key}/comments/{comment_id}/reactions":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"File to delete comment reaction from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.","required":true,"schema":{"type":"string"},"index$":0},{"name":"comment_id","in":"path","description":"ID of comment to delete reaction from.","required":true,"schema":{"type":"string"},"index$":1},{"name":"emoji","in":"query","required":true,"schema":{"type":"string","description":"The emoji type of reaction as shortcode (e.g. `:heart:`, `:+1::skin-tone-2:`). The list of accepted emoji shortcodes can be found in [this file](https://raw.githubusercontent.com/missive/emoji-mart/main/packages/emoji-mart-data/sets/14/native.json) under the top-level emojis and aliases fields, with optional skin tone modifiers when applicable.","x-ref":"#/components/schemas/Emoji"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let comment_reaction_ref01_data = Object.values(setup.data.existing.comment_reaction)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/comment_reaction/CommentReactionTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FigmaSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['comment_reaction01','comment_reaction02','comment_reaction03','file01','file02','file03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIGMA_TEST_COMMENT_REACTION_ENTID': idmap,
    'FIGMA_TEST_LIVE': 'FALSE',
    'FIGMA_TEST_EXPLAIN': 'FALSE',
    'FIGMA_APIKEY': '',
  })

  idmap = env['FIGMA_TEST_COMMENT_REACTION_ENTID']

  const live = 'TRUE' === env.FIGMA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIGMA_TEST_COMMENT_REACTION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FigmaSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.FIGMA_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FIGMA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
