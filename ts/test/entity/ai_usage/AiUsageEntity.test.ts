

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


describe('AiUsageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIGMA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FigmaSDK.test()
    const ent = testsdk.AiUsage()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('ai_usage hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of FigmaSDK.test(offline).AiUsage().stream('list')) { }
    }, /offline/)

    for await (const _item of FigmaSDK.test(offline).AiUsage()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = FigmaSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.AiUsage().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of FigmaSDK.test().AiUsage().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new FigmaSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.AiUsage().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.AiUsage().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FigmaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AiUsage().list({"cursor":1,"end_date":"x","start_date":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIGMA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ai_usage.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"ai_usage","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/ai_usage/daily","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"end_date","or":"end_date","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":1000,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"start_date","or":"start_date","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"user_email","or":"user_email","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/v1/ai_usage/daily","q":{"$action":"daily","exist":["end_date","start_date"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"ai_usage"},{"lit":"daily"}],"t":{"req":"`reqdata`","res":"`body.rows`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ai_usage","name__orig":"ai_usage","Name":"AiUsage","name_":"ai_usage","name-":"ai-usage","NAME":"AI_USAGE","index$":1}, {"active":true,"entity":"ai_usage","key$":"BasicAiUsageFlow","kind":"basic","name":"BasicAiUsageFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"ai_usage_ref01"}}],"index$":0}]}, 'AiUsage', {"GET /v1/ai_usage/daily":{"protocol":"http","parameters":[{"name":"start_date","description":"The first day to include, inclusive, as a `YYYY-MM-DD` calendar date (UTC). Required. Must be on or after `2025-12-01` and no more than 366 days before the current UTC day.","in":"query","required":true,"schema":{"type":"string"},"index$":0},{"name":"end_date","description":"The last day to include, inclusive, as a `YYYY-MM-DD` calendar date (UTC). Required. Must be on or after `start_date` and the current UTC day or earlier.","in":"query","required":true,"schema":{"type":"string"},"index$":1},{"name":"user_email","description":"Restrict the results to a single Figma user, identified by email. When omitted, rows for every user in the plan with usage in the range are returned. An email that matches no Figma user returns a 400.","in":"query","schema":{"type":"string"},"index$":2},{"name":"limit","description":"Maximum number of rows to return. This param defaults to 1000 if unspecified, and may not exceed 1000.","in":"query","schema":{"type":"integer","minimum":1,"maximum":1000,"default":1000},"index$":3},{"name":"cursor","description":"An opaque cursor returned from a previous request, used for pagination.","in":"query","schema":{"type":"string"},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ai_usage_ref01_data = Object.values(setup.data.existing.ai_usage)[0] as any

    // LIST
    const ai_usage_ref01_ent = client.AiUsage()
    const ai_usage_ref01_match: any = {}

    const ai_usage_ref01_list = (await ai_usage_ref01_ent.list(ai_usage_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/ai_usage/AiUsageTestData.json')

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
    ['ai_usage01','ai_usage02','ai_usage03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIGMA_TEST_AI_USAGE_ENTID': idmap,
    'FIGMA_TEST_LIVE': 'FALSE',
    'FIGMA_TEST_EXPLAIN': 'FALSE',
    'FIGMA_APIKEY': '',
  })

  idmap = env['FIGMA_TEST_AI_USAGE_ENTID']

  const live = 'TRUE' === env.FIGMA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIGMA_TEST_AI_USAGE_ENTID']
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
  
