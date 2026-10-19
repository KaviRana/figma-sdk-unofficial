# Figma Python SDK



The Python SDK for the Figma API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.ActivityLog()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/KaviRana/figma-sdk-unofficial/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record. The client sends the API key in the `X-Figma-Token` header.

### 1. Create a client

```python
import os
from figma_sdk import FigmaSDK

client = FigmaSDK({
    "apikey": os.environ.get("FIGMA_APIKEY"),
})
```

### 3. Load an activitylog

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    activitylog = client.ActivityLog().load()
    print(activitylog.data_get())
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    payment = client.Payment().load()
    print(payment.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = FigmaSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
payment = client.Payment().load()
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = FigmaSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
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
cd py && pytest test/
```


## Reference

### FigmaSDK

```python
from figma_sdk import FigmaSDK

client = FigmaSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = FigmaSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### FigmaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `ActivityLog` | `(data) -> ActivityLogEntity` | Create an ActivityLog entity instance. |
| `AiUsage` | `(data) -> AiUsageEntity` | Create an AiUsage entity instance. |
| `Comment` | `(data) -> CommentEntity` | Create a Comment entity instance. |
| `CommentReaction` | `(data) -> CommentReactionEntity` | Create a CommentReaction entity instance. |
| `Component` | `(data) -> ComponentEntity` | Create a Component entity instance. |
| `ComponentSet` | `(data) -> ComponentSetEntity` | Create a ComponentSet entity instance. |
| `DevResource` | `(data) -> DevResourceEntity` | Create a DevResource entity instance. |
| `DeveloperLog` | `(data) -> DeveloperLogEntity` | Create a DeveloperLog entity instance. |
| `File` | `(data) -> FileEntity` | Create a File entity instance. |
| `Folder` | `(data) -> FolderEntity` | Create a Folder entity instance. |
| `LibraryAnalytics` | `(data) -> LibraryAnalyticsEntity` | Create a LibraryAnalytics entity instance. |
| `OEmbed` | `(data) -> OEmbedEntity` | Create an OEmbed entity instance. |
| `Payment` | `(data) -> PaymentEntity` | Create a Payment entity instance. |
| `Project` | `(data) -> ProjectEntity` | Create a Project entity instance. |
| `Style` | `(data) -> StyleEntity` | Create a Style entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |
| `Variable` | `(data) -> VariableEntity` | Create a Variable entity instance. |
| `Webhook` | `(data) -> WebhookEntity` | Create a Webhook entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### ActivityLog

| Field | Description |
| --- | --- |
| `activity_logs` | An array of activity logs sorted by timestamp in ascending order by default. |
| `cursor` | Encodes the last event (the most recent event) |
| `next_page` | Whether there is a next page of events |

Operations: Load.

API path: `/v1/activity_logs`

#### AiUsage

| Field | Description |
| --- | --- |

Operations: List.

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

Operations: Create, List, Remove.

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

Operations: Create, List, Remove.

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

Operations: Load.

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

Operations: Load.

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

Operations: Create, List, Remove, Update.

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

Operations: Create.

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

Operations: List, Load.

API path: `/v1/files/{file_key}/versions`

#### Folder

| Field | Description |
| --- | --- |
| `created_at` | The time at which the folder was created. |
| `id` | The ID of the folder. |
| `name` | The name of the folder. |
| `parent_folder_id` | The ID of the folder's parent folder, or null if the folder is a top-level folder in the team. |
| `sharing_audience_control` | The audience that can access the folder. |

Operations: List, Load.

API path: `/v2/folders/{folder_id}/files`

#### LibraryAnalytics

| Field | Description |
| --- | --- |
| `cursor` | The cursor to use to fetch the next page of data. |
| `next_page` | Whether there is a next page of data that can be fetched. |
| `rows` | An array of analytics data. |

Operations: Load.

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

Operations: Load.

API path: `/v1/oembed`

#### Payment

| Field | Description |
| --- | --- |
| `date_of_purchase` | The UTC ISO 8601 timestamp indicating when the user purchased the resource. |
| `payment_status` | An object describing the user's payment status. |
| `resource_id` | The ID of the plugin, widget, or Community file that was queried. |
| `resource_type` | The type of the resource. |
| `user_id` | The ID of the user whose payment information was queried. |

Operations: Load.

API path: `/v1/payments`

#### Project

| Field | Description |
| --- | --- |
| `id` | The ID of the project. |
| `name` | The name of the project. |

Operations: List, Load.

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

Operations: Load.

API path: `/v1/files/{file_key}/styles`

#### User

| Field | Description |
| --- | --- |
| `email` | Email associated with the user's account. |
| `handle` | Name of the user. |
| `id` | Unique stable id of the user. |
| `img_url` | URL link to the user's profile image. |

Operations: Load.

API path: `/v1/me`

#### Variable

| Field | Description |
| --- | --- |
| `tempIdToRealId` | A map of temporary ids in the request to the real ids of the newly created objects |
| `variableCollections` | For creating, updating, and deleting variable collections. |
| `variableModeValues` | For setting a specific value, given a variable and a mode. |
| `variableModes` | For creating, updating, and deleting modes within variable collections. |
| `variables` | For creating, updating, and deleting variables. |

Operations: Create, Load.

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

Operations: Create, List, Load, Remove, Update.

API path: `/v2/webhooks`



## Entities


### ActivityLog

Create an instance: `activity_log = client.ActivityLog()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity_logs` | `list` | An array of activity logs sorted by timestamp in ascending order by default. |
| `cursor` | `str` | Encodes the last event (the most recent event) |
| `next_page` | `bool` | Whether there is a next page of events |

#### Example: Load

```python
activity_log = client.ActivityLog().load()
```


### AiUsage

Create an instance: `ai_usage = client.AiUsage()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Example: List

```python
ai_usages = client.AiUsage().list({"end_date": "example", "start_date": "example"})
```


### Comment

Create an instance: `comment = client.Comment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `client_meta` | `Any` | Positioning information of the comment. |
| `comment_id` | `str` | The ID of the comment to reply to, if any. |
| `created_at` | `str` | The UTC ISO 8601 time at which the comment was left |
| `file_key` | `str` | The file in which the comment lives |
| `id` | `str` | Unique identifier for comment. |
| `message` | `str` | The content of the comment |
| `order_id` | `str | None` | Only set for top level comments. |
| `parent_id` | `str` | If present, the id of the comment to which this is the reply |
| `reactions` | `list` | An array of reactions to the comment |
| `resolved_at` | `str | None` | If set, the UTC ISO 8601 time the comment was resolved |
| `user` | `dict` | The user who left the comment |

#### Example: List

```python
comments = client.Comment().list({"file_key": "example"})
```

#### Example: Create

```python
comment = client.Comment().create({
    "file_key": "example_file_key",  # str
    "message": "example_message",  # str
})
```


### CommentReaction

Create an instance: `comment_reaction = client.CommentReaction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | The UTC ISO 8601 time at which the reaction was left. |
| `emoji` | `str` | The emoji type of reaction as shortcode (e.g. |
| `error` | `bool` | For successful requests, this value is always `false`. |
| `id` | `str` |  |
| `status` | `float` | The status of the request. |
| `user` | `dict` | The user who left the reaction. |

#### Example: List

```python
comment_reactions = client.CommentReaction().list({"file_id": "example", "id": "example"})
```

#### Example: Create

```python
comment_reaction = client.CommentReaction().create({
    "file_id": "example_file_id",  # str
    "id": "example_id",  # str
    "emoji": "example_emoji",  # str
})
```


### Component

Create an instance: `component = client.Component()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `components` | `list` |  |
| `containing_frame` | `dict` | The containing frame of the component. |
| `created_at` | `str` | The UTC ISO 8601 time when the component was created. |
| `cursor` | `dict` | Pagination cursor |
| `description` | `str` | The description of the component as entered by the publisher. |
| `file_key` | `str` | The unique identifier of the Figma file that contains the component. |
| `id` | `str` |  |
| `key` | `str` | The unique identifier for the component. |
| `name` | `str` | The name of the component. |
| `node_id` | `str` | The unique identifier of the component node within the Figma file. |
| `thumbnail_url` | `str` | A URL to a thumbnail image of the component. |
| `updated_at` | `str` | The UTC ISO 8601 time when the component was last updated. |
| `user` | `dict` | The user who last updated the component. |

#### Example: Load

```python
component = client.Component().load({"id": "component_id"})
```


### ComponentSet

Create an instance: `component_set = client.ComponentSet()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component_sets` | `list` |  |
| `containing_frame` | `dict` | The containing frame of the component set. |
| `created_at` | `str` | The UTC ISO 8601 time when the component set was created. |
| `cursor` | `dict` | Pagination cursor |
| `description` | `str` | The description of the component set as entered by the publisher. |
| `file_key` | `str` | The unique identifier of the Figma file that contains the component set. |
| `id` | `str` |  |
| `key` | `str` | The unique identifier for the component set. |
| `name` | `str` | The name of the component set. |
| `node_id` | `str` | The unique identifier of the component set node within the Figma file. |
| `thumbnail_url` | `str` | A URL to a thumbnail image of the component set. |
| `updated_at` | `str` | The UTC ISO 8601 time when the component set was last updated. |
| `user` | `dict` | The user who last updated the component set. |

#### Example: Load

```python
component_set = client.ComponentSet().load({"id": "component_set_id"})
```


### DevResource

Create an instance: `dev_resource = client.DevResource()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dev_resources` | `list` | An array of dev resources. |
| `errors` | `list` | An array of errors. |
| `file_key` | `str` | The file key where the dev resource belongs. |
| `id` | `str` | Unique identifier of the dev resource |
| `links_created` | `list` | An array of links created. |
| `links_updated` | `list` | An array of links updated. |
| `name` | `str` | The name of the dev resource. |
| `node_id` | `str` | The target node to attach the dev resource to. |
| `url` | `str` | The URL of the dev resource. |

#### Example: List

```python
dev_resources = client.DevResource().list({"file_key": "example"})
```

#### Example: Create

```python
dev_resource = client.DevResource().create({
    "dev_resources": [],  # list
})
```


### DeveloperLog

Create an instance: `developer_log = client.DeveloperLog()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cursor` | `str | None` | A cursor for pagination. |
| `date_range` | `str` | Filter by date range. |
| `event_source` | `str` | Filter by event source. |
| `has_more` | `bool` | Whether there are more results available after this page. |
| `ip_address` | `str` | Filter by IP address prefix(es). |
| `items` | `list` | An array of developer log entries sorted by timestamp in descending order. |
| `limit` | `int` | Maximum number of entries to return. |
| `token` | `str` | Filter by token value(s). |
| `token_name` | `str` | Filter by token name prefix(es). |
| `token_type` | `str` | Filter by the type of token used for authentication. |
| `user_email` | `str` | Filter by user email prefix(es). |

#### Example: Create

```python
developer_log = client.DeveloperLog().create({
})
```


### File

Create an instance: `file = client.File()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `branches` | `list` | A list of branches for this file. |
| `componentSets` | `dict` | A mapping from component set IDs to component set metadata. |
| `components` | `dict` | A mapping from component IDs to component metadata. |
| `document` | `Any` |  |
| `editorType` | `str` | The type of editor associated with this file. |
| `err` | `None` | For successful requests, this value is always `null`. |
| `id` | `str` |  |
| `images` | `dict` | A map from node IDs to URLs of the rendered images. |
| `lastModified` | `str` | The UTC ISO 8601 time at which the file was last modified. |
| `linkAccess` | `str` | The share permission level of the file link. |
| `mainFileKey` | `str` | The key of the main file for this file. |
| `name` | `str` | The name of the file as it appears in the editor. |
| `role` | `str` | The role of the user making the API request in relation to the file. |
| `schemaVersion` | `float` | The version of the file schema that this file uses. |
| `styles` | `dict` | A mapping from style IDs to style metadata. |
| `thumbnailUrl` | `str` | A URL to a thumbnail image of the file. |
| `version` | `str` | The version number of the file. |

#### Example: Load

```python
file = client.File().load({"file_key": "file_key", "ids": "ids"})
```

#### Example: List

```python
files = client.File().list({"file_key": "example"})
```


### Folder

Create an instance: `folder = client.Folder()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | The time at which the folder was created. |
| `id` | `str` | The ID of the folder. |
| `name` | `str` | The name of the folder. |
| `parent_folder_id` | `str | None` | The ID of the folder's parent folder, or null if the folder is a top-level folder in the team. |
| `sharing_audience_control` | `str` | The audience that can access the folder. |

#### Example: Load

```python
folder = client.Folder().load({"id": "folder_id"})
```

#### Example: List

```python
folders = client.Folder().list({"id": "example"})
```


### LibraryAnalytics

Create an instance: `library_analytics = client.LibraryAnalytics()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cursor` | `str` | The cursor to use to fetch the next page of data. |
| `next_page` | `bool` | Whether there is a next page of data that can be fetched. |
| `rows` | `Any` | An array of analytics data. |

#### Example: Load

```python
library_analytics = client.LibraryAnalytics().load({"library_id": "library_id", "group_by": "group_by"})
```


### OEmbed

Create an instance: `o_embed = client.OEmbed()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cache_age` | `int` | Suggested cache lifetime for this response in seconds. |
| `folder_name` | `str` | The name of the folder containing the file, if the file resides in a folder. |
| `height` | `int` | Height of the embed in pixels. |
| `html` | `str` | The HTML for embedding the file. |
| `is_published_site` | `bool` | Only present and "true" when the resource is a published Make. |
| `key` | `str` | The key of the Figma file. |
| `provider_name` | `str` | The name of the content provider. |
| `provider_url` | `str` | The URL of the content provider's website. |
| `thumbnail_height` | `int` | Height of the thumbnail image in pixels. |
| `thumbnail_url` | `str` | URL of a thumbnail image for the file. |
| `thumbnail_width` | `int` | Width of the thumbnail image in pixels. |
| `title` | `str` | The title of the Figma file or published Make site. |
| `type` | `str` | The oEmbed response type. |
| `url` | `str` | The canonical URL of the resource. |
| `version` | `str` | The oEmbed specification version. |
| `width` | `int` | Width of the embed in pixels. |

#### Example: Load

```python
o_embed = client.OEmbed().load({"url": "url"})
```


### Payment

Create an instance: `payment = client.Payment()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_of_purchase` | `str` | The UTC ISO 8601 timestamp indicating when the user purchased the resource. |
| `payment_status` | `dict` | An object describing the user's payment status. |
| `resource_id` | `str` | The ID of the plugin, widget, or Community file that was queried. |
| `resource_type` | `str` | The type of the resource. |
| `user_id` | `str` | The ID of the user whose payment information was queried. |

#### Example: Load

```python
payment = client.Payment().load()
```


### Project

Create an instance: `project = client.Project()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` | The ID of the project. |
| `name` | `str` | The name of the project. |

#### Example: Load

```python
project = client.Project().load({"id": "project_id"})
```

#### Example: List

```python
projects = client.Project().list({"team_id": "example"})
```


### Style

Create an instance: `style = client.Style()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | The UTC ISO 8601 time when the style was created. |
| `cursor` | `dict` | Pagination cursor |
| `description` | `str` | The description of the style as entered by the publisher. |
| `file_key` | `str` | The unique identifier of the Figma file that contains the style. |
| `id` | `str` |  |
| `key` | `str` | The unique identifier for the style |
| `name` | `str` | The name of the style. |
| `node_id` | `str` | ID of the style node within the figma file |
| `sort_position` | `str` | A user specified order number by which the style can be sorted. |
| `style_type` | `str` | The type of style |
| `styles` | `list` |  |
| `thumbnail_url` | `str` | A URL to a thumbnail image of the style. |
| `updated_at` | `str` | The UTC ISO 8601 time when the style was last updated. |
| `user` | `dict` | The user who last updated the style. |

#### Example: Load

```python
style = client.Style().load({"id": "style_id"})
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` | Email associated with the user's account. |
| `handle` | `str` | Name of the user. |
| `id` | `str` | Unique stable id of the user. |
| `img_url` | `str` | URL link to the user's profile image. |

#### Example: Load

```python
user = client.User().load({"id": "user_id"})
```


### Variable

Create an instance: `variable = client.Variable()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `tempIdToRealId` | `dict` | A map of temporary ids in the request to the real ids of the newly created objects |
| `variableCollections` | `list` | For creating, updating, and deleting variable collections. |
| `variableModeValues` | `list` | For setting a specific value, given a variable and a mode. |
| `variableModes` | `list` | For creating, updating, and deleting modes within variable collections. |
| `variables` | `list` | For creating, updating, and deleting variables. |

#### Example: Create

```python
variable = client.Variable().create({
    "file_key": "example_file_key",  # str
})
```


### Webhook

Create an instance: `webhook = client.Webhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `client_id` | `str | None` | The client ID of the OAuth application that registered this webhook, if any |
| `context` | `str` | The type of context this webhook is attached to. |
| `context_id` | `str` | The ID of the context this webhook is attached to |
| `description` | `str | None` | Optional user-provided description or name for the webhook. |
| `endpoint` | `str` | The endpoint that will be hit when the webhook is triggered |
| `event_type` | `str` | The event this webhook triggers on |
| `id` | `str` | The ID of the webhook |
| `passcode` | `str` | The passcode that will be passed back to the webhook endpoint. |
| `plan_api_id` | `str` | The plan API ID of the team or organization where this webhook was created |
| `status` | `str` | The current status of the webhook |
| `team_id` | `str` | The team id you are subscribed to for updates. |

#### Example: Load

```python
webhook = client.Webhook().load({"id": "webhook_id"})
```

#### Example: List

```python
webhooks = client.Webhook().list()
```

#### Example: Create

```python
webhook = client.Webhook().create({
    "context": "example_context",  # str
    "context_id": "example_context_id",  # str
    "endpoint": "example_endpoint",  # str
    "event_type": "example_event_type",  # str
    "passcode": "example_passcode",  # str
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **CacheFeature**: Response cache
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── figma_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`figma_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
payment = client.Payment()
payment.load()

# payment.data_get() now returns the payment data from the last load
# payment.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
