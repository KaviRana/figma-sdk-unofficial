# Figma SDK exists test

import pytest
from figma_sdk import FigmaSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FigmaSDK.test(None, None)
        assert testsdk is not None
