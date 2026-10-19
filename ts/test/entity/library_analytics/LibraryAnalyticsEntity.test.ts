

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


describe('LibraryAnalyticsEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIGMA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FigmaSDK.test()
    const ent = testsdk.LibraryAnalytics()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FigmaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LibraryAnalytics().load({"library_id":1,"group_by":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIGMA_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'library_analytics.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cursor":{"a":true,"h":"Cursor","n":"cursor","r":false,"sh":"The cursor to use to fetch the next page of data.","t":"`$STRING`","key$":"cursor","index$":0},"next_page":{"a":true,"h":"Next Page","n":"next_page","r":true,"sh":"Whether there is a next page of data that can be fetched.","t":"`$BOOLEAN`","key$":"next_page","index$":1},"rows":{"a":true,"h":"Rows","n":"rows","r":true,"sh":"An array of analytics data.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"rows","index$":2}},"name":"library_analytics","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/analytics/libraries/{file_key}/component/actions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"library_id","or":"file_key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"end_date","or":"end_date","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"group_by","or":"group_by","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"start_date","or":"start_date","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v1/analytics/libraries/{file_key}/component/actions","q":{"exist":["group_by","library_id"]},"r":{"param":{"file_key":"library_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"analytics"},{"lit":"libraries"},{"var":"library_id"},{"lit":"component"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /v1/analytics/libraries/{file_key}/component/usages","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"library_id","or":"file_key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"group_by","or":"group_by","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/analytics/libraries/{file_key}/component/usages","q":{"exist":["group_by","library_id"]},"r":{"param":{"file_key":"library_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"analytics"},{"lit":"libraries"},{"var":"library_id"},{"lit":"component"},{"lit":"usages"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /v1/analytics/libraries/{file_key}/style/actions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"library_id","or":"file_key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"end_date","or":"end_date","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"group_by","or":"group_by","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"start_date","or":"start_date","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v1/analytics/libraries/{file_key}/style/actions","q":{"exist":["group_by","library_id"]},"r":{"param":{"file_key":"library_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"analytics"},{"lit":"libraries"},{"var":"library_id"},{"lit":"style"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /v1/analytics/libraries/{file_key}/style/usages","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"library_id","or":"file_key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"group_by","or":"group_by","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/analytics/libraries/{file_key}/style/usages","q":{"exist":["group_by","library_id"]},"r":{"param":{"file_key":"library_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"analytics"},{"lit":"libraries"},{"var":"library_id"},{"lit":"style"},{"lit":"usages"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /v1/analytics/libraries/{file_key}/variable/actions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"library_id","or":"file_key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"end_date","or":"end_date","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"group_by","or":"group_by","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"start_date","or":"start_date","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v1/analytics/libraries/{file_key}/variable/actions","q":{"exist":["group_by","library_id"]},"r":{"param":{"file_key":"library_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"analytics"},{"lit":"libraries"},{"var":"library_id"},{"lit":"variable"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"GET /v1/analytics/libraries/{file_key}/variable/usages","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"library_id","or":"file_key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"group_by","or":"group_by","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/analytics/libraries/{file_key}/variable/usages","q":{"exist":["group_by","library_id"]},"r":{"param":{"file_key":"library_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"analytics"},{"lit":"libraries"},{"var":"library_id"},{"lit":"variable"},{"lit":"usages"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"library_analytics","name__orig":"library_analytics","Name":"LibraryAnalytics","name_":"library_analytics","name-":"library-analytics","NAME":"LIBRARY_ANALYTICS","index$":10}, {"active":true,"entity":"library_analytics","key$":"BasicLibraryAnalyticsFlow","kind":"basic","name":"BasicLibraryAnalyticsFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"library_analytics_ref01","srcdatavar":"library_analytics_ref01_data","suffix":"_dt0"},"m":{"id":"library_analytics01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-library_analytics_ref01"}}],"unreachable":true}]}, 'LibraryAnalytics', {"GET /v1/analytics/libraries/{file_key}/component/actions":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"File key of the library to fetch analytics data for.","required":true,"schema":{"type":"string"},"index$":0},{"name":"cursor","description":"Cursor indicating what page of data to fetch. Obtained from prior API call.","in":"query","schema":{"type":"string"},"index$":1},{"name":"group_by","description":"A dimension to group returned analytics data by.","required":true,"in":"query","schema":{"type":"string","enum":["component","team"]},"index$":2},{"name":"start_date","description":"ISO 8601 date string (YYYY-MM-DD) of the earliest week to include. Dates are rounded back to the nearest start of a week. Defaults to one year prior.","in":"query","schema":{"type":"string"},"index$":3},{"name":"end_date","description":"ISO 8601 date string (YYYY-MM-DD) of the latest week to include. Dates are rounded forward to the nearest end of a week. Defaults to the latest computed week.","in":"query","schema":{"type":"string"},"index$":4}]},"GET /v1/analytics/libraries/{file_key}/component/usages":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"File key of the library to fetch analytics data for.","required":true,"schema":{"type":"string"},"index$":0},{"name":"cursor","description":"Cursor indicating what page of data to fetch. Obtained from prior API call.","in":"query","schema":{"type":"string"},"index$":1},{"name":"group_by","description":"A dimension to group returned analytics data by.","required":true,"in":"query","schema":{"type":"string","enum":["component","file"]},"index$":2}]},"GET /v1/analytics/libraries/{file_key}/style/actions":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"File key of the library to fetch analytics data for.","required":true,"schema":{"type":"string"},"index$":0},{"name":"cursor","description":"Cursor indicating what page of data to fetch. Obtained from prior API call.","in":"query","schema":{"type":"string"},"index$":1},{"name":"group_by","description":"A dimension to group returned analytics data by.","required":true,"in":"query","schema":{"type":"string","enum":["style","team"]},"index$":2},{"name":"start_date","description":"ISO 8601 date string (YYYY-MM-DD) of the earliest week to include. Dates are rounded back to the nearest start of a week. Defaults to one year prior.","in":"query","schema":{"type":"string"},"index$":3},{"name":"end_date","description":"ISO 8601 date string (YYYY-MM-DD) of the latest week to include. Dates are rounded forward to the nearest end of a week. Defaults to the latest computed week.","in":"query","schema":{"type":"string"},"index$":4}]},"GET /v1/analytics/libraries/{file_key}/style/usages":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"File key of the library to fetch analytics data for.","required":true,"schema":{"type":"string"},"index$":0},{"name":"cursor","description":"Cursor indicating what page of data to fetch. Obtained from prior API call.","in":"query","schema":{"type":"string"},"index$":1},{"name":"group_by","description":"A dimension to group returned analytics data by.","required":true,"in":"query","schema":{"type":"string","enum":["style","file"]},"index$":2}]},"GET /v1/analytics/libraries/{file_key}/variable/actions":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"File key of the library to fetch analytics data for.","required":true,"schema":{"type":"string"},"index$":0},{"name":"cursor","description":"Cursor indicating what page of data to fetch. Obtained from prior API call.","in":"query","schema":{"type":"string"},"index$":1},{"name":"group_by","description":"A dimension to group returned analytics data by.","required":true,"in":"query","schema":{"type":"string","enum":["variable","team"]},"index$":2},{"name":"start_date","description":"ISO 8601 date string (YYYY-MM-DD) of the earliest week to include. Dates are rounded back to the nearest start of a week. Defaults to one year prior.","in":"query","schema":{"type":"string"},"index$":3},{"name":"end_date","description":"ISO 8601 date string (YYYY-MM-DD) of the latest week to include. Dates are rounded forward to the nearest end of a week. Defaults to the latest computed week.","in":"query","schema":{"type":"string"},"index$":4}]},"GET /v1/analytics/libraries/{file_key}/variable/usages":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"File key of the library to fetch analytics data for.","required":true,"schema":{"type":"string"},"index$":0},{"name":"cursor","description":"Cursor indicating what page of data to fetch. Obtained from prior API call.","in":"query","schema":{"type":"string"},"index$":1},{"name":"group_by","description":"A dimension to group returned analytics data by.","required":true,"in":"query","schema":{"type":"string","enum":["variable","file"]},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let library_analytics_ref01_data = Object.values(setup.data.existing.library_analytics)[0] as any

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
      '../../../../.sdk/test/entity/library_analytics/LibraryAnalyticsTestData.json')

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
    ['library_analytics01','library_analytics02','library_analytics03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIGMA_TEST_LIBRARY_ANALYTICS_ENTID': idmap,
    'FIGMA_TEST_LIVE': 'FALSE',
    'FIGMA_TEST_EXPLAIN': 'FALSE',
    'FIGMA_APIKEY': '',
  })

  idmap = env['FIGMA_TEST_LIBRARY_ANALYTICS_ENTID']

  const live = 'TRUE' === env.FIGMA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIGMA_TEST_LIBRARY_ANALYTICS_ENTID']
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
  
