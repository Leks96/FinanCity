# Contributing Docs

To run the environment locally for developent, you will need to get the environment variables from a team member. Once you have received these variables, follow the steps on the [README.md](https://github.com/Leks96/FinanCity) in the root of the `FinanCity` repo.

## Dev Cycles

All features should be defined in a ClickUp task with a branch or a PR linked to the task and feature branches linked to milestones. When creating PR, use the title of the ClickUp task. Remove “UI” since the repo is only frontend (UI is just a ClickUp designator since API and Docs etc are tracked there).

Example
In ClickUp, _“UI: Farm - Create V2 Header”_ becomes _“Farm - Create V2 Header”_ for pull request title.

### Branching

**Branch Format**

- main (origin/HEAD)
- release/staging
- release/prod

The `main` branch is the default branch of origin (`origin/HEAD`) of the project and therefor, the history of this branch is important and should maintain integrity.

The `release/prod` and `release/staging` will be share a base with dev and will be set to a given commit hash on the `main`/`origin/HEAD`.

All changes to `main` will be commited on working branches, ex: `farm-<update>`. These branches will be created off of `main` where a rebase to `origin/main` throughout the life of the branch will occur. These working branches will be deleted after pull requests; ideally, this will result in a closed-loop pattern. The merge strategy will be a merge commit which will create the close-loop pattern.

#### Branch Dynamic URLs

Optionally, branches prefixed with `feature/` will auto build and deploy to a url for testing the updates represented in that merge commit. This allows for testing before a merge to `main`.

When the branch is complete, use Github to merge it into `main` via PR after looking over the dif **or** request a review from a team member.

### Raising a Pull Request

Follow the template located at `./github/pull_request_template.md`

Each PR **MUST**:

- be titled correctly
- list the changes
- contain a link to the ClickUp task or milestone
- loom video (optional but encouraged for large changes)

#### Template

```
<!-- **TITLE FORMATTING** - ClickUp title “UI: Farm - Create Header” becomes “Farm: Create Header” as title of pull request -->

## Description

## How has this been tested?

## Types of changes

- [ ] Technical Debt (non-breaking change which removes unused code/assets)
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)

## Checklist:

- [ ] The related ClickUp task has been linked to this PR
- [ ] The person creating the pull request is listed in "Assignees"
- [ ] Change requires updated documentation

## Screenshots or Loom Video (optional):
```

#### Adding Tokens To Farm Page

1. `git checkout main`
2. `git checkout -b add-tokens`
3. ./src/context/crypto.tsx add token usdc pair to fetch current price of token from coingeko or other provider
4. ./src/web3/ids.ts in sslPool object, add mint address in the file and the decimal supported (How to find the decimals supported for token ?)
5. Go to solscan and search the mint address of the token, you will find the decimals supported
6. ./public/img/assets/ add image with the token short name
7. Submit PR to dev branch

### Updating Environment variables

Environment variables are stored in HashiCorp Vault and usually require running a new build - either manually or via a release to staging and prod respectively.

To create an release with updated env vars:

- change env var value in HashiCorp Vault (speak with a team member for access)
- in Terraform Cloud, generate a new run of `infra` manually or via merge commit to the [infra repo](https://github.com/Leks96/FinanCity-infra/pulls). This will set the new values
- in AWS, go to Amplify/gfx-app, select `release/staging` or `release/prod`, and click 'Redeploy this version'. This will run a new build with refreshed values
