export interface ActivityLog {
    activity_logs?: any[];
    cursor?: string;
    next_page?: boolean;
}
export interface ActivityLogLoadMatch {
    end_time?: number;
    event?: string;
    limit?: number;
    order?: string;
    start_time?: number;
}
export interface AiUsage {
}
export interface AiUsageListMatch {
    cursor?: string;
    end_date: string;
    limit?: number;
    start_date: string;
    user_email?: string;
    $action?: string;
    [action: string]: any;
}
export interface Comment {
    client_meta: any;
    comment_id?: string;
    created_at: string;
    file_key: string;
    id: string;
    message: string;
    order_id: string | null;
    parent_id?: string;
    reactions: any[];
    resolved_at?: string | null;
    user: Record<string, any>;
}
export interface CommentListMatch {
    file_key: string;
    as_md?: boolean;
}
export interface CommentCreateData {
    file_key: string;
    client_meta?: any;
    comment_id?: string;
    message: string;
}
export interface CommentRemoveMatch {
    file_key: string;
    id: string;
}
export interface CommentReaction {
    created_at: string;
    emoji: string;
    error: boolean;
    id?: string;
    status: number;
    user: Record<string, any>;
}
export interface CommentReactionListMatch {
    file_id: string;
    id: string;
    cursor?: string;
}
export interface CommentReactionCreateData {
    file_id: string;
    id: string;
    emoji: string;
}
export interface CommentReactionRemoveMatch {
    file_id: string;
    id: string;
    emoji: string;
}
export interface Component {
    components: any[];
    containing_frame: Record<string, any>;
    created_at: string;
    cursor?: Record<string, any>;
    description: string;
    file_key: string;
    id?: string;
    key: string;
    name: string;
    node_id: string;
    thumbnail_url?: string;
    updated_at: string;
    user: Record<string, any>;
}
export interface ComponentLoadMatch {
    id: string;
}
export interface ComponentSet {
    component_sets: any[];
    containing_frame: Record<string, any>;
    created_at: string;
    cursor?: Record<string, any>;
    description: string;
    file_key: string;
    id?: string;
    key: string;
    name: string;
    node_id: string;
    thumbnail_url?: string;
    updated_at: string;
    user: Record<string, any>;
}
export interface ComponentSetLoadMatch {
    id: string;
}
export interface DevResource {
    dev_resources: any[];
    errors?: any[];
    file_key: string;
    id: string;
    links_created: any[];
    links_updated?: any[];
    name: string;
    node_id: string;
    url: string;
}
export interface DevResourceListMatch {
    file_key: string;
    node_id?: string;
}
export interface DevResourceCreateData {
    dev_resources: any[];
}
export interface DevResourceUpdateData {
    dev_resources?: any[];
}
export interface DevResourceRemoveMatch {
    file_key: string;
    id: string;
}
export interface DeveloperLog {
    cursor?: string | null;
    date_range?: string;
    event_source?: string;
    has_more: boolean;
    ip_address?: string;
    items: any[];
    limit?: number;
    token?: string;
    token_name?: string;
    token_type?: string;
    user_email?: string;
}
export interface DeveloperLogCreateData {
    cursor?: string | null;
    date_range?: string;
    event_source?: string;
    ip_address?: string;
    limit?: number;
    token?: string;
    token_name?: string;
    token_type?: string;
    user_email?: string;
}
export interface File {
    branches?: any[];
    componentSets: Record<string, any>;
    components: Record<string, any>;
    document: any;
    editorType: string;
    err: null;
    id?: string;
    images: Record<string, any>;
    lastModified: string;
    linkAccess?: string;
    mainFileKey?: string;
    name: string;
    role: string;
    schemaVersion: number;
    styles: Record<string, any>;
    thumbnailUrl?: string;
    version: string;
}
export interface FileLoadMatch {
    file_key: string;
    contents_only?: boolean;
    format?: string;
    ids: string;
    scale?: number;
    svg_include_id?: boolean;
    svg_include_node_id?: boolean;
    svg_outline_text?: boolean;
    svg_simplify_stroke?: boolean;
    use_absolute_bound?: boolean;
    version?: string;
    $action?: string;
    [action: string]: any;
}
export interface FileListMatch {
    file_key: string;
    after?: number;
    before?: number;
    page_size?: number;
    $action?: string;
    [action: string]: any;
}
export interface Folder {
    created_at?: string;
    id: string;
    name: string;
    parent_folder_id: string | null;
    sharing_audience_control?: string;
}
export interface FolderLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface FolderListMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface LibraryAnalytics {
    cursor?: string;
    next_page: boolean;
    rows: any;
}
export interface LibraryAnalyticsLoadMatch {
    library_id: string;
    cursor?: string;
    end_date?: string;
    group_by: string;
    start_date?: string;
}
export interface OEmbed {
    cache_age: number;
    folder_name?: string;
    height: number;
    html: string;
    is_published_site?: boolean;
    key?: string;
    provider_name: string;
    provider_url: string;
    thumbnail_height?: number;
    thumbnail_url?: string;
    thumbnail_width?: number;
    title: string;
    type: string;
    url: string;
    version: string;
    width: number;
}
export interface OEmbedLoadMatch {
    maxheight?: number;
    maxwidth?: number;
    url: string;
}
export interface Payment {
    date_of_purchase?: string;
    payment_status: Record<string, any>;
    resource_id: string;
    resource_type: string;
    user_id: string;
}
export interface PaymentLoadMatch {
    community_file_id?: string;
    plugin_id?: string;
    plugin_payment_token?: string;
    user_id?: string;
    widget_id?: string;
}
export interface Project {
    id: string;
    name: string;
}
export interface ProjectLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface ProjectListMatch {
    team_id: string;
    $action?: string;
    [action: string]: any;
}
export interface Style {
    created_at: string;
    cursor?: Record<string, any>;
    description: string;
    file_key: string;
    id?: string;
    key: string;
    name: string;
    node_id: string;
    sort_position: string;
    style_type: string;
    styles: any[];
    thumbnail_url?: string;
    updated_at: string;
    user: Record<string, any>;
}
export interface StyleLoadMatch {
    id: string;
}
export interface User {
    email: string;
    handle: string;
    id: string;
    img_url: string;
}
export interface UserLoadMatch {
    email?: string;
    handle?: string;
    id: string;
    img_url?: string;
}
export interface Variable {
    tempIdToRealId: Record<string, any>;
    variableCollections?: any[];
    variableModeValues?: any[];
    variableModes?: any[];
    variables?: any[];
}
export interface VariableLoadMatch {
    file_key: string;
    $action?: string;
    [action: string]: any;
}
export interface VariableCreateData {
    file_key: string;
    variableCollections?: any[];
    variableModeValues?: any[];
    variableModes?: any[];
    variables?: any[];
}
export interface Webhook {
    client_id: string | null;
    context: string;
    context_id: string;
    description: string | null;
    endpoint: string;
    event_type: string;
    id: string;
    passcode: string;
    plan_api_id: string;
    status: string;
    team_id: string;
}
export interface WebhookLoadMatch {
    id: string;
}
export interface WebhookListMatch {
    context?: string;
    context_id?: string;
    cursor?: string;
    plan_api_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface WebhookCreateData {
    context: string;
    context_id: string;
    description?: string | null;
    endpoint: string;
    event_type: string;
    passcode: string;
    status?: string;
    team_id?: string;
}
export interface WebhookUpdateData {
    id: string;
    description?: string | null;
    endpoint?: string;
    event_type?: string;
    passcode?: string;
    status?: string;
}
export interface WebhookRemoveMatch {
    id: string;
}
