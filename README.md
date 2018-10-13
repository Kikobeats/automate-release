# Automate your releases

> **Tip** Install it with `npx automate-release` 🎉.

A release might seem just an irrelevant number, but here you'll find why you should be using it.

If you are not releasing your software, then it will be complicated to rollback and differentiate changes between versions.

But the real problem will be from a **user perspective**: It will not be easy to make evident what has changed.

Most of the developers tend to run it manually, making the releasing process a source of errors and problems. That's why releasing software is one of the most usual issues.

Nowadays, we have the best tools to automate this task so let's use them.

Your next release will be automatically doing:

- [x] Create a commit release in the git history.
- [x] Create a new git tag.
- [x] Create a `CHANGELOG` entry associated with your tag.
- [x] Create a GitHub Release.
- [x] Communicate the new version at Slack, Twitter, etc.

Let me show you how to do it.

## Git Commit Convention

> **Tip**: You can use a different [convention configuration](https://github.com/marionebl/commitlint#shared-configuration).

The first step is to define a git commit convention to follow.

We are going to use [commitlint](https://github.com/marionebl/commitlint) for linting git messages.

![](https://i.imgur.com/nZOE5Vu.png)

It'll force you to follow a strict format into your git messages.

The format is used for automagically determinate the next version to release. Also, it is used to classify the commits by type into `CHANGELOG.md`.

You **can't do** the commit until the format is valid. 

<small>(You could bypass this step using the --no-verify option).</small>

## Commit Message Guidelines

> **Tip**: Read more on [Angular contribution guideline](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type).

The git message must have a **type**, for example:

* **build**: Changes that affect the build system or external dependencies.
* **ci**: Changes to our CI configuration files and scripts.
* **docs**: Documentation only changes.
* **feat**: A new feature.
* **fix**: A bug fix.
* **perf**: A code change that improves performance.
* **refactor**: A code change that neither fixes a bug or adds a feature.
* **style**: Changes that do not affect the meaning of the code.
* **test**: Adding missing tests or correcting existing tests.

I know. really, I know.

The first time you use a convention for commits, you might think that it's **over-engineering**. But it's **very helpful**, it makes easy read all the commits quickly or just focus in a determinate type of commits.

## Examples of Git Commits

All the following examples are usual and valid:

```bash
build: update dependencies
ci: setup travis credentials
refactor: move scripts
fix: use user agent provided by parameters
test: update snapshots
style: use space instead of tabs
```

## Determinate the Next Version

After following a git commit schema, we are going to use: [standard-version](https://github.com/conventional-changelog/standard-version). After reading your git history and it will determinate what is the next release version.

**patches** (`1.0.0` → `1.0.1`)

```sh
git commit -a -m "fix(parsing): fixed a bug in our parser"
```

**features** (`1.0.0` → `1.1.0`)

```sh
git commit -a -m "feat(parser): we now have a parser \o/"
```

**breaking changes** (`1.0.0` → `2.0.0`)

```sh
git commit -a -m "feat(new-parser): introduces a new parsing library
BREAKING CHANGE: new library does not support foo-construct"
```

In addition, GitHub usernames (`@kikobeats`) and issue references (`#133`) will be swapped out for the
appropriate URLs in your `CHANGELOG.md`.

To do that, add `npm run release` as npm script associated with `release`:

```json
{
  "scripts": {
    "release": "standard-version",
    "release:tags": "git push --follow-tags origin master",
    "postrelease": "npm run release:tags"
  }
}
```

Note that `postrelease` is not mandatory but it will push your git tags.

Then just do `npm run release` to release a new version.

![](https://i.imgur.com/AmOfMV9.png)

The first time you release a version, a `CHANGELOG.md` will be created.

![](https://i.imgur.com/B2CoFsG.png)

The file follow The format is based on [Keep a Changelog](https://keepachangelog.com) specification.

The next time you release a new version, it will increment the file, adding a new entry.

This allows you add extra information into `CHANGELOG.md` and it will not be overwritten in your next release.

![](https://i.imgur.com/QOse3tZ.png)

A good practice is to add a resume in human readable format explaining what's new in this version.

## GitHub Release

> **Tip**: Use [direnv](https://direnv.net/) for declaring local development variables. 

GitHub, or GitLab as well, has a special place into the repository page for the releases.

![](https://i.imgur.com/butKsZ6.png)

When you create a new git tag, it will show there but without information attached.

We are going to use a tool called [releaser-tools](https://github.com/conventional-changelog/releaser-tools) that will connect with GitHub/GitLab and set up a pretty release.

To do that, we are going to declare it as a part of our `postrelease` tasks:

```json
{
  "scripts": {
  "postrelease": "npm run release:tags && npm run release:github",
  "release": "standard-version",
  "release:github": "conventional-github-releaser -p angular",
  "release:tags": "git push --follow-tags origin master"
  }
```

Next time, your metadata will be associated with the GitHub/GitLab release 🎉

![](https://i.imgur.com/4Am8xIx.png)

## Communicate your changes

> **Tip**: Use [tom](http://tom.js.org/) for sending multiple notification (Slack/Twitter/Telegram/Email).

It's the moment to make your changes public for the general public.

First, we need to retrieve our latest release published. 

In the case of GitHub, we can use:

**GitHub API**

<blockquote>
<p>e.g. <a href="https://api.github.com/repos/Kikobeats/automatic-release/releases/latest">https://api.github.com/repos/Kikobeats/automatic-release/releases/latest</a></p>
</blockquote>

**GitHub RSS Feed**

> e.g. [https://github.com/Kikobeats/automatic-release/releases.atom](https://github.com/Kikobeats/automatic-release/releases.atom)

Then, just we need to connect our release data with the service where we want to share the information.

This can be as simple as creating an [IFTTT](https://ifttt.com) recipe

<div align="center">
<img src="https://i.imgur.com/ZgUB7w5.png" width='200px' />
</div>
