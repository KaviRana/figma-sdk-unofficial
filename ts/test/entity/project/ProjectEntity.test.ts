

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


describe('ProjectEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIGMA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FigmaSDK.test()
    const ent = testsdk.Project()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FigmaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Project().list({"team_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIGMA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the project.","t":"`$STRING`","key$":"id","index$":0},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the project.","t":"`$STRING`","key$":"name","index$":1}},"id":{"field":"id","name":"id"},"name":"project","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/projects/{project_id}/files","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":false,"k":"query","n":"branch_data","or":"branch_data","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/v1/projects/{project_id}/files","q":{"$action":"file","exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"id"},{"lit":"files"}],"t":{"req":"`reqdata`","res":"`body.files`"},"index$":0},{"a":true,"co":{"id":"GET /v1/teams/{team_id}/projects","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"team_id","or":"team_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/teams/{team_id}/projects","q":{"exist":["team_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"teams"},{"var":"team_id"},{"lit":"projects"}],"t":{"req":"`reqdata`","res":"`body.projects`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/projects/{project_id}/meta","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/projects/{project_id}/meta","q":{"$action":"meta","exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"id"},{"lit":"meta"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"project","name__orig":"project","Name":"Project","name_":"project","name-":"project","NAME":"PROJECT","index$":13}, {"active":true,"entity":"project","key$":"BasicProjectFlow","kind":"basic","name":"BasicProjectFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"team_id":"team01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"project_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"project_ref01","srcdatavar":"project_ref01_data","suffix":"_dt0"},"m":{"id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_ref01"}}],"index$":1}]}, 'Project', {"GET /v1/projects/{project_id}/files":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"ID of the project to list files from","required":true,"schema":{"type":"string"},"index$":0},{"name":"branch_data","in":"query","description":"Returns branch metadata in the response for each main file with a branch inside the project.","schema":{"type":"boolean","default":false},"index$":1}]},"GET /v1/teams/{team_id}/projects":{"protocol":"http","parameters":[{"name":"team_id","in":"path","description":"ID of the team to list projects from","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v1/projects/{project_id}/meta":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"ID of the project to get metadata for.","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let project_ref01_data = Object.values(setup.data.existing.project)[0] as any

    // LIST
    const project_ref01_ent = client.Project()
    const project_ref01_match: any = {}
    project_ref01_match['team_id'] = setup.idmap['team01']

    const project_ref01_list = (await project_ref01_ent.list(project_ref01_match)).map((e: any) => e.data())


    // LOAD
    const project_ref01_match_dt0: any = {}
    project_ref01_match_dt0.id = project_ref01_data.id
    const project_ref01_data_dt0 = (await project_ref01_ent.load(project_ref01_match_dt0)).data()
    assert(project_ref01_data_dt0.id === project_ref01_data.id)


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
      '../../../../.sdk/test/entity/project/ProjectTestData.json')

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
    ['project01','project02','project03','team01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIGMA_TEST_PROJECT_ENTID': idmap,
    'FIGMA_TEST_LIVE': 'FALSE',
    'FIGMA_TEST_EXPLAIN': 'FALSE',
    'FIGMA_APIKEY': '',
  })

  idmap = env['FIGMA_TEST_PROJECT_ENTID']

  const live = 'TRUE' === env.FIGMA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIGMA_TEST_PROJECT_ENTID']
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
  
