# Sudra Routes/Axiom Verge Router

## Getting started
Make sure that you have git and docker installed. Add yourself to the docker group so you don't have to run as root.

Usually that command will look like `sudo usermod -a -G docker $USER`, but it depends on your distribution. Reboot after that.

You'll need `docker-compose` as well. All of this is to ensure that our dev environment is consistent between machines, and that everybody is using the same version of every dependency regardless of what they have installed.

## Your Editing Environment
We're using an `editorconfig` file to make sure that everyone's editor complies. You can find more information about extensions needed for your editor [on their website](https://editorconfig.org/). After installing the extension everything should be handled automatically.


## Spinning up the containers
```
docker-compose up --build
```

This starts all of the containers. Currently only the frontend container is defined, a backend and database will be added soon.

 - The frontend, on `http://localhost:3000`

The only one of these that you will likely be navigating to will be the frontend. It will proxy API requests automatically to the backend, and the backend handles the database.

## Spinning down the containers
In the terminal window that is running the `docker-compose up --build` command, press Ctrl+C once. Wait for it to return you back to your shell prompt, then run

```
docker-compose down -t 0
```

to properly shut the containers down.

**Note that this will clear the contents of your database**

## Installing new frontend dependencies
We use `yarn` as our package manager. To manipulate packages on the frontend, run `docker-compose exec frontend yarn_command_here`. For instance, `docker-compose exec frontend yarn add lodash` will install lodash. We're using the `parcel` bundler so it should automatically reload with the new items you have installed, because parcel is magic.

**Do not use your local version of yarn, always run it in the container.**

## Committing
All work must be done in branches, and a pull request made so code review can happen. Nobody commits directly to master, all pull requests must have at least one approving review, and all tests must pass before the PR can be merged.

## Linting
As always, run these in the container, not on your local machine.

### Frontend
```
yarn fix
```
On the frontend before making a commit, ALWAYS run `yarn fix` - this has our linter go through and make sure everything is okay. It'll fix the things that it can and alert you to the things that it can't.

Take care of those before making a commit.

### Backend
The backend doesn't exist yet, but we'll be using Python (Django).

```
flake8
```

The command is quite literally just `flake8`. Unfortunately there's no option that will fix your mistakes, but it just checks for PEP8 compatible Python. If you've written Python in a team at any point, you'll be doing it automatically. The `editorconfig` takes care of some of the nitpicky stuff as well.
