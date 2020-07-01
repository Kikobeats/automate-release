<div align="center">
	<img width="250" src="https://github.com/Kikobeats/automate-release/raw/master/media/logo.png" alt="Awesome">
	<br>
	<br>
  <br>
</div>

> **TL;DR** Run `npx automate-release` 🎉.

A release might seem just an irrelevant number, but here you'll find why you should be using it.

Release software is part of our developer day, but we tend to run it manually just we remember it, being a source of errors.

Nowadays, we have the best tools to automate this task so let's use them.

Your next release will be automatically doing:

- [Follow a Git Commit Convention](#follow-a-git-commit-convention)
  * [Commit Message Guidelines](#commit-message-guidelines)
  * [Examples of Git Commits](#examples-of-git-commits)
- [Determinate Next Version Based on History](#determinate-next-version-based-on-history)
  * [GitHub Release](#github-release)
- [Continous Release](#continous-release)
  * [Release on CI/CD](#release-on-cicd)
- [Communicate Your Changes](#communicate-your-changes)
  * [Be Notified](#be-notified)
  * [Publishing the Latest Release](#publishing-the-latest-release)

Let me show you how to do it.

## Follow a Git Commit Convention

> **Tip**: You can use a different [convention configuration](https://github.com/marionebl/commitlint#shared-configuration).

Using a `git commit` convention for our git messages help us all the messages of the contributors have a homogeneous appearance.

In addition, because we are going to use the same pattern for all the git messages, we can use that for do extra things, like for example, classify commits correctly at `CHANGELOG.md` or determinate what is the next version to release based on commit history.

For ensuring all git messages follow the same pattern, We are going to use [commitlint](https://github.com/marionebl/commitlint) for linting git messages.

![](https://i.imgur.com/nZOE5Vu.png)

You **can't do** the commit until the format is valid.  It'll force you to follow a strict format into your git messages.

<small>(Actually, you could bypass this step using the `--no-verify` option, but avoid do that).</small>

Linting commits is also a thing that has to be applied to Pull Requests.

![](https://user-images.githubusercontent.com/39191/31453417-f6da45ae-ae66-11e7-9727-24c69d2fc03b.png)

Just integrate [commitlintbot](https://github.com/paulirish/commitlintbot) with any project that need to follow the convention.

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

## Determinate Next Version Based on History

Now that we have a `git commit` convention, we can jump in the next thing, that will make our first release 🎉.

For do that, we are going to use [standard-version](https://github.com/conventional-changelog/standard-version). After reading your git history and it will determinate what is the next release version.

![](https://i.imgur.com/nmfLfkC.png)

[standard-version](https://github.com/conventional-changelog/standard-version) will determinate automagically the next version to release based on your `git history`.

For do that it will consider:

**patches** (`1.0.0` → `1.0.1`)

```bash
git commit -a -m "fix(parsing): fixed a bug in our parser"
```

**features** (`1.0.0` → `1.1.0`)

```bash
git commit -a -m "feat(parser): we now have a parser \o/"
```

**breaking changes** (`1.0.0` → `2.0.0`)

```bash
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

### GitHub Release

GitHub (and GitLab too) has a special place into the repository for reflecting releases:

![](https://i.imgur.com/butKsZ6.png)

When you push a `git tag`, it will appear here, but nothing more. No text or changes associated.

Now that we are generating a `CHANGELOG.md` it would be interesting to reflect the changes associated with each version.

We can use a tool called [releaser-tools] (https://github.com/conventional-changelog/releaser-tools) who will do exactly that, leaving our release section pretty 💅.

> **Note**: Remember to setup [`CONVENTIONAL_GITHUB_RELEASER_TOKEN`](https://github.com/conventional-changelog/releaser-tools/tree/master/packages/conventional-github-releaser#setup-token-for-cli). You can use [direnv](https://direnv.net/) for declaring local development variables.

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

## Continous Release

The human behavior in a release process is very limited: we only have to trigger the release action. After that, all is automated 🤖.

But what if I say you we can eliminate the human behavior from the release equation?

![](https://i.imgur.com/ivj9I69.jpg)

The premise will be that, every commit on your `master` branch will mean that a new version of your software will be released.

### Release on CI/CD

The right place to do this is as part of our **Continuous Integration**.

![](https://i.imgur.com/zEH4hA8.png)

Every time a new Pull Request is merged in our `master` branch, our **Tests** will be executed to determinate if all is fine (nothing new here).

But now, after that, The **Release** stage will be executed, that will perform our `npm run release` command to complete the action.

<div align="center">
        <img src="https://i.imgur.com/7x6doze.jpg">
        <div><smal>Have you noticed that? It's the sweet sensation of automation.</small></div>
  <br>
</div>

That's specially helpful as maintainer if you are already have automated part of the process that uses services such as [Greenkeeper](https://greenkeeper.io) to keep your dependencies up to date, that create PR very often if you have many dependencies or they are updated very often (something that happens all the time at NPM ecosystem).

You can see [.travis.yml](/.travis.yml) to see how it is done or just run `npx automate-release` to install it in your project folder.

## Communicate Your Changes

Releases also is a way to establish a compromise with your audience in order to know what's news.

![](https://i.imgur.com/5vDpWJM.jpg)

From [now](https://twitter.com/github/status/1067483957573373952) GitHub brings the ability to subscribe to any repository for getting notifications related with new versions.

### Be Notified

Alternatively, you can get release information from different sources and connect it with third party services using different ways.

![](https://i.imgur.com/uXLNGtp.png)

Just you need to recover the latest release and publish it on other channel using an intermediate service that connects it over Twitter, Slack or where your audience is.

#### GitHub

- [GitHub API](https://api.github.com/repos/Kikobeats/automate-release/releases/latest) – For recovering information per `owner_name/repo_name`.
- [GitHub RSS Feed](https://github.com/Kikobeats/automate-release/releases.atom) – For getting atom feed per `owner_name/repo_name`.

### Publishing the Latest Release

#### Services

- [CodeRelease.io](https://coderelease.io) - GitHub Release Notifications on Your E-mail.
- [IFTTT](https://ifttt.com) / [Zapier](https://zapier.com/) – For declaring using *RSS-to-Slack* recipes or similar.
- [@github_releases_notify_bot](https://telegram.me/github_releases_notify_bot) – Telegram bot to receive release notifications.

##### Self-Hosted

- [tom.js.org](http://tom.js.org/) – A tiny microservice for sending notifications using multiple channels (Slack/Twitter/Telegram/Email).
