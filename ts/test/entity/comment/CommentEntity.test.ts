

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


describe('CommentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIGMA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FigmaSDK.test()
    const ent = testsdk.Comment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FigmaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Comment().list({"file_key":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIGMA_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'comment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"client_meta":{"a":true,"h":"Client Meta","n":"client_meta","op":{"create":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"Positioning information of the comment.","t":"`$ANY`","union":{"branches":4,"count":1,"depth":0},"key$":"client_meta","index$":0},"comment_id":{"a":true,"h":"Comment Id","n":"comment_id","r":false,"sh":"The ID of the comment to reply to, if any.","t":"`$STRING`","key$":"comment_id","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"sh":"The UTC ISO 8601 time at which the comment was left","t":"`$STRING`","key$":"created_at","index$":2},"file_key":{"a":true,"h":"File Key","n":"file_key","r":true,"sh":"The file in which the comment lives","t":"`$STRING`","key$":"file_key","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique identifier for comment.","t":"`$STRING`","key$":"id","index$":4},"message":{"a":true,"h":"Message","n":"message","r":true,"sh":"The content of the comment","t":"`$STRING`","key$":"message","index$":5},"order_id":{"a":true,"h":"Order Id","n":"order_id","r":true,"sh":"Only set for top level comments.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"order_id","index$":6},"parent_id":{"a":true,"h":"Parent Id","n":"parent_id","r":false,"sh":"If present, the id of the comment to which this is the reply","t":"`$STRING`","key$":"parent_id","index$":7},"reactions":{"a":true,"h":"Reactions","n":"reactions","r":true,"sh":"An array of reactions to the comment","t":"`$ARRAY`","key$":"reactions","index$":8},"resolved_at":{"a":true,"fo":"date-time","h":"Resolved At","n":"resolved_at","r":false,"sh":"If set, the UTC ISO 8601 time the comment was resolved","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"resolved_at","index$":9},"user":{"a":true,"h":"User","n":"user","r":true,"sh":"The user who left the comment","t":"`$OBJECT`","key$":"user","index$":10}},"id":{"field":"id","name":"id"},"name":"comment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["client_meta","comment_id","message"],"co":{"id":"POST /v1/files/{file_key}/comments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"file_key","or":"file_key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/files/{file_key}/comments","q":{"exist":["file_key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"files"},{"var":"file_key"},{"lit":"comments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/files/{file_key}/comments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"file_key","or":"file_key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"as_md","or":"as_md","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/v1/files/{file_key}/comments","q":{"exist":["file_key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"files"},{"var":"file_key"},{"lit":"comments"}],"t":{"req":"`reqdata`","res":"`body.comments`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v1/files/{file_key}/comments/{comment_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"file_key","or":"file_key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"comment_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v1/files/{file_key}/comments/{comment_id}","q":{"exist":["file_key","id"]},"r":{"param":{"comment_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"files"},{"var":"file_key"},{"lit":"comments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.file"]]},"key$":"comment","name__orig":"comment","Name":"Comment","name_":"comment","name-":"comment","NAME":"COMMENT","index$":2}, {"active":true,"entity":"comment","key$":"BasicCommentFlow","kind":"basic","name":"BasicCommentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"comment_ref01"},"m":{"file_key":"file_key01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"file_key":"file_key01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"comment_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"comment_ref01","suffix":"_rm0"},"m":{"file_key":"file_key01","id":"comment01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"file_key":"file_key01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"comment_ref01"}}],"index$":3}]}, 'Comment', {"POST /v1/files/{file_key}/comments":{"protocol":"http","requestBody":{"description":"Comment to post.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string","description":"The text contents of the comment to post.","key$":"message"},"comment_id":{"type":"string","description":"The ID of the comment to reply to, if any. This must be a root comment. You cannot reply to other replies (a comment that has a parent_id).","key$":"comment_id"},"client_meta":{"description":"The position where to place the comment.","oneOf":[{"type":"object","description":"A 2d vector.","properties":{"x":{},"y":{}},"required":["x","y"],"x-ref":"#/components/schemas/Vector"},{"type":"object","description":"Position of a comment relative to the frame to which it is attached.","properties":{"node_id":{},"node_offset":{}},"required":["node_id","node_offset"],"x-ref":"#/components/schemas/FrameOffset"},{"type":"object","description":"Position of a region comment on the canvas.","properties":{"x":{},"y":{},"region_height":{},"region_width":{},"comment_pin_corner":{}},"required":["x","y","region_height","region_width"],"x-ref":"#/components/schemas/Region"},{"type":"object","description":"Position of a region comment relative to the frame to which it is attached.","properties":{"node_id":{},"node_offset":{},"region_height":{},"region_width":{},"comment_pin_corner":{}},"required":["node_id","node_offset","region_height","region_width"],"x-ref":"#/components/schemas/FrameOffsetRegion"}],"key$":"client_meta"}},"required":["message"],"index$":1}}}},"parameters":[{"name":"file_key","in":"path","description":"File to add comments in. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v1/files/{file_key}/comments":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"File to get comments from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.","required":true,"schema":{"type":"string"},"index$":0},{"name":"as_md","in":"query","description":"If enabled, will return comments as their markdown equivalents when applicable.","schema":{"type":"boolean"},"index$":1}]},"DELETE /v1/files/{file_key}/comments/{comment_id}":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"File to delete comment from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.","required":true,"schema":{"type":"string"},"index$":0},{"name":"comment_id","in":"path","description":"Comment id of comment to delete","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const comment_ref01_ent = client.Comment()
    let comment_ref01_data = setup.data.new.comment['comment_ref01']
    comment_ref01_data['file_key'] = setup.idmap['file_key01']

    comment_ref01_data = (await comment_ref01_ent.create(comment_ref01_data)).data()
    assert(null != comment_ref01_data.id)


    // LIST
    const comment_ref01_match: any = {}
    comment_ref01_match['file_key'] = setup.idmap['file_key01']

    const comment_ref01_list = (await comment_ref01_ent.list(comment_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(comment_ref01_list, { id: comment_ref01_data.id })))


    // REMOVE
    const comment_ref01_match_rm0: any = { id: comment_ref01_data.id }
    comment_ref01_match_rm0['file_key'] = setup.idmap['file_key'] ?? setup.idmap['file_key01']
    await comment_ref01_ent.remove(comment_ref01_match_rm0)
  

    // LIST
    const comment_ref01_match_rt0: any = {}
    comment_ref01_match_rt0['file_key'] = setup.idmap['file_key01']

    const comment_ref01_list_rt0 = (await comment_ref01_ent.list(comment_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(comment_ref01_list_rt0, { id: comment_ref01_data.id })))


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
      '../../../../.sdk/test/entity/comment/CommentTestData.json')

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
    ['comment01','comment02','comment03','file01','file02','file03','file_key01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIGMA_TEST_COMMENT_ENTID': idmap,
    'FIGMA_TEST_LIVE': 'FALSE',
    'FIGMA_TEST_EXPLAIN': 'FALSE',
    'FIGMA_APIKEY': '',
  })

  idmap = env['FIGMA_TEST_COMMENT_ENTID']

  const live = 'TRUE' === env.FIGMA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIGMA_TEST_COMMENT_ENTID']
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
  
