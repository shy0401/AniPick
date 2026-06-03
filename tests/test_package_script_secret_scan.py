from pathlib import Path

import pytest

from scripts.package_submission import _scan_secrets


def test_secret_scan_allows_empty_example_values(tmp_path):
    sample = tmp_path / ".env.example"
    sample.write_text("OPENAI_API_KEY=\nKAKAO_REST_API_KEY=\n", encoding="utf-8")

    _scan_secrets([sample])


def test_secret_scan_rejects_non_empty_openai_key(tmp_path):
    sample = tmp_path / "secret.env"
    key_name = "OPENAI" + "_API_KEY"
    sample.write_text(f"{key_name}=sk-test-value\n", encoding="utf-8")

    with pytest.raises(SystemExit):
        _scan_secrets([sample])


def test_secret_scan_rejects_non_empty_provider_key(tmp_path):
    sample = tmp_path / "secret.env"
    key_name = "KAKAO" + "_REST_API_KEY"
    sample.write_text(f"{key_name}=abc123\n", encoding="utf-8")

    with pytest.raises(SystemExit):
        _scan_secrets([sample])
