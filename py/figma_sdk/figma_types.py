# Typed models for the Figma SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ActivityLog(TypedDict, total=False):
    activity_logs: list
    cursor: str
    next_page: bool


class ActivityLogLoadMatch(TypedDict, total=False):
    end_time: float
    event: str
    limit: float
    order: str
    start_time: float


class AiUsage(TypedDict):
    pass


class AiUsageListMatchRequired(TypedDict):
    end_date: str
    start_date: str


class AiUsageListMatch(AiUsageListMatchRequired, total=False):
    cursor: str
    limit: int
    user_email: str


class CommentRequired(TypedDict):
    client_meta: Any
    created_at: str
    file_key: str
    id: str
    message: str
    order_id: str | None
    reactions: list
    user: dict


class Comment(CommentRequired, total=False):
    comment_id: str
    parent_id: str
    resolved_at: str | None


class CommentListMatchRequired(TypedDict):
    file_key: str


class CommentListMatch(CommentListMatchRequired, total=False):
    as_md: bool


class CommentCreateDataRequired(TypedDict):
    file_key: str
    message: str


class CommentCreateData(CommentCreateDataRequired, total=False):
    client_meta: Any
    comment_id: str


class CommentRemoveMatch(TypedDict):
    file_key: str
    id: str


class CommentReactionRequired(TypedDict):
    created_at: str
    emoji: str
    error: bool
    status: float
    user: dict


class CommentReaction(CommentReactionRequired, total=False):
    id: str


class CommentReactionListMatchRequired(TypedDict):
    file_id: str
    id: str


class CommentReactionListMatch(CommentReactionListMatchRequired, total=False):
    cursor: str


class CommentReactionCreateData(TypedDict):
    file_id: str
    id: str
    emoji: str


class CommentReactionRemoveMatch(TypedDict):
    file_id: str
    id: str
    emoji: str


class ComponentRequired(TypedDict):
    components: list
    containing_frame: dict
    created_at: str
    description: str
    file_key: str
    key: str
    name: str
    node_id: str
    updated_at: str
    user: dict


class Component(ComponentRequired, total=False):
    cursor: dict
    id: str
    thumbnail_url: str


class ComponentLoadMatch(TypedDict):
    id: str


class ComponentSetRequired(TypedDict):
    component_sets: list
    containing_frame: dict
    created_at: str
    description: str
    file_key: str
    key: str
    name: str
    node_id: str
    updated_at: str
    user: dict


class ComponentSet(ComponentSetRequired, total=False):
    cursor: dict
    id: str
    thumbnail_url: str


class ComponentSetLoadMatch(TypedDict):
    id: str


class DevResourceRequired(TypedDict):
    dev_resources: list
    file_key: str
    id: str
    links_created: list
    name: str
    node_id: str
    url: str


class DevResource(DevResourceRequired, total=False):
    errors: list
    links_updated: list


class DevResourceListMatchRequired(TypedDict):
    file_key: str


class DevResourceListMatch(DevResourceListMatchRequired, total=False):
    node_id: str


class DevResourceCreateData(TypedDict):
    dev_resources: list


class DevResourceUpdateData(TypedDict, total=False):
    dev_resources: list


class DevResourceRemoveMatch(TypedDict):
    file_key: str
    id: str


class DeveloperLogRequired(TypedDict):
    has_more: bool
    items: list


class DeveloperLog(DeveloperLogRequired, total=False):
    cursor: str | None
    date_range: str
    event_source: str
    ip_address: str
    limit: int
    token: str
    token_name: str
    token_type: str
    user_email: str


class DeveloperLogCreateData(TypedDict, total=False):
    cursor: str | None
    date_range: str
    event_source: str
    ip_address: str
    limit: int
    token: str
    token_name: str
    token_type: str
    user_email: str


class FileRequired(TypedDict):
    componentSets: dict
    components: dict
    document: Any
    editorType: str
    err: None
    images: dict
    lastModified: str
    name: str
    role: str
    schemaVersion: float
    styles: dict
    version: str


class File(FileRequired, total=False):
    branches: list
    id: str
    linkAccess: str
    mainFileKey: str
    thumbnailUrl: str


class FileLoadMatchRequired(TypedDict):
    file_key: str
    ids: str


class FileLoadMatch(FileLoadMatchRequired, total=False):
    contents_only: bool
    format: str
    scale: float
    svg_include_id: bool
    svg_include_node_id: bool
    svg_outline_text: bool
    svg_simplify_stroke: bool
    use_absolute_bound: bool
    version: str


class FileListMatchRequired(TypedDict):
    file_key: str


class FileListMatch(FileListMatchRequired, total=False):
    after: float
    before: float
    page_size: float


class FolderRequired(TypedDict):
    id: str
    name: str
    parent_folder_id: str | None


class Folder(FolderRequired, total=False):
    created_at: str
    sharing_audience_control: str


class FolderLoadMatch(TypedDict):
    id: str


class FolderListMatch(TypedDict):
    id: str


class LibraryAnalyticsRequired(TypedDict):
    next_page: bool
    rows: Any


class LibraryAnalytics(LibraryAnalyticsRequired, total=False):
    cursor: str


class LibraryAnalyticsLoadMatchRequired(TypedDict):
    library_id: str
    group_by: str


class LibraryAnalyticsLoadMatch(LibraryAnalyticsLoadMatchRequired, total=False):
    cursor: str
    end_date: str
    start_date: str


class OEmbedRequired(TypedDict):
    cache_age: int
    height: int
    html: str
    provider_name: str
    provider_url: str
    title: str
    type: str
    url: str
    version: str
    width: int


class OEmbed(OEmbedRequired, total=False):
    folder_name: str
    is_published_site: bool
    key: str
    thumbnail_height: int
    thumbnail_url: str
    thumbnail_width: int


class OEmbedLoadMatchRequired(TypedDict):
    url: str


class OEmbedLoadMatch(OEmbedLoadMatchRequired, total=False):
    maxheight: int
    maxwidth: int


class PaymentRequired(TypedDict):
    payment_status: dict
    resource_id: str
    resource_type: str
    user_id: str


class Payment(PaymentRequired, total=False):
    date_of_purchase: str


class PaymentLoadMatch(TypedDict, total=False):
    community_file_id: str
    plugin_id: str
    plugin_payment_token: str
    user_id: str
    widget_id: str


class Project(TypedDict):
    id: str
    name: str


class ProjectLoadMatch(TypedDict):
    id: str


class ProjectListMatch(TypedDict):
    team_id: str


class StyleRequired(TypedDict):
    created_at: str
    description: str
    file_key: str
    key: str
    name: str
    node_id: str
    sort_position: str
    style_type: str
    styles: list
    updated_at: str
    user: dict


class Style(StyleRequired, total=False):
    cursor: dict
    id: str
    thumbnail_url: str


class StyleLoadMatch(TypedDict):
    id: str


class User(TypedDict):
    email: str
    handle: str
    id: str
    img_url: str


class UserLoadMatchRequired(TypedDict):
    id: str


class UserLoadMatch(UserLoadMatchRequired, total=False):
    email: str
    handle: str
    img_url: str


class VariableRequired(TypedDict):
    tempIdToRealId: dict


class Variable(VariableRequired, total=False):
    variableCollections: list
    variableModeValues: list
    variableModes: list
    variables: list


class VariableLoadMatch(TypedDict):
    file_key: str


class VariableCreateDataRequired(TypedDict):
    file_key: str


class VariableCreateData(VariableCreateDataRequired, total=False):
    variableCollections: list
    variableModeValues: list
    variableModes: list
    variables: list


class Webhook(TypedDict):
    client_id: str | None
    context: str
    context_id: str
    description: str | None
    endpoint: str
    event_type: str
    id: str
    passcode: str
    plan_api_id: str
    status: str
    team_id: str


class WebhookLoadMatch(TypedDict):
    id: str


class WebhookListMatch(TypedDict, total=False):
    context: str
    context_id: str
    cursor: str
    plan_api_id: str


class WebhookCreateDataRequired(TypedDict):
    context: str
    context_id: str
    endpoint: str
    event_type: str
    passcode: str


class WebhookCreateData(WebhookCreateDataRequired, total=False):
    description: str | None
    status: str
    team_id: str


class WebhookUpdateDataRequired(TypedDict):
    id: str


class WebhookUpdateData(WebhookUpdateDataRequired, total=False):
    description: str | None
    endpoint: str
    event_type: str
    passcode: str
    status: str


class WebhookRemoveMatch(TypedDict):
    id: str
