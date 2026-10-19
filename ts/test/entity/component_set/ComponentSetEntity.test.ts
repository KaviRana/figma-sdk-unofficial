

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


describe('ComponentSetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIGMA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FigmaSDK.test()
    const ent = testsdk.ComponentSet()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FigmaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ComponentSet().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIGMA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'component_set.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"component_sets":{"a":true,"h":"Component Sets","n":"component_sets","r":true,"t":"`$ARRAY`","key$":"component_sets","index$":0},"containing_frame":{"a":true,"h":"Containing Frame","n":"containing_frame","r":true,"sh":"The containing frame of the component set.","t":"`$OBJECT`","key$":"containing_frame","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"sh":"The UTC ISO 8601 time when the component set was created.","t":"`$STRING`","key$":"created_at","index$":2},"cursor":{"a":true,"h":"Cursor","n":"cursor","r":false,"sh":"Pagination cursor","t":"`$OBJECT`","key$":"cursor","index$":3},"description":{"a":true,"h":"Description","n":"description","r":true,"sh":"The description of the component set as entered by the publisher.","t":"`$STRING`","key$":"description","index$":4},"file_key":{"a":true,"h":"File Key","n":"file_key","r":true,"sh":"The unique identifier of the Figma file that contains the component set.","t":"`$STRING`","key$":"file_key","index$":5},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":6},"key":{"a":true,"h":"Key","n":"key","r":true,"sh":"The unique identifier for the component set.","t":"`$STRING`","key$":"key","index$":7},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the component set.","t":"`$STRING`","key$":"name","index$":8},"node_id":{"a":true,"h":"Node Id","n":"node_id","r":true,"sh":"The unique identifier of the component set node within the Figma file.","t":"`$STRING`","key$":"node_id","index$":9},"thumbnail_url":{"a":true,"h":"Thumbnail Url","n":"thumbnail_url","r":false,"sh":"A URL to a thumbnail image of the component set.","t":"`$STRING`","key$":"thumbnail_url","index$":10},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"sh":"The UTC ISO 8601 time when the component set was last updated.","t":"`$STRING`","key$":"updated_at","index$":11},"user":{"a":true,"h":"User","n":"user","r":true,"sh":"The user who last updated the component set.","t":"`$OBJECT`","key$":"user","index$":12}},"id":{"field":"id","name":"id"},"name":"component_set","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/files/{file_key}/component_sets","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"file_key","or":"file_key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/files/{file_key}/component_sets","q":{"exist":["file_key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"files"},{"var":"file_key"},{"lit":"component_sets"}],"t":{"req":"`reqdata`","res":"`body.meta`"},"index$":0},{"a":true,"co":{"id":"GET /v1/component_sets/{key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/component_sets/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"component_sets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.meta`"},"index$":1},{"a":true,"co":{"id":"GET /v1/teams/{team_id}/component_sets","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"team_id","or":"team_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"after","or":"after","r":false,"t":"`$NUMBER`","index$":0},{"a":true,"k":"query","n":"before","or":"before","r":false,"t":"`$NUMBER`","index$":1},{"a":true,"ex":30,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$NUMBER`","index$":2}]},"k":"http","m":"GET","o":"/v1/teams/{team_id}/component_sets","q":{"exist":["team_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"teams"},{"var":"team_id"},{"lit":"component_sets"}],"t":{"req":"`reqdata`","res":"`body.meta`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.file"]]},"key$":"component_set","name__orig":"component_set","Name":"ComponentSet","name_":"component_set","name-":"component-set","NAME":"COMPONENT_SET","index$":5}, {"active":true,"entity":"component_set","key$":"BasicComponentSetFlow","kind":"basic","name":"BasicComponentSetFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"component_set_ref01","srcdatavar":"component_set_ref01_data","suffix":"_dt0"},"m":{"id":"component_set01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-component_set_ref01"}}],"index$":0}]}, 'ComponentSet', {"GET /v1/files/{file_key}/component_sets":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"File to list component sets from. This must be a main file key, not a branch key, as it is not possible to publish from branches.","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v1/component_sets/{key}":{"protocol":"http","parameters":[{"name":"key","in":"path","description":"The unique identifier of the component set.","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v1/teams/{team_id}/component_sets":{"protocol":"http","parameters":[{"name":"team_id","in":"path","description":"Id of the team to list component sets from.","required":true,"schema":{"type":"string"},"index$":0},{"name":"page_size","in":"query","description":"Number of items to return in a paged list of results. Defaults to 30.","schema":{"type":"number","default":30},"index$":1},{"name":"after","in":"query","description":"Cursor indicating which id after which to start retrieving component sets for. Exclusive with before. The cursor value is an internally tracked integer that doesn't correspond to any Ids.","schema":{"type":"number"},"index$":2},{"name":"before","in":"query","description":"Cursor indicating which id before which to start retrieving component sets for. Exclusive with after. The cursor value is an internally tracked integer that doesn't correspond to any Ids.","schema":{"type":"number"},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let component_set_ref01_data = Object.values(setup.data.existing.component_set)[0] as any

    // LOAD
    const component_set_ref01_ent = client.ComponentSet()
    const component_set_ref01_match_dt0: any = {}
    component_set_ref01_match_dt0.id = component_set_ref01_data.id
    const component_set_ref01_data_dt0 = (await component_set_ref01_ent.load(component_set_ref01_match_dt0)).data()
    assert(component_set_ref01_data_dt0.id === component_set_ref01_data.id)


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
      '../../../../.sdk/test/entity/component_set/ComponentSetTestData.json')

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
    ['component_set01','component_set02','component_set03','file01','file02','file03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIGMA_TEST_COMPONENT_SET_ENTID': idmap,
    'FIGMA_TEST_LIVE': 'FALSE',
    'FIGMA_TEST_EXPLAIN': 'FALSE',
    'FIGMA_APIKEY': '',
  })

  idmap = env['FIGMA_TEST_COMPONENT_SET_ENTID']

  const live = 'TRUE' === env.FIGMA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIGMA_TEST_COMPONENT_SET_ENTID']
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
  
