# kimromi/issue-from-collaborators-only

GitHub Actions to delete issues and issue comments other than the repository collaborators.

```yaml
name: Protect issues and comments
on:
  issues:
    types:
      - opened
  issue_comment:
    types:
      - created
jobs:
  protect-issues:
    runs-on: ubuntu-latest
    steps:
      - uses: kimromi/issue-from-collaborators-only@main
        with:
          github_token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
```
