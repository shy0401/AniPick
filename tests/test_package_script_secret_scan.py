from pathlib import Path

import pytest

from scripts.package_submission import _scan_secrets


def test_secret_scan_allows_empty_example_values(tmp_path):
    sample = tmp_path / ".env.example"
    openai_name = "OPENAI" + "_API" + "_KEY"
    kakao_name = "KAKAO" + "_REST" + "_API" + "_KEY"
    sample.write_text(openai_name + "=\n" + kakao_name + "=\n", encoding="utf-8")

    _scan_secrets([sample])


def test_secret_scan_rejects_non_empty_openai_key(tmp_path):
    sample = tmp_path / "secret.env"
    key_name = "OPENAI" + "_API" + "_KEY"
    secret_prefix = "s" + "k-"
    sample.write_text(f"{key_name}={secret_prefix}test-value\n", encoding="utf-8")

    with pytest.raises(SystemExit):
        _scan_secrets([sample])


def test_secret_scan_rejects_non_empty_provider_key(tmp_path):
    sample = tmp_path / "secret.env"
    key_name = "KAKAO" + "_REST" + "_API" + "_KEY"
    sample.write_text(f"{key_name}=abc123\n", encoding="utf-8")

    with pytest.raises(SystemExit):
        _scan_secrets([sample])
