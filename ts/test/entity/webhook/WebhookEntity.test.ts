

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


describe('WebhookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIGMA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FigmaSDK.test()
    const ent = testsdk.Webhook()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('webhook hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of FigmaSDK.test(offline).Webhook().stream('list')) { }
    }, /offline/)

    for await (const _item of FigmaSDK.test(offline).Webhook()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = FigmaSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Webhook().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of FigmaSDK.test().Webhook().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new FigmaSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Webhook().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Webhook().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FigmaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Webhook().list({"context":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIGMA_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'webhook.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"client_id":{"a":true,"h":"Client Id","n":"client_id","r":true,"sh":"The client ID of the OAuth application that registered this webhook, if any","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"client_id","index$":0},"context":{"a":true,"h":"Context","n":"context","r":true,"sh":"The type of context this webhook is attached to.","t":"`$STRING`","key$":"context","index$":1},"context_id":{"a":true,"h":"Context Id","n":"context_id","r":true,"sh":"The ID of the context this webhook is attached to","t":"`$STRING`","key$":"context_id","index$":2},"description":{"a":true,"h":"Description","n":"description","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Optional user-provided description or name for the webhook.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":3},"endpoint":{"a":true,"h":"Endpoint","n":"endpoint","r":true,"sh":"The endpoint that will be hit when the webhook is triggered","t":"`$STRING`","key$":"endpoint","index$":4},"event_type":{"a":true,"h":"Event Type","n":"event_type","r":true,"sh":"The event this webhook triggers on","t":"`$STRING`","key$":"event_type","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the webhook","t":"`$STRING`","key$":"id","index$":6},"passcode":{"a":true,"h":"Passcode","n":"passcode","r":true,"sh":"The passcode that will be passed back to the webhook endpoint.","t":"`$STRING`","key$":"passcode","index$":7},"plan_api_id":{"a":true,"h":"Plan Api Id","n":"plan_api_id","r":true,"sh":"The plan API ID of the team or organization where this webhook was created","t":"`$STRING`","key$":"plan_api_id","index$":8},"status":{"a":true,"h":"Status","n":"status","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The current status of the webhook","t":"`$STRING`","key$":"status","index$":9},"team_id":{"a":true,"de":true,"h":"Team Id","n":"team_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The team id you are subscribed to for updates.","t":"`$STRING`","key$":"team_id","index$":10}},"id":{"field":"id","name":"id"},"name":"webhook","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["context","context_id","description","endpoint","event_type","passcode","status","team_id"],"co":{"id":"POST /v2/webhooks","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/webhooks","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/webhooks/{webhook_id}/requests","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"webhook_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/webhooks/{webhook_id}/requests","q":{"$action":"request","exist":["id"]},"r":{"param":{"webhook_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"webhooks"},{"var":"id"},{"lit":"requests"}],"t":{"req":"`reqdata`","res":"`body.requests`"},"index$":0},{"a":true,"co":{"id":"GET /v2/teams/{team_id}/webhooks","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"team_id","or":"team_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/teams/{team_id}/webhooks","q":{"exist":["team_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"teams"},{"var":"team_id"},{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body.webhooks`"},"index$":1},{"a":true,"co":{"id":"GET /v2/webhooks","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"context","or":"context","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"context_id","or":"context_id","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"plan_api_id","or":"plan_api_id","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v2/webhooks","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body.webhooks`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/webhooks/{webhook_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"webhook_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/webhooks/{webhook_id}","q":{"exist":["id"]},"r":{"param":{"webhook_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"webhooks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/webhooks/{webhook_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"webhook_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/webhooks/{webhook_id}","q":{"exist":["id"]},"r":{"param":{"webhook_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"webhooks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["description","endpoint","event_type","passcode","status"],"co":{"id":"PUT /v2/webhooks/{webhook_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"webhook_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/webhooks/{webhook_id}","q":{"exist":["id"]},"r":{"param":{"webhook_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"webhooks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"webhook","name__orig":"webhook","Name":"Webhook","name_":"webhook","name-":"webhook","NAME":"WEBHOOK","index$":17}, {"active":true,"entity":"webhook","key$":"BasicWebhookFlow","kind":"basic","name":"BasicWebhookFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"webhook_ref01"},"m":{"team_id":"team01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"webhook_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"webhook_ref01","srcdatavar":"webhook_ref01_data","suffix":"_up0","textfield":"context"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-webhook_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"webhook_ref01","srcdatavar":"webhook_ref01_data","suffix":"_dt0"},"m":{"id":"webhook01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-webhook_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"webhook_ref01","suffix":"_rm0"},"m":{"id":"webhook01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"webhook_ref01"}}],"index$":5}]}, 'Webhook', {"POST /v2/webhooks":{"protocol":"http","requestBody":{"description":"The webhook to create.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"event_type":{"type":"string","description":"An enum representing the possible events that a webhook can subscribe to","enum":["PING","FILE_UPDATE","FILE_VERSION_UPDATE","FILE_DELETE","LIBRARY_PUBLISH","FILE_COMMENT","DEV_MODE_STATUS_UPDATE"],"x-ref":"#/components/schemas/WebhookV2Event","key$":"event_type"},"team_id":{"type":"string","description":"Team id to receive updates about. This is deprecated, use 'context' and 'context_id' instead.","deprecated":true,"key$":"team_id"},"context":{"type":"string","description":"Context to create the webhook for. Must be \"team\", \"project\", or \"file\".","key$":"context"},"context_id":{"type":"string","description":"The id of the context you want to receive updates about.","key$":"context_id"},"endpoint":{"type":"string","description":"The HTTP endpoint that will receive a POST request when the event triggers. Max length 2048 characters.","key$":"endpoint"},"passcode":{"type":"string","description":"String that will be passed back to your webhook endpoint to verify that it is being called by Figma. Max length 100 characters.","key$":"passcode"},"status":{"type":"string","description":"State of the webhook, including any error state it may be in","enum":["ACTIVE","PAUSED"],"x-ref":"#/components/schemas/WebhookV2Status","key$":"status"},"description":{"type":"string","description":"User provided description or name for the webhook. Max length 150 characters.","key$":"description"}},"required":["event_type","endpoint","passcode","context","context_id"],"index$":1}}}},"parameters":[]},"GET /v2/webhooks/{webhook_id}/requests":{"protocol":"http","parameters":[{"name":"webhook_id","in":"path","description":"The id of the webhook subscription you want to see events from","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v2/teams/{team_id}/webhooks":{"protocol":"http","parameters":[{"name":"team_id","in":"path","description":"ID of team to get webhooks for","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v2/webhooks":{"protocol":"http","parameters":[{"name":"context","in":"query","required":false,"schema":{"type":"string"},"description":"Context to create the resource on. Should be \"team\", \"project\", or \"file\".","index$":0},{"name":"context_id","in":"query","required":false,"schema":{"type":"string"},"description":"The id of the context that you want to get attached webhooks for. If you're using context_id, you cannot use plan_api_id.","index$":1},{"name":"plan_api_id","in":"query","required":false,"schema":{"type":"string"},"description":"The id of your plan. Use this to get all webhooks for all contexts you have access to. If you're using plan_api_id, you cannot use context or context_id. When you use plan_api_id, the response is paginated.","index$":2},{"name":"cursor","in":"query","required":false,"schema":{"type":"string"},"description":"If you're using plan_api_id, this is the cursor to use for pagination. If you're using context or context_id, this parameter is ignored. Provide the next_page or prev_page value from the previous response to get the next or previous page of results.","index$":3}]},"GET /v2/webhooks/{webhook_id}":{"protocol":"http","parameters":[{"name":"webhook_id","in":"path","description":"ID of webhook to get","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /v2/webhooks/{webhook_id}":{"protocol":"http","parameters":[{"name":"webhook_id","in":"path","description":"ID of webhook to delete","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /v2/webhooks/{webhook_id}":{"protocol":"http","requestBody":{"description":"The webhook to update.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"event_type":{"type":"string","description":"An enum representing the possible events that a webhook can subscribe to","enum":["PING","FILE_UPDATE","FILE_VERSION_UPDATE","FILE_DELETE","LIBRARY_PUBLISH","FILE_COMMENT","DEV_MODE_STATUS_UPDATE"],"x-ref":"#/components/schemas/WebhookV2Event","key$":"event_type"},"endpoint":{"type":"string","description":"The HTTP endpoint that will receive a POST request when the event triggers. Max length 2048 characters.","key$":"endpoint"},"passcode":{"type":"string","description":"String that will be passed back to your webhook endpoint to verify that it is being called by Figma. Max length 100 characters.","key$":"passcode"},"status":{"type":"string","description":"State of the webhook, including any error state it may be in","enum":["ACTIVE","PAUSED"],"x-ref":"#/components/schemas/WebhookV2Status","key$":"status"},"description":{"type":"string","description":"User provided description or name for the webhook. Max length 150 characters.","key$":"description"}},"required":["event_type","team_id","endpoint","passcode"],"index$":1}}}},"parameters":[{"name":"webhook_id","in":"path","description":"ID of webhook to update","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const webhook_ref01_ent = client.Webhook()
    let webhook_ref01_data = setup.data.new.webhook['webhook_ref01']
    webhook_ref01_data['team_id'] = setup.idmap['team01']

    webhook_ref01_data = (await webhook_ref01_ent.create(webhook_ref01_data)).data()
    assert(null != webhook_ref01_data.id)


    // LIST
    const webhook_ref01_match: any = {}

    const webhook_ref01_list = (await webhook_ref01_ent.list(webhook_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(webhook_ref01_list, { id: webhook_ref01_data.id })))


    // UPDATE
    const webhook_ref01_data_up0: any = {}
    webhook_ref01_data_up0.id = webhook_ref01_data.id

    const webhook_ref01_markdef_up0 = { name: 'context', value: 'Mark01-webhook_ref01_' + setup.now }
    ;(webhook_ref01_data_up0 as any)[webhook_ref01_markdef_up0.name] = webhook_ref01_markdef_up0.value

    const webhook_ref01_resdata_up0 = (await webhook_ref01_ent.update(webhook_ref01_data_up0)).data()
    assert(webhook_ref01_resdata_up0.id === webhook_ref01_data_up0.id)

    assert((webhook_ref01_resdata_up0 as any)[webhook_ref01_markdef_up0.name] === webhook_ref01_markdef_up0.value)


    // LOAD
    const webhook_ref01_match_dt0: any = {}
    webhook_ref01_match_dt0.id = webhook_ref01_data.id
    const webhook_ref01_data_dt0 = (await webhook_ref01_ent.load(webhook_ref01_match_dt0)).data()
    assert(webhook_ref01_data_dt0.id === webhook_ref01_data.id)


    // REMOVE
    const webhook_ref01_match_rm0: any = { id: webhook_ref01_data.id }
    await webhook_ref01_ent.remove(webhook_ref01_match_rm0)
  

    // LIST
    const webhook_ref01_match_rt0: any = {}

    const webhook_ref01_list_rt0 = (await webhook_ref01_ent.list(webhook_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(webhook_ref01_list_rt0, { id: webhook_ref01_data.id })))


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
      '../../../../.sdk/test/entity/webhook/WebhookTestData.json')

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
    ['webhook01','webhook02','webhook03','team01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIGMA_TEST_WEBHOOK_ENTID': idmap,
    'FIGMA_TEST_LIVE': 'FALSE',
    'FIGMA_TEST_EXPLAIN': 'FALSE',
    'FIGMA_APIKEY': '',
  })

  idmap = env['FIGMA_TEST_WEBHOOK_ENTID']

  const live = 'TRUE' === env.FIGMA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIGMA_TEST_WEBHOOK_ENTID']
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
  
