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
(0, node_test_1.describe)('FileEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FIGMA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FIGMA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FigmaSDK.test();
        const ent = testsdk.File();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.FigmaSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.File().list({ "file_key": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FIGMA_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'file.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "branches": { "a": true, "h": "Branches", "n": "branches", "r": false, "sh": "A list of branches for this file.", "t": "`$ARRAY`", "key$": "branches", "index$": 0 }, "componentSets": { "a": true, "h": "Component Sets", "n": "componentSets", "r": true, "sh": "A mapping from component set IDs to component set metadata.", "t": "`$OBJECT`", "key$": "componentSets", "index$": 1 }, "components": { "a": true, "h": "Components", "n": "components", "r": true, "sh": "A mapping from component IDs to component metadata.", "t": "`$OBJECT`", "key$": "components", "index$": 2 }, "document": { "a": true, "h": "Document", "n": "document", "r": true, "t": "`$ANY`", "union": { "branches": 7, "count": 17, "depth": 26 }, "key$": "document", "index$": 3 }, "editorType": { "a": true, "h": "Editor Type", "n": "editorType", "r": true, "sh": "The type of editor associated with this file.", "t": "`$STRING`", "key$": "editorType", "index$": 4 }, "err": { "a": true, "h": "Err", "n": "err", "r": true, "sh": "For successful requests, this value is always `null`.", "t": "`$NULL`", "key$": "err", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 6 }, "images": { "a": true, "h": "Images", "n": "images", "r": true, "sh": "A map from node IDs to URLs of the rendered images.", "t": "`$OBJECT`", "key$": "images", "index$": 7 }, "lastModified": { "a": true, "fo": "date-time", "h": "Last Modified", "n": "lastModified", "r": true, "sh": "The UTC ISO 8601 time at which the file was last modified.", "t": "`$STRING`", "key$": "lastModified", "index$": 8 }, "linkAccess": { "a": true, "h": "Link Access", "n": "linkAccess", "r": false, "sh": "The share permission level of the file link.", "t": "`$STRING`", "key$": "linkAccess", "index$": 9 }, "mainFileKey": { "a": true, "h": "Main File Key", "n": "mainFileKey", "r": false, "sh": "The key of the main file for this file.", "t": "`$STRING`", "key$": "mainFileKey", "index$": 10 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The name of the file as it appears in the editor.", "t": "`$STRING`", "key$": "name", "index$": 11 }, "role": { "a": true, "h": "Role", "n": "role", "r": true, "sh": "The role of the user making the API request in relation to the file.", "t": "`$STRING`", "key$": "role", "index$": 12 }, "schemaVersion": { "a": true, "h": "Schema Version", "n": "schemaVersion", "r": true, "sh": "The version of the file schema that this file uses.", "t": "`$NUMBER`", "key$": "schemaVersion", "index$": 13 }, "styles": { "a": true, "h": "Styles", "n": "styles", "r": true, "sh": "A mapping from style IDs to style metadata.", "t": "`$OBJECT`", "key$": "styles", "index$": 14 }, "thumbnailUrl": { "a": true, "h": "Thumbnail Url", "n": "thumbnailUrl", "r": false, "sh": "A URL to a thumbnail image of the file.", "t": "`$STRING`", "key$": "thumbnailUrl", "index$": 15 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "sh": "The version number of the file.", "t": "`$STRING`", "key$": "version", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "file", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/files/{file_key}/versions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "file_key", "or": "file_key", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "after", "or": "after", "r": false, "t": "`$NUMBER`", "index$": 0 }, { "a": true, "k": "query", "n": "before", "or": "before", "r": false, "t": "`$NUMBER`", "index$": 1 }, { "a": true, "k": "query", "n": "page_size", "or": "page_size", "r": false, "t": "`$NUMBER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v1/files/{file_key}/versions", "q": { "$action": "version", "exist": ["file_key"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "files" }, { "var": "file_key" }, { "lit": "versions" }], "t": { "req": "`reqdata`", "res": "`body.versions`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/files/{file_key}/nodes", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "file_key", "or": "file_key", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "depth", "or": "depth", "r": false, "t": "`$NUMBER`", "index$": 0 }, { "a": true, "k": "query", "n": "geometry", "or": "geometry", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "ids", "or": "ids", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "plugin_data", "or": "plugin_data", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "version", "or": "version", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/v1/files/{file_key}/nodes", "q": { "$action": "node", "exist": ["file_key", "ids"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "files" }, { "var": "file_key" }, { "lit": "nodes" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/images/{file_key}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "file_key", "or": "file_key", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": true, "k": "query", "n": "contents_only", "or": "contents_only", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": "png", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "ids", "or": "ids", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "scale", "or": "scale", "r": false, "t": "`$NUMBER`", "index$": 3 }, { "a": true, "ex": false, "k": "query", "n": "svg_include_id", "or": "svg_include_id", "r": false, "t": "`$BOOLEAN`", "index$": 4 }, { "a": true, "ex": false, "k": "query", "n": "svg_include_node_id", "or": "svg_include_node_id", "r": false, "t": "`$BOOLEAN`", "index$": 5 }, { "a": true, "ex": true, "k": "query", "n": "svg_outline_text", "or": "svg_outline_text", "r": false, "t": "`$BOOLEAN`", "index$": 6 }, { "a": true, "ex": true, "k": "query", "n": "svg_simplify_stroke", "or": "svg_simplify_stroke", "r": false, "t": "`$BOOLEAN`", "index$": 7 }, { "a": true, "ex": false, "k": "query", "n": "use_absolute_bound", "or": "use_absolute_bounds", "r": false, "t": "`$BOOLEAN`", "index$": 8 }, { "a": true, "k": "query", "n": "version", "or": "version", "r": false, "t": "`$STRING`", "index$": 9 }] }, "k": "http", "m": "GET", "o": "/v1/images/{file_key}", "q": { "exist": ["file_key", "ids"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "images" }, { "var": "file_key" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /v1/files/{file_key}/images", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "file_key", "or": "file_key", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/files/{file_key}/images", "q": { "$action": "image", "exist": ["file_key"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "files" }, { "var": "file_key" }, { "lit": "images" }], "t": { "req": "`reqdata`", "res": "`body.meta`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /v1/files/{file_key}/meta", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "file_key", "or": "file_key", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/files/{file_key}/meta", "q": { "$action": "meta", "exist": ["file_key"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "files" }, { "var": "file_key" }, { "lit": "meta" }], "t": { "req": "`reqdata`", "res": "`body.file`" }, "index$": 3 }, { "a": true, "co": { "id": "GET /v1/files/{file_key}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "file_key", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": false, "k": "query", "n": "branch_data", "or": "branch_data", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "depth", "or": "depth", "r": false, "t": "`$NUMBER`", "index$": 1 }, { "a": true, "k": "query", "n": "geometry", "or": "geometry", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "ids", "or": "ids", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "plugin_data", "or": "plugin_data", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "version", "or": "version", "r": false, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/v1/files/{file_key}", "q": { "exist": ["id"] }, "r": { "param": { "file_key": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "files" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "file", "name__orig": "file", "Name": "File", "name_": "file", "name-": "file", "NAME": "FILE", "index$": 8 }, { "active": true, "entity": "file", "key$": "BasicFileFlow", "kind": "basic", "name": "BasicFileFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "file_key": "file_key01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "file_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "file_ref01", "srcdatavar": "file_ref01_data", "suffix": "_dt0" }, "m": { "id": "file01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-file_ref01" } }], "index$": 1 }] }, 'File', { "GET /v1/files/{file_key}/versions": { "protocol": "http", "parameters": [{ "name": "file_key", "in": "path", "description": "File to get version history from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "page_size", "in": "query", "description": "The number of items returned in a page of the response. If not included, `page_size` is `30`.", "schema": { "type": "number", "maximum": 50 }, "index$": 1 }, { "name": "before", "in": "query", "description": "A version ID for one of the versions in the history. Gets versions before this ID. Used for paginating. If the response is not paginated, this link returns the same data in the current response.", "schema": { "type": "number" }, "index$": 2 }, { "name": "after", "in": "query", "description": "A version ID for one of the versions in the history. Gets versions after this ID. Used for paginating. If the response is not paginated, this property is not included.", "schema": { "type": "number" }, "index$": 3 }] }, "GET /v1/files/{file_key}/nodes": { "protocol": "http", "parameters": [{ "name": "file_key", "in": "path", "description": "File to export JSON from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "ids", "in": "query", "description": "A comma separated list of node IDs to retrieve and convert.", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "version", "in": "query", "description": "A specific version ID to get. Omitting this will get the current version of the file.", "schema": { "type": "string" }, "index$": 2 }, { "name": "depth", "in": "query", "description": "Positive integer representing how deep into the node tree to traverse. For example, setting this to 1 will return only the children directly underneath the desired nodes. Not setting this parameter returns all nodes.\n\nNote: this parameter behaves differently from the same parameter in the `GET /v1/files/:key` endpoint. In this endpoint, the depth will be counted starting from the desired node rather than the document root node.", "schema": { "type": "number" }, "index$": 3 }, { "name": "geometry", "in": "query", "description": "Set to \"paths\" to export vector data.", "schema": { "type": "string" }, "index$": 4 }, { "name": "plugin_data", "in": "query", "description": "A comma separated list of plugin IDs and/or the string \"shared\". Any data present in the document written by those plugins will be included in the result in the `pluginData` and `sharedPluginData` properties.", "schema": { "type": "string" }, "index$": 5 }] }, "GET /v1/images/{file_key}": { "protocol": "http", "parameters": [{ "name": "file_key", "in": "path", "description": "File to export images from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "ids", "in": "query", "description": "A comma separated list of node IDs to render.", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "version", "in": "query", "description": "A specific version ID to get. Omitting this will get the current version of the file.", "schema": { "type": "string" }, "index$": 2 }, { "name": "scale", "in": "query", "description": "A number between 0.01 and 4, the image scaling factor.", "schema": { "type": "number", "minimum": 0.01, "maximum": 4 }, "index$": 3 }, { "name": "format", "in": "query", "description": "A string enum for the image output format.", "schema": { "type": "string", "enum": ["jpg", "png", "svg", "pdf"], "default": "png" }, "index$": 4 }, { "name": "svg_outline_text", "in": "query", "description": "Whether text elements are rendered as outlines (vector paths) or as `<text>` elements in SVGs.\n\nRendering text elements as outlines guarantees that the text looks exactly the same in the SVG as it does in the browser/inside Figma.\n\nExporting as `<text>` allows text to be selectable inside SVGs and generally makes the SVG easier to read. However, this relies on the browser's rendering engine which can vary between browsers and/or operating systems. As such, visual accuracy is not guaranteed as the result could look different than in Figma.", "schema": { "type": "boolean", "default": true }, "index$": 5 }, { "name": "svg_include_id", "in": "query", "description": "Whether to include id attributes for all SVG elements. Adds the layer name to the `id` attribute of an svg element.", "schema": { "type": "boolean", "default": false }, "index$": 6 }, { "name": "svg_include_node_id", "in": "query", "description": "Whether to include node id attributes for all SVG elements. Adds the node id to a `data-node-id` attribute of an svg element.", "schema": { "type": "boolean", "default": false }, "index$": 7 }, { "name": "svg_simplify_stroke", "in": "query", "description": "Whether to simplify inside/outside strokes and use stroke attribute if possible instead of `<mask>`.", "schema": { "type": "boolean", "default": true }, "index$": 8 }, { "name": "contents_only", "in": "query", "description": "Whether content that overlaps the node should be excluded from rendering. Passing false (i.e., rendering overlaps) may increase processing time, since more of the document must be included in rendering.", "schema": { "type": "boolean", "default": true }, "index$": 9 }, { "name": "use_absolute_bounds", "in": "query", "description": "Use the full dimensions of the node regardless of whether or not it is cropped or the space around it is empty. Use this to export text nodes without cropping.", "schema": { "type": "boolean", "default": false }, "index$": 10 }] }, "GET /v1/files/{file_key}/images": { "protocol": "http", "parameters": [{ "name": "file_key", "in": "path", "description": "File to get image URLs from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /v1/files/{file_key}/meta": { "protocol": "http", "parameters": [{ "name": "file_key", "in": "path", "description": "File to get metadata for. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /v1/files/{file_key}": { "protocol": "http", "parameters": [{ "name": "file_key", "in": "path", "description": "File to export JSON from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "version", "in": "query", "description": "A specific version ID to get. Omitting this will get the current version of the file.", "schema": { "type": "string" }, "index$": 1 }, { "name": "ids", "in": "query", "description": "Comma separated list of nodes that you care about in the document. If specified, only a subset of the document will be returned corresponding to the nodes listed, their children, and everything between the root node and the listed nodes.\n\nNote: There may be other nodes included in the returned JSON that are outside the ancestor chains of the desired nodes. The response may also include dependencies of anything in the nodes' subtrees. For example, if a node subtree contains an instance of a local component that lives elsewhere in that file, that component and its ancestor chain will also be included.\n\nFor historical reasons, top-level canvas nodes are always returned, regardless of whether they are listed in the `ids` parameter. This quirk may be removed in a future version of the API.", "schema": { "type": "string" }, "index$": 2 }, { "name": "depth", "in": "query", "description": "Positive integer representing how deep into the document tree to traverse. For example, setting this to 1 returns only Pages, setting it to 2 returns Pages and all top level objects on each page. Not setting this parameter returns all nodes.", "schema": { "type": "number" }, "index$": 3 }, { "name": "geometry", "in": "query", "description": "Set to \"paths\" to export vector data.", "schema": { "type": "string" }, "index$": 4 }, { "name": "plugin_data", "in": "query", "description": "A comma separated list of plugin IDs and/or the string \"shared\". Any data present in the document written by those plugins will be included in the result in the `pluginData` and `sharedPluginData` properties.", "schema": { "type": "string" }, "index$": 5 }, { "name": "branch_data", "in": "query", "description": "Returns branch metadata for the requested file. If the file is a branch, the main file's key will be included in the returned response. If the file has branches, their metadata will be included in the returned response. Default: false.", "schema": { "type": "boolean", "default": false }, "index$": 6 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let file_ref01_data = Object.values(setup.data.existing.file)[0];
        // LIST
        const file_ref01_ent = client.File();
        const file_ref01_match = {};
        file_ref01_match['file_key'] = setup.idmap['file_key01'];
        const file_ref01_list = (await file_ref01_ent.list(file_ref01_match)).map((e) => e.data());
        // LOAD
        const file_ref01_match_dt0 = {};
        file_ref01_match_dt0.id = file_ref01_data.id;
        const file_ref01_data_dt0 = (await file_ref01_ent.load(file_ref01_match_dt0)).data();
        (0, node_assert_1.default)(file_ref01_data_dt0.id === file_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/file/FileTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FigmaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['file01', 'file02', 'file03', 'file_key01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FIGMA_TEST_FILE_ENTID': idmap,
        'FIGMA_TEST_LIVE': 'FALSE',
        'FIGMA_TEST_EXPLAIN': 'FALSE',
        'FIGMA_APIKEY': '',
    });
    idmap = env['FIGMA_TEST_FILE_ENTID'];
    const live = 'TRUE' === env.FIGMA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FIGMA_TEST_FILE_ENTID'];
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
//# sourceMappingURL=FileEntity.test.js.map