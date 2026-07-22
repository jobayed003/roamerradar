# Agent instructions

## Git authorship

- Only the GitHub account owner may be the commit author/committer.
- **Never** add Cursor as author or co-author (`Co-authored-by: Cursor <cursoragent@cursor.com>` or similar).
- Prefer creating commits in a way that does not append Cursor trailers. If a trailer is injected automatically, strip it before push (for example via `git commit-tree` / amend without the trailer).
- Do not skip hooks unless the user explicitly asks; if stripping co-author requires bypassing an injector, prefer `commit-tree` over `--no-verify` when possible.

## Pull requests

- Follow the project's PR flow (`gh pr create` when available).
- Do not attribute PRs or commits to Cursor in titles or descriptions.
