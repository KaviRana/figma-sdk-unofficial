# Figma TypeScript SDK



The TypeScript SDK for the Figma API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.ActivityLog()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/figma-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/figma-sdk
npm install ./figma-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record. The client sends the API key in the `X-Figma-Token` header.

### 1. Create a client

```ts
import { FigmaSDK } from '@voxgig-sdk/figma-sdk'

const client = new FigmaSDK({
  apikey: process.env.FIGMA_APIKEY,
})
```

### 3. Load an activitylog

`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const activitylog = await client.ActivityLog().load()
  console.log(activitylog.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const payment = await client.Payment().load()
  console.log(payment.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = FigmaSDK.test()

const payment = await client.Payment().load()
// payment is the Payment entity; .data() reads its mock record
console.log(payment.data())
```

You can also use the instance method:

```ts
const client = new FigmaSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Payment()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new FigmaSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FIGMA_TEST_LIVE=TRUE
FIGMA_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### FigmaSDK

#### Constructor

```ts
new FigmaSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `ActivityLog(data?)` | `ActivityLogEntity` | Create an ActivityLog entity instance. |
| `AiUsage(data?)` | `AiUsageEntity` | Create an AiUsage entity instance. |
| `Comment(data?)` | `CommentEntity` | Create a Comment entity instance. |
| `CommentReaction(data?)` | `CommentReactionEntity` | Create a CommentReaction entity instance. |
| `Component(data?)` | `ComponentEntity` | Create a Component entity instance. |
| `ComponentSet(data?)` | `ComponentSetEntity` | Create a ComponentSet entity instance. |
| `DevResource(data?)` | `DevResourceEntity` | Create a DevResource entity instance. |
| `DeveloperLog(data?)` | `DeveloperLogEntity` | Create a DeveloperLog entity instance. |
| `File(data?)` | `FileEntity` | Create a File entity instance. |
| `Folder(data?)` | `FolderEntity` | Create a Folder entity instance. |
| `LibraryAnalytics(data?)` | `LibraryAnalyticsEntity` | Create a LibraryAnalytics entity instance. |
| `OEmbed(data?)` | `OEmbedEntity` | Create an OEmbed entity instance. |
| `Payment(data?)` | `PaymentEntity` | Create a Payment entity instance. |
| `Project(data?)` | `ProjectEntity` | Create a Project entity instance. |
| `Style(data?)` | `StyleEntity` | Create a Style entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `Variable(data?)` | `VariableEntity` | Create a Variable entity instance. |
| `Webhook(data?)` | `WebhookEntity` | Create a Webhook entity instance. |
| `tester(testopts?, sdkopts?)` | `FigmaSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `FigmaSDK.test(testopts?, sdkopts?)` | `FigmaSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FigmaSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### ActivityLog

| Field | Description |
| --- | --- |
| `activity_logs` | An array of activity logs sorted by timestamp in ascending order by default. |
| `cursor` | Encodes the last event (the most recent event) |
| `next_page` | Whether there is a next page of events |

Operations: load.

API path: `/v1/activity_logs`

#### AiUsage

| Field | Description |
| --- | --- |

Operations: list.

API path: `/v1/ai_usage/daily`

#### Comment

| Field | Description |
| --- | --- |
| `client_meta` | Positioning information of the comment. |
| `comment_id` | The ID of the comment to reply to, if any. |
| `created_at` | The UTC ISO 8601 time at which the comment was left |
| `file_key` | The file in which the comment lives |
| `id` | Unique identifier for comment. |
| `message` | The content of the comment |
| `order_id` | Only set for top level comments. |
| `parent_id` | If present, the id of the comment to which this is the reply |
| `reactions` | An array of reactions to the comment |
| `resolved_at` | If set, the UTC ISO 8601 time the comment was resolved |
| `user` | The user who left the comment |

Operations: create, list, remove.

API path: `/v1/files/{file_key}/comments`

#### CommentReaction

| Field | Description |
| --- | --- |
| `created_at` | The UTC ISO 8601 time at which the reaction was left. |
| `emoji` | The emoji type of reaction as shortcode (e.g. |
| `error` | For successful requests, this value is always `false`. |
| `id` |  |
| `status` | The status of the request. |
| `user` | The user who left the reaction. |

Operations: create, list, remove.

API path: `/v1/files/{file_key}/comments/{comment_id}/reactions`

#### Component

| Field | Description |
| --- | --- |
| `components` |  |
| `containing_frame` | The containing frame of the component. |
| `created_at` | The UTC ISO 8601 time when the component was created. |
| `cursor` | Pagination cursor |
| `description` | The description of the component as entered by the publisher. |
| `file_key` | The unique identifier of the Figma file that contains the component. |
| `id` |  |
| `key` | The unique identifier for the component. |
| `name` | The name of the component. |
| `node_id` | The unique identifier of the component node within the Figma file. |
| `thumbnail_url` | A URL to a thumbnail image of the component. |
| `updated_at` | The UTC ISO 8601 time when the component was last updated. |
| `user` | The user who last updated the component. |

Operations: load.

API path: `/v1/files/{file_key}/components`

#### ComponentSet

| Field | Description |
| --- | --- |
| `component_sets` |  |
| `containing_frame` | The containing frame of the component set. |
| `created_at` | The UTC ISO 8601 time when the component set was created. |
| `cursor` | Pagination cursor |
| `description` | The description of the component set as entered by the publisher. |
| `file_key` | The unique identifier of the Figma file that contains the component set. |
| `id` |  |
| `key` | The unique identifier for the component set. |
| `name` | The name of the component set. |
| `node_id` | The unique identifier of the component set node within the Figma file. |
| `thumbnail_url` | A URL to a thumbnail image of the component set. |
| `updated_at` | The UTC ISO 8601 time when the component set was last updated. |
| `user` | The user who last updated the component set. |

Operations: load.

API path: `/v1/files/{file_key}/component_sets`

#### DevResource

| Field | Description |
| --- | --- |
| `dev_resources` | An array of dev resources. |
| `errors` | An array of errors. |
| `file_key` | The file key where the dev resource belongs. |
| `id` | Unique identifier of the dev resource |
| `links_created` | An array of links created. |
| `links_updated` | An array of links updated. |
| `name` | The name of the dev resource. |
| `node_id` | The target node to attach the dev resource to. |
| `url` | The URL of the dev resource. |

Operations: create, list, remove, update.

API path: `/v1/dev_resources`

#### DeveloperLog

| Field | Description |
| --- | --- |
| `cursor` | A cursor for pagination. |
| `date_range` | Filter by date range. |
| `event_source` | Filter by event source. |
| `has_more` | Whether there are more results available after this page. |
| `ip_address` | Filter by IP address prefix(es). |
| `items` | An array of developer log entries sorted by timestamp in descending order. |
| `limit` | Maximum number of entries to return. |
| `token` | Filter by token value(s). |
| `token_name` | Filter by token name prefix(es). |
| `token_type` | Filter by the type of token used for authentication. |
| `user_email` | Filter by user email prefix(es). |

Operations: create.

API path: `/v1/developer_logs`

#### File

| Field | Description |
| --- | --- |
| `branches` | A list of branches for this file. |
| `componentSets` | A mapping from component set IDs to component set metadata. |
| `components` | A mapping from component IDs to component metadata. |
| `document` |  |
| `editorType` | The type of editor associated with this file. |
| `err` | For successful requests, this value is always `null`. |
| `id` |  |
| `images` | A map from node IDs to URLs of the rendered images. |
| `lastModified` | The UTC ISO 8601 time at which the file was last modified. |
| `linkAccess` | The share permission level of the file link. |
| `mainFileKey` | The key of the main file for this file. |
| `name` | The name of the file as it appears in the editor. |
| `role` | The role of the user making the API request in relation to the file. |
| `schemaVersion` | The version of the file schema that this file uses. |
| `styles` | A mapping from style IDs to style metadata. |
| `thumbnailUrl` | A URL to a thumbnail image of the file. |
| `version` | The version number of the file. |

Operations: list, load.

API path: `/v1/files/{file_key}/versions`

#### Folder

| Field | Description |
| --- | --- |
| `created_at` | The time at which the folder was created. |
| `id` | The ID of the folder. |
| `name` | The name of the folder. |
| `parent_folder_id` | The ID of the folder's parent folder, or null if the folder is a top-level folder in the team. |
| `sharing_audience_control` | The audience that can access the folder. |

Operations: list, load.

API path: `/v2/folders/{folder_id}/files`

#### LibraryAnalytics

| Field | Description |
| --- | --- |
| `cursor` | The cursor to use to fetch the next page of data. |
| `next_page` | Whether there is a next page of data that can be fetched. |
| `rows` | An array of analytics data. |

Operations: load.

API path: `/v1/analytics/libraries/{file_key}/component/actions`

#### OEmbed

| Field | Description |
| --- | --- |
| `cache_age` | Suggested cache lifetime for this response in seconds. |
| `folder_name` | The name of the folder containing the file, if the file resides in a folder. |
| `height` | Height of the embed in pixels. |
| `html` | The HTML for embedding the file. |
| `is_published_site` | Only present and "true" when the resource is a published Make. |
| `key` | The key of the Figma file. |
| `provider_name` | The name of the content provider. |
| `provider_url` | The URL of the content provider's website. |
| `thumbnail_height` | Height of the thumbnail image in pixels. |
| `thumbnail_url` | URL of a thumbnail image for the file. |
| `thumbnail_width` | Width of the thumbnail image in pixels. |
| `title` | The title of the Figma file or published Make site. |
| `type` | The oEmbed response type. |
| `url` | The canonical URL of the resource. |
| `version` | The oEmbed specification version. |
| `width` | Width of the embed in pixels. |

Operations: load.

API path: `/v1/oembed`

#### Payment

| Field | Description |
| --- | --- |
| `date_of_purchase` | The UTC ISO 8601 timestamp indicating when the user purchased the resource. |
| `payment_status` | An object describing the user's payment status. |
| `resource_id` | The ID of the plugin, widget, or Community file that was queried. |
| `resource_type` | The type of the resource. |
| `user_id` | The ID of the user whose payment information was queried. |

Operations: load.

API path: `/v1/payments`

#### Project

| Field | Description |
| --- | --- |
| `id` | The ID of the project. |
| `name` | The name of the project. |

Operations: list, load.

API path: `/v1/projects/{project_id}/files`

#### Style

| Field | Description |
| --- | --- |
| `created_at` | The UTC ISO 8601 time when the style was created. |
| `cursor` | Pagination cursor |
| `description` | The description of the style as entered by the publisher. |
| `file_key` | The unique identifier of the Figma file that contains the style. |
| `id` |  |
| `key` | The unique identifier for the style |
| `name` | The name of the style. |
| `node_id` | ID of the style node within the figma file |
| `sort_position` | A user specified order number by which the style can be sorted. |
| `style_type` | The type of style |
| `styles` |  |
| `thumbnail_url` | A URL to a thumbnail image of the style. |
| `updated_at` | The UTC ISO 8601 time when the style was last updated. |
| `user` | The user who last updated the style. |

Operations: load.

API path: `/v1/files/{file_key}/styles`

#### User

| Field | Description |
| --- | --- |
| `email` | Email associated with the user's account. |
| `handle` | Name of the user. |
| `id` | Unique stable id of the user. |
| `img_url` | URL link to the user's profile image. |

Operations: load.

API path: `/v1/me`

#### Variable

| Field | Description |
| --- | --- |
| `tempIdToRealId` | A map of temporary ids in the request to the real ids of the newly created objects |
| `variableCollections` | For creating, updating, and deleting variable collections. |
| `variableModeValues` | For setting a specific value, given a variable and a mode. |
| `variableModes` | For creating, updating, and deleting modes within variable collections. |
| `variables` | For creating, updating, and deleting variables. |

Operations: create, load.

API path: `/v1/files/{file_key}/variables`

#### Webhook

| Field | Description |
| --- | --- |
| `client_id` | The client ID of the OAuth application that registered this webhook, if any |
| `context` | The type of context this webhook is attached to. |
| `context_id` | The ID of the context this webhook is attached to |
| `description` | Optional user-provided description or name for the webhook. |
| `endpoint` | The endpoint that will be hit when the webhook is triggered |
| `event_type` | The event this webhook triggers on |
| `id` | The ID of the webhook |
| `passcode` | The passcode that will be passed back to the webhook endpoint. |
| `plan_api_id` | The plan API ID of the team or organization where this webhook was created |
| `status` | The current status of the webhook |
| `team_id` | The team id you are subscribed to for updates. |

Operations: create, list, load, remove, update.

API path: `/v2/webhooks`



## Entities


### ActivityLog

Create an instance: `const activity_log = client.ActivityLog()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity_logs` | `any[]` | An array of activity logs sorted by timestamp in ascending order by default. |
| `cursor` | `string` | Encodes the last event (the most recent event) |
| `next_page` | `boolean` | Whether there is a next page of events |

#### Example: Load

```ts
const activity_log = await client.ActivityLog().load()
```


### AiUsage

Create an instance: `const ai_usage = client.AiUsage()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const ai_usages = await client.AiUsage().list({ end_date: "example", start_date: "example" })
```


### Comment

Create an instance: `const comment = client.Comment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `client_meta` | `any` | Positioning information of the comment. |
| `comment_id` | `string` | The ID of the comment to reply to, if any. |
| `created_at` | `string` | The UTC ISO 8601 time at which the comment was left |
| `file_key` | `string` | The file in which the comment lives |
| `id` | `string` | Unique identifier for comment. |
| `message` | `string` | The content of the comment |
| `order_id` | `string | null` | Only set for top level comments. |
| `parent_id` | `string` | If present, the id of the comment to which this is the reply |
| `reactions` | `any[]` | An array of reactions to the comment |
| `resolved_at` | `string | null` | If set, the UTC ISO 8601 time the comment was resolved |
| `user` | `Record<string, any>` | The user who left the comment |

#### Example: List

```ts
const comments = await client.Comment().list({ file_key: "example" })
```

#### Example: Create

```ts
const comment = await client.Comment().create({
  file_key: 'example_file_key',
  message: 'example_message',
})
```


### CommentReaction

Create an instance: `const comment_reaction = client.CommentReaction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The UTC ISO 8601 time at which the reaction was left. |
| `emoji` | `string` | The emoji type of reaction as shortcode (e.g. |
| `error` | `boolean` | For successful requests, this value is always `false`. |
| `id` | `string` |  |
| `status` | `number` | The status of the request. |
| `user` | `Record<string, any>` | The user who left the reaction. |

#### Example: List

```ts
const comment_reactions = await client.CommentReaction().list({ file_id: "example", id: "example" })
```

#### Example: Create

```ts
const comment_reaction = await client.CommentReaction().create({
  file_id: 'example_file_id',
  id: 'example_id',
  emoji: 'example_emoji',
})
```


### Component

Create an instance: `const component = client.Component()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `components` | `any[]` |  |
| `containing_frame` | `Record<string, any>` | The containing frame of the component. |
| `created_at` | `string` | The UTC ISO 8601 time when the component was created. |
| `cursor` | `Record<string, any>` | Pagination cursor |
| `description` | `string` | The description of the component as entered by the publisher. |
| `file_key` | `string` | The unique identifier of the Figma file that contains the component. |
| `id` | `string` |  |
| `key` | `string` | The unique identifier for the component. |
| `name` | `string` | The name of the component. |
| `node_id` | `string` | The unique identifier of the component node within the Figma file. |
| `thumbnail_url` | `string` | A URL to a thumbnail image of the component. |
| `updated_at` | `string` | The UTC ISO 8601 time when the component was last updated. |
| `user` | `Record<string, any>` | The user who last updated the component. |

#### Example: Load

```ts
const component = await client.Component().load({ id: 'component_id' })
```


### ComponentSet

Create an instance: `const component_set = client.ComponentSet()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component_sets` | `any[]` |  |
| `containing_frame` | `Record<string, any>` | The containing frame of the component set. |
| `created_at` | `string` | The UTC ISO 8601 time when the component set was created. |
| `cursor` | `Record<string, any>` | Pagination cursor |
| `description` | `string` | The description of the component set as entered by the publisher. |
| `file_key` | `string` | The unique identifier of the Figma file that contains the component set. |
| `id` | `string` |  |
| `key` | `string` | The unique identifier for the component set. |
| `name` | `string` | The name of the component set. |
| `node_id` | `string` | The unique identifier of the component set node within the Figma file. |
| `thumbnail_url` | `string` | A URL to a thumbnail image of the component set. |
| `updated_at` | `string` | The UTC ISO 8601 time when the component set was last updated. |
| `user` | `Record<string, any>` | The user who last updated the component set. |

#### Example: Load

```ts
const component_set = await client.ComponentSet().load({ id: 'component_set_id' })
```


### DevResource

Create an instance: `const dev_resource = client.DevResource()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dev_resources` | `any[]` | An array of dev resources. |
| `errors` | `any[]` | An array of errors. |
| `file_key` | `string` | The file key where the dev resource belongs. |
| `id` | `string` | Unique identifier of the dev resource |
| `links_created` | `any[]` | An array of links created. |
| `links_updated` | `any[]` | An array of links updated. |
| `name` | `string` | The name of the dev resource. |
| `node_id` | `string` | The target node to attach the dev resource to. |
| `url` | `string` | The URL of the dev resource. |

#### Example: List

```ts
const dev_resources = await client.DevResource().list({ file_key: "example" })
```

#### Example: Create

```ts
const dev_resource = await client.DevResource().create({
  dev_resources: [],
})
```


### DeveloperLog

Create an instance: `const developer_log = client.DeveloperLog()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cursor` | `string | null` | A cursor for pagination. |
| `date_range` | `string` | Filter by date range. |
| `event_source` | `string` | Filter by event source. |
| `has_more` | `boolean` | Whether there are more results available after this page. |
| `ip_address` | `string` | Filter by IP address prefix(es). |
| `items` | `any[]` | An array of developer log entries sorted by timestamp in descending order. |
| `limit` | `number` | Maximum number of entries to return. |
| `token` | `string` | Filter by token value(s). |
| `token_name` | `string` | Filter by token name prefix(es). |
| `token_type` | `string` | Filter by the type of token used for authentication. |
| `user_email` | `string` | Filter by user email prefix(es). |

#### Example: Create

```ts
const developer_log = await client.DeveloperLog().create({
})
```


### File

Create an instance: `const file = client.File()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `branches` | `any[]` | A list of branches for this file. |
| `componentSets` | `Record<string, any>` | A mapping from component set IDs to component set metadata. |
| `components` | `Record<string, any>` | A mapping from component IDs to component metadata. |
| `document` | `any` |  |
| `editorType` | `string` | The type of editor associated with this file. |
| `err` | `null` | For successful requests, this value is always `null`. |
| `id` | `string` |  |
| `images` | `Record<string, any>` | A map from node IDs to URLs of the rendered images. |
| `lastModified` | `string` | The UTC ISO 8601 time at which the file was last modified. |
| `linkAccess` | `string` | The share permission level of the file link. |
| `mainFileKey` | `string` | The key of the main file for this file. |
| `name` | `string` | The name of the file as it appears in the editor. |
| `role` | `string` | The role of the user making the API request in relation to the file. |
| `schemaVersion` | `number` | The version of the file schema that this file uses. |
| `styles` | `Record<string, any>` | A mapping from style IDs to style metadata. |
| `thumbnailUrl` | `string` | A URL to a thumbnail image of the file. |
| `version` | `string` | The version number of the file. |

#### Example: Load

```ts
const file = await client.File().load({ file_key: 'file_key', ids: 'ids' })
```

#### Example: List

```ts
const files = await client.File().list({ file_key: "example" })
```


### Folder

Create an instance: `const folder = client.Folder()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The time at which the folder was created. |
| `id` | `string` | The ID of the folder. |
| `name` | `string` | The name of the folder. |
| `parent_folder_id` | `string | null` | The ID of the folder's parent folder, or null if the folder is a top-level folder in the team. |
| `sharing_audience_control` | `string` | The audience that can access the folder. |

#### Example: Load

```ts
const folder = await client.Folder().load({ id: 'folder_id' })
```

#### Example: List

```ts
const folders = await client.Folder().list({ id: "example" })
```


### LibraryAnalytics

Create an instance: `const library_analytics = client.LibraryAnalytics()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cursor` | `string` | The cursor to use to fetch the next page of data. |
| `next_page` | `boolean` | Whether there is a next page of data that can be fetched. |
| `rows` | `any` | An array of analytics data. |

#### Example: Load

```ts
const library_analytics = await client.LibraryAnalytics().load({ library_id: 'library_id', group_by: 'group_by' })
```


### OEmbed

Create an instance: `const o_embed = client.OEmbed()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cache_age` | `number` | Suggested cache lifetime for this response in seconds. |
| `folder_name` | `string` | The name of the folder containing the file, if the file resides in a folder. |
| `height` | `number` | Height of the embed in pixels. |
| `html` | `string` | The HTML for embedding the file. |
| `is_published_site` | `boolean` | Only present and "true" when the resource is a published Make. |
| `key` | `string` | The key of the Figma file. |
| `provider_name` | `string` | The name of the content provider. |
| `provider_url` | `string` | The URL of the content provider's website. |
| `thumbnail_height` | `number` | Height of the thumbnail image in pixels. |
| `thumbnail_url` | `string` | URL of a thumbnail image for the file. |
| `thumbnail_width` | `number` | Width of the thumbnail image in pixels. |
| `title` | `string` | The title of the Figma file or published Make site. |
| `type` | `string` | The oEmbed response type. |
| `url` | `string` | The canonical URL of the resource. |
| `version` | `string` | The oEmbed specification version. |
| `width` | `number` | Width of the embed in pixels. |

#### Example: Load

```ts
const o_embed = await client.OEmbed().load({ url: 'url' })
```


### Payment

Create an instance: `const payment = client.Payment()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_of_purchase` | `string` | The UTC ISO 8601 timestamp indicating when the user purchased the resource. |
| `payment_status` | `Record<string, any>` | An object describing the user's payment status. |
| `resource_id` | `string` | The ID of the plugin, widget, or Community file that was queried. |
| `resource_type` | `string` | The type of the resource. |
| `user_id` | `string` | The ID of the user whose payment information was queried. |

#### Example: Load

```ts
const payment = await client.Payment().load()
```


### Project

Create an instance: `const project = client.Project()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | The ID of the project. |
| `name` | `string` | The name of the project. |

#### Example: Load

```ts
const project = await client.Project().load({ id: 'project_id' })
```

#### Example: List

```ts
const projects = await client.Project().list({ team_id: "example" })
```


### Style

Create an instance: `const style = client.Style()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The UTC ISO 8601 time when the style was created. |
| `cursor` | `Record<string, any>` | Pagination cursor |
| `description` | `string` | The description of the style as entered by the publisher. |
| `file_key` | `string` | The unique identifier of the Figma file that contains the style. |
| `id` | `string` |  |
| `key` | `string` | The unique identifier for the style |
| `name` | `string` | The name of the style. |
| `node_id` | `string` | ID of the style node within the figma file |
| `sort_position` | `string` | A user specified order number by which the style can be sorted. |
| `style_type` | `string` | The type of style |
| `styles` | `any[]` |  |
| `thumbnail_url` | `string` | A URL to a thumbnail image of the style. |
| `updated_at` | `string` | The UTC ISO 8601 time when the style was last updated. |
| `user` | `Record<string, any>` | The user who last updated the style. |

#### Example: Load

```ts
const style = await client.Style().load({ id: 'style_id' })
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | Email associated with the user's account. |
| `handle` | `string` | Name of the user. |
| `id` | `string` | Unique stable id of the user. |
| `img_url` | `string` | URL link to the user's profile image. |

#### Example: Load

```ts
const user = await client.User().load({ id: 'user_id' })
```


### Variable

Create an instance: `const variable = client.Variable()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `tempIdToRealId` | `Record<string, any>` | A map of temporary ids in the request to the real ids of the newly created objects |
| `variableCollections` | `any[]` | For creating, updating, and deleting variable collections. |
| `variableModeValues` | `any[]` | For setting a specific value, given a variable and a mode. |
| `variableModes` | `any[]` | For creating, updating, and deleting modes within variable collections. |
| `variables` | `any[]` | For creating, updating, and deleting variables. |

#### Example: Create

```ts
const variable = await client.Variable().create({
  file_key: 'example_file_key',
})
```


### Webhook

Create an instance: `const webhook = client.Webhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `client_id` | `string | null` | The client ID of the OAuth application that registered this webhook, if any |
| `context` | `string` | The type of context this webhook is attached to. |
| `context_id` | `string` | The ID of the context this webhook is attached to |
| `description` | `string | null` | Optional user-provided description or name for the webhook. |
| `endpoint` | `string` | The endpoint that will be hit when the webhook is triggered |
| `event_type` | `string` | The event this webhook triggers on |
| `id` | `string` | The ID of the webhook |
| `passcode` | `string` | The passcode that will be passed back to the webhook endpoint. |
| `plan_api_id` | `string` | The plan API ID of the team or organization where this webhook was created |
| `status` | `string` | The current status of the webhook |
| `team_id` | `string` | The team id you are subscribed to for updates. |

#### Example: Load

```ts
const webhook = await client.Webhook().load({ id: 'webhook_id' })
```

#### Example: List

```ts
const webhooks = await client.Webhook().list()
```

#### Example: Create

```ts
const webhook = await client.Webhook().create({
  context: 'example_context',
  context_id: 'example_context_id',
  endpoint: 'example_endpoint',
  event_type: 'example_event_type',
  passcode: 'example_passcode',
})
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`cache`](#cache) | Response cache |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |

> **Order matters for `cache`, `ratelimit`, `retry`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### cache

Response cache.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `256` |
| `methods` | `['GET']` |
| `ttl` | `5000` |

Set `feature.cache.active` to enable it, then override any of the options above.

`cache` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

3 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `file` | `document` | 7 | 26 levels |
| `variable` | `variableModeValues` | 7 | 9 levels |
| `comment` | `client_meta` | 4 | 0 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **CacheFeature**: Response cache
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
figma/
├── src/
│   ├── FigmaSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { FigmaSDK } from '@voxgig-sdk/figma-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const payment = client.Payment()
await payment.load()

// payment.data() now returns the payment data from the last `load`
// payment.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
