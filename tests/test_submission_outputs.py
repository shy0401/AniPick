import subprocess
import sys
from pathlib import Path


def test_submission_runner_outputs():
    subprocess.run([sys.executable, "scripts/run_submission_scenario.py"], check=True)

    assert Path("submission_outputs/실행로그_trace.txt").exists()
    assert Path("submission_outputs/실행로그_trace.json").exists()
    assert Path("submission_outputs/과제_실행_요약.md").exists()
