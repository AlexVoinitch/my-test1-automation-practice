# Git Workflow Strategy

## Branching Strategy

* **`main` (or `master`)**: Main stable branch.
* **`develop`**:  Branch for integrating developing features.
* **`feature/FEATURE_NAME`**: Branches for developing specific functionalities (e.g., feature/add-login-page).

## Rules

1. New features are developed in separate branches branched off from `develop`.
2. Before merging a feature branch into `develop`, create a Pull Request (PR) for code review (if working in a team).
3. The `main` branch is updated only after successful testing and merging of the `develop` branch.
4. Commits should be atomic and contain clear messages.
5. Avoid direct commits to the `main` and `develop` branches.

## Workflow

1.  Create a new branch from `develop`: `git checkout -b feature/YOUR_FEATURE develop`
2.  Make the necessary changes and commit them: `git add .`, `git commit -m "Description of changes"`
3.  Push the branch to the remote repository:  `git push origin feature/YOUR_FEATURE`
4.  Create a Pull Request (PR) from the `feature/YOUR_FEATURE` branch to the `develop` on GitHub.
5.  After code review (if necessary) and successful testing, merge the PR into the `develop` branch.
6.  Locally switch to the `develop` branch and update it: `git checkout develop`, `git pull origin develop`
7.  (When a stable version is ready) Merge the `develop` branch  into the `main`branch: `git checkout main`, `git merge develop`, `git push origin main`