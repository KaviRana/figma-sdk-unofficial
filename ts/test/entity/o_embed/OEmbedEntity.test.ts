

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


describe('OEmbedEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIGMA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FigmaSDK.test()
    const ent = testsdk.OEmbed()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FigmaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OEmbed().load({"maxheight":"x","url":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIGMA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'o_embed.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cache_age":{"a":true,"h":"Cache Age","n":"cache_age","r":true,"sh":"Suggested cache lifetime for this response in seconds.","t":"`$INTEGER`","key$":"cache_age","index$":0},"folder_name":{"a":true,"h":"Folder Name","n":"folder_name","r":false,"sh":"The name of the folder containing the file, if the file resides in a folder.","t":"`$STRING`","key$":"folder_name","index$":1},"height":{"a":true,"h":"Height","n":"height","r":true,"sh":"Height of the embed in pixels.","t":"`$INTEGER`","key$":"height","index$":2},"html":{"a":true,"h":"Html","n":"html","r":true,"sh":"The HTML for embedding the file.","t":"`$STRING`","key$":"html","index$":3},"is_published_site":{"a":true,"h":"Is Published Site","n":"is_published_site","r":false,"sh":"Only present and \"true\" when the resource is a published Make.","t":"`$BOOLEAN`","key$":"is_published_site","index$":4},"key":{"a":true,"h":"Key","n":"key","r":false,"sh":"The key of the Figma file.","t":"`$STRING`","key$":"key","index$":5},"provider_name":{"a":true,"h":"Provider Name","n":"provider_name","r":true,"sh":"The name of the content provider.","t":"`$STRING`","key$":"provider_name","index$":6},"provider_url":{"a":true,"h":"Provider Url","n":"provider_url","r":true,"sh":"The URL of the content provider's website.","t":"`$STRING`","key$":"provider_url","index$":7},"thumbnail_height":{"a":true,"h":"Thumbnail Height","n":"thumbnail_height","r":false,"sh":"Height of the thumbnail image in pixels.","t":"`$INTEGER`","key$":"thumbnail_height","index$":8},"thumbnail_url":{"a":true,"h":"Thumbnail Url","n":"thumbnail_url","r":false,"sh":"URL of a thumbnail image for the file.","t":"`$STRING`","key$":"thumbnail_url","index$":9},"thumbnail_width":{"a":true,"h":"Thumbnail Width","n":"thumbnail_width","r":false,"sh":"Width of the thumbnail image in pixels.","t":"`$INTEGER`","key$":"thumbnail_width","index$":10},"title":{"a":true,"h":"Title","n":"title","r":true,"sh":"The title of the Figma file or published Make site.","t":"`$STRING`","key$":"title","index$":11},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"The oEmbed response type.","t":"`$STRING`","key$":"type","index$":12},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"The canonical URL of the resource.","t":"`$STRING`","key$":"url","index$":13},"version":{"a":true,"h":"Version","n":"version","r":true,"sh":"The oEmbed specification version.","t":"`$STRING`","key$":"version","index$":14},"width":{"a":true,"h":"Width","n":"width","r":true,"sh":"Width of the embed in pixels.","t":"`$INTEGER`","key$":"width","index$":15}},"name":"o_embed","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/oembed","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":450,"k":"query","n":"maxheight","or":"maxheight","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":800,"k":"query","n":"maxwidth","or":"maxwidth","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"url","or":"url","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v1/oembed","q":{"exist":["url"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"oembed"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"o_embed","name__orig":"o_embed","Name":"OEmbed","name_":"o_embed","name-":"o-embed","NAME":"O_EMBED","index$":11}, {"active":true,"entity":"o_embed","key$":"BasicOEmbedFlow","kind":"basic","name":"BasicOEmbedFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"o_embed_ref01","srcdatavar":"o_embed_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-o_embed_ref01"}}],"index$":0}]}, 'OEmbed', {"GET /v1/oembed":{"protocol":"http","parameters":[{"name":"url","in":"query","description":"The URL of the Figma file or published Make site to retrieve oEmbed data for.","required":true,"schema":{"type":"string"},"index$":0},{"name":"maxwidth","in":"query","description":"Maximum width of the embed in pixels. Defaults to 800. The response width will be adjusted to maintain a 16:9 aspect ratio with maxheight.","schema":{"type":"integer","default":800},"index$":1},{"name":"maxheight","in":"query","description":"Maximum height of the embed in pixels. Defaults to 450. The response height will be adjusted to maintain a 16:9 aspect ratio with maxwidth.","schema":{"type":"integer","default":450},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let o_embed_ref01_data = Object.values(setup.data.existing.o_embed)[0] as any

    // LOAD
    const o_embed_ref01_ent = client.OEmbed()
    const o_embed_ref01_match_dt0: any = {}
    const o_embed_ref01_data_dt0 = (await o_embed_ref01_ent.load(o_embed_ref01_match_dt0)).data()
    assert(null != o_embed_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/o_embed/OEmbedTestData.json')

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
    ['o_embed01','o_embed02','o_embed03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIGMA_TEST_O_EMBED_ENTID': idmap,
    'FIGMA_TEST_LIVE': 'FALSE',
    'FIGMA_TEST_EXPLAIN': 'FALSE',
    'FIGMA_APIKEY': '',
  })

  idmap = env['FIGMA_TEST_O_EMBED_ENTID']

  const live = 'TRUE' === env.FIGMA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIGMA_TEST_O_EMBED_ENTID']
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
  
