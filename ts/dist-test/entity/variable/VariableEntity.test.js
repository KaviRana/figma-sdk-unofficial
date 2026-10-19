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
(0, node_test_1.describe)('VariableEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FIGMA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FigmaSDK.test();
        const ent = testsdk.Variable();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.FigmaSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Variable().create({ "file_key": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FIGMA_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'variable.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "tempIdToRealId": { "a": true, "h": "Temp Id To Real Id", "n": "tempIdToRealId", "r": true, "sh": "A map of temporary ids in the request to the real ids of the newly created objects", "t": "`$OBJECT`", "key$": "tempIdToRealId", "index$": 0 }, "variableCollections": { "a": true, "h": "Variable Collections", "n": "variableCollections", "r": false, "sh": "For creating, updating, and deleting variable collections.", "t": "`$ARRAY`", "key$": "variableCollections", "index$": 1 }, "variableModeValues": { "a": true, "h": "Variable Mode Values", "n": "variableModeValues", "r": false, "sh": "For setting a specific value, given a variable and a mode.", "t": "`$ARRAY`", "union": { "branches": 7, "count": 4, "depth": 9 }, "key$": "variableModeValues", "index$": 2 }, "variableModes": { "a": true, "h": "Variable Modes", "n": "variableModes", "r": false, "sh": "For creating, updating, and deleting modes within variable collections.", "t": "`$ARRAY`", "key$": "variableModes", "index$": 3 }, "variables": { "a": true, "h": "Variables", "n": "variables", "r": false, "sh": "For creating, updating, and deleting variables.", "t": "`$ARRAY`", "key$": "variables", "index$": 4 } }, "name": "variable", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["variableCollections", "variableModeValues", "variableModes", "variables"], "co": { "id": "POST /v1/files/{file_key}/variables", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "file_key", "or": "file_key", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v1/files/{file_key}/variables", "q": { "exist": ["file_key"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "files" }, { "var": "file_key" }, { "lit": "variables" }], "t": { "req": "`reqdata`", "res": "`body.meta`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/files/{file_key}/variables/local", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "file_key", "or": "file_key", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/files/{file_key}/variables/local", "q": { "$action": "local", "exist": ["file_key"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "files" }, { "var": "file_key" }, { "lit": "variables" }, { "lit": "local" }], "t": { "req": "`reqdata`", "res": "`body.meta`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/files/{file_key}/variables/published", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "file_key", "or": "file_key", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/files/{file_key}/variables/published", "q": { "$action": "published", "exist": ["file_key"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "files" }, { "var": "file_key" }, { "lit": "variables" }, { "lit": "published" }], "t": { "req": "`reqdata`", "res": "`body.meta`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.file"]] }, "key$": "variable", "name__orig": "variable", "Name": "Variable", "name_": "variable", "name-": "variable", "NAME": "VARIABLE", "index$": 16 }, { "active": true, "entity": "variable", "key$": "BasicVariableFlow", "kind": "basic", "name": "BasicVariableFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "variable_ref01" }, "m": { "file_key": "file_key01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "variable_ref01", "srcdatavar": "variable_ref01_data", "suffix": "_dt0" }, "m": { "id": "variable01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-variable_ref01" } }], "unreachable": true }] }, 'Variable', { "POST /v1/files/{file_key}/variables": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "minProperties": 1, "properties": { "variableCollections": { "type": "array", "description": "For creating, updating, and deleting variable collections.", "items": { "oneOf": [{ "type": "object", "description": "An object that contains details about creating a `VariableCollection`.", "properties": {}, "required": [], "x-ref": "#/components/schemas/VariableCollectionCreate" }, { "type": "object", "description": "An object that contains details about updating a `VariableCollection`.", "properties": {}, "required": [], "x-ref": "#/components/schemas/VariableCollectionUpdate" }, { "type": "object", "description": "An object that contains details about deleting a `VariableCollection`.", "properties": {}, "required": [], "x-ref": "#/components/schemas/VariableCollectionDelete" }], "discriminator": { "propertyName": "action", "mapping": { "CREATE": "#/components/schemas/VariableCollectionCreate", "UPDATE": "#/components/schemas/VariableCollectionUpdate", "DELETE": "#/components/schemas/VariableCollectionDelete" } }, "x-ref": "#/components/schemas/VariableCollectionChange" }, "key$": "variableCollections" }, "variableModes": { "type": "array", "description": "For creating, updating, and deleting modes within variable collections.", "items": { "oneOf": [{ "type": "object", "description": "An object that contains details about creating a `VariableMode`.", "properties": {}, "required": [], "x-ref": "#/components/schemas/VariableModeCreate" }, { "type": "object", "description": "An object that contains details about updating a `VariableMode`.", "properties": {}, "required": [], "x-ref": "#/components/schemas/VariableModeUpdate" }, { "type": "object", "description": "An object that contains details about deleting a `VariableMode`.", "properties": {}, "required": [], "x-ref": "#/components/schemas/VariableModeDelete" }], "discriminator": { "propertyName": "action", "mapping": { "CREATE": "#/components/schemas/VariableModeCreate", "UPDATE": "#/components/schemas/VariableModeUpdate", "DELETE": "#/components/schemas/VariableModeDelete" } }, "x-ref": "#/components/schemas/VariableModeChange" }, "key$": "variableModes" }, "variables": { "type": "array", "description": "For creating, updating, and deleting variables.", "items": { "oneOf": [{ "type": "object", "description": "An object that contains details about creating a `Variable`.", "properties": {}, "required": [], "x-ref": "#/components/schemas/VariableCreate" }, { "type": "object", "description": "An object that contains details about updating a `Variable`.", "properties": {}, "required": [], "x-ref": "#/components/schemas/VariableUpdate" }, { "type": "object", "description": "An object that contains details about deleting a `Variable`.", "properties": {}, "required": [], "x-ref": "#/components/schemas/VariableDelete" }], "discriminator": { "propertyName": "action", "mapping": { "CREATE": "#/components/schemas/VariableCreate", "UPDATE": "#/components/schemas/VariableUpdate", "DELETE": "#/components/schemas/VariableDelete" } }, "x-ref": "#/components/schemas/VariableChange" }, "key$": "variables" }, "variableModeValues": { "type": "array", "description": "For setting a specific value, given a variable and a mode.", "items": { "type": "object", "description": "An object that represents a value for a given mode of a variable. All properties are required.", "properties": { "variableId": { "type": "string", "description": "The target variable. You can use the temporary id of a variable." }, "modeId": { "type": "string", "description": "Must correspond to a mode in the variable collection that contains the target variable." }, "value": { "description": "The value for the variable. The value must match the variable's type. If setting to a variable alias, the alias must resolve to this type. If overriding a value, the value type must match the variable's type. If removing an overridden value, the value must be `null`.", "oneOf": [], "x-ref": "#/components/schemas/VariableValue" } }, "required": ["variableId", "modeId", "value"], "x-ref": "#/components/schemas/VariableModeValue" }, "key$": "variableModeValues" } }, "index$": 1 } } } }, "parameters": [{ "name": "file_key", "in": "path", "description": "File to modify variables in. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /v1/files/{file_key}/variables/local": { "protocol": "http", "parameters": [{ "name": "file_key", "in": "path", "description": "File to get variables from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /v1/files/{file_key}/variables/published": { "protocol": "http", "parameters": [{ "name": "file_key", "in": "path", "description": "File to get variables from. This must be a main file key, not a branch key, as it is not possible to publish from branches.", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const variable_ref01_ent = client.Variable();
        let variable_ref01_data = setup.data.new.variable['variable_ref01'];
        variable_ref01_data['file_key'] = setup.idmap['file_key01'];
        variable_ref01_data = (await variable_ref01_ent.create(variable_ref01_data)).data();
        (0, node_assert_1.default)(null != variable_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/variable/VariableTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FigmaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['variable01', 'variable02', 'variable03', 'file01', 'file02', 'file03', 'file_key01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FIGMA_TEST_VARIABLE_ENTID': idmap,
        'FIGMA_TEST_LIVE': 'FALSE',
        'FIGMA_TEST_EXPLAIN': 'FALSE',
        'FIGMA_APIKEY': '',
    });
    idmap = env['FIGMA_TEST_VARIABLE_ENTID'];
    const live = 'TRUE' === env.FIGMA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FIGMA_TEST_VARIABLE_ENTID'];
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
//# sourceMappingURL=VariableEntity.test.js.map