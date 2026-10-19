# File entity test

import json
import os
import time

import pytest

from figma_sdk.utility.voxgig_struct import voxgig_struct as vs
from figma_sdk import FigmaSDK
from figma_sdk.core import helpers
from figma_sdk.config import shared_config
from figma_sdk.feature.base_feature import FigmaBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestFileEntity:

    def test_should_create_instance(self):
        testsdk = FigmaSDK.test(None, None)
        ent = testsdk.File(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = FigmaSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.File(None).list({"file_key": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _file_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "file." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["file_key01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via FIGMA_TEST_FILE_ENTID")
        client = setup["client"]
        if setup["live"]:
            runner.live_existing(setup, LIVE_STRICT, "file",
                                 lambda: client.File(None).list({"file_key": setup["idmap"].get("file_key01")}, None))

        # Bootstrap entity data from existing test data.
        file_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.file")))
        file_ref01_data = None
        if len(file_ref01_data_raw) > 0:
            file_ref01_data = helpers.to_map(file_ref01_data_raw[0][1])

        # LIST
        file_ref01_ent = client.File(None)
        file_ref01_match = {
            "file_key": setup["idmap"]["file_key01"],
        }

        file_ref01_list_result = file_ref01_ent.list(file_ref01_match, None)
        assert isinstance(file_ref01_list_result, list)

        # LOAD
        file_ref01_match_dt0 = {
            "id": file_ref01_data["id"],
        }
        file_ref01_data_dt0_loaded = file_ref01_ent.load(file_ref01_match_dt0, None)
        file_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(file_ref01_data_dt0_loaded))
        assert file_ref01_data_dt0_load_result is not None
        assert file_ref01_data_dt0_load_result["id"] == file_ref01_data["id"]



def _file_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/file/FileTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = FigmaSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["file01", "file02", "file03", "file_key01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "FIGMA_TEST_FILE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "FIGMA_TEST_FILE_ENTID": idmap,
        "FIGMA_TEST_LIVE": "FALSE",
        "FIGMA_TEST_EXPLAIN": "FALSE",
        "FIGMA_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("FIGMA_TEST_FILE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("FIGMA_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("FIGMA_APIKEY"),
            },
            extra or {},
        ])
        client = FigmaSDK(helpers.to_map(merged_opts))

    _live = env.get("FIGMA_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("FIGMA_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
