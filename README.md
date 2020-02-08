# npm2nix

npm2nix is a mad project to allow globally installing any node package via the nix registry

# Channels

We have a channel at `https://github.com/mkg20001/npm2nix/archive/master.tar.gz`

# Tool

## Cycle

- Download list of all npm packages every cycle
- Start an update task for every package and put it into queue
  - Generate a lockfile for every package
  - Append to the default.nix in pkgs
  - Check if there's any script in extra/<package-name>.sh or a nix file extra/<package-name>.nix and run the script and include the .nix file
  - Commit

## Requirements

- npm requests should be as cached as possible, possibly even using a registry clone
  - use `local-npm` as registry for lockfile generation
- the queue should be resilent
  - use bull? but depends on db.
- future: distribute update requests
- main repo shouldn't be a mess
  - use a second repo: https://github.com/mkg20001/npm2nix-registry
