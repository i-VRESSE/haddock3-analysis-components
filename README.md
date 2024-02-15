# React components for Haddock3 analysis

[![Research Software Directory Badge](https://img.shields.io/badge/rsd-00a3e3.svg)](https://research-software-directory.org/software/haddock3-analysis-components)
[![npmjs.com](https://img.shields.io/npm/v/@i-vresse/haddock3-analysis-components.svg?style=flat)](https://www.npmjs.com/package/@i-vresse/haddock3-analysis-components)
[![Node.js CI](https://github.com/i-VRESSE/haddock3-analysis-components/actions/workflows/ci.yml/badge.svg)](https://github.com/i-VRESSE/haddock3-analysis-components/actions/workflows/ci.yml)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.10522421.svg)](https://doi.org/10.5281/zenodo.10522421)

Components used in the report.html generated by the [haddock3-analyse](https://github.com/haddocking/haddock3/blob/main/src/haddock/clis/cli_analyse.py) command.

## Installation

```bash
npm install @i-vresse/haddock3-analysis-components
```

## Usage

See [example.html](example.html) for a simple example which uses the latest library from npm.

See [example.local.html](example.local.html) for a simple example which uses the library from local `dist/` folder.
Should be hosted on a static web server like `python3 -m http.server`.

## Build

```bash
npm run build
```

Generated `dist/` folder.

## Publish

Create [GitHub release](https://github.com/i-VRESSE/haddock3-analysis-components/releases/new),
which will trigger a [GitHub action](.github/workflows/publish.yml) that publishes the package to npmjs.

To publish a pre-release version, create a release with a tag like `1.0.0-next.0` and check the pre-release checkbox.

## Development

```bash
npm run dev
```

This will render the ./index.html page with the src/App.tsx component.

## Code style

We are using [`prettier`](https://prettier.io). To format the code, run:

```bash
npm run format
```
