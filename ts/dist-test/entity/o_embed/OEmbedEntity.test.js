"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OEmbedEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FIGMA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FigmaSDK.test();
        const ent = testsdk.OEmbed();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.FigmaSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.OEmbed().load({ "maxheight": "x", "url": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FIGMA_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'o_embed.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "cache_age": { "a": true, "h": "Cache Age", "n": "cache_age", "r": true, "sh": "Suggested cache lifetime for this response in seconds.", "t": "`$INTEGER`", "key$": "cache_age", "index$": 0 }, "folder_name": { "a": true, "h": "Folder Name", "n": "folder_name", "r": false, "sh": "The name of the folder containing the file, if the file resides in a folder.", "t": "`$STRING`", "key$": "folder_name", "index$": 1 }, "height": { "a": true, "h": "Height", "n": "height", "r": true, "sh": "Height of the embed in pixels.", "t": "`$INTEGER`", "key$": "height", "index$": 2 }, "html": { "a": true, "h": "Html", "n": "html", "r": true, "sh": "The HTML for embedding the file.", "t": "`$STRING`", "key$": "html", "index$": 3 }, "is_published_site": { "a": true, "h": "Is Published Site", "n": "is_published_site", "r": false, "sh": "Only present and \"true\" when the resource is a published Make.", "t": "`$BOOLEAN`", "key$": "is_published_site", "index$": 4 }, "key": { "a": true, "h": "Key", "n": "key", "r": false, "sh": "The key of the Figma file.", "t": "`$STRING`", "key$": "key", "index$": 5 }, "provider_name": { "a": true, "h": "Provider Name", "n": "provider_name", "r": true, "sh": "The name of the content provider.", "t": "`$STRING`", "key$": "provider_name", "index$": 6 }, "provider_url": { "a": true, "h": "Provider Url", "n": "provider_url", "r": true, "sh": "The URL of the content provider's website.", "t": "`$STRING`", "key$": "provider_url", "index$": 7 }, "thumbnail_height": { "a": true, "h": "Thumbnail Height", "n": "thumbnail_height", "r": false, "sh": "Height of the thumbnail image in pixels.", "t": "`$INTEGER`", "key$": "thumbnail_height", "index$": 8 }, "thumbnail_url": { "a": true, "h": "Thumbnail Url", "n": "thumbnail_url", "r": false, "sh": "URL of a thumbnail image for the file.", "t": "`$STRING`", "key$": "thumbnail_url", "index$": 9 }, "thumbnail_width": { "a": true, "h": "Thumbnail Width", "n": "thumbnail_width", "r": false, "sh": "Width of the thumbnail image in pixels.", "t": "`$INTEGER`", "key$": "thumbnail_width", "index$": 10 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "sh": "The title of the Figma file or published Make site.", "t": "`$STRING`", "key$": "title", "index$": 11 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "sh": "The oEmbed response type.", "t": "`$STRING`", "key$": "type", "index$": 12 }, "url": { "a": true, "h": "Url", "n": "url", "r": true, "sh": "The canonical URL of the resource.", "t": "`$STRING`", "key$": "url", "index$": 13 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "sh": "The oEmbed specification version.", "t": "`$STRING`", "key$": "version", "index$": 14 }, "width": { "a": true, "h": "Width", "n": "width", "r": true, "sh": "Width of the embed in pixels.", "t": "`$INTEGER`", "key$": "width", "index$": 15 } }, "name": "o_embed", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/oembed", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 450, "k": "query", "n": "maxheight", "or": "maxheight", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 800, "k": "query", "n": "maxwidth", "or": "maxwidth", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "url", "or": "url", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v1/oembed", "q": { "exist": ["url"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "oembed" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "o_embed", "name__orig": "o_embed", "Name": "OEmbed", "name_": "o_embed", "name-": "o-embed", "NAME": "O_EMBED", "index$": 11 }, { "active": true, "entity": "o_embed", "key$": "BasicOEmbedFlow", "kind": "basic", "name": "BasicOEmbedFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "o_embed_ref01", "srcdatavar": "o_embed_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-o_embed_ref01" } }], "index$": 0 }] }, 'OEmbed', { "GET /v1/oembed": { "protocol": "http", "parameters": [{ "name": "url", "in": "query", "description": "The URL of the Figma file or published Make site to retrieve oEmbed data for.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "maxwidth", "in": "query", "description": "Maximum width of the embed in pixels. Defaults to 800. The response width will be adjusted to maintain a 16:9 aspect ratio with maxheight.", "schema": { "type": "integer", "default": 800 }, "index$": 1 }, { "name": "maxheight", "in": "query", "description": "Maximum height of the embed in pixels. Defaults to 450. The response height will be adjusted to maintain a 16:9 aspect ratio with maxwidth.", "schema": { "type": "integer", "default": 450 }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let o_embed_ref01_data = Object.values(setup.data.existing.o_embed)[0];
        // LOAD
        const o_embed_ref01_ent = client.OEmbed();
        const o_embed_ref01_match_dt0 = {};
        const o_embed_ref01_data_dt0 = (await o_embed_ref01_ent.load(o_embed_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != o_embed_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/o_embed/OEmbedTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FigmaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['o_embed01', 'o_embed02', 'o_embed03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FIGMA_TEST_O_EMBED_ENTID': idmap,
        'FIGMA_TEST_LIVE': 'FALSE',
        'FIGMA_TEST_EXPLAIN': 'FALSE',
        'FIGMA_APIKEY': '',
    });
    idmap = env['FIGMA_TEST_O_EMBED_ENTID'];
    const live = 'TRUE' === env.FIGMA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FIGMA_TEST_O_EMBED_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FigmaSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=OEmbedEntity.test.js.map