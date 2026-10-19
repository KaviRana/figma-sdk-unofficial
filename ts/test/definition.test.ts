import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "activity_log",
    "accessor": "ActivityLog",
    "op": "load",
    "method": "GET",
    "path": "/v1/activity_logs",
    "args": [],
    "select": {
      "end_time": "v1",
      "event": "v1",
      "limit": "v1",
      "order": "asc",
      "start_time": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "events",
      "start_time",
      "end_time",
      "limit",
      "order"
    ],
    "queryArgs": [
      {
        "name": "end_time",
        "wire": "end_time"
      },
      {
        "name": "event",
        "wire": "events"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "order",
        "wire": "order"
      },
      {
        "name": "start_time",
        "wire": "start_time"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "activity_logs": [
          {
            "id": "x",
            "timestamp": 1,
            "actor": {
              "type": "user",
              "id": "x",
              "name": "x",
              "email": "x"
            },
            "action": {
              "type": "x",
              "details": {}
            },
            "entity": {
              "type": "user",
              "id": "x",
              "name": "x",
              "email": "x"
            },
            "context": {
              "client_name": "x",
              "ip_address": "x",
              "is_figma_support_team_action": true,
              "org_id": "x",
              "team_id": "x"
            }
          }
        ],
        "cursor": "x",
        "next_page": true
      }
    },
    "idField": "id"
  },
  {
    "entity": "ai_usage",
    "accessor": "AiUsage",
    "op": "list",
    "method": "GET",
    "path": "/v1/ai_usage/daily",
    "action": "daily",
    "args": [],
    "select": {
      "end_date": "v1",
      "start_date": "v1",
      "cursor": "v1",
      "limit": 1000,
      "user_email": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "start_date",
      "end_date",
      "user_email",
      "limit",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "end_date",
        "wire": "end_date"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "start_date",
        "wire": "start_date"
      },
      {
        "name": "user_email",
        "wire": "user_email"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "rows": [
        {
          "plan_id": "x",
          "user_id": "x",
          "user_email": "x",
          "day": "x",
          "editor_type": "design",
          "seat_credits_sum": 1,
          "plan_credits_sum": 1,
          "workspace_id": "x",
          "workspace_name": "x",
          "team_id": "x",
          "team_name": "x",
          "license_group_id": "x",
          "license_group_name": "x",
          "metering_period_start": "x",
          "metering_period_end": "x"
        }
      ],
      "next_cursor": "x",
      "has_next_page": true
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "create",
    "method": "POST",
    "path": "/v1/files/{file_key}/comments",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "client_meta": {
        "x": 1,
        "y": 1
      },
      "file_key": "x",
      "parent_id": "x",
      "user": {
        "id": "x",
        "handle": "x",
        "img_url": "x"
      },
      "created_at": "2026-01-01T00:00:00Z",
      "resolved_at": "2026-01-01T00:00:00Z",
      "message": "x",
      "order_id": "x",
      "reactions": [
        {
          "user": {
            "id": "x",
            "handle": "x",
            "img_url": "x"
          },
          "emoji": "x",
          "created_at": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "list",
    "method": "GET",
    "path": "/v1/files/{file_key}/comments",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {
      "as_md": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "as_md"
    ],
    "queryArgs": [
      {
        "name": "as_md",
        "wire": "as_md"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "comments": [
        {
          "id": "x",
          "client_meta": {
            "x": 1,
            "y": 1
          },
          "file_key": "x",
          "parent_id": "x",
          "user": {
            "id": "x",
            "handle": "x",
            "img_url": "x"
          },
          "created_at": "2026-01-01T00:00:00Z",
          "resolved_at": "2026-01-01T00:00:00Z",
          "message": "x",
          "order_id": "x",
          "reactions": [
            {
              "user": {
                "id": "x",
                "handle": "x",
                "img_url": "x"
              },
              "emoji": "x",
              "created_at": "2026-01-01T00:00:00Z"
            }
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "comment",
    "accessor": "Comment",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/files/{file_key}/comments/{comment_id}",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "comment_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false
    },
    "idField": "id"
  },
  {
    "entity": "comment_reaction",
    "accessor": "CommentReaction",
    "op": "create",
    "method": "POST",
    "path": "/v1/files/{file_key}/comments/{comment_id}/reactions",
    "args": [
      {
        "name": "file_id",
        "wire": "file_key",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "comment_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false
    },
    "idField": "id"
  },
  {
    "entity": "comment_reaction",
    "accessor": "CommentReaction",
    "op": "list",
    "method": "GET",
    "path": "/v1/files/{file_key}/comments/{comment_id}/reactions",
    "args": [
      {
        "name": "file_id",
        "wire": "file_key",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "comment_id",
        "value": "p2"
      }
    ],
    "select": {
      "cursor": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "reactions": [
        {
          "user": {
            "id": "x",
            "handle": "x",
            "img_url": "x"
          },
          "emoji": "x",
          "created_at": "2026-01-01T00:00:00Z"
        }
      ],
      "pagination": {
        "prev_page": "x",
        "next_page": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "comment_reaction",
    "accessor": "CommentReaction",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/files/{file_key}/comments/{comment_id}/reactions",
    "args": [
      {
        "name": "file_id",
        "wire": "file_key",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "comment_id",
        "value": "p2"
      }
    ],
    "select": {
      "emoji": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "emoji"
    ],
    "queryArgs": [
      {
        "name": "emoji",
        "wire": "emoji"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false
    },
    "idField": "id"
  },
  {
    "entity": "component",
    "accessor": "Component",
    "op": "load",
    "method": "GET",
    "path": "/v1/files/{file_key}/components",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "components": [
          {
            "key": "x",
            "file_key": "x",
            "node_id": "x",
            "thumbnail_url": "x",
            "name": "x",
            "description": "x",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "user": {
              "id": "x",
              "handle": "x",
              "img_url": "x"
            },
            "containing_frame": {
              "nodeId": "x",
              "name": "x",
              "backgroundColor": "x",
              "pageId": "x",
              "pageName": "x",
              "containingStateGroup": {},
              "containingComponentSet": {}
            }
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "component",
    "accessor": "Component",
    "op": "load",
    "method": "GET",
    "path": "/v1/components/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "key": "x",
        "file_key": "x",
        "node_id": "x",
        "thumbnail_url": "x",
        "name": "x",
        "description": "x",
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
        "user": {
          "id": "x",
          "handle": "x",
          "img_url": "x"
        },
        "containing_frame": {
          "nodeId": "x",
          "name": "x",
          "backgroundColor": "x",
          "pageId": "x",
          "pageName": "x",
          "containingStateGroup": {
            "nodeId": "x",
            "name": "x"
          },
          "containingComponentSet": {
            "nodeId": "x",
            "name": "x"
          }
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "component",
    "accessor": "Component",
    "op": "load",
    "method": "GET",
    "path": "/v1/teams/{team_id}/components",
    "args": [
      {
        "name": "team_id",
        "wire": "team_id",
        "value": "p1"
      }
    ],
    "select": {
      "after": "v1",
      "before": "v1",
      "page_size": 30
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page_size",
      "after",
      "before"
    ],
    "queryArgs": [
      {
        "name": "after",
        "wire": "after"
      },
      {
        "name": "before",
        "wire": "before"
      },
      {
        "name": "page_size",
        "wire": "page_size"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "components": [
          {
            "key": "x",
            "file_key": "x",
            "node_id": "x",
            "thumbnail_url": "x",
            "name": "x",
            "description": "x",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "user": {
              "id": "x",
              "handle": "x",
              "img_url": "x"
            },
            "containing_frame": {
              "nodeId": "x",
              "name": "x",
              "backgroundColor": "x",
              "pageId": "x",
              "pageName": "x",
              "containingStateGroup": {},
              "containingComponentSet": {}
            }
          }
        ],
        "cursor": {
          "before": 1,
          "after": 1
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "component_set",
    "accessor": "ComponentSet",
    "op": "load",
    "method": "GET",
    "path": "/v1/files/{file_key}/component_sets",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "component_sets": [
          {
            "key": "x",
            "file_key": "x",
            "node_id": "x",
            "thumbnail_url": "x",
            "name": "x",
            "description": "x",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "user": {
              "id": "x",
              "handle": "x",
              "img_url": "x"
            },
            "containing_frame": {
              "nodeId": "x",
              "name": "x",
              "backgroundColor": "x",
              "pageId": "x",
              "pageName": "x",
              "containingStateGroup": {},
              "containingComponentSet": {}
            }
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "component_set",
    "accessor": "ComponentSet",
    "op": "load",
    "method": "GET",
    "path": "/v1/component_sets/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "key": "x",
        "file_key": "x",
        "node_id": "x",
        "thumbnail_url": "x",
        "name": "x",
        "description": "x",
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
        "user": {
          "id": "x",
          "handle": "x",
          "img_url": "x"
        },
        "containing_frame": {
          "nodeId": "x",
          "name": "x",
          "backgroundColor": "x",
          "pageId": "x",
          "pageName": "x",
          "containingStateGroup": {
            "nodeId": "x",
            "name": "x"
          },
          "containingComponentSet": {
            "nodeId": "x",
            "name": "x"
          }
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "component_set",
    "accessor": "ComponentSet",
    "op": "load",
    "method": "GET",
    "path": "/v1/teams/{team_id}/component_sets",
    "args": [
      {
        "name": "team_id",
        "wire": "team_id",
        "value": "p1"
      }
    ],
    "select": {
      "after": "v1",
      "before": "v1",
      "page_size": 30
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page_size",
      "after",
      "before"
    ],
    "queryArgs": [
      {
        "name": "after",
        "wire": "after"
      },
      {
        "name": "before",
        "wire": "before"
      },
      {
        "name": "page_size",
        "wire": "page_size"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "component_sets": [
          {
            "key": "x",
            "file_key": "x",
            "node_id": "x",
            "thumbnail_url": "x",
            "name": "x",
            "description": "x",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "user": {
              "id": "x",
              "handle": "x",
              "img_url": "x"
            },
            "containing_frame": {
              "nodeId": "x",
              "name": "x",
              "backgroundColor": "x",
              "pageId": "x",
              "pageName": "x",
              "containingStateGroup": {},
              "containingComponentSet": {}
            }
          }
        ],
        "cursor": {
          "before": 1,
          "after": 1
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "dev_resource",
    "accessor": "DevResource",
    "op": "create",
    "method": "POST",
    "path": "/v1/dev_resources",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "links_created": [
        {
          "id": "x",
          "name": "x",
          "url": "x",
          "file_key": "x",
          "node_id": "x"
        }
      ],
      "errors": [
        {
          "file_key": "x",
          "node_id": "x",
          "error": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "dev_resource",
    "accessor": "DevResource",
    "op": "list",
    "method": "GET",
    "path": "/v1/files/{file_key}/dev_resources",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {
      "node_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "node_ids"
    ],
    "queryArgs": [
      {
        "name": "node_id",
        "wire": "node_ids"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "dev_resources": [
        {
          "id": "x",
          "name": "x",
          "url": "x",
          "file_key": "x",
          "node_id": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "dev_resource",
    "accessor": "DevResource",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/files/{file_key}/dev_resources/{dev_resource_id}",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      },
      {
        "name": "id",
        "wire": "dev_resource_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "dev_resource",
    "accessor": "DevResource",
    "op": "update",
    "method": "PUT",
    "path": "/v1/dev_resources",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "links_updated": [
        {
          "id": "x",
          "name": "x",
          "url": "x",
          "file_key": "x",
          "node_id": "x"
        }
      ],
      "errors": [
        {
          "id": "x",
          "error": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "developer_log",
    "accessor": "DeveloperLog",
    "op": "create",
    "method": "POST",
    "path": "/v1/developer_logs",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "items": [
          {
            "uuid": "x",
            "timestamp": "x",
            "action": {
              "event_name": "x",
              "event_source": "rest_api"
            },
            "actor": {
              "user_id": "x",
              "user_name": "x",
              "user_email": "x",
              "token_name": "x",
              "token_type": "developer_token"
            },
            "resource": {
              "id_or_key": "x",
              "name": "x",
              "type": "file",
              "org_id": "x"
            },
            "context": {
              "ip_address": "x",
              "city": "x",
              "country_region": "x",
              "country": "x"
            }
          }
        ],
        "cursor": "x",
        "has_more": true
      }
    },
    "idField": "id"
  },
  {
    "entity": "file",
    "accessor": "File",
    "op": "list",
    "method": "GET",
    "path": "/v1/files/{file_key}/versions",
    "action": "version",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {
      "after": "v1",
      "before": "v1",
      "page_size": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page_size",
      "before",
      "after"
    ],
    "queryArgs": [
      {
        "name": "after",
        "wire": "after"
      },
      {
        "name": "before",
        "wire": "before"
      },
      {
        "name": "page_size",
        "wire": "page_size"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "versions": [
        {
          "id": "x",
          "created_at": "2026-01-01T00:00:00Z",
          "label": "x",
          "description": "x",
          "user": {
            "id": "x",
            "handle": "x",
            "img_url": "x"
          },
          "thumbnail_url": "x"
        }
      ],
      "pagination": {
        "prev_page": "x",
        "next_page": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "file",
    "accessor": "File",
    "op": "load",
    "method": "GET",
    "path": "/v1/files/{file_key}/nodes",
    "action": "node",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {
      "ids": "v1",
      "depth": "v1",
      "geometry": "v1",
      "plugin_data": "v1",
      "version": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "ids",
      "version",
      "depth",
      "geometry",
      "plugin_data"
    ],
    "queryArgs": [
      {
        "name": "depth",
        "wire": "depth"
      },
      {
        "name": "geometry",
        "wire": "geometry"
      },
      {
        "name": "ids",
        "wire": "ids"
      },
      {
        "name": "plugin_data",
        "wire": "plugin_data"
      },
      {
        "name": "version",
        "wire": "version"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "name": "x",
      "role": "owner",
      "lastModified": "2026-01-01T00:00:00Z",
      "editorType": "figma",
      "thumbnailUrl": "x",
      "version": "x",
      "nodes": {}
    },
    "idField": "id"
  },
  {
    "entity": "file",
    "accessor": "File",
    "op": "load",
    "method": "GET",
    "path": "/v1/images/{file_key}",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {
      "ids": "v1",
      "contents_only": "v1",
      "format": "png",
      "scale": "v1",
      "svg_include_id": "v1",
      "svg_include_node_id": "v1",
      "svg_outline_text": "v1",
      "svg_simplify_stroke": "v1",
      "use_absolute_bound": "v1",
      "version": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "ids",
      "version",
      "scale",
      "format",
      "svg_outline_text",
      "svg_include_id",
      "svg_include_node_id",
      "svg_simplify_stroke",
      "contents_only",
      "use_absolute_bounds"
    ],
    "queryArgs": [
      {
        "name": "contents_only",
        "wire": "contents_only"
      },
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "ids",
        "wire": "ids"
      },
      {
        "name": "scale",
        "wire": "scale"
      },
      {
        "name": "svg_include_id",
        "wire": "svg_include_id"
      },
      {
        "name": "svg_include_node_id",
        "wire": "svg_include_node_id"
      },
      {
        "name": "svg_outline_text",
        "wire": "svg_outline_text"
      },
      {
        "name": "svg_simplify_stroke",
        "wire": "svg_simplify_stroke"
      },
      {
        "name": "use_absolute_bound",
        "wire": "use_absolute_bounds"
      },
      {
        "name": "version",
        "wire": "version"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "images": {}
    },
    "idField": "id"
  },
  {
    "entity": "file",
    "accessor": "File",
    "op": "load",
    "method": "GET",
    "path": "/v1/files/{file_key}/images",
    "action": "image",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "error": false,
      "status": 200,
      "meta": {
        "images": {}
      }
    },
    "idField": "id"
  },
  {
    "entity": "file",
    "accessor": "File",
    "op": "load",
    "method": "GET",
    "path": "/v1/files/{file_key}/meta",
    "action": "meta",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "file": {
        "name": "x",
        "folder_name": "x",
        "last_touched_at": "2026-01-01T00:00:00Z",
        "creator": {
          "id": "x",
          "handle": "x",
          "img_url": "x"
        },
        "last_touched_by": {
          "id": "x",
          "handle": "x",
          "img_url": "x"
        },
        "thumbnail_url": "x",
        "editorType": "figma",
        "role": "owner",
        "link_access": "view",
        "url": "x",
        "version": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "file",
    "accessor": "File",
    "op": "load",
    "method": "GET",
    "path": "/v1/files/{file_key}",
    "args": [
      {
        "name": "id",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {
      "branch_data": "v1",
      "depth": "v1",
      "geometry": "v1",
      "plugin_data": "v1",
      "version": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "version",
      "ids",
      "depth",
      "geometry",
      "plugin_data",
      "branch_data"
    ],
    "queryArgs": [
      {
        "name": "branch_data",
        "wire": "branch_data"
      },
      {
        "name": "depth",
        "wire": "depth"
      },
      {
        "name": "geometry",
        "wire": "geometry"
      },
      {
        "name": "plugin_data",
        "wire": "plugin_data"
      },
      {
        "name": "version",
        "wire": "version"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "name": "x",
      "role": "owner",
      "lastModified": "2026-01-01T00:00:00Z",
      "editorType": "figma",
      "thumbnailUrl": "x",
      "version": "x",
      "document": {
        "type": "x",
        "children": [
          {
            "type": "x",
            "children": [],
            "backgroundColor": {},
            "prototypeStartNodeID": "x",
            "flowStartingPoints": [],
            "prototypeDevice": {},
            "prototypeBackgrounds": [],
            "measurements": [],
            "id": "x",
            "name": "x",
            "visible": true,
            "locked": true,
            "isFixed": true,
            "scrollBehavior": "SCROLLS",
            "rotation": 1,
            "componentPropertyReferences": {},
            "boundVariables": {},
            "explicitVariableModes": {},
            "exportSettings": []
          }
        ],
        "id": "x",
        "name": "x",
        "visible": true,
        "locked": true,
        "isFixed": true,
        "scrollBehavior": "SCROLLS",
        "rotation": 1,
        "componentPropertyReferences": {},
        "boundVariables": {
          "size": {
            "x": {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            },
            "y": {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          },
          "individualStrokeWeights": {
            "top": {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            },
            "bottom": {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            },
            "left": {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            },
            "right": {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          },
          "characters": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "itemSpacing": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "paddingLeft": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "paddingRight": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "paddingTop": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "paddingBottom": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "visible": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "topLeftRadius": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "topRightRadius": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "bottomLeftRadius": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "bottomRightRadius": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "minWidth": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "maxWidth": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "minHeight": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "maxHeight": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "counterAxisSpacing": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "opacity": {
            "type": "VARIABLE_ALIAS",
            "id": "x"
          },
          "fontFamily": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "fontSize": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "fontStyle": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "fontWeight": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "letterSpacing": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "lineHeight": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "paragraphSpacing": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "paragraphIndent": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "fills": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "strokes": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "componentProperties": {},
          "textRangeFills": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "effects": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "layoutGrids": [
            {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          ],
          "rectangleCornerRadii": {
            "RECTANGLE_TOP_LEFT_CORNER_RADIUS": {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            },
            "RECTANGLE_TOP_RIGHT_CORNER_RADIUS": {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            },
            "RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS": {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            },
            "RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS": {
              "type": "VARIABLE_ALIAS",
              "id": "x"
            }
          }
        },
        "explicitVariableModes": {}
      },
      "components": {},
      "componentSets": {},
      "schemaVersion": 1,
      "styles": {},
      "linkAccess": "x",
      "mainFileKey": "x",
      "branches": [
        {
          "key": "x",
          "name": "x",
          "thumbnail_url": "x",
          "last_modified": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "list",
    "method": "GET",
    "path": "/v2/folders/{folder_id}/files",
    "action": "file",
    "args": [
      {
        "name": "id",
        "wire": "folder_id",
        "value": "p1"
      }
    ],
    "select": {
      "branch_data": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "branch_data"
    ],
    "queryArgs": [
      {
        "name": "branch_data",
        "wire": "branch_data"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "name": "x",
      "files": [
        {
          "key": "x",
          "name": "x",
          "thumbnail_url": "x",
          "last_modified": "2026-01-01T00:00:00Z",
          "branches": [
            {
              "key": "x",
              "name": "x",
              "thumbnail_url": "x",
              "last_modified": "2026-01-01T00:00:00Z"
            }
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "list",
    "method": "GET",
    "path": "/v2/folders/{folder_id}/folders",
    "args": [
      {
        "name": "id",
        "wire": "folder_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "name": "x",
      "folders": [
        {
          "id": "x",
          "name": "x",
          "parent_folder_id": "x",
          "sharing_audience_control": "plan_view",
          "created_at": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "list",
    "method": "GET",
    "path": "/v2/teams/{team_id}/folders",
    "args": [
      {
        "name": "team_id",
        "wire": "team_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "name": "x",
      "folders": [
        {
          "id": "x",
          "name": "x",
          "parent_folder_id": "x",
          "sharing_audience_control": "plan_view",
          "created_at": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "folder",
    "accessor": "Folder",
    "op": "load",
    "method": "GET",
    "path": "/v2/folders/{folder_id}/meta",
    "action": "meta",
    "args": [
      {
        "name": "id",
        "wire": "folder_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "thumbnail_url": "x",
      "file_count": 1,
      "updated_at": "2026-01-01T00:00:00Z",
      "created_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "o_embed",
    "accessor": "OEmbed",
    "op": "load",
    "method": "GET",
    "path": "/v1/oembed",
    "args": [],
    "select": {
      "url": "v1",
      "maxheight": 450,
      "maxwidth": 800
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "url",
      "maxwidth",
      "maxheight"
    ],
    "queryArgs": [
      {
        "name": "maxheight",
        "wire": "maxheight"
      },
      {
        "name": "maxwidth",
        "wire": "maxwidth"
      },
      {
        "name": "url",
        "wire": "url"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "version": "x",
      "type": "x",
      "title": "x",
      "key": "x",
      "url": "x",
      "provider_name": "x",
      "provider_url": "x",
      "cache_age": 1,
      "width": 1,
      "height": 1,
      "html": "x",
      "is_published_site": true,
      "folder_name": "x",
      "thumbnail_url": "x",
      "thumbnail_width": 1,
      "thumbnail_height": 1
    },
    "idField": "id"
  },
  {
    "entity": "payment",
    "accessor": "Payment",
    "op": "load",
    "method": "GET",
    "path": "/v1/payments",
    "args": [],
    "select": {
      "community_file_id": "v1",
      "plugin_id": "v1",
      "plugin_payment_token": "v1",
      "user_id": "v1",
      "widget_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "plugin_payment_token",
      "user_id",
      "community_file_id",
      "plugin_id",
      "widget_id"
    ],
    "queryArgs": [
      {
        "name": "community_file_id",
        "wire": "community_file_id"
      },
      {
        "name": "plugin_id",
        "wire": "plugin_id"
      },
      {
        "name": "plugin_payment_token",
        "wire": "plugin_payment_token"
      },
      {
        "name": "user_id",
        "wire": "user_id"
      },
      {
        "name": "widget_id",
        "wire": "widget_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "user_id": "x",
        "resource_id": "x",
        "resource_type": "PLUGIN",
        "payment_status": {
          "type": "UNPAID"
        },
        "date_of_purchase": "2026-01-01T00:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/files",
    "action": "file",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "branch_data": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "branch_data"
    ],
    "queryArgs": [
      {
        "name": "branch_data",
        "wire": "branch_data"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "name": "x",
      "files": [
        {
          "key": "x",
          "name": "x",
          "thumbnail_url": "x",
          "last_modified": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "list",
    "method": "GET",
    "path": "/v1/teams/{team_id}/projects",
    "args": [
      {
        "name": "team_id",
        "wire": "team_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "name": "x",
      "projects": [
        {
          "id": "x",
          "name": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "load",
    "method": "GET",
    "path": "/v1/projects/{project_id}/meta",
    "action": "meta",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "thumbnail_url": "x",
      "file_count": 1,
      "updated_at": "2026-01-01T00:00:00Z",
      "created_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "style",
    "accessor": "Style",
    "op": "load",
    "method": "GET",
    "path": "/v1/files/{file_key}/styles",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "styles": [
          {
            "key": "x",
            "file_key": "x",
            "node_id": "x",
            "style_type": "FILL",
            "thumbnail_url": "x",
            "name": "x",
            "description": "x",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "user": {
              "id": "x",
              "handle": "x",
              "img_url": "x"
            },
            "sort_position": "x"
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "style",
    "accessor": "Style",
    "op": "load",
    "method": "GET",
    "path": "/v1/styles/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "key": "x",
        "file_key": "x",
        "node_id": "x",
        "style_type": "FILL",
        "thumbnail_url": "x",
        "name": "x",
        "description": "x",
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
        "user": {
          "id": "x",
          "handle": "x",
          "img_url": "x"
        },
        "sort_position": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "style",
    "accessor": "Style",
    "op": "load",
    "method": "GET",
    "path": "/v1/teams/{team_id}/styles",
    "args": [
      {
        "name": "team_id",
        "wire": "team_id",
        "value": "p1"
      }
    ],
    "select": {
      "after": "v1",
      "before": "v1",
      "page_size": 30
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page_size",
      "after",
      "before"
    ],
    "queryArgs": [
      {
        "name": "after",
        "wire": "after"
      },
      {
        "name": "before",
        "wire": "before"
      },
      {
        "name": "page_size",
        "wire": "page_size"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "styles": [
          {
            "key": "x",
            "file_key": "x",
            "node_id": "x",
            "style_type": "FILL",
            "thumbnail_url": "x",
            "name": "x",
            "description": "x",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "user": {
              "id": "x",
              "handle": "x",
              "img_url": "x"
            },
            "sort_position": "x"
          }
        ],
        "cursor": {
          "before": 1,
          "after": 1
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "load",
    "method": "GET",
    "path": "/v1/me",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "handle": "x",
      "img_url": "x",
      "email": "x"
    },
    "idField": "id"
  },
  {
    "entity": "variable",
    "accessor": "Variable",
    "op": "create",
    "method": "POST",
    "path": "/v1/files/{file_key}/variables",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "tempIdToRealId": {}
      }
    },
    "idField": "id"
  },
  {
    "entity": "variable",
    "accessor": "Variable",
    "op": "load",
    "method": "GET",
    "path": "/v1/files/{file_key}/variables/local",
    "action": "local",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "variables": {},
        "variableCollections": {}
      }
    },
    "idField": "id"
  },
  {
    "entity": "variable",
    "accessor": "Variable",
    "op": "load",
    "method": "GET",
    "path": "/v1/files/{file_key}/variables/published",
    "action": "published",
    "args": [
      {
        "name": "file_key",
        "wire": "file_key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": 200,
      "error": false,
      "meta": {
        "variables": {},
        "variableCollections": {}
      }
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "create",
    "method": "POST",
    "path": "/v2/webhooks",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "event_type": "PING",
      "team_id": "x",
      "context": "x",
      "context_id": "x",
      "plan_api_id": "x",
      "status": "ACTIVE",
      "client_id": "x",
      "passcode": "x",
      "endpoint": "x",
      "description": "x"
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "list",
    "method": "GET",
    "path": "/v2/webhooks/{webhook_id}/requests",
    "action": "request",
    "args": [
      {
        "name": "id",
        "wire": "webhook_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "requests": [
        {
          "webhook_id": "x",
          "request_info": {
            "id": "x",
            "endpoint": "x",
            "payload": {},
            "sent_at": "2026-01-01T00:00:00Z"
          },
          "response_info": {
            "status": "x",
            "received_at": "2026-01-01T00:00:00Z"
          },
          "error_msg": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "list",
    "method": "GET",
    "path": "/v2/teams/{team_id}/webhooks",
    "args": [
      {
        "name": "team_id",
        "wire": "team_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "webhooks": [
        {
          "id": "x",
          "event_type": "PING",
          "team_id": "x",
          "context": "x",
          "context_id": "x",
          "plan_api_id": "x",
          "status": "ACTIVE",
          "client_id": "x",
          "passcode": "x",
          "endpoint": "x",
          "description": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "list",
    "method": "GET",
    "path": "/v2/webhooks",
    "args": [],
    "select": {
      "context": "v1",
      "context_id": "v1",
      "cursor": "v1",
      "plan_api_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "context",
      "context_id",
      "plan_api_id",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "context",
        "wire": "context"
      },
      {
        "name": "context_id",
        "wire": "context_id"
      },
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "plan_api_id",
        "wire": "plan_api_id"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "webhooks": [
        {
          "id": "x",
          "event_type": "PING",
          "team_id": "x",
          "context": "x",
          "context_id": "x",
          "plan_api_id": "x",
          "status": "ACTIVE",
          "client_id": "x",
          "passcode": "x",
          "endpoint": "x",
          "description": "x"
        }
      ],
      "pagination": {
        "prev_page": "x",
        "next_page": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "load",
    "method": "GET",
    "path": "/v2/webhooks/{webhook_id}",
    "args": [
      {
        "name": "id",
        "wire": "webhook_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "event_type": "PING",
      "team_id": "x",
      "context": "x",
      "context_id": "x",
      "plan_api_id": "x",
      "status": "ACTIVE",
      "client_id": "x",
      "passcode": "x",
      "endpoint": "x",
      "description": "x"
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "remove",
    "method": "DELETE",
    "path": "/v2/webhooks/{webhook_id}",
    "args": [
      {
        "name": "id",
        "wire": "webhook_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "event_type": "PING",
      "team_id": "x",
      "context": "x",
      "context_id": "x",
      "plan_api_id": "x",
      "status": "ACTIVE",
      "client_id": "x",
      "passcode": "x",
      "endpoint": "x",
      "description": "x"
    },
    "idField": "id"
  },
  {
    "entity": "webhook",
    "accessor": "Webhook",
    "op": "update",
    "method": "PUT",
    "path": "/v2/webhooks/{webhook_id}",
    "args": [
      {
        "name": "id",
        "wire": "webhook_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-figma-token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "event_type": "PING",
      "team_id": "x",
      "context": "x",
      "context_id": "x",
      "plan_api_id": "x",
      "status": "ACTIVE",
      "client_id": "x",
      "passcode": "x",
      "endpoint": "x",
      "description": "x"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
