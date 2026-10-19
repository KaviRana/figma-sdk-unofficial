

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


describe('ActivityLogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIGMA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FigmaSDK.test()
    const ent = testsdk.ActivityLog()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FigmaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ActivityLog().load({"end_time":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIGMA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'activity_log.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"activity_logs":{"a":true,"h":"Activity Logs","n":"activity_logs","r":false,"sh":"An array of activity logs sorted by timestamp in ascending order by default.","t":"`$ARRAY`","key$":"activity_logs","index$":0},"cursor":{"a":true,"h":"Cursor","n":"cursor","r":false,"sh":"Encodes the last event (the most recent event)","t":"`$STRING`","key$":"cursor","index$":1},"next_page":{"a":true,"h":"Next Page","n":"next_page","r":false,"sh":"Whether there is a next page of events","t":"`$BOOLEAN`","key$":"next_page","index$":2}},"name":"activity_log","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/activity_logs","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"end_time","or":"end_time","r":false,"t":"`$NUMBER`","index$":0},{"a":true,"k":"query","n":"event","or":"events","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$NUMBER`","index$":2},{"a":true,"ex":"asc","k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"start_time","or":"start_time","r":false,"t":"`$NUMBER`","index$":4}]},"k":"http","m":"GET","o":"/v1/activity_logs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"activity_logs"}],"t":{"req":"`reqdata`","res":"`body.meta`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"activity_log","name__orig":"activity_log","Name":"ActivityLog","name_":"activity_log","name-":"activity-log","NAME":"ACTIVITY_LOG","index$":0}, {"active":true,"entity":"activity_log","key$":"BasicActivityLogFlow","kind":"basic","name":"BasicActivityLogFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"activity_log_ref01","srcdatavar":"activity_log_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-activity_log_ref01"}}],"index$":0}]}, 'ActivityLog', {"GET /v1/activity_logs":{"protocol":"http","parameters":[{"name":"events","description":"Event type(s) to include in the response. Can have multiple values separated by comma. All events are returned by default.","in":"query","schema":{"type":"string"},"index$":0},{"name":"start_time","description":"Unix timestamp of the least recent event to include. This param defaults to one year ago if unspecified.","in":"query","schema":{"type":"number"},"index$":1},{"name":"end_time","description":"Unix timestamp of the most recent event to include. This param defaults to the current timestamp if unspecified.","in":"query","schema":{"type":"number"},"index$":2},{"name":"limit","description":"Maximum number of events to return. This param defaults to 1000 if unspecified.","in":"query","schema":{"type":"number"},"index$":3},{"name":"order","description":"Event order by timestamp. This param can be either \"asc\" (default) or \"desc\".","in":"query","schema":{"type":"string","enum":["asc","desc"],"default":"asc"},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let activity_log_ref01_data = Object.values(setup.data.existing.activity_log)[0] as any

    // LOAD
    const activity_log_ref01_ent = client.ActivityLog()
    const activity_log_ref01_match_dt0: any = {}
    const activity_log_ref01_data_dt0 = (await activity_log_ref01_ent.load(activity_log_ref01_match_dt0)).data()
    assert(null != activity_log_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/activity_log/ActivityLogTestData.json')

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
    ['activity_log01','activity_log02','activity_log03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIGMA_TEST_ACTIVITY_LOG_ENTID': idmap,
    'FIGMA_TEST_LIVE': 'FALSE',
    'FIGMA_TEST_EXPLAIN': 'FALSE',
    'FIGMA_APIKEY': '',
  })

  idmap = env['FIGMA_TEST_ACTIVITY_LOG_ENTID']

  const live = 'TRUE' === env.FIGMA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIGMA_TEST_ACTIVITY_LOG_ENTID']
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
  
