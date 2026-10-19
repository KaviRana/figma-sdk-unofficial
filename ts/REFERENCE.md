# Figma TypeScript SDK Reference

Complete API reference for the Figma TypeScript SDK.


## FigmaSDK

### Constructor

```ts
new FigmaSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FigmaSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = FigmaSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `FigmaSDK` instance in test mode.


### Instance Methods

#### `ActivityLog(data?: object)`

Create a new `ActivityLog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ActivityLogEntity` instance.

#### `AiUsage(data?: object)`

Create a new `AiUsage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AiUsageEntity` instance.

#### `Comment(data?: object)`

Create a new `Comment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CommentEntity` instance.

#### `CommentReaction(data?: object)`

Create a new `CommentReaction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CommentReactionEntity` instance.

#### `Component(data?: object)`

Create a new `Component` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ComponentEntity` instance.

#### `ComponentSet(data?: object)`

Create a new `ComponentSet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ComponentSetEntity` instance.

#### `DevResource(data?: object)`

Create a new `DevResource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DevResourceEntity` instance.

#### `DeveloperLog(data?: object)`

Create a new `DeveloperLog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeveloperLogEntity` instance.

#### `File(data?: object)`

Create a new `File` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FileEntity` instance.

#### `Folder(data?: object)`

Create a new `Folder` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FolderEntity` instance.

#### `LibraryAnalytics(data?: object)`

Create a new `LibraryAnalytics` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LibraryAnalyticsEntity` instance.

#### `OEmbed(data?: object)`

Create a new `OEmbed` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OEmbedEntity` instance.

#### `Payment(data?: object)`

Create a new `Payment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaymentEntity` instance.

#### `Project(data?: object)`

Create a new `Project` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectEntity` instance.

#### `Style(data?: object)`

Create a new `Style` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StyleEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `Variable(data?: object)`

Create a new `Variable` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VariableEntity` instance.

#### `Webhook(data?: object)`

Create a new `Webhook` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebhookEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `FigmaSDK.test()`.

**Returns:** `FigmaSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## ActivityLogEntity

```ts
const activity_log = client.ActivityLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity_logs` | `any[]` | No | An array of activity logs sorted by timestamp in ascending order by default. |
| `cursor` | `string` | No | Encodes the last event (the most recent event) |
| `next_page` | `boolean` | No | Whether there is a next page of events |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ActivityLog().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ActivityLogEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AiUsageEntity

```ts
const ai_usage = client.AiUsage()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `daily` | `/v1/ai_usage/daily` | `client.AiUsage().list({ $action: 'daily', ... })` |

An action returns that action's OWN response, which is not necessarily a
AiUsage record — check the API definition for its shape.

```ts
const result = await client.AiUsage().list({
  $action: 'daily',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AiUsage().list({ end_date: "example", start_date: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AiUsageEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CommentEntity

```ts
const comment = client.Comment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `client_meta` | `any` | Yes | Positioning information of the comment. |
| `comment_id` | `string` | No | The ID of the comment to reply to, if any. |
| `created_at` | `string` | Yes | The UTC ISO 8601 time at which the comment was left |
| `file_key` | `string` | Yes | The file in which the comment lives |
| `id` | `string` | Yes | Unique identifier for comment. |
| `message` | `string` | Yes | The content of the comment |
| `order_id` | `string | null` | Yes | Only set for top level comments. |
| `parent_id` | `string` | No | If present, the id of the comment to which this is the reply |
| `reactions` | `any[]` | Yes | An array of reactions to the comment |
| `resolved_at` | `string | null` | No | If set, the UTC ISO 8601 time the comment was resolved |
| `user` | `Record<string, any>` | Yes | The user who left the comment |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `client_meta` | - | Yes | - |
| `comment_id` | - | - | - |
| `created_at` | - | - | - |
| `file_key` | - | - | - |
| `id` | - | - | - |
| `message` | - | - | - |
| `order_id` | - | - | - |
| `parent_id` | - | - | - |
| `reactions` | - | - | - |
| `resolved_at` | - | - | - |
| `user` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Comment().create({
  file_key: 'example_file_key',
  message: 'example_message',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Comment().list({ file_key: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Comment().remove({ id: 'comment_id', file_key: 'file_key' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CommentEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CommentReactionEntity

```ts
const comment_reaction = client.CommentReaction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes | The UTC ISO 8601 time at which the reaction was left. |
| `emoji` | `string` | Yes | The emoji type of reaction as shortcode (e.g. |
| `error` | `boolean` | Yes | For successful requests, this value is always `false`. |
| `id` | `string` | No |  |
| `status` | `number` | Yes | The status of the request. |
| `user` | `Record<string, any>` | Yes | The user who left the reaction. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CommentReaction().create({
  file_id: 'example_file_id',
  id: 'example_id',
  emoji: 'example_emoji',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CommentReaction().list({ file_id: "example", id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.CommentReaction().remove({ id: 'comment_reaction_id', file_id: 'file_id', emoji: 'emoji' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CommentReactionEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ComponentEntity

```ts
const component = client.Component()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `components` | `any[]` | Yes |  |
| `containing_frame` | `Record<string, any>` | Yes | The containing frame of the component. |
| `created_at` | `string` | Yes | The UTC ISO 8601 time when the component was created. |
| `cursor` | `Record<string, any>` | No | Pagination cursor |
| `description` | `string` | Yes | The description of the component as entered by the publisher. |
| `file_key` | `string` | Yes | The unique identifier of the Figma file that contains the component. |
| `id` | `string` | No |  |
| `key` | `string` | Yes | The unique identifier for the component. |
| `name` | `string` | Yes | The name of the component. |
| `node_id` | `string` | Yes | The unique identifier of the component node within the Figma file. |
| `thumbnail_url` | `string` | No | A URL to a thumbnail image of the component. |
| `updated_at` | `string` | Yes | The UTC ISO 8601 time when the component was last updated. |
| `user` | `Record<string, any>` | Yes | The user who last updated the component. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Component().load({ id: 'component_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ComponentEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ComponentSetEntity

```ts
const component_set = client.ComponentSet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component_sets` | `any[]` | Yes |  |
| `containing_frame` | `Record<string, any>` | Yes | The containing frame of the component set. |
| `created_at` | `string` | Yes | The UTC ISO 8601 time when the component set was created. |
| `cursor` | `Record<string, any>` | No | Pagination cursor |
| `description` | `string` | Yes | The description of the component set as entered by the publisher. |
| `file_key` | `string` | Yes | The unique identifier of the Figma file that contains the component set. |
| `id` | `string` | No |  |
| `key` | `string` | Yes | The unique identifier for the component set. |
| `name` | `string` | Yes | The name of the component set. |
| `node_id` | `string` | Yes | The unique identifier of the component set node within the Figma file. |
| `thumbnail_url` | `string` | No | A URL to a thumbnail image of the component set. |
| `updated_at` | `string` | Yes | The UTC ISO 8601 time when the component set was last updated. |
| `user` | `Record<string, any>` | Yes | The user who last updated the component set. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ComponentSet().load({ id: 'component_set_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ComponentSetEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DevResourceEntity

```ts
const dev_resource = client.DevResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dev_resources` | `any[]` | Yes | An array of dev resources. |
| `errors` | `any[]` | No | An array of errors. |
| `file_key` | `string` | Yes | The file key where the dev resource belongs. |
| `id` | `string` | Yes | Unique identifier of the dev resource |
| `links_created` | `any[]` | Yes | An array of links created. |
| `links_updated` | `any[]` | No | An array of links updated. |
| `name` | `string` | Yes | The name of the dev resource. |
| `node_id` | `string` | Yes | The target node to attach the dev resource to. |
| `url` | `string` | Yes | The URL of the dev resource. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DevResource().create({
  dev_resources: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DevResource().list({ file_key: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.DevResource().remove({ id: 'dev_resource_id', file_key: 'file_key' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DevResource().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DevResourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeveloperLogEntity

```ts
const developer_log = client.DeveloperLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cursor` | `string | null` | No | A cursor for pagination. |
| `date_range` | `string` | No | Filter by date range. |
| `event_source` | `string` | No | Filter by event source. |
| `has_more` | `boolean` | Yes | Whether there are more results available after this page. |
| `ip_address` | `string` | No | Filter by IP address prefix(es). |
| `items` | `any[]` | Yes | An array of developer log entries sorted by timestamp in descending order. |
| `limit` | `number` | No | Maximum number of entries to return. |
| `token` | `string` | No | Filter by token value(s). |
| `token_name` | `string` | No | Filter by token name prefix(es). |
| `token_type` | `string` | No | Filter by the type of token used for authentication. |
| `user_email` | `string` | No | Filter by user email prefix(es). |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DeveloperLog().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeveloperLogEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FileEntity

```ts
const file = client.File()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `branches` | `any[]` | No | A list of branches for this file. |
| `componentSets` | `Record<string, any>` | Yes | A mapping from component set IDs to component set metadata. |
| `components` | `Record<string, any>` | Yes | A mapping from component IDs to component metadata. |
| `document` | `any` | Yes |  |
| `editorType` | `string` | Yes | The type of editor associated with this file. |
| `err` | `null` | Yes | For successful requests, this value is always `null`. |
| `id` | `string` | No |  |
| `images` | `Record<string, any>` | Yes | A map from node IDs to URLs of the rendered images. |
| `lastModified` | `string` | Yes | The UTC ISO 8601 time at which the file was last modified. |
| `linkAccess` | `string` | No | The share permission level of the file link. |
| `mainFileKey` | `string` | No | The key of the main file for this file. |
| `name` | `string` | Yes | The name of the file as it appears in the editor. |
| `role` | `string` | Yes | The role of the user making the API request in relation to the file. |
| `schemaVersion` | `number` | Yes | The version of the file schema that this file uses. |
| `styles` | `Record<string, any>` | Yes | A mapping from style IDs to style metadata. |
| `thumbnailUrl` | `string` | No | A URL to a thumbnail image of the file. |
| `version` | `string` | Yes | The version number of the file. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `version` | `/v1/files/{file_key}/versions` | `client.File().list({ $action: 'version', ... })` |
| `image` | `/v1/files/{file_key}/images` | `client.File().load({ $action: 'image', ... })` |
| `meta` | `/v1/files/{file_key}/meta` | `client.File().load({ $action: 'meta', ... })` |
| `node` | `/v1/files/{file_key}/nodes` | `client.File().load({ $action: 'node', ... })` |

An action returns that action's OWN response, which is not necessarily a
File record — check the API definition for its shape.

```ts
const result = await client.File().list({
  $action: 'version',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.File().list({ file_key: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.File().load({ file_key: 'file_key', ids: 'ids' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FileEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FolderEntity

```ts
const folder = client.Folder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The time at which the folder was created. |
| `id` | `string` | Yes | The ID of the folder. |
| `name` | `string` | Yes | The name of the folder. |
| `parent_folder_id` | `string | null` | Yes | The ID of the folder's parent folder, or null if the folder is a top-level folder in the team. |
| `sharing_audience_control` | `string` | No | The audience that can access the folder. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `file` | `/v2/folders/{folder_id}/files` | `client.Folder().list({ $action: 'file', ... })` |
| `meta` | `/v2/folders/{folder_id}/meta` | `client.Folder().load({ $action: 'meta', ... })` |

An action returns that action's OWN response, which is not necessarily a
Folder record — check the API definition for its shape.

```ts
const result = await client.Folder().list({
  $action: 'file',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Folder().list({ id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Folder().load({ id: 'folder_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FolderEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LibraryAnalyticsEntity

```ts
const library_analytics = client.LibraryAnalytics()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cursor` | `string` | No | The cursor to use to fetch the next page of data. |
| `next_page` | `boolean` | Yes | Whether there is a next page of data that can be fetched. |
| `rows` | `any` | Yes | An array of analytics data. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LibraryAnalytics().load({ library_id: 'library_id', group_by: 'group_by' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LibraryAnalyticsEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OEmbedEntity

```ts
const o_embed = client.OEmbed()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cache_age` | `number` | Yes | Suggested cache lifetime for this response in seconds. |
| `folder_name` | `string` | No | The name of the folder containing the file, if the file resides in a folder. |
| `height` | `number` | Yes | Height of the embed in pixels. |
| `html` | `string` | Yes | The HTML for embedding the file. |
| `is_published_site` | `boolean` | No | Only present and "true" when the resource is a published Make. |
| `key` | `string` | No | The key of the Figma file. |
| `provider_name` | `string` | Yes | The name of the content provider. |
| `provider_url` | `string` | Yes | The URL of the content provider's website. |
| `thumbnail_height` | `number` | No | Height of the thumbnail image in pixels. |
| `thumbnail_url` | `string` | No | URL of a thumbnail image for the file. |
| `thumbnail_width` | `number` | No | Width of the thumbnail image in pixels. |
| `title` | `string` | Yes | The title of the Figma file or published Make site. |
| `type` | `string` | Yes | The oEmbed response type. |
| `url` | `string` | Yes | The canonical URL of the resource. |
| `version` | `string` | Yes | The oEmbed specification version. |
| `width` | `number` | Yes | Width of the embed in pixels. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.OEmbed().load({ url: 'url' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OEmbedEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaymentEntity

```ts
const payment = client.Payment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_of_purchase` | `string` | No | The UTC ISO 8601 timestamp indicating when the user purchased the resource. |
| `payment_status` | `Record<string, any>` | Yes | An object describing the user's payment status. |
| `resource_id` | `string` | Yes | The ID of the plugin, widget, or Community file that was queried. |
| `resource_type` | `string` | Yes | The type of the resource. |
| `user_id` | `string` | Yes | The ID of the user whose payment information was queried. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Payment().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaymentEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectEntity

```ts
const project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | The ID of the project. |
| `name` | `string` | Yes | The name of the project. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `file` | `/v1/projects/{project_id}/files` | `client.Project().list({ $action: 'file', ... })` |
| `meta` | `/v1/projects/{project_id}/meta` | `client.Project().load({ $action: 'meta', ... })` |

An action returns that action's OWN response, which is not necessarily a
Project record — check the API definition for its shape.

```ts
const result = await client.Project().list({
  $action: 'file',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Project().list({ team_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Project().load({ id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StyleEntity

```ts
const style = client.Style()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes | The UTC ISO 8601 time when the style was created. |
| `cursor` | `Record<string, any>` | No | Pagination cursor |
| `description` | `string` | Yes | The description of the style as entered by the publisher. |
| `file_key` | `string` | Yes | The unique identifier of the Figma file that contains the style. |
| `id` | `string` | No |  |
| `key` | `string` | Yes | The unique identifier for the style |
| `name` | `string` | Yes | The name of the style. |
| `node_id` | `string` | Yes | ID of the style node within the figma file |
| `sort_position` | `string` | Yes | A user specified order number by which the style can be sorted. |
| `style_type` | `string` | Yes | The type of style |
| `styles` | `any[]` | Yes |  |
| `thumbnail_url` | `string` | No | A URL to a thumbnail image of the style. |
| `updated_at` | `string` | Yes | The UTC ISO 8601 time when the style was last updated. |
| `user` | `Record<string, any>` | Yes | The user who last updated the style. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Style().load({ id: 'style_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StyleEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | Email associated with the user's account. |
| `handle` | `string` | Yes | Name of the user. |
| `id` | `string` | Yes | Unique stable id of the user. |
| `img_url` | `string` | Yes | URL link to the user's profile image. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.User().load({ id: 'user_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VariableEntity

```ts
const variable = client.Variable()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `tempIdToRealId` | `Record<string, any>` | Yes | A map of temporary ids in the request to the real ids of the newly created objects |
| `variableCollections` | `any[]` | No | For creating, updating, and deleting variable collections. |
| `variableModeValues` | `any[]` | No | For setting a specific value, given a variable and a mode. |
| `variableModes` | `any[]` | No | For creating, updating, and deleting modes within variable collections. |
| `variables` | `any[]` | No | For creating, updating, and deleting variables. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `local` | `/v1/files/{file_key}/variables/local` | `client.Variable().load({ $action: 'local', ... })` |
| `published` | `/v1/files/{file_key}/variables/published` | `client.Variable().load({ $action: 'published', ... })` |

An action returns that action's OWN response, which is not necessarily a
Variable record — check the API definition for its shape.

```ts
const result = await client.Variable().load({
  $action: 'local',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Variable().create({
  file_key: 'example_file_key',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VariableEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebhookEntity

```ts
const webhook = client.Webhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | `string | null` | Yes | The client ID of the OAuth application that registered this webhook, if any |
| `context` | `string` | Yes | The type of context this webhook is attached to. |
| `context_id` | `string` | Yes | The ID of the context this webhook is attached to |
| `description` | `string | null` | Yes | Optional user-provided description or name for the webhook. |
| `endpoint` | `string` | Yes | The endpoint that will be hit when the webhook is triggered |
| `event_type` | `string` | Yes | The event this webhook triggers on |
| `id` | `string` | Yes | The ID of the webhook |
| `passcode` | `string` | Yes | The passcode that will be passed back to the webhook endpoint. |
| `plan_api_id` | `string` | Yes | The plan API ID of the team or organization where this webhook was created |
| `status` | `string` | Yes | The current status of the webhook |
| `team_id` | `string` | Yes | The team id you are subscribed to for updates. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `client_id` | - | - | - | - | - |
| `context` | - | - | - | - | - |
| `context_id` | - | - | - | - | - |
| `description` | - | - | Yes | Yes | - |
| `endpoint` | - | - | - | - | - |
| `event_type` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `passcode` | - | - | - | - | - |
| `plan_api_id` | - | - | - | - | - |
| `status` | - | - | Yes | Yes | - |
| `team_id` | - | - | Yes | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `request` | `/v2/webhooks/{webhook_id}/requests` | `client.Webhook().list({ $action: 'request', ... })` |

An action returns that action's OWN response, which is not necessarily a
Webhook record — check the API definition for its shape.

```ts
const result = await client.Webhook().list({
  $action: 'request',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Webhook().create({
  context: 'example_context',
  context_id: 'example_context_id',
  endpoint: 'example_endpoint',
  event_type: 'example_event_type',
  passcode: 'example_passcode',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Webhook().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Webhook().load({ id: 'webhook_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Webhook().remove({ id: 'webhook_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Webhook().update({
  id: 'webhook_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebhookEntity` instance with the same client and
options.

#### `client()`

Return the parent `FigmaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `cache` | 0.0.1 | Response cache |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new FigmaSDK({
  feature: {
    cache: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`cache`, `ratelimit`, `retry` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `cache`

Response cache.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `256` |
| `methods` | `['GET']` |
| `ttl` | `5000` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.cache.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

