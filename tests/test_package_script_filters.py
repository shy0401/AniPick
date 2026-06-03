from pathlib import Path

from scripts.package_submission import _is_allowed


def test_package_filter_excludes_env_file():
    assert _is_allowed(Path(".env")) is False


def test_package_filter_excludes_node_modules():
    assert _is_allowed(Path("frontend/node_modules/pkg/index.js")) is False


def test_package_filter_excludes_build_outputs():
    assert _is_allowed(Path("frontend/dist/index.html")) is False
    assert _is_allowed(Path("frontend/build/index.html")) is False


def test_package_filter_allows_env_example():
    assert _is_allowed(Path("frontend/.env.example")) is True
