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
(0, node_test_1.describe)('PaymentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FIGMA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FigmaSDK.test();
        const ent = testsdk.Payment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.FigmaSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Payment().load({ "community_file_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FIGMA_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'payment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "date_of_purchase": { "a": true, "fo": "date-time", "h": "Date Of Purchase", "n": "date_of_purchase", "r": false, "sh": "The UTC ISO 8601 timestamp indicating when the user purchased the resource.", "t": "`$STRING`", "key$": "date_of_purchase", "index$": 0 }, "payment_status": { "a": true, "h": "Payment Status", "n": "payment_status", "r": true, "sh": "An object describing the user's payment status.", "t": "`$OBJECT`", "key$": "payment_status", "index$": 1 }, "resource_id": { "a": true, "h": "Resource Id", "n": "resource_id", "r": true, "sh": "The ID of the plugin, widget, or Community file that was queried.", "t": "`$STRING`", "key$": "resource_id", "index$": 2 }, "resource_type": { "a": true, "h": "Resource Type", "n": "resource_type", "r": true, "sh": "The type of the resource.", "t": "`$STRING`", "key$": "resource_type", "index$": 3 }, "user_id": { "a": true, "h": "User Id", "n": "user_id", "r": true, "sh": "The ID of the user whose payment information was queried.", "t": "`$STRING`", "key$": "user_id", "index$": 4 } }, "name": "payment", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/payments", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "community_file_id", "or": "community_file_id", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "plugin_id", "or": "plugin_id", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "plugin_payment_token", "or": "plugin_payment_token", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "user_id", "or": "user_id", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "widget_id", "or": "widget_id", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/v1/payments", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "payments" }], "t": { "req": "`reqdata`", "res": "`body.meta`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "payment", "name__orig": "payment", "Name": "Payment", "name_": "payment", "name-": "payment", "NAME": "PAYMENT", "index$": 12 }, { "active": true, "entity": "payment", "key$": "BasicPaymentFlow", "kind": "basic", "name": "BasicPaymentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "payment_ref01", "srcdatavar": "payment_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-payment_ref01" } }], "index$": 0 }] }, 'Payment', { "GET /v1/payments": { "protocol": "http", "parameters": [{ "name": "plugin_payment_token", "in": "query", "description": "Short-lived token returned from \"getPluginPaymentTokenAsync\" in the plugin payments API and used to authenticate to this endpoint. Read more about generating this token through \"Calling the Payments REST API from a plugin or widget\" below.", "schema": { "type": "string" }, "index$": 0 }, { "name": "user_id", "in": "query", "description": "The ID of the user to query payment information about. You can get the user ID by having the user OAuth2 to the Figma REST API.", "schema": { "type": "string" }, "index$": 1 }, { "name": "community_file_id", "in": "query", "description": "The ID of the Community file to query a user's payment information on. You can get the Community file ID from the file's Community page (look for the number after \"file/\" in the URL). Provide exactly one of \"community_file_id\", \"plugin_id\", or \"widget_id\".", "schema": { "type": "string" }, "index$": 2 }, { "name": "plugin_id", "in": "query", "description": "The ID of the plugin to query a user's payment information on. You can get the plugin ID from the plugin's manifest, or from the plugin's Community page (look for the number after \"plugin/\" in the URL). Provide exactly one of \"community_file_id\", \"plugin_id\", or \"widget_id\".", "schema": { "type": "string" }, "index$": 3 }, { "name": "widget_id", "in": "query", "description": "The ID of the widget to query a user's payment information on. You can get the widget ID from the widget's manifest, or from the widget's Community page (look for the number after \"widget/\" in the URL). Provide exactly one of \"community_file_id\", \"plugin_id\", or \"widget_id\".", "schema": { "type": "string" }, "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let payment_ref01_data = Object.values(setup.data.existing.payment)[0];
        // LOAD
        const payment_ref01_ent = client.Payment();
        const payment_ref01_match_dt0 = {};
        const payment_ref01_data_dt0 = (await payment_ref01_ent.load(payment_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != payment_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/payment/PaymentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FigmaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['payment01', 'payment02', 'payment03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FIGMA_TEST_PAYMENT_ENTID': idmap,
        'FIGMA_TEST_LIVE': 'FALSE',
        'FIGMA_TEST_EXPLAIN': 'FALSE',
        'FIGMA_APIKEY': '',
    });
    idmap = env['FIGMA_TEST_PAYMENT_ENTID'];
    const live = 'TRUE' === env.FIGMA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FIGMA_TEST_PAYMENT_ENTID'];
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
//# sourceMappingURL=PaymentEntity.test.js.map