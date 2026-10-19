# Figma API

> This is the OpenAPI specification for the [Figma REST API](https://developers.figma.com/docs/rest-api/).
>
> Note: we are releasing the OpenAPI specification as a beta given the large surface area and complexity of the REST API. If you notice any inaccuracies with the specification, please [file an issue](https://github.com/figma/rest-api-spec/issues).

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 18 entities and 54 HTTP routes. There are 2 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### ActivityLog

Results: Response from the GET /v1/`activity_logs` endpoint.

SDK operations: `load`.

Key fields to recognise:

- `activity_logs`: An array of activity logs sorted by timestamp in ascending order by default.
- `cursor`: Encodes the last event (the most recent event)
- `next_page`: Whether there is a next page of events

### AiUsage

Results: Response from the GET /v1/`ai_usage`/daily endpoint.

SDK operations: `list`.

### Comment

Results: Response from the POST /v1/files/&#123;`file_key`&#125;/comments endpoint.; Response from the GET /v1/files/&#123;`file_key`&#125;/comments endpoint.; Response from the DELETE /v1/files/&#123;`file_key`&#125;/comments/&#123;`comment_id`&#125; endpoint.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `client_meta`: Positioning information of the comment. Includes information on the location of the comment pin, which is either the absolute coordinates on the canvas or a relative offset within a frame. If the comment is a region, it will also contain the region height, width, and position of the anchor in regards to the region.
- `comment_id`: The ID of the comment to reply to, if any.
- `created_at`: The UTC ISO 8601 time at which the comment was left
- `file_key`: The file in which the comment lives
- `id`: Unique identifier for comment.

### CommentReaction

Results: Response from the POST /v1/files/&#123;`file_key`&#125;/comments/&#123;`comment_id`&#125;/reactions endpoint.; Response from the GET /v1/files/&#123;`file_key`&#125;/comments/&#123;`comment_id`&#125;/reactions endpoint.; Response from the DELETE /v1/files/&#123;`file_key`&#125;/comments/&#123;`comment_id`&#125;/reactions endpoint.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `created_at`: The UTC ISO 8601 time at which the reaction was left.
- `emoji`: The emoji type of reaction as shortcode (for example `:heart:`, `:+1::skin-tone-2:`). The list of accepted emoji shortcodes can be found in [this file](https://raw.githubusercontent.com/missive/emoji-mart/main/packages/emoji-mart-data/sets/14/native.json) under the top-level emojis and aliases fields, with optional skin tone modifiers when applicable.
- `error`: For successful requests, this value is always `false`.
- `id`: Unique stable id of the user.
- `status`: The status of the request.

### Component

Results: Response from the GET /v1/files/&#123;`file_key`&#125;/components endpoint.; Response from the GET /v1/components/&#123;key&#125; endpoint.; Response from the GET /v1/teams/&#123;`team_id`&#125;/components endpoint.

SDK operations: `load`.

Key fields to recognise:

- `containing_frame`: The containing frame of the component.
- `created_at`: The UTC ISO 8601 time when the component was created.
- `cursor`: Pagination cursor
- `description`: The description of the component as entered by the publisher.
- `file_key`: The unique identifier of the Figma file that contains the component.

### ComponentSet

Results: Response from the GET /v1/files/&#123;`file_key`&#125;/`component_sets` endpoint.; Response from the GET /v1/`component_sets`/&#123;key&#125; endpoint.; Response from the GET /v1/teams/&#123;`team_id`&#125;/`component_sets` endpoint.

SDK operations: `load`.

Key fields to recognise:

- `containing_frame`: The containing frame of the component set.
- `created_at`: The UTC ISO 8601 time when the component set was created.
- `cursor`: Pagination cursor
- `description`: The description of the component set as entered by the publisher.
- `file_key`: The unique identifier of the Figma file that contains the component set.

### DevResource

Results: Response from the POST /v1/`dev_resources` endpoint.; Response from the GET /v1/files/&#123;`file_key`&#125;/`dev_resources` endpoint.; Response from the DELETE /v1/files/&#123;`file_key`&#125;/`dev_resources`/&#123;`dev_resource_id`&#125; endpoint.; Response from the PUT /v1/`dev_resources` endpoint.

SDK operations: `create`, `list`, `remove`, `update`.

Key fields to recognise:

- `dev_resources`: An array of dev resources.
- `errors`: An array of errors.
- `file_key`: The file key where the dev resource belongs.
- `id`: Unique identifier of the dev resource
- `links_created`: An array of links created.

### DeveloperLog

Results: Response from the POST /v1/`developer_logs` endpoint.

SDK operations: `create`.

Key fields to recognise:

- `cursor`: A cursor for pagination. Pass this value as the `cursor` parameter in the next request to retrieve the next page of results. `null` when there are no more results.
- `date_range`: Filter by date range.
- `event_source`: The source of the event.
- `has_more`: Whether there are more results available after this page.
- `ip_address`: The IP address of the client that made the request.

### File

Results: Response from the GET /v1/files/&#123;`file_key`&#125;/versions endpoint.; Response from the GET /v1/files/&#123;`file_key`&#125;/nodes endpoint.; Response from the GET /v1/images/&#123;`file_key`&#125; endpoint.; Response from the GET /v1/files/&#123;`file_key`&#125;/images endpoint.; Response from the GET /v1/files/&#123;`file_key`&#125;/meta endpoint.; Response from the GET /v1/files/&#123;`file_key`&#125; endpoint.

SDK operations: `list`, `load`.

Key fields to recognise:

- `branches`: A list of branches for this file.
- `componentSets`: A mapping from component set IDs to component set metadata.
- `components`: A mapping from component IDs to component metadata.
- `editorType`: The type of editor associated with this file.
- `err`: A string describing the error

### Folder

Results: Response from the GET /v2/folders/&#123;`folder_id`&#125;/files endpoint.; Response from the GET /v2/folders/&#123;`folder_id`&#125;/folders endpoint.; Response from the GET /v2/teams/&#123;`team_id`&#125;/folders endpoint.; Response from the GET /v2/folders/&#123;`folder_id`&#125;/meta endpoint.

SDK operations: `list`, `load`.

Key fields to recognise:

- `created_at`: The time at which the folder was created.
- `id`: The ID of the folder.
- `name`: The folder&#39;s name.
- `parent_folder_id`: The ID of the folder&#39;s parent folder, or null if the folder is a top-level folder in the team.
- `sharing_audience_control`: The audience that can access the folder.

### LibraryAnalytics

Results: Response from the GET /v1/analytics/libraries/&#123;`file_key`&#125;/component/actions.; Response from the PUT /v1/analytics/libraries/&#123;`file_key`&#125;/component/usages.; Response from the GET /v1/analytics/libraries/&#123;`file_key`&#125;/style/actions.; Response from the PUT /v1/analytics/libraries/&#123;`file_key`&#125;/style/usages.; Response from the GET /v1/analytics/libraries/&#123;`file_key`&#125;/variable/actions.; Response from the PUT /v1/analytics/libraries/&#123;`file_key`&#125;/variable/usages.

SDK operations: `load`.

Key fields to recognise:

- `cursor`: The cursor to use to fetch the next page of data. Not present if `next_page` is false.
- `next_page`: Whether there is a next page of data that can be fetched.
- `rows`: An array of analytics data.

### OEmbed

Results: Response from the GET /v1/oembed endpoint.

SDK operations: `load`.

Key fields to recognise:

- `cache_age`: Suggested cache lifetime for this response in seconds. Always 3600.
- `folder_name`: The name of the folder containing the file, if the file resides in a folder.
- `height`: Height of the embed in pixels.
- `html`: The HTML for embedding the file. Contains an iframe pointing to the Figma embed URL.
- `is_published_site`: Only present and &quot;true&quot; when the resource is a published Make.

### Payment

Results: Response from the GET /v1/payments endpoint.

SDK operations: `load`.

Key fields to recognise:

- `date_of_purchase`: The UTC ISO 8601 timestamp indicating when the user purchased the resource. No value is given if the user has never purchased the resource. Note that a value will still be returned if the user had purchased the resource, but no longer has active access to it (for example purchase refunded, subscription ended).
- `payment_status`: An object describing the user&#39;s payment status.
- `resource_id`: The ID of the plugin, widget, or Community file that was queried. Can be used to verify the validity of a response.
- `resource_type`: The type of the resource.
- `user_id`: The ID of the user whose payment information was queried. Can be used to verify the validity of a response.

### Project

Results: Response from the GET /v1/projects/&#123;`project_id`&#125;/files endpoint.; Response from the GET /v1/teams/&#123;`team_id`&#125;/projects endpoint.; Response from the GET /v1/projects/&#123;`project_id`&#125;/meta endpoint.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: The ID of the project.
- `name`: The project&#39;s name.

### Style

Results: Response from the GET /v1/files/&#123;`file_key`&#125;/styles endpoint.; Response from the GET /v1/styles/&#123;key&#125; endpoint.; Response from the GET /v1/teams/&#123;`team_id`&#125;/styles endpoint.

SDK operations: `load`.

Key fields to recognise:

- `created_at`: The UTC ISO 8601 time when the style was created.
- `cursor`: Pagination cursor
- `description`: The description of the style as entered by the publisher.
- `file_key`: The unique identifier of the Figma file that contains the style.
- `id`: Unique stable id of the user.

### User

Results: Response from the GET /v1/me endpoint.

SDK operations: `load`.

Key fields to recognise:

- `email`: Email associated with the user&#39;s account. This property is only present on the /v1/me endpoint.
- `handle`: Name of the user.
- `id`: Unique stable id of the user.
- `img_url`: URL link to the user&#39;s profile image.

### Variable

Results: Response from the POST /v1/files/&#123;`file_key`&#125;/variables endpoint.; Response from the GET /v1/files/&#123;`file_key`&#125;/variables/local endpoint.; Response from the GET /v1/files/&#123;`file_key`&#125;/variables/published endpoint.

SDK operations: `create`, `load`.

Key fields to recognise:

- `tempIdToRealId`: A map of temporary ids in the request to the real ids of the newly created objects
- `variableCollections`: A map of variable collection ids to variable collections
- `variableModeValues`: For setting a specific value, given a variable and a mode.
- `variableModes`: For creating, updating, and deleting modes within variable collections.
- `variables`: A map of variable ids to variables

### Webhook

Results: Response from the POST /v2/webhooks endpoint.; Response from the GET /v2/webhooks/&#123;`webhook_id`&#125;/requests endpoint.; Response from the GET /v2/teams/&#123;`team_id`&#125;/webhooks endpoint.; Response from the GET /v2/webhooks endpoint.; Response from the GET /v2/webhooks/&#123;`webhook_id`&#125; endpoint.; Response from the DELETE /v2/webhooks/&#123;`webhook_id`&#125; endpoint.; Response from the PUT /v2/webhooks/&#123;`webhook_id`&#125; endpoint.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `client_id`: The client ID of the OAuth application that registered this webhook, if any
- `context`: The type of context this webhook is attached to. The value will be &quot;PROJECT&quot;, &quot;TEAM&quot;, or &quot;FILE&quot;
- `context_id`: The ID of the context this webhook is attached to
- `description`: Optional user-provided description or name for the webhook. This is provided to help make maintaining a number of webhooks more convenient. Max length 140 characters.
- `endpoint`: The endpoint that will be hit when the webhook is triggered

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| ActivityLog | `load` | `GET /v1/activity_logs` | Required |
| AiUsage | `list` | `GET /v1/ai_usage/daily` | Required |
| Comment | `create` | `POST /v1/files/{file_key}/comments` | Required |
| Comment | `list` | `GET /v1/files/{file_key}/comments` | Required |
| Comment | `remove` | `DELETE /v1/files/{file_key}/comments/{comment_id}` | Required |
| CommentReaction | `create` | `POST /v1/files/{file_key}/comments/{comment_id}/reactions` | Required |
| CommentReaction | `list` | `GET /v1/files/{file_key}/comments/{comment_id}/reactions` | Required |
| CommentReaction | `remove` | `DELETE /v1/files/{file_key}/comments/{comment_id}/reactions` | Required |
| Component | `load` | `GET /v1/files/{file_key}/components` | Required |
| Component | `load` | `GET /v1/components/{key}` | Required |
| Component | `load` | `GET /v1/teams/{team_id}/components` | Required |
| ComponentSet | `load` | `GET /v1/files/{file_key}/component_sets` | Required |
| ComponentSet | `load` | `GET /v1/component_sets/{key}` | Required |
| ComponentSet | `load` | `GET /v1/teams/{team_id}/component_sets` | Required |
| DevResource | `create` | `POST /v1/dev_resources` | Required |
| DevResource | `list` | `GET /v1/files/{file_key}/dev_resources` | Required |
| DevResource | `remove` | `DELETE /v1/files/{file_key}/dev_resources/{dev_resource_id}` | Required |
| DevResource | `update` | `PUT /v1/dev_resources` | Required |
| DeveloperLog | `create` | `POST /v1/developer_logs` | Required |
| File | `list` | `GET /v1/files/{file_key}/versions` | Required |
| File | `load` | `GET /v1/files/{file_key}/nodes` | Required |
| File | `load` | `GET /v1/images/{file_key}` | Required |
| File | `load` | `GET /v1/files/{file_key}/images` | Required |
| File | `load` | `GET /v1/files/{file_key}/meta` | Required |
| File | `load` | `GET /v1/files/{file_key}` | Required |
| Folder | `list` | `GET /v2/folders/{folder_id}/files` | Required |
| Folder | `list` | `GET /v2/folders/{folder_id}/folders` | Required |
| Folder | `list` | `GET /v2/teams/{team_id}/folders` | Required |
| Folder | `load` | `GET /v2/folders/{folder_id}/meta` | Required |
| LibraryAnalytics | `load` | `GET /v1/analytics/libraries/{file_key}/component/actions` | Required |
| LibraryAnalytics | `load` | `GET /v1/analytics/libraries/{file_key}/component/usages` | Required |
| LibraryAnalytics | `load` | `GET /v1/analytics/libraries/{file_key}/style/actions` | Required |
| LibraryAnalytics | `load` | `GET /v1/analytics/libraries/{file_key}/style/usages` | Required |
| LibraryAnalytics | `load` | `GET /v1/analytics/libraries/{file_key}/variable/actions` | Required |
| LibraryAnalytics | `load` | `GET /v1/analytics/libraries/{file_key}/variable/usages` | Required |
| OEmbed | `load` | `GET /v1/oembed` | Required |
| Payment | `load` | `GET /v1/payments` | Required |
| Project | `list` | `GET /v1/projects/{project_id}/files` | Required |
| Project | `list` | `GET /v1/teams/{team_id}/projects` | Required |
| Project | `load` | `GET /v1/projects/{project_id}/meta` | Required |
| Style | `load` | `GET /v1/files/{file_key}/styles` | Required |
| Style | `load` | `GET /v1/styles/{key}` | Required |
| Style | `load` | `GET /v1/teams/{team_id}/styles` | Required |
| User | `load` | `GET /v1/me` | Required |
| Variable | `create` | `POST /v1/files/{file_key}/variables` | Required |
| Variable | `load` | `GET /v1/files/{file_key}/variables/local` | Required |
| Variable | `load` | `GET /v1/files/{file_key}/variables/published` | Required |
| Webhook | `create` | `POST /v2/webhooks` | Required |
| Webhook | `list` | `GET /v2/webhooks/{webhook_id}/requests` | Required |
| Webhook | `list` | `GET /v2/teams/{team_id}/webhooks` | Required |
| Webhook | `list` | `GET /v2/webhooks` | Required |
| Webhook | `load` | `GET /v2/webhooks/{webhook_id}` | Required |
| Webhook | `remove` | `DELETE /v2/webhooks/{webhook_id}` | Required |
| Webhook | `update` | `PUT /v2/webhooks/{webhook_id}` | Required |

## Connect to the API

- API server: `https://api.figma.com`

The default credential is sent in the `X-Figma-Token` header.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Python | `py/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `cache`: Response caching for safe read requests
- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

