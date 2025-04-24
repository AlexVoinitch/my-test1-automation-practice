## Git Strategy

- Direct commits to the `main` branch are prohibited.
- Each PR requires at least one approver.
- Only squash merges are allowed.

## Branching Strategy

* **`main` (or `master`)**: Main stable branch.
* **`feature/FEATURE_NAME`**: Branches for developing specific functionalities (e.g., feature/add-login-page).
* **`task/TASK_NAME`**: Branches for working on specific tasks (e.g., task/fix-button-style).

## Rules

1. New features and tasks are developed in separate branches branched off from `main`.
2. Before merging a feature or task branch into `main`, create a Pull Request (PR) for code review (if working in a team).
3. The `main` branch is updated only after successful testing and merging of feature or task branches.
4. Commits should be atomic and contain clear messages.
5. Avoid direct commits to the `main` branch.

## Workflow

1.  Create a new branch from `main`: `git checkout -b feature/YOUR_FEATURE main` or `git checkout -b task/YOUR_TASK main`
2.  Make the necessary changes and commit them: `git add .`, `git commit -m "Description of changes"`
3.  Push the branch to the remote repository:  `git push origin feature/YOUR_FEATURE` or `git push origin task/YOUR_TASK`
4.  Create a Pull Request (PR) from the `feature/YOUR_FEATURE` or `task/YOUR_TASK` branch to the `main` on GitHub.
5.  After code review (if necessary) and successful testing, merge the PR into the `main` branch.
6.  Locally switch to the `main` branch and update it: `git checkout main`, `git pull origin main`