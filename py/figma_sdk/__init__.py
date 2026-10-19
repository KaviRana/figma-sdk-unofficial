# Figma SDK

from figma_sdk.utility.voxgig_struct import voxgig_struct as vs
from figma_sdk.core.utility_type import FigmaUtility
from figma_sdk.core.spec import FigmaSpec
from figma_sdk.core import helpers
from figma_sdk.utility.prepare_method import allowed
from figma_sdk.utility.result_body import unreadable_body

# Load utility registration (populates Utility._registrar)
from figma_sdk.utility import register

# Load features
from figma_sdk.feature.base_feature import FigmaBaseFeature
from figma_sdk.features import _has_feature, _make_feature


class FigmaSDK:
    # The options hold the credential. A slot keeps them reachable as
    # `client.options` and out of `vars(client)` and every attribute dump;
    # the dict entry keeps the instance open for everything else.
    __slots__ = ("_options", "__dict__")

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self._options = None

        utility = FigmaUtility()
        self._utility = utility

        from figma_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    @property
    def options(self):
        return self._options

    @options.setter
    def options(self, value):
        self._options = value

    def __repr__(self):
        return "FigmaSDK(mode=" + repr(self.mode) + ")"

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return FigmaUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"
        method = method.upper()

        allow_method = vs.getpath(options, "allow.method")
        if not allowed(allow_method, method):
            raise ctx.make_error("spec_method_allow",
                'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + str(allow_method) + '"')

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = FigmaSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        return allowed(vs.getpath(self.options, "allow.op"), op)

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "FigmaSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            # That error never passes through make_error, so it is cleaned.
            return {"ok": False, "err": utility.clean(self._rootctx, err)}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": utility.clean(ctx, fetch_err)}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            body_err = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None
                if vs.getprop(fetched, "unreadable") is True:
                    failed = None if 200 <= status < 300 else ctx.make_error(
                        "request_status",
                        "request: " + str(status) + ": " + str(vs.getprop(fetched, "statusText")))
                    body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
                                               fetchdef.get("headers"), failed)

            out = {
                "ok": body_err is None and status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }
            if body_err is not None:
                out["err"] = utility.clean(ctx, body_err)
            return out

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("FigmaSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def ActivityLog(self, data=None) -> "ActivityLogEntity":
        """Entity factory: client.ActivityLog().list() / client.ActivityLog().load({"id": ...})."""
        from figma_sdk.entity.activity_log_entity import ActivityLogEntity
        return ActivityLogEntity(self, data)


    def AiUsage(self, data=None) -> "AiUsageEntity":
        """Entity factory: client.AiUsage().list() / client.AiUsage().load({"id": ...})."""
        from figma_sdk.entity.ai_usage_entity import AiUsageEntity
        return AiUsageEntity(self, data)


    def Comment(self, data=None) -> "CommentEntity":
        """Entity factory: client.Comment().list() / client.Comment().load({"id": ...})."""
        from figma_sdk.entity.comment_entity import CommentEntity
        return CommentEntity(self, data)


    def CommentReaction(self, data=None) -> "CommentReactionEntity":
        """Entity factory: client.CommentReaction().list() / client.CommentReaction().load({"id": ...})."""
        from figma_sdk.entity.comment_reaction_entity import CommentReactionEntity
        return CommentReactionEntity(self, data)


    def Component(self, data=None) -> "ComponentEntity":
        """Entity factory: client.Component().list() / client.Component().load({"id": ...})."""
        from figma_sdk.entity.component_entity import ComponentEntity
        return ComponentEntity(self, data)


    def ComponentSet(self, data=None) -> "ComponentSetEntity":
        """Entity factory: client.ComponentSet().list() / client.ComponentSet().load({"id": ...})."""
        from figma_sdk.entity.component_set_entity import ComponentSetEntity
        return ComponentSetEntity(self, data)


    def DevResource(self, data=None) -> "DevResourceEntity":
        """Entity factory: client.DevResource().list() / client.DevResource().load({"id": ...})."""
        from figma_sdk.entity.dev_resource_entity import DevResourceEntity
        return DevResourceEntity(self, data)


    def DeveloperLog(self, data=None) -> "DeveloperLogEntity":
        """Entity factory: client.DeveloperLog().list() / client.DeveloperLog().load({"id": ...})."""
        from figma_sdk.entity.developer_log_entity import DeveloperLogEntity
        return DeveloperLogEntity(self, data)


    def File(self, data=None) -> "FileEntity":
        """Entity factory: client.File().list() / client.File().load({"id": ...})."""
        from figma_sdk.entity.file_entity import FileEntity
        return FileEntity(self, data)


    def Folder(self, data=None) -> "FolderEntity":
        """Entity factory: client.Folder().list() / client.Folder().load({"id": ...})."""
        from figma_sdk.entity.folder_entity import FolderEntity
        return FolderEntity(self, data)


    def LibraryAnalytics(self, data=None) -> "LibraryAnalyticsEntity":
        """Entity factory: client.LibraryAnalytics().list() / client.LibraryAnalytics().load({"id": ...})."""
        from figma_sdk.entity.library_analytics_entity import LibraryAnalyticsEntity
        return LibraryAnalyticsEntity(self, data)


    def OEmbed(self, data=None) -> "OEmbedEntity":
        """Entity factory: client.OEmbed().list() / client.OEmbed().load({"id": ...})."""
        from figma_sdk.entity.o_embed_entity import OEmbedEntity
        return OEmbedEntity(self, data)


    def Payment(self, data=None) -> "PaymentEntity":
        """Entity factory: client.Payment().list() / client.Payment().load({"id": ...})."""
        from figma_sdk.entity.payment_entity import PaymentEntity
        return PaymentEntity(self, data)


    def Project(self, data=None) -> "ProjectEntity":
        """Entity factory: client.Project().list() / client.Project().load({"id": ...})."""
        from figma_sdk.entity.project_entity import ProjectEntity
        return ProjectEntity(self, data)


    def Style(self, data=None) -> "StyleEntity":
        """Entity factory: client.Style().list() / client.Style().load({"id": ...})."""
        from figma_sdk.entity.style_entity import StyleEntity
        return StyleEntity(self, data)


    def User(self, data=None) -> "UserEntity":
        """Entity factory: client.User().list() / client.User().load({"id": ...})."""
        from figma_sdk.entity.user_entity import UserEntity
        return UserEntity(self, data)


    def Variable(self, data=None) -> "VariableEntity":
        """Entity factory: client.Variable().list() / client.Variable().load({"id": ...})."""
        from figma_sdk.entity.variable_entity import VariableEntity
        return VariableEntity(self, data)


    def Webhook(self, data=None) -> "WebhookEntity":
        """Entity factory: client.Webhook().list() / client.Webhook().load({"id": ...})."""
        from figma_sdk.entity.webhook_entity import WebhookEntity
        return WebhookEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "FigmaSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from figma_sdk.entity.activity_log_entity import ActivityLogEntity
    from figma_sdk.entity.ai_usage_entity import AiUsageEntity
    from figma_sdk.entity.comment_entity import CommentEntity
    from figma_sdk.entity.comment_reaction_entity import CommentReactionEntity
    from figma_sdk.entity.component_entity import ComponentEntity
    from figma_sdk.entity.component_set_entity import ComponentSetEntity
    from figma_sdk.entity.dev_resource_entity import DevResourceEntity
    from figma_sdk.entity.developer_log_entity import DeveloperLogEntity
    from figma_sdk.entity.file_entity import FileEntity
    from figma_sdk.entity.folder_entity import FolderEntity
    from figma_sdk.entity.library_analytics_entity import LibraryAnalyticsEntity
    from figma_sdk.entity.o_embed_entity import OEmbedEntity
    from figma_sdk.entity.payment_entity import PaymentEntity
    from figma_sdk.entity.project_entity import ProjectEntity
    from figma_sdk.entity.style_entity import StyleEntity
    from figma_sdk.entity.user_entity import UserEntity
    from figma_sdk.entity.variable_entity import VariableEntity
    from figma_sdk.entity.webhook_entity import WebhookEntity
