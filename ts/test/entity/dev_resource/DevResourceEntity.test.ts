

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


describe('DevResourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIGMA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FigmaSDK.test()
    const ent = testsdk.DevResource()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FigmaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DevResource().list({"file_key":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIGMA_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dev_resource.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dev_resources":{"a":true,"h":"Dev Resources","n":"dev_resources","r":true,"sh":"An array of dev resources.","t":"`$ARRAY`","key$":"dev_resources","index$":0},"errors":{"a":true,"h":"Errors","n":"errors","r":false,"sh":"An array of errors.","t":"`$ARRAY`","key$":"errors","index$":1},"file_key":{"a":true,"h":"File Key","n":"file_key","r":true,"sh":"The file key where the dev resource belongs.","t":"`$STRING`","key$":"file_key","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique identifier of the dev resource","t":"`$STRING`","key$":"id","index$":3},"links_created":{"a":true,"h":"Links Created","n":"links_created","r":true,"sh":"An array of links created.","t":"`$ARRAY`","key$":"links_created","index$":4},"links_updated":{"a":true,"h":"Links Updated","n":"links_updated","r":false,"sh":"An array of links updated.","t":"`$ARRAY`","key$":"links_updated","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the dev resource.","t":"`$STRING`","key$":"name","index$":6},"node_id":{"a":true,"h":"Node Id","n":"node_id","r":true,"sh":"The target node to attach the dev resource to.","t":"`$STRING`","key$":"node_id","index$":7},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"The URL of the dev resource.","t":"`$STRING`","key$":"url","index$":8}},"id":{"field":"id","name":"id"},"name":"dev_resource","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["dev_resources"],"co":{"id":"POST /v1/dev_resources","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/dev_resources","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"dev_resources"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/files/{file_key}/dev_resources","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"file_key","or":"file_key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"node_id","or":"node_ids","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/files/{file_key}/dev_resources","q":{"exist":["file_key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"files"},{"var":"file_key"},{"lit":"dev_resources"}],"t":{"req":"`reqdata`","res":"`body.dev_resources`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v1/files/{file_key}/dev_resources/{dev_resource_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"file_key","or":"file_key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"dev_resource_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v1/files/{file_key}/dev_resources/{dev_resource_id}","q":{"exist":["file_key","id"]},"r":{"param":{"dev_resource_id":"id"}},"s":[{"lit":"v1"},{"lit":"files"},{"var":"file_key"},{"lit":"dev_resources"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["dev_resources"],"co":{"id":"PUT /v1/dev_resources","source":"openapi3","version":2},"g":{},"k":"http","m":"PUT","o":"/v1/dev_resources","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"dev_resources"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.file"]]},"key$":"dev_resource","name__orig":"dev_resource","Name":"DevResource","name_":"dev_resource","name-":"dev-resource","NAME":"DEV_RESOURCE","index$":6}, {"active":true,"entity":"dev_resource","key$":"BasicDevResourceFlow","kind":"basic","name":"BasicDevResourceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"dev_resource_ref01"},"m":{"file_key":"file_key01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"file_key":"file_key01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"dev_resource_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"dev_resource_ref01","srcdatavar":"dev_resource_ref01_data","suffix":"_up0","textfield":"file_key"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dev_resource_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"dev_resource_ref01","suffix":"_rm0"},"m":{"file_key":"file_key01","id":"dev_resource01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"file_key":"file_key01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"dev_resource_ref01"}}],"index$":4}]}, 'DevResource', {"POST /v1/dev_resources":{"protocol":"http","requestBody":{"description":"A list of dev resources that you want to create.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"dev_resources":{"type":"array","description":"An array of dev resources.","items":{"type":"object","properties":{"name":{"type":"string","description":"The name of the dev resource."},"url":{"type":"string","description":"The URL of the dev resource."},"file_key":{"type":"string","description":"The file key where the dev resource belongs."},"node_id":{"type":"string","description":"The target node to attach the dev resource to."}},"required":["name","url","file_key","node_id"]},"key$":"dev_resources"}},"required":["dev_resources"],"index$":1}}}},"parameters":[]},"GET /v1/files/{file_key}/dev_resources":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"The file to get the dev resources from. This must be a main file key, not a branch key.","required":true,"schema":{"type":"string"},"index$":0},{"name":"node_ids","in":"query","description":"Comma separated list of nodes that you care about in the document. If specified, only dev resources attached to these nodes will be returned. If not specified, all dev resources in the file will be returned.","schema":{"type":"string"},"index$":1}]},"DELETE /v1/files/{file_key}/dev_resources/{dev_resource_id}":{"protocol":"http","parameters":[{"name":"file_key","in":"path","description":"The file to delete the dev resource from. This must be a main file key, not a branch key.","required":true,"schema":{"type":"string"},"index$":0},{"name":"dev_resource_id","in":"path","description":"The id of the dev resource to delete.","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /v1/dev_resources":{"protocol":"http","requestBody":{"description":"A list of dev resources that you want to update.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"dev_resources":{"type":"array","description":"An array of dev resources.","items":{"type":"object","properties":{"id":{"type":"string","description":"Unique identifier of the dev resource"},"name":{"type":"string","description":"The name of the dev resource."},"url":{"type":"string","description":"The URL of the dev resource."}},"required":["id"]},"key$":"dev_resources"}},"required":["dev_resources"],"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const dev_resource_ref01_ent = client.DevResource()
    let dev_resource_ref01_data = setup.data.new.dev_resource['dev_resource_ref01']
    dev_resource_ref01_data['file_key'] = setup.idmap['file_key01']

    dev_resource_ref01_data = (await dev_resource_ref01_ent.create(dev_resource_ref01_data)).data()
    assert(null != dev_resource_ref01_data.id)


    // LIST
    const dev_resource_ref01_match: any = {}
    dev_resource_ref01_match['file_key'] = setup.idmap['file_key01']

    const dev_resource_ref01_list = (await dev_resource_ref01_ent.list(dev_resource_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(dev_resource_ref01_list, { id: dev_resource_ref01_data.id })))


    // UPDATE
    const dev_resource_ref01_data_up0: any = {}
    dev_resource_ref01_data_up0.id = dev_resource_ref01_data.id

    const dev_resource_ref01_markdef_up0 = { name: 'file_key', value: 'Mark01-dev_resource_ref01_' + setup.now }
    ;(dev_resource_ref01_data_up0 as any)[dev_resource_ref01_markdef_up0.name] = dev_resource_ref01_markdef_up0.value

    const dev_resource_ref01_resdata_up0 = (await dev_resource_ref01_ent.update(dev_resource_ref01_data_up0)).data()
    assert(dev_resource_ref01_resdata_up0.id === dev_resource_ref01_data_up0.id)

    assert((dev_resource_ref01_resdata_up0 as any)[dev_resource_ref01_markdef_up0.name] === dev_resource_ref01_markdef_up0.value)


    // REMOVE
    const dev_resource_ref01_match_rm0: any = { id: dev_resource_ref01_data.id }
    dev_resource_ref01_match_rm0['file_key'] = setup.idmap['file_key'] ?? setup.idmap['file_key01']
    await dev_resource_ref01_ent.remove(dev_resource_ref01_match_rm0)
  

    // LIST
    const dev_resource_ref01_match_rt0: any = {}
    dev_resource_ref01_match_rt0['file_key'] = setup.idmap['file_key01']

    const dev_resource_ref01_list_rt0 = (await dev_resource_ref01_ent.list(dev_resource_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(dev_resource_ref01_list_rt0, { id: dev_resource_ref01_data.id })))


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
      '../../../../.sdk/test/entity/dev_resource/DevResourceTestData.json')

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
    ['dev_resource01','dev_resource02','dev_resource03','file01','file02','file03','file_key01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIGMA_TEST_DEV_RESOURCE_ENTID': idmap,
    'FIGMA_TEST_LIVE': 'FALSE',
    'FIGMA_TEST_EXPLAIN': 'FALSE',
    'FIGMA_APIKEY': '',
  })

  idmap = env['FIGMA_TEST_DEV_RESOURCE_ENTID']

  const live = 'TRUE' === env.FIGMA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIGMA_TEST_DEV_RESOURCE_ENTID']
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
  
