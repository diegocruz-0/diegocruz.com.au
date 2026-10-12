# Issue tracker: GitHub

Issues and specs for this repo live in GitHub Issues for `diegocruz-0/diegocruz.com.au`. Use the `gh` CLI for all operations, running inside this clone. Infer the repository from `git remote -v`; use `--repo diegocruz-0/diegocruz.com.au` when outside the clone.

## Conventions

- **Create**: `gh issue create --title "..." --body "..."`. For multiline bodies in PowerShell, pipe a here-string to `gh issue create --title "..." --body-file -`.
- **Read**: `gh issue view <number> --json number,title,body,labels,comments`.
- **List**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`. Add appropriate `--label` and `--state` filters.
- **Link a sub-issue**: `gh api --method POST repos/diegocruz-0/diegocruz.com.au/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>`. Obtain the child's database ID with `gh api repos/diegocruz-0/diegocruz.com.au/issues/<child> --jq .id`. If sub-issues are unavailable, put `Part of #<parent>` at the top of the child body and add it to a task list in the parent.
- **Comment**: `gh issue comment <number> --body "..."`.
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`.
- **Close**: `gh issue close <number> --comment "..."`.

## Pull requests as a triage surface

**PRs as a request surface: no.** Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.

When enabled, use `gh pr view <number> --comments`, `gh pr diff <number>`, and `gh pr comment`, `gh pr edit --add-label` / `--remove-label`, or `gh pr close` as appropriate.

List external PRs with `gh api --paginate 'repos/diegocruz-0/diegocruz.com.au/pulls?state=open' --jq '.[] | select(.author_association | IN("OWNER","MEMBER","COLLABORATOR") | not) | {number, title, author: .user.login, author_association, labels: [.labels[].name]}'`.

GitHub shares one number space across issues and PRs. Resolve ambiguous references with `gh pr view <number>` and fall back to `gh issue view <number>`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Read it using the **Read** operation above.

## Wayfinding operations

Used by `/wayfinder`. The map is a single issue with child issues as tickets.

- **Map**: an issue labelled `wayfinder:map` containing Notes / Decisions-so-far / Fog. Create with `gh issue create --label wayfinder:map`.
- **Child ticket**: link to the map as a sub-issue, or use the parent task-list fallback above. Label `wayfinder:<type>`, where type is `research`, `prototype`, `grilling`, or `task`. Once claimed, assign it to the driving developer.
- **Blocking**: use GitHub's native issue dependencies: `gh api --method POST repos/diegocruz-0/diegocruz.com.au/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`. Get the blocker's database ID with `gh api repos/diegocruz-0/diegocruz.com.au/issues/<blocker> --jq .id`, not its issue number or node ID. `issue_dependencies_summary.blocked_by` counts open blockers. If dependencies are unavailable, add `Blocked by: #<number>, #<number>` at the top of the child body. Every blocker must be closed before the ticket is unblocked.
- **Frontier query**: list the map's open children, scoped to its sub-issues or task list. Exclude assigned tickets and those with open native or fallback blockers. First in map order wins.
- **Claim**: `gh issue edit <number> --add-assignee '@me'`, the session's first write.
- **Resolve**: comment with the answer, close the child issue, and append a context pointer (gist and link) to the map's Decisions-so-far.
