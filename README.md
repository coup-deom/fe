# How to Run

## Requirements

https://code.visualstudio.com/docs/devcontainers/containers

- [docker](https://www.docker.com/)
  - recommendations
    - [rancher](https://www.rancher.com/)
    - [docker desktop](https://docs.docker.com/desktop/)
- [VSCode](https://code.visualstudio.com/)
  - [devcontainer extension](https://vscode.dev/github/coup-deom/fe/blob/mainte.remote-containers/extension)


## Quick Start

setup `{workspace root}/.env.local`

```
...

VITE_API_HOST=
VITE_OAUTH_CALLBACK=
VITE_HOST=

VITE_EMAIL=

...
```

open terminal on `/workspace/fe`

```zsh
# once (prep)
$ yarn
$ yarn dlx @yarnpkg/sdks vscode

# run
$ yarn dev
$ yarn dev:normal
$ yarn dev:owner
```