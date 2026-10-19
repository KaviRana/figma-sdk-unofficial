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
(0, node_test_1.describe)('StyleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FIGMA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FigmaSDK.test();
        const ent = testsdk.Style();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.FigmaSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Style().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FIGMA_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'style.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "sh": "The UTC ISO 8601 time when the style was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "cursor": { "a": true, "h": "Cursor", "n": "cursor", "r": false, "sh": "Pagination cursor", "t": "`$OBJECT`", "key$": "cursor", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": true, "sh": "The description of the style as entered by the publisher.", "t": "`$STRING`", "key$": "description", "index$": 2 }, "file_key": { "a": true, "h": "File Key", "n": "file_key", "r": true, "sh": "The unique identifier of the Figma file that contains the style.", "t": "`$STRING`", "key$": "file_key", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 4 }, "key": { "a": true, "h": "Key", "n": "key", "r": true, "sh": "The unique identifier for the style", "t": "`$STRING`", "key$": "key", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The name of the style.", "t": "`$STRING`", "key$": "name", "index$": 6 }, "node_id": { "a": true, "h": "Node Id", "n": "node_id", "r": true, "sh": "ID of the style node within the figma file", "t": "`$STRING`", "key$": "node_id", "index$": 7 }, "sort_position": { "a": true, "h": "Sort Position", "n": "sort_position", "r": true, "sh": "A user specified order number by which the style can be sorted.", "t": "`$STRING`", "key$": "sort_position", "index$": 8 }, "style_type": { "a": true, "h": "Style Type", "n": "style_type", "r": true, "sh": "The type of style", "t": "`$STRING`", "key$": "style_type", "index$": 9 }, "styles": { "a": true, "h": "Styles", "n": "styles", "r": true, "t": "`$ARRAY`", "key$": "styles", "index$": 10 }, "thumbnail_url": { "a": true, "h": "Thumbnail Url", "n": "thumbnail_url", "r": false, "sh": "A URL to a thumbnail image of the style.", "t": "`$STRING`", "key$": "thumbnail_url", "index$": 11 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "sh": "The UTC ISO 8601 time when the style was last updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 12 }, "user": { "a": true, "h": "User", "n": "user", "r": true, "sh": "The user who last updated the style.", "t": "`$OBJECT`", "key$": "user", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "style", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/files/{file_key}/styles", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "file_key", "or": "file_key", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/files/{file_key}/styles", "q": { "exist": ["file_key"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "files" }, { "var": "file_key" }, { "lit": "styles" }], "t": { "req": "`reqdata`", "res": "`body.meta`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/styles/{key}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "key", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/styles/{key}", "q": { "exist": ["id"] }, "r": { "param": { "key": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "styles" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.meta`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /v1/teams/{team_id}/styles", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "team_id", "or": "team_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "after", "or": "after", "r": false, "t": "`$NUMBER`", "index$": 0 }, { "a": true, "k": "query", "n": "before", "or": "before", "r": false, "t": "`$NUMBER`", "index$": 1 }, { "a": true, "ex": 30, "k": "query", "n": "page_size", "or": "page_size", "r": false, "t": "`$NUMBER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v1/teams/{team_id}/styles", "q": { "exist": ["team_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "teams" }, { "var": "team_id" }, { "lit": "styles" }], "t": { "req": "`reqdata`", "res": "`body.meta`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.file"]] }, "key$": "style", "name__orig": "style", "Name": "Style", "name_": "style", "name-": "style", "NAME": "STYLE", "index$": 14 }, { "active": true, "entity": "style", "key$": "BasicStyleFlow", "kind": "basic", "name": "BasicStyleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "style_ref01", "srcdatavar": "style_ref01_data", "suffix": "_dt0" }, "m": { "id": "style01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-style_ref01" } }], "index$": 0 }] }, 'Style', { "GET /v1/files/{file_key}/styles": { "protocol": "http", "parameters": [{ "name": "file_key", "in": "path", "description": "File to list styles from. This must be a main file key, not a branch key, as it is not possible to publish from branches.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /v1/styles/{key}": { "protocol": "http", "parameters": [{ "name": "key", "in": "path", "description": "The unique identifier of the style.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /v1/teams/{team_id}/styles": { "protocol": "http", "parameters": [{ "name": "team_id", "in": "path", "description": "Id of the team to list styles from.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "page_size", "in": "query", "description": "Number of items to return in a paged list of results. Defaults to 30.", "schema": { "type": "number", "default": 30 }, "index$": 1 }, { "name": "after", "in": "query", "description": "Cursor indicating which id after which to start retrieving styles for. Exclusive with before. The cursor value is an internally tracked integer that doesn't correspond to any Ids.", "schema": { "type": "number" }, "index$": 2 }, { "name": "before", "in": "query", "description": "Cursor indicating which id before which to start retrieving styles for. Exclusive with after. The cursor value is an internally tracked integer that doesn't correspond to any Ids.", "schema": { "type": "number" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let style_ref01_data = Object.values(setup.data.existing.style)[0];
        // LOAD
        const style_ref01_ent = client.Style();
        const style_ref01_match_dt0 = {};
        style_ref01_match_dt0.id = style_ref01_data.id;
        const style_ref01_data_dt0 = (await style_ref01_ent.load(style_ref01_match_dt0)).data();
        (0, node_assert_1.default)(style_ref01_data_dt0.id === style_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/style/StyleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FigmaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['style01', 'style02', 'style03', 'file01', 'file02', 'file03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FIGMA_TEST_STYLE_ENTID': idmap,
        'FIGMA_TEST_LIVE': 'FALSE',
        'FIGMA_TEST_EXPLAIN': 'FALSE',
        'FIGMA_APIKEY': '',
    });
    idmap = env['FIGMA_TEST_STYLE_ENTID'];
    const live = 'TRUE' === env.FIGMA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FIGMA_TEST_STYLE_ENTID'];
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
//# sourceMappingURL=StyleEntity.test.js.map