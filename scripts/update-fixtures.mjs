name: Update fixtures

on:
  schedule:
    - cron: "0 6 * * *"   # every day at 06:00 UTC
  workflow_dispatch:       # lets you run it by hand from the Actions tab

permissions:
  contents: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Fetch fixtures
        run: node scripts/update-fixtures.mjs
      - name: Commit if changed
        run: |
          if [ -n "$(git status --porcelain fixtures.json)" ]; then
            git config user.name "github-actions[bot]"
            git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
            git add fixtures.json
            git commit -m "Update fixtures"
            git push
          fi
