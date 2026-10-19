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
(0, node_test_1.describe)('FolderEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FIGMA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FigmaSDK.test();
        const ent = testsdk.Folder();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.FigmaSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Folder().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FIGMA_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'folder.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "The time at which the folder was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "The ID of the folder.", "t": "`$STRING`", "key$": "id", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The name of the folder.", "t": "`$STRING`", "key$": "name", "index$": 2 }, "parent_folder_id": { "a": true, "h": "Parent Folder Id", "n": "parent_folder_id", "r": true, "sh": "The ID of the folder's parent folder, or null if the folder is a top-level folder in the team.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "parent_folder_id", "index$": 3 }, "sharing_audience_control": { "a": true, "h": "Sharing Audience Control", "n": "sharing_audience_control", "r": false, "sh": "The audience that can access the folder.", "t": "`$STRING`", "key$": "sharing_audience_control", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "folder", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/folders/{folder_id}/files", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "folder_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": false, "k": "query", "n": "branch_data", "or": "branch_data", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/folders/{folder_id}/files", "q": { "$action": "file", "exist": ["id"] }, "r": { "param": { "folder_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "folders" }, { "var": "id" }, { "lit": "files" }], "t": { "req": "`reqdata`", "res": "`body.files`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/folders/{folder_id}/folders", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "folder_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/folders/{folder_id}/folders", "q": { "exist": ["id"] }, "r": { "param": { "folder_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "folders" }, { "var": "id" }, { "lit": "folders" }], "t": { "req": "`reqdata`", "res": "`body.folders`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /v2/teams/{team_id}/folders", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "team_id", "or": "team_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/teams/{team_id}/folders", "q": { "exist": ["team_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "teams" }, { "var": "team_id" }, { "lit": "folders" }], "t": { "req": "`reqdata`", "res": "`body.folders`" }, "index$": 2 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/folders/{folder_id}/meta", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "folder_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/folders/{folder_id}/meta", "q": { "$action": "meta", "exist": ["id"] }, "r": { "param": { "folder_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "folders" }, { "var": "id" }, { "lit": "meta" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "folder", "name__orig": "folder", "Name": "Folder", "name_": "folder", "name-": "folder", "NAME": "FOLDER", "index$": 9 }, { "active": true, "entity": "folder", "key$": "BasicFolderFlow", "kind": "basic", "name": "BasicFolderFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "team_id": "team01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "folder_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "folder_ref01", "srcdatavar": "folder_ref01_data", "suffix": "_dt0" }, "m": { "id": "folder01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-folder_ref01" } }], "index$": 1 }] }, 'Folder', { "GET /v2/folders/{folder_id}/files": { "protocol": "http", "parameters": [{ "name": "folder_id", "in": "path", "description": "ID of the folder to list files from", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "branch_data", "in": "query", "description": "Returns branch metadata in the response for each main file with a branch inside the folder.", "schema": { "type": "boolean", "default": false }, "index$": 1 }] }, "GET /v2/folders/{folder_id}/folders": { "protocol": "http", "parameters": [{ "name": "folder_id", "in": "path", "description": "ID of the parent folder to list subfolders from", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /v2/teams/{team_id}/folders": { "protocol": "http", "parameters": [{ "name": "team_id", "in": "path", "description": "ID of the team to list folders from", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /v2/folders/{folder_id}/meta": { "protocol": "http", "parameters": [{ "name": "folder_id", "in": "path", "description": "ID of the folder to get metadata for", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let folder_ref01_data = Object.values(setup.data.existing.folder)[0];
        // LIST
        const folder_ref01_ent = client.Folder();
        const folder_ref01_match = {};
        folder_ref01_match['team_id'] = setup.idmap['team01'];
        const folder_ref01_list = (await folder_ref01_ent.list(folder_ref01_match)).map((e) => e.data());
        // LOAD
        const folder_ref01_match_dt0 = {};
        folder_ref01_match_dt0.id = folder_ref01_data.id;
        const folder_ref01_data_dt0 = (await folder_ref01_ent.load(folder_ref01_match_dt0)).data();
        (0, node_assert_1.default)(folder_ref01_data_dt0.id === folder_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/folder/FolderTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FigmaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['folder01', 'folder02', 'folder03', 'team01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FIGMA_TEST_FOLDER_ENTID': idmap,
        'FIGMA_TEST_LIVE': 'FALSE',
        'FIGMA_TEST_EXPLAIN': 'FALSE',
        'FIGMA_APIKEY': '',
    });
    idmap = env['FIGMA_TEST_FOLDER_ENTID'];
    const live = 'TRUE' === env.FIGMA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FIGMA_TEST_FOLDER_ENTID'];
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
//# sourceMappingURL=FolderEntity.test.js.map