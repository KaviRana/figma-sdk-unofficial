"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const CacheFeature_1 = require("./feature/cache/CacheFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    cache: CacheFeature_1.CacheFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Figma',
        slug: "figma",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        cache: {
            "options": {
                "active": false,
                "max": 256,
                "methods": [
                    "GET"
                ],
                "ttl": 5000
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
    };
    options = {
        base: "https://api.figma.com",
        auth: {
            prefix: '',
            name: 'X-Figma-Token',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            activity_log: {},
            ai_usage: {},
            comment: {},
            comment_reaction: {},
            component: {},
            component_set: {},
            dev_resource: {},
            developer_log: {},
            file: {},
            folder: {},
            library_analytics: {},
            o_embed: {},
            payment: {},
            project: {},
            style: {},
            user: {},
            variable: {},
            webhook: {},
        }
    };
    entity = {
        "activity_log": {
            "fields": [
                {
                    "name": "activity_logs",
                    "title": "Activity Logs",
                    "type": "`$ARRAY`",
                    "short": "An array of activity logs sorted by timestamp in ascending order by default."
                },
                {
                    "name": "cursor",
                    "title": "Cursor",
                    "type": "`$STRING`",
                    "short": "Encodes the last event (the most recent event)"
                },
                {
                    "name": "next_page",
                    "title": "Next Page",
                    "type": "`$BOOLEAN`",
                    "short": "Whether there is a next page of events"
                }
            ],
            "name": "activity_log",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/activity_logs",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "activity_logs"
                                }
                            ],
                            "parts": [
                                "v1",
                                "activity_logs"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "end_time",
                                        "orig": "end_time",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "event",
                                        "orig": "events",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "order",
                                        "orig": "order",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "asc"
                                    },
                                    {
                                        "name": "start_time",
                                        "orig": "start_time",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "ai_usage": {
            "fields": [],
            "name": "ai_usage",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/ai_usage/daily",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "ai_usage"
                                },
                                {
                                    "lit": "daily"
                                }
                            ],
                            "parts": [
                                "v1",
                                "ai_usage",
                                "daily"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.rows`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1000
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "user_email",
                                        "orig": "user_email",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "daily",
                                "exist": [
                                    "end_date",
                                    "start_date"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "comment": {
            "fields": [
                {
                    "name": "client_meta",
                    "title": "Client Meta",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Positioning information of the comment."
                },
                {
                    "name": "comment_id",
                    "title": "Comment Id",
                    "type": "`$STRING`",
                    "short": "The ID of the comment to reply to, if any."
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The UTC ISO 8601 time at which the comment was left",
                    "format": "date-time"
                },
                {
                    "name": "file_key",
                    "title": "File Key",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The file in which the comment lives"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier for comment."
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The content of the comment"
                },
                {
                    "name": "order_id",
                    "title": "Order Id",
                    "type": [
                        "`$ONE`",
                        [
                            "`$STRING`",
                            "`$NULL`"
                        ]
                    ],
                    "req": true,
                    "short": "Only set for top level comments."
                },
                {
                    "name": "parent_id",
                    "title": "Parent Id",
                    "type": "`$STRING`",
                    "short": "If present, the id of the comment to which this is the reply"
                },
                {
                    "name": "reactions",
                    "title": "Reactions",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "An array of reactions to the comment"
                },
                {
                    "name": "resolved_at",
                    "title": "Resolved At",
                    "type": [
                        "`$ONE`",
                        [
                            "`$STRING`",
                            "`$NULL`"
                        ]
                    ],
                    "short": "If set, the UTC ISO 8601 time the comment was resolved",
                    "format": "date-time"
                },
                {
                    "name": "user",
                    "title": "User",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The user who left the comment"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "comment",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v1/files/{file_key}/comments",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "comments"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "comments"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/comments",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "comments"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "comments"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.comments`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "as_md",
                                        "orig": "as_md",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v1/files/{file_key}/comments/{comment_id}",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "comments",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "comment_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "comment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_key",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.file"
                    ]
                ]
            }
        },
        "comment_reaction": {
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The UTC ISO 8601 time at which the reaction was left.",
                    "format": "date-time"
                },
                {
                    "name": "emoji",
                    "title": "Emoji",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The emoji type of reaction as shortcode (e.g."
                },
                {
                    "name": "error",
                    "title": "Error",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "For successful requests, this value is always `false`."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The status of the request."
                },
                {
                    "name": "user",
                    "title": "User",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The user who left the reaction."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "comment_reaction",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v1/files/{file_key}/comments/{comment_id}/reactions",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_id"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "reactions"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_id}",
                                "comments",
                                "{id}",
                                "reactions"
                            ],
                            "rename": {
                                "param": {
                                    "comment_id": "id",
                                    "file_key": "file_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_id",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "comment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_id",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/comments/{comment_id}/reactions",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_id"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "reactions"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_id}",
                                "comments",
                                "{id}",
                                "reactions"
                            ],
                            "rename": {
                                "param": {
                                    "comment_id": "id",
                                    "file_key": "file_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.reactions`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_id",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "comment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_id",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v1/files/{file_key}/comments/{comment_id}/reactions",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_id"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "reactions"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_id}",
                                "comments",
                                "{id}",
                                "reactions"
                            ],
                            "rename": {
                                "param": {
                                    "comment_id": "id",
                                    "file_key": "file_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_id",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "comment_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "emoji",
                                        "orig": "emoji",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "emoji",
                                    "file_id",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.file"
                    ]
                ]
            }
        },
        "component": {
            "fields": [
                {
                    "name": "components",
                    "title": "Components",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "containing_frame",
                    "title": "Containing Frame",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The containing frame of the component."
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The UTC ISO 8601 time when the component was created.",
                    "format": "date-time"
                },
                {
                    "name": "cursor",
                    "title": "Cursor",
                    "type": "`$OBJECT`",
                    "short": "Pagination cursor"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The description of the component as entered by the publisher."
                },
                {
                    "name": "file_key",
                    "title": "File Key",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier of the Figma file that contains the component."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "key",
                    "title": "Key",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier for the component."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the component."
                },
                {
                    "name": "node_id",
                    "title": "Node Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier of the component node within the Figma file."
                },
                {
                    "name": "thumbnail_url",
                    "title": "Thumbnail Url",
                    "type": "`$STRING`",
                    "short": "A URL to a thumbnail image of the component."
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The UTC ISO 8601 time when the component was last updated.",
                    "format": "date-time"
                },
                {
                    "name": "user",
                    "title": "User",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The user who last updated the component."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "component",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/components",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "components"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "components"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/components/{key}",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "components"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "components",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "key": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/teams/{team_id}/components",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "teams"
                                },
                                {
                                    "var": "team_id"
                                },
                                {
                                    "lit": "components"
                                }
                            ],
                            "parts": [
                                "v1",
                                "teams",
                                "{team_id}",
                                "components"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "team_id",
                                        "orig": "team_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "after",
                                        "orig": "after",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "before",
                                        "orig": "before",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page_size",
                                        "orig": "page_size",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 30
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "team_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.file"
                    ]
                ]
            }
        },
        "component_set": {
            "fields": [
                {
                    "name": "component_sets",
                    "title": "Component Sets",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "containing_frame",
                    "title": "Containing Frame",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The containing frame of the component set."
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The UTC ISO 8601 time when the component set was created.",
                    "format": "date-time"
                },
                {
                    "name": "cursor",
                    "title": "Cursor",
                    "type": "`$OBJECT`",
                    "short": "Pagination cursor"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The description of the component set as entered by the publisher."
                },
                {
                    "name": "file_key",
                    "title": "File Key",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier of the Figma file that contains the component set."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "key",
                    "title": "Key",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier for the component set."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the component set."
                },
                {
                    "name": "node_id",
                    "title": "Node Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier of the component set node within the Figma file."
                },
                {
                    "name": "thumbnail_url",
                    "title": "Thumbnail Url",
                    "type": "`$STRING`",
                    "short": "A URL to a thumbnail image of the component set."
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The UTC ISO 8601 time when the component set was last updated.",
                    "format": "date-time"
                },
                {
                    "name": "user",
                    "title": "User",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The user who last updated the component set."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "component_set",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/component_sets",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "component_sets"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "component_sets"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/component_sets/{key}",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "component_sets"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "component_sets",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "key": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/teams/{team_id}/component_sets",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "teams"
                                },
                                {
                                    "var": "team_id"
                                },
                                {
                                    "lit": "component_sets"
                                }
                            ],
                            "parts": [
                                "v1",
                                "teams",
                                "{team_id}",
                                "component_sets"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "team_id",
                                        "orig": "team_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "after",
                                        "orig": "after",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "before",
                                        "orig": "before",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page_size",
                                        "orig": "page_size",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 30
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "team_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.file"
                    ]
                ]
            }
        },
        "dev_resource": {
            "fields": [
                {
                    "name": "dev_resources",
                    "title": "Dev Resources",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "An array of dev resources."
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "short": "An array of errors."
                },
                {
                    "name": "file_key",
                    "title": "File Key",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The file key where the dev resource belongs."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier of the dev resource"
                },
                {
                    "name": "links_created",
                    "title": "Links Created",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "An array of links created."
                },
                {
                    "name": "links_updated",
                    "title": "Links Updated",
                    "type": "`$ARRAY`",
                    "short": "An array of links updated."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the dev resource."
                },
                {
                    "name": "node_id",
                    "title": "Node Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The target node to attach the dev resource to."
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The URL of the dev resource."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "dev_resource",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v1/dev_resources",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "dev_resources"
                                }
                            ],
                            "parts": [
                                "v1",
                                "dev_resources"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/dev_resources",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "dev_resources"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "dev_resources"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.dev_resources`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "node_id",
                                        "orig": "node_ids",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v1/files/{file_key}/dev_resources/{dev_resource_id}",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "dev_resources"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "dev_resources",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "dev_resource_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "dev_resource_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_key",
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/v1/dev_resources",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "dev_resources"
                                }
                            ],
                            "parts": [
                                "v1",
                                "dev_resources"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.file"
                    ]
                ]
            }
        },
        "developer_log": {
            "fields": [
                {
                    "name": "cursor",
                    "title": "Cursor",
                    "type": [
                        "`$ONE`",
                        [
                            "`$STRING`",
                            "`$NULL`"
                        ]
                    ],
                    "short": "A cursor for pagination."
                },
                {
                    "name": "date_range",
                    "title": "Date Range",
                    "type": "`$STRING`",
                    "short": "Filter by date range."
                },
                {
                    "name": "event_source",
                    "title": "Event Source",
                    "type": "`$STRING`",
                    "short": "Filter by event source."
                },
                {
                    "name": "has_more",
                    "title": "Has More",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether there are more results available after this page."
                },
                {
                    "name": "ip_address",
                    "title": "Ip Address",
                    "type": "`$STRING`",
                    "short": "Filter by IP address prefix(es)."
                },
                {
                    "name": "items",
                    "title": "Items",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "An array of developer log entries sorted by timestamp in descending order."
                },
                {
                    "name": "limit",
                    "title": "Limit",
                    "type": "`$INTEGER`",
                    "short": "Maximum number of entries to return."
                },
                {
                    "name": "token",
                    "title": "Token",
                    "type": "`$STRING`",
                    "short": "Filter by token value(s)."
                },
                {
                    "name": "token_name",
                    "title": "Token Name",
                    "type": "`$STRING`",
                    "short": "Filter by token name prefix(es)."
                },
                {
                    "name": "token_type",
                    "title": "Token Type",
                    "type": "`$STRING`",
                    "short": "Filter by the type of token used for authentication."
                },
                {
                    "name": "user_email",
                    "title": "User Email",
                    "type": "`$STRING`",
                    "short": "Filter by user email prefix(es)."
                }
            ],
            "name": "developer_log",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v1/developer_logs",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "developer_logs"
                                }
                            ],
                            "parts": [
                                "v1",
                                "developer_logs"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "file": {
            "fields": [
                {
                    "name": "branches",
                    "title": "Branches",
                    "type": "`$ARRAY`",
                    "short": "A list of branches for this file."
                },
                {
                    "name": "componentSets",
                    "title": "Component Sets",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "A mapping from component set IDs to component set metadata."
                },
                {
                    "name": "components",
                    "title": "Components",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "A mapping from component IDs to component metadata."
                },
                {
                    "name": "document",
                    "title": "Document",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "editorType",
                    "title": "Editor Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The type of editor associated with this file."
                },
                {
                    "name": "err",
                    "title": "Err",
                    "type": "`$NULL`",
                    "req": true,
                    "short": "For successful requests, this value is always `null`."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "images",
                    "title": "Images",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "A map from node IDs to URLs of the rendered images."
                },
                {
                    "name": "lastModified",
                    "title": "Last Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The UTC ISO 8601 time at which the file was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "linkAccess",
                    "title": "Link Access",
                    "type": "`$STRING`",
                    "short": "The share permission level of the file link."
                },
                {
                    "name": "mainFileKey",
                    "title": "Main File Key",
                    "type": "`$STRING`",
                    "short": "The key of the main file for this file."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the file as it appears in the editor."
                },
                {
                    "name": "role",
                    "title": "Role",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The role of the user making the API request in relation to the file."
                },
                {
                    "name": "schemaVersion",
                    "title": "Schema Version",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "The version of the file schema that this file uses."
                },
                {
                    "name": "styles",
                    "title": "Styles",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "A mapping from style IDs to style metadata."
                },
                {
                    "name": "thumbnailUrl",
                    "title": "Thumbnail Url",
                    "type": "`$STRING`",
                    "short": "A URL to a thumbnail image of the file."
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The version number of the file."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "file",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/versions",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "versions"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "versions"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.versions`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "after",
                                        "orig": "after",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "before",
                                        "orig": "before",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page_size",
                                        "orig": "page_size",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "version",
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/nodes",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "nodes"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "nodes"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "depth",
                                        "orig": "depth",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "geometry",
                                        "orig": "geometry",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "ids",
                                        "orig": "ids",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "plugin_data",
                                        "orig": "plugin_data",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "version",
                                        "orig": "version",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "node",
                                "exist": [
                                    "file_key",
                                    "ids"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/images/{file_key}",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "images"
                                },
                                {
                                    "var": "file_key"
                                }
                            ],
                            "parts": [
                                "v1",
                                "images",
                                "{file_key}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "contents_only",
                                        "orig": "contents_only",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": true
                                    },
                                    {
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "png"
                                    },
                                    {
                                        "name": "ids",
                                        "orig": "ids",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "scale",
                                        "orig": "scale",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "svg_include_id",
                                        "orig": "svg_include_id",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "svg_include_node_id",
                                        "orig": "svg_include_node_id",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "svg_outline_text",
                                        "orig": "svg_outline_text",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": true
                                    },
                                    {
                                        "name": "svg_simplify_stroke",
                                        "orig": "svg_simplify_stroke",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": true
                                    },
                                    {
                                        "name": "use_absolute_bound",
                                        "orig": "use_absolute_bounds",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "version",
                                        "orig": "version",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_key",
                                    "ids"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/images",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "images"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "images"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "image",
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/meta",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "meta"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "meta"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.file`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "meta",
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "file_key": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "branch_data",
                                        "orig": "branch_data",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "depth",
                                        "orig": "depth",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "geometry",
                                        "orig": "geometry",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "ids",
                                        "orig": "ids",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "plugin_data",
                                        "orig": "plugin_data",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "version",
                                        "orig": "version",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "folder": {
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "short": "The time at which the folder was created.",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The ID of the folder."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the folder."
                },
                {
                    "name": "parent_folder_id",
                    "title": "Parent Folder Id",
                    "type": [
                        "`$ONE`",
                        [
                            "`$STRING`",
                            "`$NULL`"
                        ]
                    ],
                    "req": true,
                    "short": "The ID of the folder's parent folder, or null if the folder is a top-level folder in the team."
                },
                {
                    "name": "sharing_audience_control",
                    "title": "Sharing Audience Control",
                    "type": "`$STRING`",
                    "short": "The audience that can access the folder."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "folder",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/folders/{folder_id}/files",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "folders"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "files"
                                }
                            ],
                            "parts": [
                                "v2",
                                "folders",
                                "{id}",
                                "files"
                            ],
                            "rename": {
                                "param": {
                                    "folder_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.files`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "folder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "branch_data",
                                        "orig": "branch_data",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {
                                "$action": "file",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/folders/{folder_id}/folders",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "folders"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "folders"
                                }
                            ],
                            "parts": [
                                "v2",
                                "folders",
                                "{id}",
                                "folders"
                            ],
                            "rename": {
                                "param": {
                                    "folder_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.folders`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "folder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/teams/{team_id}/folders",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "teams"
                                },
                                {
                                    "var": "team_id"
                                },
                                {
                                    "lit": "folders"
                                }
                            ],
                            "parts": [
                                "v2",
                                "teams",
                                "{team_id}",
                                "folders"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.folders`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "team_id",
                                        "orig": "team_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "team_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/folders/{folder_id}/meta",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "folders"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "meta"
                                }
                            ],
                            "parts": [
                                "v2",
                                "folders",
                                "{id}",
                                "meta"
                            ],
                            "rename": {
                                "param": {
                                    "folder_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "folder_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "meta",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "library_analytics": {
            "fields": [
                {
                    "name": "cursor",
                    "title": "Cursor",
                    "type": "`$STRING`",
                    "short": "The cursor to use to fetch the next page of data."
                },
                {
                    "name": "next_page",
                    "title": "Next Page",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether there is a next page of data that can be fetched."
                },
                {
                    "name": "rows",
                    "title": "Rows",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "An array of analytics data."
                }
            ],
            "name": "library_analytics",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/analytics/libraries/{file_key}/component/actions",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "analytics"
                                },
                                {
                                    "lit": "libraries"
                                },
                                {
                                    "var": "library_id"
                                },
                                {
                                    "lit": "component"
                                },
                                {
                                    "lit": "actions"
                                }
                            ],
                            "parts": [
                                "v1",
                                "analytics",
                                "libraries",
                                "{library_id}",
                                "component",
                                "actions"
                            ],
                            "rename": {
                                "param": {
                                    "file_key": "library_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "library_id",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "group_by",
                                        "orig": "group_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "group_by",
                                    "library_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/analytics/libraries/{file_key}/component/usages",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "analytics"
                                },
                                {
                                    "lit": "libraries"
                                },
                                {
                                    "var": "library_id"
                                },
                                {
                                    "lit": "component"
                                },
                                {
                                    "lit": "usages"
                                }
                            ],
                            "parts": [
                                "v1",
                                "analytics",
                                "libraries",
                                "{library_id}",
                                "component",
                                "usages"
                            ],
                            "rename": {
                                "param": {
                                    "file_key": "library_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "library_id",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "group_by",
                                        "orig": "group_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "group_by",
                                    "library_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/analytics/libraries/{file_key}/style/actions",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "analytics"
                                },
                                {
                                    "lit": "libraries"
                                },
                                {
                                    "var": "library_id"
                                },
                                {
                                    "lit": "style"
                                },
                                {
                                    "lit": "actions"
                                }
                            ],
                            "parts": [
                                "v1",
                                "analytics",
                                "libraries",
                                "{library_id}",
                                "style",
                                "actions"
                            ],
                            "rename": {
                                "param": {
                                    "file_key": "library_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "library_id",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "group_by",
                                        "orig": "group_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "group_by",
                                    "library_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/analytics/libraries/{file_key}/style/usages",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "analytics"
                                },
                                {
                                    "lit": "libraries"
                                },
                                {
                                    "var": "library_id"
                                },
                                {
                                    "lit": "style"
                                },
                                {
                                    "lit": "usages"
                                }
                            ],
                            "parts": [
                                "v1",
                                "analytics",
                                "libraries",
                                "{library_id}",
                                "style",
                                "usages"
                            ],
                            "rename": {
                                "param": {
                                    "file_key": "library_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "library_id",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "group_by",
                                        "orig": "group_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "group_by",
                                    "library_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/analytics/libraries/{file_key}/variable/actions",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "analytics"
                                },
                                {
                                    "lit": "libraries"
                                },
                                {
                                    "var": "library_id"
                                },
                                {
                                    "lit": "variable"
                                },
                                {
                                    "lit": "actions"
                                }
                            ],
                            "parts": [
                                "v1",
                                "analytics",
                                "libraries",
                                "{library_id}",
                                "variable",
                                "actions"
                            ],
                            "rename": {
                                "param": {
                                    "file_key": "library_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "library_id",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "group_by",
                                        "orig": "group_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "group_by",
                                    "library_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/analytics/libraries/{file_key}/variable/usages",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "analytics"
                                },
                                {
                                    "lit": "libraries"
                                },
                                {
                                    "var": "library_id"
                                },
                                {
                                    "lit": "variable"
                                },
                                {
                                    "lit": "usages"
                                }
                            ],
                            "parts": [
                                "v1",
                                "analytics",
                                "libraries",
                                "{library_id}",
                                "variable",
                                "usages"
                            ],
                            "rename": {
                                "param": {
                                    "file_key": "library_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "library_id",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "group_by",
                                        "orig": "group_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "group_by",
                                    "library_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "o_embed": {
            "fields": [
                {
                    "name": "cache_age",
                    "title": "Cache Age",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Suggested cache lifetime for this response in seconds."
                },
                {
                    "name": "folder_name",
                    "title": "Folder Name",
                    "type": "`$STRING`",
                    "short": "The name of the folder containing the file, if the file resides in a folder."
                },
                {
                    "name": "height",
                    "title": "Height",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Height of the embed in pixels."
                },
                {
                    "name": "html",
                    "title": "Html",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The HTML for embedding the file."
                },
                {
                    "name": "is_published_site",
                    "title": "Is Published Site",
                    "type": "`$BOOLEAN`",
                    "short": "Only present and \"true\" when the resource is a published Make."
                },
                {
                    "name": "key",
                    "title": "Key",
                    "type": "`$STRING`",
                    "short": "The key of the Figma file."
                },
                {
                    "name": "provider_name",
                    "title": "Provider Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the content provider."
                },
                {
                    "name": "provider_url",
                    "title": "Provider Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The URL of the content provider's website."
                },
                {
                    "name": "thumbnail_height",
                    "title": "Thumbnail Height",
                    "type": "`$INTEGER`",
                    "short": "Height of the thumbnail image in pixels."
                },
                {
                    "name": "thumbnail_url",
                    "title": "Thumbnail Url",
                    "type": "`$STRING`",
                    "short": "URL of a thumbnail image for the file."
                },
                {
                    "name": "thumbnail_width",
                    "title": "Thumbnail Width",
                    "type": "`$INTEGER`",
                    "short": "Width of the thumbnail image in pixels."
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The title of the Figma file or published Make site."
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The oEmbed response type."
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The canonical URL of the resource."
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The oEmbed specification version."
                },
                {
                    "name": "width",
                    "title": "Width",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Width of the embed in pixels."
                }
            ],
            "name": "o_embed",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/oembed",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "oembed"
                                }
                            ],
                            "parts": [
                                "v1",
                                "oembed"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "maxheight",
                                        "orig": "maxheight",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 450
                                    },
                                    {
                                        "name": "maxwidth",
                                        "orig": "maxwidth",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 800
                                    },
                                    {
                                        "name": "url",
                                        "orig": "url",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "url"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "payment": {
            "fields": [
                {
                    "name": "date_of_purchase",
                    "title": "Date Of Purchase",
                    "type": "`$STRING`",
                    "short": "The UTC ISO 8601 timestamp indicating when the user purchased the resource.",
                    "format": "date-time"
                },
                {
                    "name": "payment_status",
                    "title": "Payment Status",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "An object describing the user's payment status."
                },
                {
                    "name": "resource_id",
                    "title": "Resource Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The ID of the plugin, widget, or Community file that was queried."
                },
                {
                    "name": "resource_type",
                    "title": "Resource Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The type of the resource."
                },
                {
                    "name": "user_id",
                    "title": "User Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The ID of the user whose payment information was queried."
                }
            ],
            "name": "payment",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/payments",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "payments"
                                }
                            ],
                            "parts": [
                                "v1",
                                "payments"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "community_file_id",
                                        "orig": "community_file_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "plugin_id",
                                        "orig": "plugin_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "plugin_payment_token",
                                        "orig": "plugin_payment_token",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "widget_id",
                                        "orig": "widget_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "project": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The ID of the project."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the project."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "project",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/projects/{project_id}/files",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "files"
                                }
                            ],
                            "parts": [
                                "v1",
                                "projects",
                                "{id}",
                                "files"
                            ],
                            "rename": {
                                "param": {
                                    "project_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.files`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "branch_data",
                                        "orig": "branch_data",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {
                                "$action": "file",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/teams/{team_id}/projects",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "teams"
                                },
                                {
                                    "var": "team_id"
                                },
                                {
                                    "lit": "projects"
                                }
                            ],
                            "parts": [
                                "v1",
                                "teams",
                                "{team_id}",
                                "projects"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.projects`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "team_id",
                                        "orig": "team_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "team_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/projects/{project_id}/meta",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "meta"
                                }
                            ],
                            "parts": [
                                "v1",
                                "projects",
                                "{id}",
                                "meta"
                            ],
                            "rename": {
                                "param": {
                                    "project_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "meta",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "style": {
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The UTC ISO 8601 time when the style was created.",
                    "format": "date-time"
                },
                {
                    "name": "cursor",
                    "title": "Cursor",
                    "type": "`$OBJECT`",
                    "short": "Pagination cursor"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The description of the style as entered by the publisher."
                },
                {
                    "name": "file_key",
                    "title": "File Key",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier of the Figma file that contains the style."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "key",
                    "title": "Key",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier for the style"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The name of the style."
                },
                {
                    "name": "node_id",
                    "title": "Node Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "ID of the style node within the figma file"
                },
                {
                    "name": "sort_position",
                    "title": "Sort Position",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A user specified order number by which the style can be sorted."
                },
                {
                    "name": "style_type",
                    "title": "Style Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The type of style"
                },
                {
                    "name": "styles",
                    "title": "Styles",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "thumbnail_url",
                    "title": "Thumbnail Url",
                    "type": "`$STRING`",
                    "short": "A URL to a thumbnail image of the style."
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The UTC ISO 8601 time when the style was last updated.",
                    "format": "date-time"
                },
                {
                    "name": "user",
                    "title": "User",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The user who last updated the style."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "style",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/styles",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "styles"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "styles"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/styles/{key}",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "styles"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v1",
                                "styles",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "key": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/teams/{team_id}/styles",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "teams"
                                },
                                {
                                    "var": "team_id"
                                },
                                {
                                    "lit": "styles"
                                }
                            ],
                            "parts": [
                                "v1",
                                "teams",
                                "{team_id}",
                                "styles"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "team_id",
                                        "orig": "team_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "after",
                                        "orig": "after",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "before",
                                        "orig": "before",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page_size",
                                        "orig": "page_size",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 30
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "team_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.file"
                    ]
                ]
            }
        },
        "user": {
            "fields": [
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Email associated with the user's account."
                },
                {
                    "name": "handle",
                    "title": "Handle",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Name of the user."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique stable id of the user."
                },
                {
                    "name": "img_url",
                    "title": "Img Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "URL link to the user's profile image."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "user",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/me",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "me"
                                }
                            ],
                            "parts": [
                                "v1",
                                "me"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "variable": {
            "fields": [
                {
                    "name": "tempIdToRealId",
                    "title": "Temp Id To Real Id",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "A map of temporary ids in the request to the real ids of the newly created objects"
                },
                {
                    "name": "variableCollections",
                    "title": "Variable Collections",
                    "type": "`$ARRAY`",
                    "short": "For creating, updating, and deleting variable collections."
                },
                {
                    "name": "variableModeValues",
                    "title": "Variable Mode Values",
                    "type": "`$ARRAY`",
                    "short": "For setting a specific value, given a variable and a mode."
                },
                {
                    "name": "variableModes",
                    "title": "Variable Modes",
                    "type": "`$ARRAY`",
                    "short": "For creating, updating, and deleting modes within variable collections."
                },
                {
                    "name": "variables",
                    "title": "Variables",
                    "type": "`$ARRAY`",
                    "short": "For creating, updating, and deleting variables."
                }
            ],
            "name": "variable",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v1/files/{file_key}/variables",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "variables"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "variables"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/variables/local",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "variables"
                                },
                                {
                                    "lit": "local"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "variables",
                                "local"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "local",
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/files/{file_key}/variables/published",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "files"
                                },
                                {
                                    "var": "file_key"
                                },
                                {
                                    "lit": "variables"
                                },
                                {
                                    "lit": "published"
                                }
                            ],
                            "parts": [
                                "v1",
                                "files",
                                "{file_key}",
                                "variables",
                                "published"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.meta`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "file_key",
                                        "orig": "file_key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "published",
                                "exist": [
                                    "file_key"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.file"
                    ]
                ]
            }
        },
        "webhook": {
            "fields": [
                {
                    "name": "client_id",
                    "title": "Client Id",
                    "type": [
                        "`$ONE`",
                        [
                            "`$STRING`",
                            "`$NULL`"
                        ]
                    ],
                    "req": true,
                    "short": "The client ID of the OAuth application that registered this webhook, if any"
                },
                {
                    "name": "context",
                    "title": "Context",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The type of context this webhook is attached to."
                },
                {
                    "name": "context_id",
                    "title": "Context Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The ID of the context this webhook is attached to"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": [
                        "`$ONE`",
                        [
                            "`$STRING`",
                            "`$NULL`"
                        ]
                    ],
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Optional user-provided description or name for the webhook."
                },
                {
                    "name": "endpoint",
                    "title": "Endpoint",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The endpoint that will be hit when the webhook is triggered"
                },
                {
                    "name": "event_type",
                    "title": "Event Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The event this webhook triggers on"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The ID of the webhook"
                },
                {
                    "name": "passcode",
                    "title": "Passcode",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The passcode that will be passed back to the webhook endpoint."
                },
                {
                    "name": "plan_api_id",
                    "title": "Plan Api Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The plan API ID of the team or organization where this webhook was created"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The current status of the webhook"
                },
                {
                    "name": "team_id",
                    "title": "Team Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The team id you are subscribed to for updates.",
                    "deprecated": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "webhook",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v2/webhooks",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "v2",
                                "webhooks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/webhooks/{webhook_id}/requests",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "requests"
                                }
                            ],
                            "parts": [
                                "v2",
                                "webhooks",
                                "{id}",
                                "requests"
                            ],
                            "rename": {
                                "param": {
                                    "webhook_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.requests`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhook_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "request",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/teams/{team_id}/webhooks",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "teams"
                                },
                                {
                                    "var": "team_id"
                                },
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "v2",
                                "teams",
                                "{team_id}",
                                "webhooks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.webhooks`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "team_id",
                                        "orig": "team_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "team_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/webhooks",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "v2",
                                "webhooks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.webhooks`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "context",
                                        "orig": "context",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "context_id",
                                        "orig": "context_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "plan_api_id",
                                        "orig": "plan_api_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v2/webhooks/{webhook_id}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "webhook_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhook_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v2/webhooks/{webhook_id}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "webhook_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhook_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/v2/webhooks/{webhook_id}",
                            "segments": [
                                {
                                    "lit": "v2"
                                },
                                {
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "v2",
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "webhook_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhook_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map