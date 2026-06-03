import importlib


def test_submission_runner_is_importable():
    module = importlib.import_module("scripts.run_submission_scenario")
    assert hasattr(module, "main")


def test_package_script_is_importable():
    module = importlib.import_module("scripts.package_submission")
    assert hasattr(module, "main")
