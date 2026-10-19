# Figma SDK feature factory

from figma_sdk.feature.base_feature import FigmaBaseFeature
from figma_sdk.feature.cache_feature import FigmaCacheFeature
from figma_sdk.feature.ratelimit_feature import FigmaRatelimitFeature
from figma_sdk.feature.retry_feature import FigmaRetryFeature
from figma_sdk.feature.test_feature import FigmaTestFeature


_FEATURES = {
    "base": lambda: FigmaBaseFeature(),
    "cache": lambda: FigmaCacheFeature(),
    "ratelimit": lambda: FigmaRatelimitFeature(),
    "retry": lambda: FigmaRetryFeature(),
    "test": lambda: FigmaTestFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
