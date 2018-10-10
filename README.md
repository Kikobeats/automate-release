# Automate your releases

A release is just a number; It doesn't matter too much, but the important is have one.

If you are not releasing your software, then it will be complicated to rollback and differentiate changes between versions. 

But the real problem will be from a **user perspective**: It will not be easy to make evident what has changed.

Most of the problem with releasing software is because developers don't do that often: They tend to run it manually, making releasing process a source of errors and problems.

Nowadays, we have the best tools ever dreamed to automate this task.

For your next release, it will be automatically doing:

- [ ] Create a commit release in the git history.
- [ ] Create a new git tag.
- [ ] Create a `CHANGELOG.md`e entry associated with your tag.
- [ ] Create a GitHub release.
- [ ] Write a Slack message about the release.

Let me show you how to.

## Git commit that matters

The most basic thing is to define a git commit convention to follow.

We are going to use [commitlint](https://github.com/marionebl/commitlint) for linting git messages.

![](https://i.imgur.com/nZOE5Vu.png)

It forces to follow a strict format into your git messages.

The format is used for automagically determinate the next version to release. Also, it is used to classify the commits by type into `CHANGELOG.md`.

If the format is invalid, you **can't** do the commit. 

<small>(Actually, you can use `--no-verify` ).</small>

### Commit Message Guidelines

> See more on [Angular contribution guideline](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type).

The git message must to have a **type**, it can be ne of the following:

* **build**: Changes that affect the build system or external dependencies.
* **ci**: Changes to our CI configuration files and scripts.
* **docs**: Documentation only changes.
* **feat**: A new feature.
* **fix**: A bug fix.
* **perf**: A code change that improves performance.
* **refactor**: A code change that neither fixes a bug nor adds a feature.
* **style**: Changes that do not affect the meaning of the code.
* **test**: Adding missing tests or correcting existing tests.

I know. really, I know.

The first time you use a convention for commits you think it's *over engineering*. 

But after a time, it's **very helpful**. It makes easy read all the commits quickly or just focus in a determinate type of commits.

### Examples

All the following examples are common and valid:

```bash
build: update dependencies
ci: setup travis credentials
refactor: move scripts
fix: use user agent provided by parameters
test: update snapshots
style: use space instead of tabs
```

