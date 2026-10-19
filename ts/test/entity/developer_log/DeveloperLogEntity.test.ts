

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


describe('DeveloperLogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIGMA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FigmaSDK.test()
    const ent = testsdk.DeveloperLog()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FigmaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeveloperLog().create({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIGMA_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'developer_log.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cursor":{"a":true,"h":"Cursor","n":"cursor","r":false,"sh":"A cursor for pagination.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cursor","index$":0},"date_range":{"a":true,"h":"Date Range","n":"date_range","r":false,"sh":"Filter by date range.","t":"`$STRING`","key$":"date_range","index$":1},"event_source":{"a":true,"h":"Event Source","n":"event_source","r":false,"sh":"Filter by event source.","t":"`$STRING`","key$":"event_source","index$":2},"has_more":{"a":true,"h":"Has More","n":"has_more","r":true,"sh":"Whether there are more results available after this page.","t":"`$BOOLEAN`","key$":"has_more","index$":3},"ip_address":{"a":true,"h":"Ip Address","n":"ip_address","r":false,"sh":"Filter by IP address prefix(es).","t":"`$STRING`","key$":"ip_address","index$":4},"items":{"a":true,"h":"Items","n":"items","r":true,"sh":"An array of developer log entries sorted by timestamp in descending order.","t":"`$ARRAY`","key$":"items","index$":5},"limit":{"a":true,"h":"Limit","n":"limit","r":false,"sh":"Maximum number of entries to return.","t":"`$INTEGER`","key$":"limit","index$":6},"token":{"a":true,"h":"Token","n":"token","r":false,"sh":"Filter by token value(s).","t":"`$STRING`","key$":"token","index$":7},"token_name":{"a":true,"h":"Token Name","n":"token_name","r":false,"sh":"Filter by token name prefix(es).","t":"`$STRING`","key$":"token_name","index$":8},"token_type":{"a":true,"h":"Token Type","n":"token_type","r":false,"sh":"Filter by the type of token used for authentication.","t":"`$STRING`","key$":"token_type","index$":9},"user_email":{"a":true,"h":"User Email","n":"user_email","r":false,"sh":"Filter by user email prefix(es).","t":"`$STRING`","key$":"user_email","index$":10}},"name":"developer_log","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["cursor","date_range","event_source","ip_address","limit","token","token_name","token_type","user_email"],"co":{"id":"POST /v1/developer_logs","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/developer_logs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"developer_logs"}],"t":{"req":"`reqdata`","res":"`body.meta`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"developer_log","name__orig":"developer_log","Name":"DeveloperLog","name_":"developer_log","name-":"developer-log","NAME":"DEVELOPER_LOG","index$":7}, {"active":true,"entity":"developer_log","key$":"BasicDeveloperLogFlow","kind":"basic","name":"BasicDeveloperLogFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"developer_log_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'DeveloperLog', {"POST /v1/developer_logs":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"token_type":{"type":"string","description":"Filter by the type of token used for authentication.","enum":["plan_access_token","developer_token","oauth_token"],"key$":"token_type"},"token":{"type":"string","description":"Filter by token value(s). Multiple values can be separated by commas.","key$":"token"},"token_name":{"type":"string","description":"Filter by token name prefix(es). Multiple values can be separated by commas.","key$":"token_name"},"user_email":{"type":"string","description":"Filter by user email prefix(es). Multiple values can be separated by commas.","key$":"user_email"},"ip_address":{"type":"string","description":"Filter by IP address prefix(es). Multiple values can be separated by commas.","key$":"ip_address"},"event_source":{"type":"string","description":"Filter by event source.","enum":["rest_api","mcp_server"],"key$":"event_source"},"date_range":{"type":"string","description":"Filter by date range.","enum":["last_24h","last_7d","last_30d"],"default":"last_30d","key$":"date_range"},"limit":{"type":"integer","description":"Maximum number of entries to return.","minimum":1,"maximum":100,"default":25,"key$":"limit"},"cursor":{"type":"string","description":"A cursor returned from a previous request, used for pagination.","key$":"cursor"}},"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const developer_log_ref01_ent = client.DeveloperLog()
    let developer_log_ref01_data = setup.data.new.developer_log['developer_log_ref01']

    developer_log_ref01_data = (await developer_log_ref01_ent.create(developer_log_ref01_data)).data()
    assert(null != developer_log_ref01_data)


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
      '../../../../.sdk/test/entity/developer_log/DeveloperLogTestData.json')

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
    ['developer_log01','developer_log02','developer_log03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIGMA_TEST_DEVELOPER_LOG_ENTID': idmap,
    'FIGMA_TEST_LIVE': 'FALSE',
    'FIGMA_TEST_EXPLAIN': 'FALSE',
    'FIGMA_APIKEY': '',
  })

  idmap = env['FIGMA_TEST_DEVELOPER_LOG_ENTID']

  const live = 'TRUE' === env.FIGMA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIGMA_TEST_DEVELOPER_LOG_ENTID']
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
  
