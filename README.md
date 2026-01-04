<div align="center">
  <img width="150" src="https://github.com/Kikobeats/automate-release/raw/master/media/logo.png" alt="automate-release">
  <br>
  <br>
</div>

**automate-release** configures your project so that every commit pushed to the main branch triggers a new release automatically. No human factor is involved.

When you create a new project, the first thing you should do is:

```bash
npx automate-release
```

If you use [direnv](https://direnv.net/) with a `.envrc` file, you can also sync your local tokens to GitHub Secrets automatically:

```bash
GH_TOKEN=xxx npx automate-release --tokens
```

This single command bootstraps your repository with the best practices for software releasing:

https://github.com/user-attachments/assets/be26eb77-2ffd-46d1-9414-3ed063ece8fc

Releasing software is a fundamental part of our developer life, but we often do it manually, which is a source of errors and takes time away from what we love: coding.

`automate-release` brings you:

- [Follow a git commit convention](#follow-a-git-commit-convention)
- [History-driven releases](#history-driven-releases)
- [Seamless GitHub integration](#seamless-github-integration)

## Follow a git commit convention

Using a convention for git messages ensures that all contributors produce a homogeneous history. But it's not just about aesthetics; it's about **programmable history**.

![](https://i.imgur.com/IxPIf84.png)

By following a pattern, we can automatically classify commits in a `CHANGELOG.md` and determine the next version to release (patch, feature, or breaking change).

![](https://i.imgur.com/oNbbWV9.png)

`automate-release` sets up [commitlint](https://github.com/marionebl/commitlint) for that purpose:

![](https://i.imgur.com/nZOE5Vu.png)

You won't be able to commit unless the format is valid. It follows the [conventional commits specification](https://conventional-commits.vercel.app/), which quickly becomes the backbone of your automation.

## History-driven releases

As every commit pushed to the main branch will trigger a release, the next version is automatically determined based on your git history following [semver](https://semver.org/) rules:

- **patch** (`1.0.0` → `1.0.1`): When you commit a `fix`.
- **minor** (`1.0.0` → `1.1.0`): When you commit a `feat`.
- **major** (`1.0.0` → `2.0.0`): When you commit a `BREAKING CHANGE`.

![](https://i.imgur.com/nmfLfkC.png)

This automated process handles the tedious work of incrementing the version in `package.json`, generating the `CHANGELOG.md` entry, and creating the release commit and tag.

## Seamless GitHub integration

The human factor in a release should be limited to being the trigger: just push your code. Everything else should be automated.

`automate-release` deploys **GitHub Actions** that handle the entire workflow automatically:

- **Reliability**: Tests are executed on every push to ensure stability before any release.
- **Automation**: Contributors list is automatically updated and pushed back to the repository.
- **Transparency**: Your `CHANGELOG.md` is synchronized with your **GitHub Releases**.
- **Distribution**: The package is automatically published to the **NPM registry** once the release is tagged.

![](https://i.imgur.com/vEXF1PF.png)

A release is a commitment to your audience. `automate-release` ensures your users stay informed by reflecting your changes directly into the GitHub Release section, making your project look professional and transparent.

![](https://i.imgur.com/4Oen6QX.png)
