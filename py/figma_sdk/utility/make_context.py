# Figma SDK utility: make_context

from figma_sdk.core.context import FigmaContext


def make_context_util(ctxmap, basectx):
    return FigmaContext(ctxmap, basectx)
