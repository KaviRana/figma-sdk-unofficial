# Figma Python SDK Reference

Complete API reference for the Figma Python SDK.


## FigmaSDK

### Constructor

```python
from figma_sdk import FigmaSDK

client = FigmaSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FigmaSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = FigmaSDK.test()
```


### Instance Methods

#### `ActivityLog(data=None)`

Create a new `ActivityLogEntity` instance. Pass `None` for no initial data.

#### `AiUsage(data=None)`

Create a new `AiUsageEntity` instance. Pass `None` for no initial data.

#### `Comment(data=None)`

Create a new `CommentEntity` instance. Pass `None` for no initial data.

#### `CommentReaction(data=None)`

Create a new `CommentReactionEntity` instance. Pass `None` for no initial data.

#### `Component(data=None)`

Create a new `ComponentEntity` instance. Pass `None` for no initial data.

#### `ComponentSet(data=None)`

Create a new `ComponentSetEntity` instance. Pass `None` for no initial data.

#### `DevResource(data=None)`

Create a new `DevResourceEntity` instance. Pass `None` for no initial data.

#### `DeveloperLog(data=None)`

Create a new `DeveloperLogEntity` instance. Pass `None` for no initial data.

#### `File(data=None)`

Create a new `FileEntity` instance. Pass `None` for no initial data.

#### `Folder(data=None)`

Create a new `FolderEntity` instance. Pass `None` for no initial data.

#### `LibraryAnalytics(data=None)`

Create a new `LibraryAnalyticsEntity` instance. Pass `None` for no initial data.

#### `OEmbed(data=None)`

Create a new `OEmbedEntity` instance. Pass `None` for no initial data.

#### `Payment(data=None)`

Create a new `PaymentEntity` instance. Pass `None` for no initial data.

#### `Project(data=None)`

Create a new `ProjectEntity` instance. Pass `None` for no initial data.

#### `Style(data=None)`

Create a new `StyleEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `Variable(data=None)`

Create a new `VariableEntity` instance. Pass `None` for no initial data.

#### `Webhook(data=None)`

Create a new `WebhookEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ActivityLogEntity

```python
activity_log = client.ActivityLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity_logs` | `list` | No | An array of activity logs sorted by timestamp in ascending order by default. |
| `cursor` | `str` | No | Encodes the last event (the most recent event) |
| `next_page` | `bool` | No | Whether there is a next page of events |

### Operations

#### `load(reqmatch, ctrl=None) -> ActivityLogEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ActivityLog().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ActivityLogEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AiUsageEntity

```python
ai_usage = client.AiUsage()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AiUsageEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AiUsage().list({"end_date": "example", "start_date": "example"})
for ai_usage in results:
    print(ai_usage.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AiUsageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CommentEntity

```python
comment = client.Comment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `client_meta` | `Any` | Yes | Positioning information of the comment. |
| `comment_id` | `str` | No | The ID of the comment to reply to, if any. |
| `created_at` | `str` | Yes | The UTC ISO 8601 time at which the comment was left |
| `file_key` | `str` | Yes | The file in which the comment lives |
| `id` | `str` | Yes | Unique identifier for comment. |
| `message` | `str` | Yes | The content of the comment |
| `order_id` | `str | None` | Yes | Only set for top level comments. |
| `parent_id` | `str` | No | If present, the id of the comment to which this is the reply |
| `reactions` | `list` | Yes | An array of reactions to the comment |
| `resolved_at` | `str | None` | No | If set, the UTC ISO 8601 time the comment was resolved |
| `user` | `dict` | Yes | The user who left the comment |

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

#### `create(reqdata, ctrl=None) -> CommentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Comment().create({
    "file_key": "example_file_key",  # str
    "message": "example_message",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[CommentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Comment().list({"file_key": "example"})
for comment in results:
    print(comment.data_get())
```

#### `remove(reqmatch, ctrl=None) -> CommentEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Comment().remove({"id": "comment_id", "file_key": "file_key"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CommentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CommentReactionEntity

```python
comment_reaction = client.CommentReaction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes | The UTC ISO 8601 time at which the reaction was left. |
| `emoji` | `str` | Yes | The emoji type of reaction as shortcode (e.g. |
| `error` | `bool` | Yes | For successful requests, this value is always `false`. |
| `id` | `str` | No |  |
| `status` | `float` | Yes | The status of the request. |
| `user` | `dict` | Yes | The user who left the reaction. |

### Operations

#### `create(reqdata, ctrl=None) -> CommentReactionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CommentReaction().create({
    "file_id": "example_file_id",  # str
    "id": "example_id",  # str
    "emoji": "example_emoji",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[CommentReactionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CommentReaction().list({"file_id": "example", "id": "example"})
for comment_reaction in results:
    print(comment_reaction.data_get())
```

#### `remove(reqmatch, ctrl=None) -> CommentReactionEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.CommentReaction().remove({"id": "comment_reaction_id", "file_id": "file_id", "emoji": "emoji"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CommentReactionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ComponentEntity

```python
component = client.Component()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `components` | `list` | Yes |  |
| `containing_frame` | `dict` | Yes | The containing frame of the component. |
| `created_at` | `str` | Yes | The UTC ISO 8601 time when the component was created. |
| `cursor` | `dict` | No | Pagination cursor |
| `description` | `str` | Yes | The description of the component as entered by the publisher. |
| `file_key` | `str` | Yes | The unique identifier of the Figma file that contains the component. |
| `id` | `str` | No |  |
| `key` | `str` | Yes | The unique identifier for the component. |
| `name` | `str` | Yes | The name of the component. |
| `node_id` | `str` | Yes | The unique identifier of the component node within the Figma file. |
| `thumbnail_url` | `str` | No | A URL to a thumbnail image of the component. |
| `updated_at` | `str` | Yes | The UTC ISO 8601 time when the component was last updated. |
| `user` | `dict` | Yes | The user who last updated the component. |

### Operations

#### `load(reqmatch, ctrl=None) -> ComponentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Component().load({"id": "component_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ComponentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ComponentSetEntity

```python
component_set = client.ComponentSet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component_sets` | `list` | Yes |  |
| `containing_frame` | `dict` | Yes | The containing frame of the component set. |
| `created_at` | `str` | Yes | The UTC ISO 8601 time when the component set was created. |
| `cursor` | `dict` | No | Pagination cursor |
| `description` | `str` | Yes | The description of the component set as entered by the publisher. |
| `file_key` | `str` | Yes | The unique identifier of the Figma file that contains the component set. |
| `id` | `str` | No |  |
| `key` | `str` | Yes | The unique identifier for the component set. |
| `name` | `str` | Yes | The name of the component set. |
| `node_id` | `str` | Yes | The unique identifier of the component set node within the Figma file. |
| `thumbnail_url` | `str` | No | A URL to a thumbnail image of the component set. |
| `updated_at` | `str` | Yes | The UTC ISO 8601 time when the component set was last updated. |
| `user` | `dict` | Yes | The user who last updated the component set. |

### Operations

#### `load(reqmatch, ctrl=None) -> ComponentSetEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ComponentSet().load({"id": "component_set_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ComponentSetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DevResourceEntity

```python
dev_resource = client.DevResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dev_resources` | `list` | Yes | An array of dev resources. |
| `errors` | `list` | No | An array of errors. |
| `file_key` | `str` | Yes | The file key where the dev resource belongs. |
| `id` | `str` | Yes | Unique identifier of the dev resource |
| `links_created` | `list` | Yes | An array of links created. |
| `links_updated` | `list` | No | An array of links updated. |
| `name` | `str` | Yes | The name of the dev resource. |
| `node_id` | `str` | Yes | The target node to attach the dev resource to. |
| `url` | `str` | Yes | The URL of the dev resource. |

### Operations

#### `create(reqdata, ctrl=None) -> DevResourceEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DevResource().create({
    "dev_resources": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list[DevResourceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DevResource().list({"file_key": "example"})
for dev_resource in results:
    print(dev_resource.data_get())
```

#### `remove(reqmatch, ctrl=None) -> DevResourceEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.DevResource().remove({"id": "dev_resource_id", "file_key": "file_key"})
```

#### `update(reqdata, ctrl=None) -> DevResourceEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.DevResource().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DevResourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeveloperLogEntity

```python
developer_log = client.DeveloperLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cursor` | `str | None` | No | A cursor for pagination. |
| `date_range` | `str` | No | Filter by date range. |
| `event_source` | `str` | No | Filter by event source. |
| `has_more` | `bool` | Yes | Whether there are more results available after this page. |
| `ip_address` | `str` | No | Filter by IP address prefix(es). |
| `items` | `list` | Yes | An array of developer log entries sorted by timestamp in descending order. |
| `limit` | `int` | No | Maximum number of entries to return. |
| `token` | `str` | No | Filter by token value(s). |
| `token_name` | `str` | No | Filter by token name prefix(es). |
| `token_type` | `str` | No | Filter by the type of token used for authentication. |
| `user_email` | `str` | No | Filter by user email prefix(es). |

### Operations

#### `create(reqdata, ctrl=None) -> DeveloperLogEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DeveloperLog().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeveloperLogEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FileEntity

```python
file = client.File()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `branches` | `list` | No | A list of branches for this file. |
| `componentSets` | `dict` | Yes | A mapping from component set IDs to component set metadata. |
| `components` | `dict` | Yes | A mapping from component IDs to component metadata. |
| `document` | `Any` | Yes |  |
| `editorType` | `str` | Yes | The type of editor associated with this file. |
| `err` | `None` | Yes | For successful requests, this value is always `null`. |
| `id` | `str` | No |  |
| `images` | `dict` | Yes | A map from node IDs to URLs of the rendered images. |
| `lastModified` | `str` | Yes | The UTC ISO 8601 time at which the file was last modified. |
| `linkAccess` | `str` | No | The share permission level of the file link. |
| `mainFileKey` | `str` | No | The key of the main file for this file. |
| `name` | `str` | Yes | The name of the file as it appears in the editor. |
| `role` | `str` | Yes | The role of the user making the API request in relation to the file. |
| `schemaVersion` | `float` | Yes | The version of the file schema that this file uses. |
| `styles` | `dict` | Yes | A mapping from style IDs to style metadata. |
| `thumbnailUrl` | `str` | No | A URL to a thumbnail image of the file. |
| `version` | `str` | Yes | The version number of the file. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[FileEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.File().list({"file_key": "example"})
for file in results:
    print(file.data_get())
```

#### `load(reqmatch, ctrl=None) -> FileEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.File().load({"file_key": "file_key", "ids": "ids"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FolderEntity

```python
folder = client.Folder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | The time at which the folder was created. |
| `id` | `str` | Yes | The ID of the folder. |
| `name` | `str` | Yes | The name of the folder. |
| `parent_folder_id` | `str | None` | Yes | The ID of the folder's parent folder, or null if the folder is a top-level folder in the team. |
| `sharing_audience_control` | `str` | No | The audience that can access the folder. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[FolderEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Folder().list({"id": "example"})
for folder in results:
    print(folder.data_get())
```

#### `load(reqmatch, ctrl=None) -> FolderEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Folder().load({"id": "folder_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FolderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LibraryAnalyticsEntity

```python
library_analytics = client.LibraryAnalytics()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cursor` | `str` | No | The cursor to use to fetch the next page of data. |
| `next_page` | `bool` | Yes | Whether there is a next page of data that can be fetched. |
| `rows` | `Any` | Yes | An array of analytics data. |

### Operations

#### `load(reqmatch, ctrl=None) -> LibraryAnalyticsEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LibraryAnalytics().load({"library_id": "library_id", "group_by": "group_by"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LibraryAnalyticsEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OEmbedEntity

```python
o_embed = client.OEmbed()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cache_age` | `int` | Yes | Suggested cache lifetime for this response in seconds. |
| `folder_name` | `str` | No | The name of the folder containing the file, if the file resides in a folder. |
| `height` | `int` | Yes | Height of the embed in pixels. |
| `html` | `str` | Yes | The HTML for embedding the file. |
| `is_published_site` | `bool` | No | Only present and "true" when the resource is a published Make. |
| `key` | `str` | No | The key of the Figma file. |
| `provider_name` | `str` | Yes | The name of the content provider. |
| `provider_url` | `str` | Yes | The URL of the content provider's website. |
| `thumbnail_height` | `int` | No | Height of the thumbnail image in pixels. |
| `thumbnail_url` | `str` | No | URL of a thumbnail image for the file. |
| `thumbnail_width` | `int` | No | Width of the thumbnail image in pixels. |
| `title` | `str` | Yes | The title of the Figma file or published Make site. |
| `type` | `str` | Yes | The oEmbed response type. |
| `url` | `str` | Yes | The canonical URL of the resource. |
| `version` | `str` | Yes | The oEmbed specification version. |
| `width` | `int` | Yes | Width of the embed in pixels. |

### Operations

#### `load(reqmatch, ctrl=None) -> OEmbedEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.OEmbed().load({"url": "url"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OEmbedEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaymentEntity

```python
payment = client.Payment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_of_purchase` | `str` | No | The UTC ISO 8601 timestamp indicating when the user purchased the resource. |
| `payment_status` | `dict` | Yes | An object describing the user's payment status. |
| `resource_id` | `str` | Yes | The ID of the plugin, widget, or Community file that was queried. |
| `resource_type` | `str` | Yes | The type of the resource. |
| `user_id` | `str` | Yes | The ID of the user whose payment information was queried. |

### Operations

#### `load(reqmatch, ctrl=None) -> PaymentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Payment().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectEntity

```python
project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes | The ID of the project. |
| `name` | `str` | Yes | The name of the project. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProjectEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Project().list({"team_id": "example"})
for project in results:
    print(project.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProjectEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Project().load({"id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StyleEntity

```python
style = client.Style()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes | The UTC ISO 8601 time when the style was created. |
| `cursor` | `dict` | No | Pagination cursor |
| `description` | `str` | Yes | The description of the style as entered by the publisher. |
| `file_key` | `str` | Yes | The unique identifier of the Figma file that contains the style. |
| `id` | `str` | No |  |
| `key` | `str` | Yes | The unique identifier for the style |
| `name` | `str` | Yes | The name of the style. |
| `node_id` | `str` | Yes | ID of the style node within the figma file |
| `sort_position` | `str` | Yes | A user specified order number by which the style can be sorted. |
| `style_type` | `str` | Yes | The type of style |
| `styles` | `list` | Yes |  |
| `thumbnail_url` | `str` | No | A URL to a thumbnail image of the style. |
| `updated_at` | `str` | Yes | The UTC ISO 8601 time when the style was last updated. |
| `user` | `dict` | Yes | The user who last updated the style. |

### Operations

#### `load(reqmatch, ctrl=None) -> StyleEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Style().load({"id": "style_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StyleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes | Email associated with the user's account. |
| `handle` | `str` | Yes | Name of the user. |
| `id` | `str` | Yes | Unique stable id of the user. |
| `img_url` | `str` | Yes | URL link to the user's profile image. |

### Operations

#### `load(reqmatch, ctrl=None) -> UserEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.User().load({"id": "user_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VariableEntity

```python
variable = client.Variable()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `tempIdToRealId` | `dict` | Yes | A map of temporary ids in the request to the real ids of the newly created objects |
| `variableCollections` | `list` | No | For creating, updating, and deleting variable collections. |
| `variableModeValues` | `list` | No | For setting a specific value, given a variable and a mode. |
| `variableModes` | `list` | No | For creating, updating, and deleting modes within variable collections. |
| `variables` | `list` | No | For creating, updating, and deleting variables. |

### Operations

#### `create(reqdata, ctrl=None) -> VariableEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Variable().create({
    "file_key": "example_file_key",  # str
})
```

#### `load(reqmatch, ctrl=None) -> VariableEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VariableEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebhookEntity

```python
webhook = client.Webhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | `str | None` | Yes | The client ID of the OAuth application that registered this webhook, if any |
| `context` | `str` | Yes | The type of context this webhook is attached to. |
| `context_id` | `str` | Yes | The ID of the context this webhook is attached to |
| `description` | `str | None` | Yes | Optional user-provided description or name for the webhook. |
| `endpoint` | `str` | Yes | The endpoint that will be hit when the webhook is triggered |
| `event_type` | `str` | Yes | The event this webhook triggers on |
| `id` | `str` | Yes | The ID of the webhook |
| `passcode` | `str` | Yes | The passcode that will be passed back to the webhook endpoint. |
| `plan_api_id` | `str` | Yes | The plan API ID of the team or organization where this webhook was created |
| `status` | `str` | Yes | The current status of the webhook |
| `team_id` | `str` | Yes | The team id you are subscribed to for updates. |

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

### Operations

#### `create(reqdata, ctrl=None) -> WebhookEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Webhook().create({
    "context": "example_context",  # str
    "context_id": "example_context_id",  # str
    "endpoint": "example_endpoint",  # str
    "event_type": "example_event_type",  # str
    "passcode": "example_passcode",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[WebhookEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Webhook().list()
for webhook in results:
    print(webhook.data_get())
```

#### `load(reqmatch, ctrl=None) -> WebhookEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Webhook().load({"id": "webhook_id"})
```

#### `remove(reqmatch, ctrl=None) -> WebhookEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Webhook().remove({"id": "webhook_id"})
```

#### `update(reqdata, ctrl=None) -> WebhookEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Webhook().update({
    "id": "webhook_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebhookEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `cache` | 0.0.1 | Response cache |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = FigmaSDK({
    "feature": {
        "cache": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
    },
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

