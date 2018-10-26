<div align="center">
	<img width="250" src="https://github.com/Kikobeats/automate-release/raw/master/media/logo.png" alt="Awesome">
	<br>
	<br>
  <br>
</div>

> **Tip** Install it with `npx automate-release` 🎉.

A release might seem just an irrelevant number, but here you'll find why you should be using it.

Release software is part of our developer day, but we tend to run it manually just we remember it, being a source of errors.

Nowadays, we have the best tools to automate this task so let's use them.

Your next release will be automatically doing:

- [Follow a Git Commit Convention](#follow-a-git-commit-convention)
  * [Commit Message Guidelines](#commit-message-guidelines)
  * [Examples of Git Commits](#examples-of-git-commits)
- [Determinate the Next Version Based on History](#determinate-the-next-version-based-on-history)
    + [GitHub Release](#github-release)
- [Communicate your changes](#communicate-your-changes)

Let me show you how to do it.

## Follow a Git Commit Convention

> **Tip**: You can use a different [convention configuration](https://github.com/marionebl/commitlint#shared-configuration).

Using a `git commit` convention for our git messages help us all the messages of the contributors have a homogeneous appearance.

In addition, because we are going to use the same pattern for all the git messages, we can use that for do extra things, like for example, classify commits correctly at `CHANGELOG.md` or determinate what is the next version to release based on commit history.

For ensuring all git messages follow the same pattern, We are going to use [commitlint](https://github.com/marionebl/commitlint) for linting git messages.

![](https://i.imgur.com/nZOE5Vu.png)

It'll force you to follow a strict format into your git messages.

You **can't do** the commit until the format is valid. 

<small>(Actually, you could bypass this step using the `--no-verify` option, but avoid do that).</small>

### Commit Message Guidelines

> **Tip**: Read more on [Angular contribution guideline](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type).

The git message must have a **type**. It could be:

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

The first time you use a convention for commits, you might think that it's **over-engineering**. 

But, after use it a bit, it's **very helpful**, It makes easy read all the commits quickly or just focus in a determinate type of commits.

### Examples of Git Commits

All the following examples are usual and valid:

```bash
build: update dependencies
ci: setup travis credentials
refactor: move scripts
fix: use user agent provided by parameters
test: update snapshots
style: use space instead of tabs
```

## Determinate the Next Version Based on History

Now that we have a `git commit` convention, we can jump in the next thing, that will make our first release 🎉.

For do that, we are going to use [standard-version](https://github.com/conventional-changelog/standard-version). After reading your git history and it will determinate what is the next release version.

![](https://i.imgur.com/nmfLfkC.png)

**standard-version** will determinate automagically the next version to release based on your `git history`.

For do that it will consider:

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

A release has some tasks associated:

- 👉 Increment the version at `package.json`.
- 👉 Generate a new entry in your `CHANGELOG.md`
- 👉 Create a new specific git commit for the released version.
- 👉 Create a new `git tag` with the version associated.

In addition, GitHub usernames (`@kikobeats`) and issue references (`#133`) will be swapped out for the
appropriate URLs in your `CHANGELOG.md`.

A good practice is to put the command as `npm run release` script for performing the action.

```json
{
  "scripts": {
    "release": "standard-version",
    "release:tags": "git push --follow-tags origin master",
    "postrelease": "npm run release:tags"
  }
}
```

As you can see, we associated push things into your master remote branch.

So, next time you want to do a release, just type `npm run release` (make sense, uh).

![](https://i.imgur.com/AmOfMV9.png)

The first time you released a version, a `CHANGELOG.md` will be created. Otherwise, it will append just the new released version:

![](https://i.imgur.com/B2CoFsG.png)

The `CHANGELOG.md` follows [Keep a Changelog](https://keepachangelog.com) specification. 


You can write into it and your words will be preserved between versions.

![](https://i.imgur.com/QOse3tZ.png)

#### GitHub Release

GitHub (and GitLab too) has a special place into the repository for reflecting releases:

![](https://i.imgur.com/butKsZ6.png)

When you push a `git tag`, it will appear here, but nothing more. No text or changes associated.

Now that we are generating a `CHANGELOG.md` it would be interesting to reflect the changes associated with each version.

We can use a tool called [releaser-tools] (https://github.com/conventional-changelog/releaser-tools) who will do exactly that, leaving our release section pretty 💅.

We need to associate it as part of our `postrelease` script:

```json
{
  "scripts": {
  "postrelease": "npm run release:tags && npm run release:github",
  "release": "standard-version",
  "release:github": "conventional-github-releaser -p angular",
  "release:tags": "git push --follow-tags origin master"
  }
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
<p>e.g. <a href="https://api.github.com/repos/Kikobeats/automate-release/releases/latest">https://api.github.com/repos/Kikobeats/automate-release/releases/latest</a></p>
</blockquote>

**GitHub RSS Feed**

> e.g. [https://github.com/Kikobeats/automate-release/releases.atom](https://github.com/Kikobeats/automate-release/releases.atom)

Then, just we need to connect our release data with the service where we want to share the information.

This can be as simple as creating an [IFTTT](https://ifttt.com) recipe

<div align="center">
<img src="https://i.imgur.com/ZgUB7w5.png" width='200px' />
</div>
